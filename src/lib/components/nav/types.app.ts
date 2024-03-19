import {
	DataObj,
	DataObjCardinality,
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
	type TokenApiQueryDataValue,
	TokenApiQueryType,
	TokenApiQuery,
	TokenAppDialog,
	TokenAppDoList,
	TokenAppTreeNode,
	TokenAppTreeNodeId,
	TokenAppCrumbs,
	TokenAppDoDetail
} from '$comps/types.token'
import { query } from '$comps/nav/types.appQuery'
import { State, StateObjDialog } from '$comps/nav/types.appState'
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
	static async initDialog(state: StateObjDialog, token: TokenAppDialog) {
		const newApp = new App(await AppLevel.initDialog(state, token.dataObjIdDisplay))
		await query(state, newApp.getCurrTab(), TokenApiQueryType.retrieve)
		return newApp
	}
	static async initNode(state: State, token: TokenAppTreeNode) {
		return new App(await AppLevel.initNode(state, token))
	}
	async addLevelDialog(state: StateObjDialog, token: TokenAppDialog) {
		const newLevelIdx = this.levels.length
		const newLevel = await AppLevel.initDialog(state, token.dataObjIdDialog)
		if (newLevel) {
			this.levels.push(newLevel)
			await query(state, this.getCurrTab(), token.queryType, this)
		}
		return this
	}
	async addLevelNode(state: State, queryType: TokenApiQueryType) {
		const newLevelIdx = this.levels.length
		const newLevel = await AppLevel.addLevelNode(newLevelIdx, this.getCurrLevel().getCurrTab())
		if (newLevel) {
			this.levels.push(newLevel)
			await query(state, this.getCurrTab(), queryType, this)
		}
		return this
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
		return this
	}
	async changeCrumbs(token: TokenAppCrumbs) {
		const crumbIdx = token.crumbIdx
		const backCnt = this.crumbs.length - 1 - crumbIdx
		this.back(backCnt)
		return this
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
		if (parentLevel > -1) return this.levels[parentLevel].getCurrTab().listRowStatus()
	}
	popLevel() {
		this.levels.pop()
		return this
	}
	async rowUpdate(state: State, rowAction: AppRowActionType) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParent()
			tabParent.listSetIdByAction(rowAction)

			this.getCurrLevel().resetTabs()

			const currTab = this.getCurrTab()
			currTab.detailSetData(tabParent.listGetData())

			await query(state, currTab, TokenApiQueryType.retrieve, this)
		}
		return this
	}
	async tabDuplicate(state: State, token: TokenAppDoDetail) {
		const currTab = this.getCurrTab()
		currTab.data = token.data
		if (currTab.data) currTab.data.dataObjRow.status = DataObjRecordStatus.created
		return this
	}
	async tabUpdate(state: State, token: TokenAppDoDetail, queryType: TokenApiQueryType) {
		this.getCurrLevel().resetTabs()

		const currTab = this.getCurrTab()
		currTab.data = token.data
		// currTab.detailSetData()
		if (!(await query(state, currTab, queryType, this))) return this

		if (this.levels.length > 1) await this.getCurrTabParent().listUpdate(state, currTab, this)
		return this
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
	static async initDialog(state: StateObjDialog, dataObjId: string) {
		return new AppLevel([AppLevelTab.initDialog(dataObjId, state.data)])
	}
	static async initNode(state: State, token: TokenAppTreeNode) {
		const nodeApp = new NodeApp(token.node)
		const newLevel = new AppLevel([AppLevelTab.initNode(0, 0, nodeApp)], token.programId)
		await query(state, newLevel.getCurrTab(), TokenApiQueryType.retrieve)
		return newLevel
	}
	static async addLevelNode(newLevelIdx: number, currTab: AppLevelTab) {
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

export class AppLevelRowStatusDialog extends AppLevelRowStatus {}

export class AppLevelTab {
	data?: DataObjData
	dataMeta: AppLevelTabMetaData = new AppLevelTabMetaData()
	dataObj?: DataObj
	dataObjId: string
	dataObjRaw?: DataObjRaw
	idx: number
	isRetrieved: boolean = false
	label: string
	levelIdx: number
	metaParmListRecordIdCurrent = 'listRecordIdCurrent'
	metaParmListRecordIdList = 'listRecordIdList'
	metaParmListRecordIdParent = 'listRecordIdParent'
	metaParmListRecords = 'listRecords'

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
	static initDialog(dataObjId: string, data: DataObjData) {
		return new AppLevelTab(0, 0, dataObjId, data)
	}
	static initNode(levelIdx: number, idx: number, node: NodeApp) {
		return new AppLevelTab(levelIdx, idx, node.dataObjId, undefined, node.label, node.id)
	}

	detailGetData() {
		return this.data ? this.data.getDataRecord() : {}
	}
	detailSetData(data: DataObjRecord) {
		if (this.data) this.data.setRecord(data)
	}

	getTable() {
		return this.dataObj?.table?.name
	}

	listCrumbLabelId() {
		let id = ''
		const listRecordIdCurrent = this.dataMeta.getValue(this.metaParmListRecordIdCurrent)
		const crumbFieldNames: Array<string> = this.dataObj?.crumbs ? this.dataObj.crumbs : []

		if (crumbFieldNames.length > 0 && listRecordIdCurrent) {
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
	listData() {
		const listRecordIdCurrent = this.dataMeta.getValue(this.metaParmListRecordIdCurrent)
		const listRecordIdList: Array<string> = this.dataMeta.getValue(this.metaParmListRecordIdList)
		const listRecords: DataObjListRecord = this.dataMeta.getValue(this.metaParmListRecords)
		return { listRecordIdCurrent, listRecordIdList, listRecords }
	}
	listFilter(listRecordIdList: Array<string>) {
		console.log('types.app.listFilter.listRecordIdList:', listRecordIdList)
		this.dataMeta.setValue(this.metaParmListRecordIdList, listRecordIdList, true)
		let listRecords: DataObjListRecord = []
		if (listRecordIdList) {
			listRecords =
				this.data?.dataObjRowList
					.filter((row) => {
						return listRecordIdList.includes(row.record['id'])
					})
					.map((row) => row.record) || []
		}
		this.dataMeta.setValue(this.metaParmListRecords, listRecords, false)
	}
	listGetData() {
		const rowIdx = this.listGetRow()
		const { listRecords } = this.listData()
		if (rowIdx > -1) {
			return listRecords[rowIdx] || {}
		} else {
			return {}
		}
	}
	listGetRow() {
		const { listRecordIdCurrent, listRecords } = this.listData()
		return listRecordIdCurrent && listRecords
			? listRecords.findIndex((row) => {
					return row.id === listRecordIdCurrent
				})
			: -1
	}
	listInit(listRecordIdList: Array<string>, listRecordId?: string) {
		this.listSetId(listRecordId)
		this.listFilter(listRecordIdList)
	}
	listInitDialog(state: StateObjDialog) {
		// this.listInit(
		// 	state.data.parmsValueGet('listRecordIdList'),
		// 	state.data.parmsValueGet('listRecordIdCurrent')
		// )
		// this.dataMeta.setValue(
		// 	this.metaParmListRecordIdParent,
		// 	state.data.parmsValueGet('listRecordIdParent'),
		// 	true
		// )
		this.listSetId(state.data.parmsValueGet('listRecordIdCurrent'))
	}
	listInitPage(token: TokenAppDoList) {
		this.listInit(token.listFilterIds, token.listRowId)
	}
	listRowStatus() {
		const { listRecordIdCurrent, listRecords } = this.listData()
		if (listRecords && listRecordIdCurrent) {
			const rowIdx = listRecords.findIndex((row) => {
				return row.id === listRecordIdCurrent
			})
			if (rowIdx > -1) return new AppLevelRowStatus(listRecords.length, rowIdx)
		}
	}
	listSetId(recordId?: string) {
		this.dataMeta.setValue(this.metaParmListRecordIdCurrent, recordId, true)
	}
	listSetIdByAction(rowAction: AppRowActionType) {
		const { listRecords } = this.listData()
		const rowCount = listRecords.length || 0
		let rowIdx = this.listGetRow()
		if (!rowCount || rowIdx < 0) return

		switch (rowAction) {
			case AppRowActionType.first:
				rowIdx = 0
				break

			case AppRowActionType.left:
				rowIdx--
				break

			case AppRowActionType.right:
				rowIdx++
				break

			case AppRowActionType.last:
				rowIdx = rowCount - 1
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'AppLevelTab.listSetIdByAction',
					message: `No case defined for AppRowActionType: ${rowAction}`
				})
		}
		this.listSetId(listRecords[rowIdx].id)
	}
	async listUpdate(state: State, currTab: AppLevelTab, app: App) {
		let { listRecordIdCurrent, listRecordIdList } = this.listData()
		this.reset()
		await query(state, this, TokenApiQueryType.retrieve, app)

		if (currTab.data) {
			const id = currTab.data.getRecordValue('id')
			this.listSetId(id)

			if (currTab.data.dataObjRow.status === DataObjRecordStatus.deleted) {
				listRecordIdList = listRecordIdList.filter((id) => id !== listRecordIdCurrent)
			} else {
				if (listRecordIdList) {
					if (!listRecordIdList.includes(id)) listRecordIdList.push(id)
				}
			}
			this.listFilter(listRecordIdList)
		}
	}

	reset() {
		this.isRetrieved = false
	}
}

class AppLevelTabMetaData {
	data: Record<string, { value: any; isQueryParm: boolean }> = {}
	getValue(key: string) {
		const value = this.data[key]
		return value ? value.value : undefined
	}
	setParms(parms: TokenApiQueryDataValue | undefined) {
		if (parms) {
			Object.entries(this.data).forEach(([key, value]) => {
				if (value.value && value.isQueryParm) parms[key] = value.value
			})
		}
	}
	setValue(key: string, value: any, isQueryParm: boolean) {
		this.data[key] = { value, isQueryParm }
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
