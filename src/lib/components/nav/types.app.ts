import {
	DataObj,
	DataObjCardinality,
	DataObjData,
	DataObjRecordStatus,
	MetaData,
	nbrRequired,
	Node,
	NodeApp,
	RawNode,
	ResponseBody,
	required,
	strRequired,
	valueOrDefault
} from '$comps/types'
import type {
	DataObjListRecord,
	DataObjRaw,
	DataObjRecord,
	DataObjRecordRowList,
	DbNode
} from '$comps/types'
import { apiFetch, ApiFunction } from '$lib/api'
import {
	type DataRecord,
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
import { State, StateObj, StateObjDataObj, StateObjDialog } from '$comps/nav/types.appState'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = []
	private constructor(newLevel: AppLevel) {
		this.levels.push(newLevel)
	}
	static async initDialog(state: StateObjDialog, token: TokenAppDialog) {
		const newApp = new App(
			new AppLevel([
				new AppLevelTab({
					dataObjId: token.dataObjIdDisplay,
					idx: 0,
					levelIdx: 0,
					parms: state.metaData.valueGetAll()
				})
			])
		)
		await query(state, newApp.getCurrTab(), TokenApiQueryType.retrieve, newApp)
		return newApp
	}
	static async initEmbeddedField(state: StateObjDataObj, token: TokenApiQuery) {
		// get tab dataObjId
		// <todo> 240325 - retrieve dataObjId from database
		let dataObjId = ''
		const result: ResponseBody = await apiFetch(ApiFunction.dbEdgeGetDataObjId, token)
		if (result.success) {
			dataObjId = result.data.id
		} else {
			error(500, {
				file: FILENAME,
				function: 'App.initEmbeddedField',
				message: `Error retrieving dataObj.id: ${token.dataObj.dataObjName}`
			})
		}

		// get new level
		const newLevel = new AppLevel([
			new AppLevelTab({
				levelIdx: 0,
				idx: 0,
				dataObjId,
				data: token.queryData.dataObjData,
				parms: state.metaData.valueGetAll()
			})
		])

		// app
		const newApp = new App(newLevel)
		await query(state, newApp.getCurrTab(), token.queryType, newApp)
		return newApp
	}
	static async initNode(state: State, token: TokenAppTreeNode) {
		const nodeApp = new NodeApp(token.node)
		const tabParms = App.getTabParmsNode(0, 0, token.node)
		const newApp = new App(new AppLevel([new AppLevelTab(tabParms)]))
		await query(state, newApp.getCurrTab(), TokenApiQueryType.retrieve, newApp)

		const currTab = newApp.getCurrTab()
		if (currTab) currTab.list.listSet(currTab?.data?.dataObjRowList)

		return newApp
	}
	static getTabParmsNode(levelIdx: number, idx: number, node: Node) {
		const nodeApp = new NodeApp(node)
		return {
			data: undefined,
			dataObjId: nodeApp.dataObjId,
			idx,
			label: nodeApp.label,
			levelIdx,
			nodeId: nodeApp.id
		}
	}

	async addLevelDialog(state: StateObjDialog, token: TokenAppDialog) {
		// current tab
		const currTab = this.getCurrTab()
		if (currTab) currTab.list.initLevel(state.metaData.valueGetAll())

		// new level
		const newLevel = new AppLevel([
			new AppLevelTab({
				dataObjId: token.dataObjIdDialog,
				idx: 0,
				levelIdx: 0
			})
		])
		if (newLevel) {
			this.levels.push(newLevel)
			await query(state, this.getCurrTab(), token.queryType, this)
		}
		return this
	}
	async addLevelNode(state: State, queryType: TokenApiQueryType) {
		const currTab = this.getCurrTab()
		if (currTab && currTab.data) {
			// current tab
			currTab.list.initLevel(state.metaData.valueGetAll())

			// new level
			const tabs: Array<AppLevelTab> = []
			const newLevelIdx = this.levels.length
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				const rawNodes: {
					root: Array<DbNode>
					children: Array<DbNode>
				} = await getNodesLevel(currLevel.getCurrTab().nodeId)

				if (rawNodes.root.length === 1) {
					// add root
					tabs.push(
						new AppLevelTab(
							App.getTabParmsNode(newLevelIdx, 0, new Node(new RawNode(rawNodes.root[0])))
						)
					)
					// add children
					rawNodes.children.forEach(async (rawNode, idx) => {
						tabs.push(
							new AppLevelTab(
								App.getTabParmsNode(newLevelIdx, idx + 1, new Node(new RawNode(rawNode)))
							)
						)
					})
					this.levels.push(new AppLevel(tabs))
					await query(state, this.getCurrTab(), queryType, this)
				}
			}
		}
		return this
	}

	async back(backCnt: number) {
		for (let i = 0; i < backCnt; i++) {
			const currLevel = this.getCurrLevel()
			if (currLevel) {
				if (currLevel.currTabIdx > 0) {
					currLevel.setTabIdx(0, true)
				} else {
					this.levels.pop()
				}
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
	async detailUpdate(state: State, token: TokenAppDoDetail, queryType: TokenApiQueryType) {
		const currTab = this.getCurrTab()
		if (currTab && currTab.data) {
			const currRecord = token.data.getDataRecord()
			const tabParent = this.getCurrTabParentTab()

			if (queryType !== TokenApiQueryType.delete) {
				if (!(await this.update(state, queryType, currRecord))) return this
				if (tabParent) {
					await query(state, tabParent, TokenApiQueryType.retrieve, this)
					tabParent.list.listUpdate(
						tabParent?.data?.dataObjRowList,
						currTab.data.getRecordValue('id')
					)
				}
			} else {
				if (currTab.data.getDataRecordStatus() === DataObjRecordStatus.created) {
					if (!tabParent || !tabParent.listHasRecords()) {
						this.popLevel()
					} else {
						tabParent.list.idSet(tabParent.list.idList[0])
						await this.update(state, TokenApiQueryType.retrieve, tabParent.listGetData())
					}
				} else {
					let recordIdOld = currTab.data.getRecordValue('id')
					let recordIdNew = ''
					if (tabParent && tabParent.list.idList.length > 1) {
						let idx = tabParent.list.idList.findIndex((id: string) => id === recordIdOld)
						idx = idx === 0 ? 1 : idx - 1
						recordIdNew = tabParent.list.idList[idx]

						if (!(await this.update(state, queryType, currRecord))) return this
						await query(state, tabParent, TokenApiQueryType.retrieve, this)
						tabParent.list.listUpdate(tabParent?.data?.dataObjRowList, recordIdOld, recordIdNew)
						await this.update(state, TokenApiQueryType.retrieve, tabParent.listGetData())
					} else {
						if (!(await this.update(state, queryType, currRecord))) return this
						await query(state, tabParent, TokenApiQueryType.retrieve, this)
						this.popLevel()
					}
				}
			}
		}
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
	getLevel(levelIdx?: number) {
		if (levelIdx === 0) {
			return this.levels[0]
		} else if (!levelIdx || levelIdx > this.levels.length - 1) {
			return undefined
		} else {
			return this.levels[levelIdx]
		}
	}
	getCurrLevel() {
		return this.getLevel(this.levels.length - 1)
	}
	getCurrTab() {
		const level = this.getCurrLevel()
		return level ? level.getCurrTab() : undefined
	}
	getCurrTabParentLevel() {
		return this.getLevel(this.levels.length - 2)
	}
	getCurrTabParentTab() {
		const level = this.getCurrTabParentLevel()
		return level ? level.getCurrTab() : undefined
	}
	getParms() {
		let parms: DataRecord = {}
		this.levels.forEach((level, idx) => {
			level.tabs[level.currTabIdx].list.listSetParms(parms)
			Object.entries(level.tabs[level.currTabIdx].parms).forEach(([key, value]) => {
				if (!Object.keys(parms).includes(key)) parms[key] = value
			})
		})
		return parms
	}
	getRowStatus() {
		const parentLevel = this.getCurrTabParentLevel()
		if (parentLevel) return parentLevel.getCurrTab().listRowStatus()
	}
	popLevel() {
		this.levels.pop()
		return this
	}
	async rowUpdate(state: State, rowAction: AppRowActionType) {
		if (this.levels.length > 1) {
			const tabParent = this.getCurrTabParentTab()
			if (tabParent) {
				tabParent.listSetIdByAction(rowAction)
				await this.update(state, TokenApiQueryType.retrieve, tabParent.listGetData())
			}
		}
		return this
	}
	async tabDuplicate(state: State, token: TokenAppDoDetail) {
		const currTab = this.getCurrTab()
		if (currTab) {
			currTab.data = token.data
			if (currTab.data) currTab.data.dataObjRow.status = DataObjRecordStatus.created
		}
		return this
	}
	async update(state: State, queryType: TokenApiQueryType, dataRecord: DataObjRecord) {
		const currLevel = this.getCurrLevel()
		if (currLevel) {
			currLevel.resetTabs()
			const currTab = currLevel.getCurrTab()
			currTab.detailSetData(dataRecord)
			return await query(state, currTab, queryType, this)
		}
	}
}

export class AppLevel {
	currTabIdx: number
	tabs: Array<AppLevelTab> = []
	tabSet: number = 0
	constructor(tabs: Array<AppLevelTab>) {
		this.currTabIdx = 0
		this.tabs = tabs
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
	dataObj?: DataObj
	dataObjId: string
	dataObjRaw?: DataObjRaw
	idx: number
	isRetrieved: boolean = false
	label: string
	levelIdx: number
	list: AppLevelTabList = new AppLevelTabList()
	nodeId: string
	parms: DataRecord = {}
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'AppLevelTab'
		this.data = valueOrDefault(obj.data, undefined)
		this.dataObjId = strRequired(obj.dataObjId, clazz, 'dataObjId')
		this.idx = nbrRequired(obj.idx, 'idx')
		this.label = valueOrDefault(obj.label, '')
		this.levelIdx = nbrRequired(obj.levelIdx, 'levelIdx')
		this.list.init(obj.parms)
		this.nodeId = valueOrDefault(obj.nodeId, '')
		this.parms = valueOrDefault(obj.parms, {})
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
		const crumbFieldNames: Array<string> = this.dataObj?.crumbs ? this.dataObj.crumbs : []
		const idCurrent = this.list.idCurrent
		if (crumbFieldNames.length > 0 && idCurrent) {
			const dataRow = this.listGetData()
			if (dataRow) {
				crumbFieldNames.forEach((f) => {
					if (Object.hasOwn(dataRow, f)) {
						if (id) id += ' '
						id += Object.hasOwn(dataRow[f], 'display') ? dataRow[f] : dataRow[f]
					}
				})
			}
		}
		return id ? ` [${id}]` : ''
	}

	listGetData() {
		const idCurrent = this.list.idCurrent
		const records = this.listGetRecords()
		return records && idCurrent
			? records.find((row) => {
					return row.id === idCurrent
				}) || {}
			: {}
	}
	listGetRecords() {
		const idList = this.list.idList
		return idList
			? this.data?.dataObjRowList
					.filter((row) => idList.includes(row.record.id))
					.map((row) => row.record)
			: []
	}
	listGetRow() {
		const idCurrent = this.list.idCurrent
		const records = this.listGetRecords()
		return idCurrent && records
			? records.findIndex((row) => {
					return row.id === idCurrent
				})
			: -1
	}
	listHasRecords() {
		return this.data?.dataObjRowList.length && this.data?.dataObjRowList.length > 0
	}
	listRowStatus() {
		const idCurrent = this.list.idCurrent
		const listRecords = this.listGetRecords()
		if (listRecords && idCurrent) {
			const rowIdx = listRecords.findIndex((record) => {
				return record.id === idCurrent
			})
			if (rowIdx > -1) return new AppLevelRowStatus(listRecords.length, rowIdx)
		}
	}
	listSetIdByAction(rowAction: AppRowActionType) {
		const listRecords = this.listGetRecords()
		if (listRecords) {
			const rowCount = listRecords.length
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
			this.list.idSet(listRecords[rowIdx].id)
		}
	}
	reset() {
		this.isRetrieved = false
	}
}

export class AppLevelTabList {
	idCurrent: string = ''
	idList: string[] = []
	metaParmListRecordIdCurrent = 'listRecordIdCurrent'
	metaParmListRecordIdList = 'listRecordIdList'
	constructor() {}
	getParms() {
		return {
			[this.metaParmListRecordIdCurrent]: this.idCurrent,
			[this.metaParmListRecordIdList]: this.idList
		}
	}
	idSet(id: string) {
		this.idCurrent = id
	}
	init(parms: DataRecord) {
		parms = valueOrDefault(parms, {})
		this.idCurrent = Object.hasOwn(parms, this.metaParmListRecordIdCurrent)
			? parms[this.metaParmListRecordIdCurrent]
			: ''
		this.idList = Object.hasOwn(parms, this.metaParmListRecordIdList)
			? parms[this.metaParmListRecordIdList]
			: []
	}
	initLevel(parms: DataRecord) {
		parms = valueOrDefault(parms, {})
		this.idCurrent = Object.hasOwn(parms, this.metaParmListRecordIdCurrent)
			? parms[this.metaParmListRecordIdCurrent]
			: ''
		this.idList = Object.hasOwn(parms, this.metaParmListRecordIdList)
			? parms[this.metaParmListRecordIdList]
			: this.idList
		console.log('types.app.AppLevelTabList.initLevel: ', { id: this.idCurrent, list: this.idList })
	}
	listSet(records: DataObjRecordRowList | undefined) {
		this.idList = records ? records.map((row) => row.record.id) : []
	}
	listSetParms(parms: DataRecord) {
		if (this.idCurrent && this.idList) {
			parms[this.metaParmListRecordIdCurrent] = this.idCurrent
			parms[this.metaParmListRecordIdList] = this.idList
		}
	}
	listUpdate(
		records: DataObjRecordRowList | undefined,
		recordId: string,
		recordIdAlt: string = ''
	) {
		this.idCurrent = recordIdAlt ? recordIdAlt : recordId
		this.listSet(records)
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
