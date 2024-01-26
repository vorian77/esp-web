import {
	DataObj,
	DataObjData,
	DataObjRecordStatus,
	Node,
	NodeApp,
	RawNode,
	ResponseBody
} from '$comps/types'
import type { DataObjRaw, DataObjRecord, DbNode } from '$comps/types'
import { apiFetch, ApiFunction, TokenApiQueryType, TokenApiQuery } from '$lib/api'
import { query } from '$comps/nav/types.appQuery'
import {
	State,
	TokenAppTreeNodeId,
	TokenAppCrumbs,
	TokenAppDoDetail
} from '$comps/nav/types.appState'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = []
	private constructor(newLevel: AppLevel) {
		this.levels.push(newLevel)
	}
	static async initDataObj(state: State, token: TokenApiQuery) {
		return new App(await AppLevel.initDataObj(state, token))
	}
	static async initNode(state: State, node: Node) {
		return new App(await AppLevel.initNode(state, new NodeApp(node)))
	}
	async addLevel(state: State, queryType: TokenApiQueryType) {
		const newLevelIdx = this.levels.length
		const newLevel = await AppLevel.add(newLevelIdx, this.getCurrLevel().getCurrTab())
		if (newLevel) {
			this.levels.push(newLevel)
			await query(state, this.getCurrTab(), queryType, this)
			return true
		} else {
			return false
		}
	}
	async back(backCnt: number) {
		for (let i = 0; i < backCnt; i++) {
			const currLevel = this.getCurrLevel()

			if (currLevel.currTabIdx > 0) {
				currLevel.setTabIdx(0, true)
			} else {
				this.levels.pop()
			}
		}
	}
	async changeCrumbs(token: TokenAppCrumbs) {
		const crumbIdx = token.crumbIdx
		const backCnt = this.crumbs.length - 1 - crumbIdx
		this.back(backCnt)
	}
	getCrumbsList() {
		this.crumbs = [new AppLevelCrumb(-1, 'Home')]
		this.levels.forEach((level, i) => {
			const parentLevel = i > 0 ? this.levels[i - 1] : undefined
			this.crumbs.push(new AppLevelCrumb(0, level.getCrumbLabel(0, parentLevel)))
			if (level.currTabIdx > 0)
				this.crumbs.push(new AppLevelCrumb(level.currTabIdx, level.getCrumbLabel(level.currTabIdx)))
		})
		return this.crumbs
	}
	getCurrLevel() {
		return this.levels[this.levels.length - 1]
	}
	getCurrTab() {
		return this.levels[this.levels.length - 1].getCurrTab()
	}
	getCurrTabParent() {
		return this.levels[this.levels.length - 2].getCurrTab()
	}
	getRowStatus() {
		const parentLevel = this.levels.length - 2
		if (parentLevel > -1) return this.levels[parentLevel].getCurrTab().getRowStatus()
	}
	popLevel() {
		this.levels.pop()
	}
	async setRowAction(state: State, rowAction: AppRowActionType) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParent()
			tabParent.setCurrRowByAction(rowAction)

			this.getCurrLevel().resetTabs()

			const tabCurrent = this.getCurrTab()
			tabCurrent.setDataDetail(tabParent.getDataList())

			await query(state, tabCurrent, TokenApiQueryType.retrieve, this)
		}
	}
	async tabDuplicate(state: State, token: TokenAppDoDetail) {
		const currTab = this.getCurrTab()
		currTab.data = token.dataObj.objData
		currTab.data.dataObjRow.status = DataObjRecordStatus.created
		return true
	}
	async tabUpdate(state: State, token: TokenAppDoDetail, queryType: TokenApiQueryType) {
		this.getCurrLevel().resetTabs()

		const currTab = this.getCurrTab()
		currTab.data = token.dataObj.objData
		if (!(await query(state, currTab, queryType, this))) return false

		if (this.levels.length > 1) await this.getCurrTabParent().updateParentList(state, currTab, this)
		return true
	}
}

export class AppLevel {
	currTabIdx: number
	tabs: Array<AppLevelTab> = []
	tabSet: number = 0
	private constructor(tabs: Array<AppLevelTab>) {
		this.currTabIdx = 0
		this.tabs = tabs
	}
	static async initDataObj(state: State, token: TokenApiQuery) {
		const newLevel = new AppLevel([await AppLevelTab.initDataObj(token)])
		await query(state, newLevel.getCurrTab(), token.queryType)
		return newLevel
	}
	static async initNode(state: State, node: NodeApp) {
		const newLevel = new AppLevel([AppLevelTab.initNode(0, 0, node)])
		await query(state, newLevel.getCurrTab(), TokenApiQueryType.retrieve)
		return newLevel
	}
	static async add(newLevelIdx: number, currTab: AppLevelTab) {
		const tabs: Array<AppLevelTab> = []

		const rawNodes: {
			root: Array<DbNode>
			children: Array<DbNode>
		} = await getNodesLevel(currTab.nodeId)

		if (rawNodes.root.length === 1) {
			// add root
			tabs.push(AppLevelTab.initNode(newLevelIdx, 0, new NodeApp(new RawNode(rawNodes.root[0]))))

			// add children
			rawNodes.children.forEach(async (rawNode, idx) => {
				tabs.push(AppLevelTab.initNode(newLevelIdx, idx + 1, new NodeApp(new RawNode(rawNode))))
			})
			return new AppLevel(tabs)
		}
	}
	getCrumbLabel(tabIdx: number, parentLevel: AppLevel | undefined = undefined) {
		const label = this.tabs[tabIdx].label
		const labelId = parentLevel ? parentLevel.getCurrTab().getCrumbLabelId() : ''
		return label + labelId
	}
	getCurrTab() {
		return this.tabs[this.currTabIdx]
	}
	resetTabs() {
		this.tabs.forEach((tab) => {
			tab.reset()
		})
	}
	setTabIdx(newIdx: number, setTabSet: boolean = false) {
		this.currTabIdx = newIdx
		if (setTabSet) this.tabSet = newIdx
	}
}

