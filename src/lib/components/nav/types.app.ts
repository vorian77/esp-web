import {
	DataObj,
	DataObjData,
	DataObjRecordStatus,
	Node,
	NodeApp,
	RawNode,
	ResponseBody
} from '$comps/types'
import type { DataObjListRecord, DataObjRaw, DataObjRecord, DbNode } from '$comps/types'
import { apiFetch, ApiFunction } from '$lib/api'
import {
	TokenApiQueryType,
	TokenApiQuery,
	TokenAppDoList,
	TokenAppTreeNode,
	TokenAppTreeNodeId,
	TokenAppCrumbs,
	TokenAppDoDetail
} from '$comps/types.token'
import { query } from '$comps/nav/types.appQuery'
import { State } from '$comps/nav/types.appState'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = []
	private constructor(newLevel: AppLevel) {
		this.levels.push(newLevel)
	}
	static async initDataObj(state: State, token: TokenApiQuery) {
		const newApp = new App(await AppLevel.initDataObj(state, token))
		await query(state, newApp.getCurrTab(), token.queryType, newApp)
		return newApp
	}
	static async initNode(state: State, token: TokenAppTreeNode) {
		return new App(await AppLevel.initNode(state, token))
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
	getProgramId() {
		for (let i = 0; i < this.levels.length; i++) {
			if (this.levels[i].programId) return this.levels[i].programId
		}
		return undefined
	}
	getRowStatus() {
		const parentLevel = this.levels.length - 2
		if (parentLevel > -1) return this.levels[parentLevel].getCurrTab().listRowStatus()
	}
	popLevel() {
		this.levels.pop()
	}
	async setRowAction(state: State, rowAction: AppRowActionType) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParent()
			tabParent.listSetIdByAction(rowAction)

			this.getCurrLevel().resetTabs()

			const tabCurrent = this.getCurrTab()
			tabCurrent.detaiSetData(tabParent.listGetData())

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

		if (this.levels.length > 1) await this.getCurrTabParent().listUpdate(state, currTab, this)
		return true
	}
}

export class AppLevel {
	currTabIdx: number
	programId?: string
	tabs: Array<AppLevelTab> = []
	tabSet: number = 0
	private constructor(tabs: Array<AppLevelTab>, programId: string | undefined = undefined) {
		this.currTabIdx = 0
		this.programId = programId
		this.tabs = tabs
	}
	static async initDataObj(state: State, token: TokenApiQuery) {
		return new AppLevel([await AppLevelTab.initDataObj(token)])
	}
	static async initNode(state: State, token: TokenAppTreeNode) {
		const nodeApp = new NodeApp(token.node)
		const newLevel = new AppLevel([AppLevelTab.initNode(0, 0, nodeApp)], token.programId)
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
		const labelId = parentLevel ? parentLevel.getCurrTab().listCrumbLabelId() : ''
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
	constructor(rowCount: number, rowIdx: number) {
		this.rowCount = rowCount
		this.rowCurrentDisplay = rowIdx + 1
		if (this.rowCount > 1 && this.rowCurrentDisplay > 0) {
			this.status = '[' + this.rowCurrentDisplay + ' of ' + this.rowCount + ']'
			this.show = true
		}
	}
}

export class AppLevelTab {
	data?: DataObjData
	dataObj?: DataObj
	dataObjId: string
	dataObjRaw?: DataObjRaw
	idx: number
	isRetrieved: boolean = false
	label: string
	levelIdx: number
	listEdit: DataObjListRecord = []
	listIDCurrent?: string
	listFilterIds: Array<string> = []

	nodeId: string
	private constructor(
		levelIdx: number,
		idx: number,
		dataObjId: string,
		data: DataObjData | undefined = undefined,
		label: string = '',
		nodeId: string = ''
	) {
		this.data = data
		this.dataObjId = dataObjId
		this.idx = idx
		this.label = label
		this.levelIdx = levelIdx
		this.nodeId = nodeId
	}
	static async initDataObj(token: TokenApiQuery) {
		const result: ResponseBody = await apiFetch(ApiFunction.dbEdgeGetDataObjId, token)
		if (result.success) {
			return new AppLevelTab(0, 0, result.data.id, token.queryData.dataObjData)
		} else {
			error(500, {
				file: FILENAME,
				function: 'initDataObj',
				message: `Error retrieving dataObj: ${token.dataObj.dataObjName}`
			})
		}
	}
	static initNode(levelIdx: number, idx: number, node: NodeApp) {
		return new AppLevelTab(levelIdx, idx, node.dataObjId, undefined, node.label, node.id)
	}

	detailGetData() {
		return this.data ? this.data.getData() : {}
	}
	detaiSetData(data: DataObjRecord) {
		if (this.data) this.data.setRecord(data)
	}

	getTable() {
		return this.dataObj?.table?.name
	}

	listCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.crumbs ? this.dataObj.crumbs : []
		if (crumbFieldNames.length > 0 && this.listIDCurrent) {
			const dataRow = this.listGetData()
			crumbFieldNames.forEach((f) => {
				if (Object.hasOwn(dataRow, f)) {
					if (id) id += ' '
					id += Object.hasOwn(dataRow[f], 'display') ? dataRow[f] : dataRow[f]
				}
			})
		}
		return id ? ` [${id}]` : ''
	}
	listFilter() {
		this.listEdit =
			this.data?.dataObjRowList
				.filter((row) => {
					return this.listFilterIds.includes(row.record['id'])
				})
				.map((row) => row.record) || []
	}
	listFilterAppend(id: string) {
		if (!this.listFilterIds.includes(id)) this.listFilterIds.push(id)
		this.listFilter()
	}
	listGetData() {
		const row = this.listGetRow()
		if (row > -1) {
			return this.listEdit[row] || {}
		} else {
			return {}
		}
	}
	listGetRow() {
		return this.listIDCurrent && this.listEdit
			? this.listEdit.findIndex((row) => {
					return row.id === this.listIDCurrent
				})
			: -1
	}
	listInit(token: TokenAppDoList) {
		this.listSetId(token.listRowId)
		this.listFilterIds = token.listFilterIds
		this.listFilter()
	}
	listRowStatus() {
		if (this.listEdit && this.listIDCurrent) {
			const rowIdx = this.listEdit.findIndex((row) => {
				return row.id === this.listIDCurrent
			})
			if (rowIdx > -1) return new AppLevelRowStatus(this.listEdit.length, rowIdx)
		}
	}
	listSetId(recordId: string) {
		this.listIDCurrent = recordId
	}
	listSetIdByAction(rowAction: AppRowActionType) {
		const rowCount = this.listEdit.length || 0
		let row = this.listGetRow()
		if (!rowCount || row < 0) return

		switch (rowAction) {
			case AppRowActionType.first:
				row = 0
				break

			case AppRowActionType.left:
				row--
				break

			case AppRowActionType.right:
				row++
				break

			case AppRowActionType.last:
				row = rowCount - 1
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'AppLevelTab.listSetIdByAction',
					message: `No case defined for AppRowActionType: ${rowAction}`
				})
		}
		this.listIDCurrent = this.listEdit[row].id
	}
	async listUpdate(state: State, currTab: AppLevelTab, app: App) {
		this.reset()
		await query(state, this, TokenApiQueryType.retrieve, app)
		if (currTab.data) {
			const id = currTab.data.getRecordValue('id')
			this.listSetId(id)
			this.listFilterAppend(id)
		}
	}

	reset() {
		this.isRetrieved = false
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
