import {
	DataObj,
	DataObjCardinality,
	DataObjProcessType,
	DataRowStatus,
	DbData,
	NavRowActionType,
	NavStateTokenActionType,
	NavStateTokenAppTree,
	Node,
	NodeApp,
	NodeNavObject,
	processByNode,
	processQuery,
	QueryParm,
	QueryParmAction,
	QueryParmData,
	type QueryParmDataValue,
	ResponseBody
} from '$comps/types'
import type {
	DataObjData,
	DataObjRaw,
	DataRowRecord,
	DbDataType,
	NavStateTokenAppCrumbs,
	NavStateTokenAppObjAction,
	RawNode
} from '$comps/types'
import { apiFunctionsDBEdge, getNodes } from '$utils/db.utils'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

/* App */
export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = []
	private constructor(newLevel: AppLevel) {
		this.levels.push(newLevel)
	}
	static async init(token: NavStateTokenAppTree) {
		const appNode: NodeNavObject = new NodeNavObject(token.node)
		const nodeLevelRoot = new NodeApp({
			header: appNode.header,
			id: appNode.id,
			name: appNode.name,
			dataObjId: appNode.dataObjId
		})
		const level = await AppLevel.init(nodeLevelRoot)
		return level ? new App(level) : undefined
	}
	async addLevel(rowNbr: number | undefined = undefined) {
		const currLevel = this.getCurrLevel()
		const currTab = currLevel.getCurrTab()
		const isInsertMode = rowNbr === undefined
		const presetParms = this.getPresetParms()
		console.log('App.addLevel:', { presetParms })
		const newLevel = await AppLevel.add(currTab, rowNbr, isInsertMode, presetParms)
		if (newLevel) {
			this.levels.push(newLevel)
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
	async changeCrumbs(token: NavStateTokenAppCrumbs) {
		const crumbIdx = token.crumbIdx
		const backCnt = this.crumbs.length - 1 - crumbIdx
		this.back(backCnt)
	}
	getCrumbsList() {
		this.crumbs = []
		this.levels.forEach((level, i) => {
			this.crumbs.push(new AppLevelCrumb(0, level.getCrumbLabel(0)))
			if (level.currTabIdx > 0)
				this.crumbs.push(new AppLevelCrumb(level.currTabIdx, level.getCrumbLabel(level.currTabIdx)))
		})
		return this.crumbs
	}
	getCurrLevel() {
		return this.levels[this.levels.length - 1]
	}
	getPresetParms() {
		let parms: QueryParmDataValue = {}
		this.levels.forEach((level) => {
			const levelParm = level.getPresetParm()
			if (levelParm.hasOwnProperty('key') && levelParm.hasOwnProperty('id') && levelParm.key)
				parms[levelParm.key] = levelParm.id
		})
		return parms
	}
	popLevel() {
		this.levels.pop()
	}
}

export class AppLevel {
	currTabIdx: number
	parentList: AppLevelParent | undefined
	tabs: Array<AppLevelTab> = []
	tabSet: number = 0
	private constructor(
		currTabIdx: number,
		tabs: Array<AppLevelTab>,
		parentList: AppLevelParent | undefined = undefined
	) {
		this.currTabIdx = currTabIdx
		this.parentList = parentList
		this.tabs = tabs
	}
	static async init(nodeLevelRoot: NodeApp) {
		const rootTab = await AppLevelTab.init(0, nodeLevelRoot, true)
		return rootTab ? new AppLevel(0, [rootTab]) : undefined
	}
	static async add(
		currTab: AppLevelTab,
		rowNbr: number | undefined,
		isInsertMode: boolean,
		presetParms: QueryParmDataValue | undefined
	) {
		const parentList = new AppLevelParent(currTab, rowNbr)
		const rawNodes: {
			root: Array<RawNode>
			children: Array<RawNode>
		} = await getNodes(apiFunctionsDBEdge.getNodesLevel, currTab.nodeId)

		// add nodes
		let tabs: Array<AppLevelTab> = []
		const newAppNode = (dbNode: any) => {
			return new NodeApp(Node.dbNodeToRaw(Node.dbNodeParseApp(dbNode)))
		}

		if (rawNodes.root.length === 1) {
			// add root
			let newTab = await AppLevelTab.init(
				0,
				newAppNode(rawNodes.root[0]),
				true,
				parentList,
				isInsertMode,
				presetParms
			)
			if (newTab) {
				tabs.push(newTab)

				// add children
				rawNodes.children.forEach(async (rawNode, idx) => {
					newTab = await AppLevelTab.init(
						idx + 1,
						newAppNode(rawNode),
						false,
						parentList,
						isInsertMode,
						presetParms
					)
					if (newTab) tabs.push(newTab)
				})
				return new AppLevel(0, tabs, parentList)
			}
		}
	}
	async changeTab(tabIdx: number) {
		this.setTabIdx(tabIdx)
		const currTab = this.getCurrTab()
		if (this.parentList && !currTab.isRetrieved) await AppLevelTab.retrieve(currTab, false)
	}
	getCrumbLabel(tabIdx: number) {
		let label = this.tabs[tabIdx].label
		if (this.parentList && tabIdx === 0) label += this.parentList.getCrumbLabelId()
		return label
	}
	getCurrNodeId() {
		return this.tabs[this.currTabIdx].nodeId
	}
	getCurrTab() {
		return this.tabs[this.currTabIdx]
	}
	getPresetParm() {
		const rootTab = this.tabs[0]
		if (
			rootTab.dataObj &&
			rootTab.dataObj.cardinality === DataObjCardinality.detail &&
			rootTab.dataObjData
		) {
			const key = rootTab.dataObj.table?.getObject()
			const id = rootTab.dataObjData[0].record.id.data
			return { key, id }
		} else {
			return {}
		}
	}
	getRowStatus() {
		return this.parentList ? this.parentList.getRowStatus() : undefined
	}
	resetTabs(excludeRoot: boolean, retrieveParms: DataRowRecord | {}) {
		this.tabs.forEach((tab, i) => {
			if (excludeRoot && i === 0) return
			tab.isRetrieved = false
			tab.retrieveParms = retrieveParms
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

export class AppLevelParent {
	crumbFieldNames: Array<string>
	rowCount: number
	rowCurrent: number | undefined
	tab: AppLevelTab
	constructor(tab: AppLevelTab, rowCurrent: number | undefined) {
		this.crumbFieldNames = tab.dataObj?.crumbs ? tab.dataObj.crumbs : []
		this.rowCount = tab.dataObjData ? tab.dataObjData.length : -1
		this.rowCurrent = rowCurrent
		this.tab = tab
	}
	getCrumbLabelId() {
		let id = ''
		if (this.rowCurrent !== undefined && this.rowCurrent > -1) {
			const dataRow = this.getData() || {}
			this.crumbFieldNames.forEach((f) => {
				if (dataRow.hasOwnProperty(f)) {
					if (id) id += ' '
					id += dataRow[f].hasOwnProperty('display') ? dataRow[f].display : dataRow[f]
				}
			})
		}
		return id ? ` [${id}]` : ''
	}
	getData() {
		return this.tab.dataObjData && this.rowCurrent !== undefined
			? this.tab.dataObjData[this.rowCurrent].record
			: {}
	}

	getRowStatus() {
		if (this.rowCurrent !== undefined) return new AppLevelRowStatus(this.rowCount, this.rowCurrent)
	}
	reset() {
		this.rowCurrent = -1
	}
	async retrieve() {
		if (this.tab.dataObjData) {
			await AppLevelTab.retrieve(this.tab, false)
			this.rowCount = this.tab.dataObjData.length
		}
	}
	setRowAction(rowAction: NavRowActionType) {
		if (this.rowCurrent === undefined) return
		let newRow: number
		switch (rowAction) {
			case NavRowActionType.first:
				newRow = 0
				break

			case NavRowActionType.left:
				newRow = this.rowCurrent - 1
				break

			case NavRowActionType.right:
				newRow = this.rowCurrent + 1
				break

			case NavRowActionType.last:
				newRow = this.rowCount - 1
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'AppLevelParent.changeRow',
					message: `No case defined for NavRowActionType: ${rowAction}`
				})
		}
		this.rowCurrent = newRow
	}
	setRowId(recId: string) {
		if (this.tab.dataObjData)
			this.rowCurrent = this.tab.dataObjData.findIndex((row) => row.record.id.data === recId)
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
	dataObj: DataObj | undefined
	dataObjData: DataObjData | undefined
	dataObjId: string
	dataObjRaw: DataObjRaw | undefined
	idx: number
	isRetrieved: boolean = false
	label: string
	nodeId: string
	retrieveParms: DataRowRecord
	private constructor(
		idx: number,
		label: string,
		nodeId: string,
		dataObjId: string,
		parent: AppLevelParent | undefined
	) {
		this.idx = idx
		this.label = label
		this.nodeId = nodeId
		this.dataObjId = dataObjId
		this.retrieveParms = parent ? parent.getData() : {}
	}
	static async init(
		idx: number,
		node: NodeApp,
		retrieveData: boolean,
		parent: AppLevelParent | undefined = undefined,
		isInsertMode: boolean = false,
		presetParms: QueryParmDataValue = {}
	) {
		const tab = new AppLevelTab(idx, node.header, node.id, node.dataObjId, parent)
		if (retrieveData) if (!(await this.retrieve(tab, isInsertMode, presetParms))) return
		return tab
	}
	static async retrieveNode(node: NodeApp, formData: DbDataType | undefined = undefined) {
		return await processByNode(node, DataObjProcessType.select, new DbData({ form: formData }))
	}
	static async retrieve(
		tab: AppLevelTab,
		isInsertMode: boolean = false,
		presetParms: QueryParmDataValue = {}
	) {
		let queryParmAction: QueryParmAction = QueryParmAction.retrieve
		let queryParmActionType: NavStateTokenActionType = NavStateTokenActionType.none
		let data = {}

		if (isInsertMode) {
			queryParmAction = QueryParmAction.processAction
			queryParmActionType = NavStateTokenActionType.detailNew
			data = { preset: presetParms }
		} else {
			data = { retrieve: tab.retrieveParms }
		}

		console.log('AppLevelTab.retrieve.0:', {
			tab,
			isInsertMode,
			insertModeParms: presetParms,
			data
		})

		const qp = new QueryParm(
			{ dataObjId: tab.dataObjId, dataObjRaw: tab.dataObjRaw },
			queryParmAction,
			queryParmActionType,
			new QueryParmData(data)
		)
		console.log('AppLevelTab.retrieve.1:', qp)

		const result: ResponseBody = await processQuery(qp)
		console.log('AppLevelTab.retrieve.result:', { result })
		if (result.success) {
			tab.dataObj = new DataObj(result.data.dataObjRaw)
			tab.dataObjData = result.data.dataObjData
			tab.dataObjRaw = result.data.dataObjRaw
			tab.isRetrieved = true
			return true
		} else {
		}
	}
	async update(dataObjData: DataObjData | undefined) {
		if (dataObjData) this.dataObjData = dataObjData
	}
}