export class AppLevelCrumb {
	label: string
	tabIdx: number
	constructor(tabIdx: number, label: string) {
		this.label = label
		this.tabIdx = tabIdx
	}
}

export class AppLevelRowStatus {
	rowCount: number
	rowCurrentDisplay: number
	show: boolean = false
	status: string = ''
	constructor(rowCount: number, rowCurrent: number) {
		this.rowCount = rowCount
		this.rowCurrentDisplay = rowCurrent + 1
		if (rowCount > 1 && rowCurrent > -1) {
			this.status = '[' + this.rowCurrentDisplay + ' of ' + rowCount + ']'
			this.show = true
		}
	}
}

export class AppLevelTab {
	currRow?: number
	data?: DataObjData
	dataObj?: DataObj
	dataObjId: string
	dataObjRaw?: DataObjRaw
	idx: number
	isRetrieved: boolean = false
	label: string
	levelIdx: number
	nodeId: string
	private constructor(
		levelIdx: number,
		idx: number,
		dataObjId: string,
		label: string = '',
		nodeId: string = ''
	) {
		this.dataObjId = dataObjId
		this.idx = idx
		this.label = label
		this.levelIdx = levelIdx
		this.nodeId = nodeId
	}
	static async initDataObj(token: TokenApiQuery) {
		const result: ResponseBody = await apiFetch(ApiFunction.dbEdgeGetDataObjId, token)
		if (result.success) {
			return new AppLevelTab(0, 0, result.data.id)
		} else {
			error(500, {
				file: FILENAME,
				function: 'initDataObj',
				message: `Error retrieving dataObj: ${token.dataObj.dataObjName}`
			})
		}
	}
	static initNode(levelIdx: number, idx: number, node: NodeApp) {
		return new AppLevelTab(levelIdx, idx, node.dataObjId, node.label, node.id)
	}

	getCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.crumbs ? this.dataObj.crumbs : []
		if (crumbFieldNames.length > 0 && this.currRow !== undefined && this.currRow > -1) {
			const dataRow = this.getDataList() || {}
			crumbFieldNames.forEach((f) => {
				if (Object.hasOwn(dataRow, f)) {
					if (id) id += ' '
					id += Object.hasOwn(dataRow[f], 'display') ? dataRow[f] : dataRow[f]
				}
			})
		}
		return id ? ` [${id}]` : ''
	}

	getDataDetail() {
		return this.data ? this.data.getData() : {}
	}

	getDataList() {
		return this.currRow !== undefined && this.currRow > -1 && this.data
			? this.data.dataObjRowList[this.currRow].record
			: {}
	}
	getRowStatus() {
		const currLength = this.data?.dataObjRowList.length
		if (currLength !== undefined && this.currRow !== undefined && this.currRow > -1)
			return new AppLevelRowStatus(currLength, this.currRow)
	}
	getTable() {
		return this.dataObj?.table.name
	}
	reset() {
		this.isRetrieved = false
	}
	setCurrRowByAction(rowAction: AppRowActionType) {
		const rowCount = this.data?.dataObjRowList.length
		if (this.currRow === undefined || rowCount === undefined) return
		let newRow: number
		switch (rowAction) {
			case AppRowActionType.first:
				newRow = 0
				break

			case AppRowActionType.left:
				newRow = this.currRow - 1
				break

			case AppRowActionType.right:
				newRow = this.currRow + 1
				break

			case AppRowActionType.last:
				newRow = rowCount - 1
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'AppLevelTab.setCurrRowByAction',
					message: `No case defined for AppRowActionType: ${rowAction}`
				})
		}
		this.currRow = newRow
	}
	setCurrRowByNum(recordId: string) {
		if (this.data) {
			this.currRow = this.data.dataObjRowList.findIndex((row) => {
				return row.record.id === recordId
			})
		}
	}
	setDataDetail(data: DataObjRecord) {
		if (this.data) this.data.setRecord(data)
	}
	async updateParentList(state: State, currTab: AppLevelTab, app: App) {
		this.reset()
		await query(state, this, TokenApiQueryType.retrieve, app)
		// set parent list curr row
		let rowIdx = -1
		if (
			this.data &&
			currTab.data?.dataObjRow &&
			Object.hasOwn(currTab.data.dataObjRow, 'record') &&
			currTab.data.hasRecord()
		) {
			this.setCurrRowByNum(currTab.data.getRecordValue('id'))
		}
	}
}

export enum AppRowActionType {
	first = 'first',
	left = 'left',
	right = 'right',
	last = 'last'
}

async function getNodesLevel(nodeId: string) {
	const result: ResponseBody = await apiFetch(
		ApiFunction.dbEdgeGetNodesLevel,
		new TokenAppTreeNodeId(nodeId)
	)
	if (result.success) {
		return result.data
	} else {
		error(500, {
			file: FILENAME,
			function: 'getNodes',
			message: `Error retrieving nodes for nodeId: ${nodeId}`
		})
	}
}
