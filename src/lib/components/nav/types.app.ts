import {
	DataObj,
	DataObjCardinality,
	DataObjData,
	DataObjRowStatus,
	getArray,
	memberOfEnum,
	Node,
	NodeApp,
	NodeNav,
	NodeType,
	ResponseBody,
	strRequired,
	valueOrDefault
} from '$comps/types'
import type { DataObjRaw, DbNode } from '$comps/types'
import {
	apiFetch,
	ApiFunction,
	TokenApiDbDataObj,
	TokenApiQueryType,
	TokenApiQuery,
	TokenApiQueryData
} from '$lib/api'
import { SurfaceType, Token } from '$comps/types.master'
import { getEnhancement } from '$enhance/crud/_crud'
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
		return new App(await AppLevel.initNode(state, await NodeApp.initTree(node)))
	}
	async addLevel(state: State, queryType: TokenApiQueryType) {
		const newLevelIdx = this.levels.length
		const newLevel = await AppLevel.add(newLevelIdx, this.getCurrLevel().getCurrTab())
		if (newLevel) {
			this.levels.push(newLevel)
			await AppLevelTab.query(state, this.getCurrTab(), queryType, this)
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
			this.getCurrTabParent().setCurrRowByAction(rowAction)
			this.getCurrLevel().resetTabs()
			await AppLevelTab.query(state, this.getCurrTab(), TokenApiQueryType.retrieve, this)
		}
	}
	async tabDuplicate(state: State, token: TokenAppDoDetail) {
		const currTab = this.getCurrTab()
		currTab.data = token.dataObj.objData
		currTab.data.dataObjRow.status = DataObjRowStatus.created
		return true
	}
	async tabUpdate(state: State, token: TokenAppDoDetail, queryType: TokenApiQueryType) {
		this.getCurrLevel().resetTabs()

		const currTab = this.getCurrTab()
		currTab.data = token.dataObj.objData
		if (!(await AppLevelTab.query(state, currTab, queryType, this))) return false

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
		await AppLevelTab.query(state, newLevel.getCurrTab(), token.queryType)
		return newLevel
	}
	static async initNode(state: State, node: NodeApp) {
		const newLevel = new AppLevel([await AppLevelTab.initNode(0, 0, node)])
		await AppLevelTab.query(state, newLevel.getCurrTab(), TokenApiQueryType.retrieve)
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
			tabs.push(await AppLevelTab.initNode(newLevelIdx, 0, await NodeApp.initDb(rawNodes.root[0])))

			// add children
			rawNodes.children.forEach(async (rawNode, idx) => {
				tabs.push(await AppLevelTab.initNode(newLevelIdx, idx + 1, await NodeApp.initDb(rawNode)))
			})
			return new AppLevel(tabs)
		}
	}
	getCrumbLabel(tabIdx: number, parentLevel: AppLevel | undefined = undefined) {
		const label = this.tabs[tabIdx].label
		const labelId = parentLevel ? parentLevel.getCurrTab().getCrumbLabelId() : ''
		// console.log('AppLevel.getCrumbLabel:', { label, labelId })
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
	queryActions: QueryActions
	private constructor(
		levelIdx: number,
		idx: number,
		dataObjId: string,
		queryActions: QueryActions,
		label: string = '',
		nodeId: string = ''
	) {
		this.dataObjId = dataObjId
		this.idx = idx
		this.label = label
		this.levelIdx = levelIdx
		this.nodeId = nodeId
		this.queryActions = queryActions
	}
	static async initDataObj(token: TokenApiQuery) {
		const result: ResponseBody = await apiFetch(ApiFunction.dbEdgeGetDataObjId, token)
		if (result.success) {
			return new AppLevelTab(0, 0, result.data.id, new QueryActions([]))
		} else {
			error(500, {
				file: FILENAME,
				function: 'initDataObj',
				message: `Error retrieving dataObj: ${token.dataObj.dataObjName}`
			})
		}
	}
	static async initNode(levelIdx: number, idx: number, node: NodeApp) {
		return new AppLevelTab(levelIdx, idx, node.dataObjId, node.queryActions, node.label, node.id)
	}

	static async query(
		state: State,
		tab: AppLevelTab,
		queryType: TokenApiQueryType,
		app: App | undefined = undefined
	) {
		let record = this.queryDataPre(tab, queryType, app)

		record = await this.queryExecuteActions(
			state,
			record,
			tab.queryActions,
			QueryActionTiming.pre,
			queryType
		)
		console.log('AppLevelTab.query:', { queryType, record })

		if (!(await this.queryExecute(tab, queryType, new TokenApiQueryData({ record })))) return false

		await this.queryExecuteActions(
			state,
			tab?.data?.dataObjRow.record ? tab.data.dataObjRow.record : {},
			tab.queryActions,
			QueryActionTiming.post,
			queryType
		)
		return true
	}

	static queryDataPre(
		tab: AppLevelTab,
		queryType: TokenApiQueryType,
		app: App | undefined = undefined
	) {
		let record = {}

		switch (queryType) {
			case TokenApiQueryType.delete:
			case TokenApiQueryType.saveInsert:
			case TokenApiQueryType.saveUpdate:
				record = tab?.data ? tab.data.dataObjRow.record : {}
				break

			case TokenApiQueryType.new:
				if (app && tab.levelIdx > 1) {
					const tabGrandparent = app.levels[tab.levelIdx - 2].getCurrTab()
					record = tabGrandparent.getData()
				}
				break

			case TokenApiQueryType.none:
				break

			case TokenApiQueryType.retrieve:
				if (tab.isRetrieved) break

				if (app && tab.levelIdx > 0) {
					const tabParent = app.levels[tab.levelIdx - 1].getCurrTab()
					record = tabParent.getData()
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'AppLevelTab.query',
					message: `No case defined for AppLevelTabQueryType: ${queryType}`
				})
		}
		return record
	}

	static queryDataPost(tab: AppLevelTab, queryType: TokenApiQueryType, newData: DataObjData) {
		newData = new DataObjData(newData.cardinality, newData.dataObjList)
		switch (newData.cardinality) {
			case DataObjCardinality.list:
				return newData

			case DataObjCardinality.detail:
				if (newData.dataObjRow) {
					const recordCurrent = tab.data?.dataObjRow?.record
					let recordNew = newData.dataObjRow.record
					if (recordCurrent) {
						for (const [key, value] of Object.entries(recordCurrent)) {
							if (!Object.hasOwn(recordNew, key)) recordNew[key] = value
						}
						newData.dataObjRow.record = recordNew
					}
					return newData
				}

			default:
				error(500, {
					file: FILENAME,
					function: 'queryDataPost',
					message: `No case defined for cardinality: ${newData.cardinality}`
				})
		}
	}

	static async queryExecute(
		tab: AppLevelTab,
		queryType: TokenApiQueryType,
		queryData: TokenApiQueryData
	) {
		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessQuery,
			new TokenApiQuery(
				queryType,
				new TokenApiDbDataObj({ dataObjId: tab.dataObjId, dataObjRaw: tab.dataObjRaw }),
				queryData
			)
		)

		if (result.success) {
			tab.data = this.queryDataPost(tab, queryType, result.data.dataObjData)
			tab.dataObj = await DataObj.constructorCustomActions(result.data.dataObjRaw)
			tab.dataObjRaw = result.data.dataObjRaw
			tab.isRetrieved = true
			return true
		} else {
			let errMsg = result.message
			if (result.message.toLowerCase().includes('invalid query')) {
				if (queryType === TokenApiQueryType.delete) {
					errMsg = 'Unable to delete this record.'
					if (result.message.toLowerCase().includes('still referenced in link')) {
						let parts = result.message.split('::')
						let table = parts[parts.length - 1]
						table = table.split(' ')[0]
						errMsg += ` It is referenced in record(s) of child table: ${table}.\n\nThe child table record(s) must be deleted before the parent table record can be deleted.`
					}
				}
			}
			alert(errMsg)
			return false
		}
	}

	static async queryExecuteActions(
		state: State,
		data: any,
		queryActions: QueryActions,
		queryActionTiming: QueryActionTiming,
		queryType: TokenApiQueryType
	) {
		let newData: any = data
		let counter = 0
		queryActions.actions.forEach(async (action) => {
			if (action.timings.includes(queryActionTiming) && action.queryTypes.includes(queryType)) {
				counter++
				newData = await action.func(state, data, queryActionTiming, queryType)
			}
		})
		return counter === 1 ? newData : data
		return data
	}

	getCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.crumbs ? this.dataObj.crumbs : []
		if (crumbFieldNames.length > 0 && this.currRow !== undefined && this.currRow > -1) {
			const dataRow = this.getData() || {}
			crumbFieldNames.forEach((f) => {
				if (Object.hasOwn(dataRow, f)) {
					if (id) id += ' '
					id += Object.hasOwn(dataRow[f], 'display') ? dataRow[f].display : dataRow[f]
				}
			})
		}
		return id ? ` [${id}]` : ''
	}

	getData() {
		return this.currRow !== undefined && this.currRow > -1 && this.data
			? this.data.dataObjList[this.currRow].record
			: {}
	}
	getRowStatus() {
		const currLength = this.data?.dataObjList.length
		if (currLength !== undefined && this.currRow !== undefined && this.currRow > -1)
			return new AppLevelRowStatus(currLength, this.currRow)
	}
	reset() {
		this.isRetrieved = false
	}
	setCurrRowByAction(rowAction: AppRowActionType) {
		const rowCount = this.data?.dataObjList.length
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
	setCurrRowByNum(rowNum: number) {
		this.currRow = rowNum
	}
	async updateParentList(state: State, currTab: AppLevelTab, app: App) {
		this.reset()
		await AppLevelTab.query(state, this, TokenApiQueryType.retrieve, app)

		// set parent list curr row
		let rowIdx = -1
		if (this.data && currTab.data?.dataObjRow && Object.hasOwn(currTab.data.dataObjRow, 'record')) {
			const rowId = currTab.data?.dataObjRow.record.id.data
			rowIdx = this.data.dataObjList.findIndex((row) => {
				return row.record.id.data === rowId
			})
		}
		this.setCurrRowByNum(rowIdx)
	}
}

export enum AppRowActionType {
	first = 'first',
	left = 'left',
	right = 'right',
	last = 'last'
}

export type RawQueryAction = {
	name: string
	queryTypes: Array<TokenApiQueryType>
	timings: Array<QueryActionTiming>
}

export class QueryAction {
	func: Function
	name: string
	queryTypes: Array<TokenApiQueryType>
	timings: Array<QueryActionTiming>
	constructor(rawAction: RawQueryAction, func: Function) {
		const clazz = 'QueryAction'
		this.func = func
		this.name = strRequired(rawAction.name, clazz, 'name')
		this.queryTypes = this.initQueryTypes(clazz, rawAction.queryTypes)
		this.timings = this.initTimings(clazz, rawAction.timings)
	}
	initQueryTypes(clazz: string, queryTypes: any) {
		return getArray(queryTypes).map((queryType: string) => {
			return memberOfEnum(queryType, clazz, 'queryTypes', 'TokenApiQueryType', TokenApiQueryType)
		})
	}
	initTimings(clazz: string, timings: any) {
		return getArray(timings).map((timing: string) => {
			return memberOfEnum(timing, clazz, 'timings', 'QueryActionTiming', QueryActionTiming)
		})
	}
}

export class QueryActions {
	actions: Array<QueryAction> = []
	constructor(actions: Array<QueryAction>) {
		this.actions = actions
	}
	static async init(rawQueryActions: Array<RawQueryAction>) {
		let actions: Array<QueryAction> = []

		if (rawQueryActions) {
			for (let i = 0; i < rawQueryActions.length; i++) {
				const rawAction = rawQueryActions[i]
				actions.push(new QueryAction(rawAction, await getEnhancement(rawAction.name)))
			}
		}
		return new QueryActions(actions)
	}
}

export enum QueryActionTiming {
	post = 'post',
	pre = 'pre'
}

export class State {
	messageDrawer: any
	messageModal: any
	messageToast: any
	nodeType: NodeType = NodeType.home
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	packet: StatePacket | undefined
	page: string = '/home'
	surface: SurfaceType = SurfaceType.default
	updateFunction: Function
	constructor(updateFunction: Function, drawer: any, modal: any, toast: any) {
		this.updateFunction = updateFunction
		this.messageDrawer = drawer
		this.messageModal = modal
		this.messageToast = toast
	}
	consume(components: StatePacketComponent | Array<StatePacketComponent>) {
		if (this.packet && this.packet.component && components.includes(this.packet.component)) {
			const packet = this.packet
			this.packet = undefined
			return packet
		} else {
			return undefined
		}
	}
	statusReset() {
		// console.log('State.resetStatus...')
		this.updateFunction({ objHasChanged: false, objValidToSave: true })
	}
	set(packet: StatePacket) {
		this.packet = packet
	}
	update(obj: any) {
		this.updateFunction(obj)
	}
	updateProperties(obj: any) {
		if (Object.hasOwn(obj, 'nodeType')) this.nodeType = obj.nodeType
		if (Object.hasOwn(obj, 'objHasChanged')) this.objHasChanged = obj.objHasChanged
		if (Object.hasOwn(obj, 'objValidToSave')) this.objValidToSave = obj.objValidToSave
		if (Object.hasOwn(obj, 'page')) this.page = obj.page
		if (Object.hasOwn(obj, 'surface')) this.surface = obj.surface
		return this
	}
}
export class StatePacket {
	callbacks: Array<Function>
	checkObjChanged: boolean = true
	component: StatePacketComponent
	token?: Token
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.callbacks = obj.callbacks ? obj.callbacks : []
		this.checkObjChanged = Object.hasOwn(obj, 'checkObjChanged') ? obj.checkObjChanged : true
		this.component = Object.hasOwn(obj, 'component') ? obj.component : undefined
		this.token = obj.token ? obj.token : undefined
	}
}
export enum StatePacketComponent {
	appCrumbs = 'appCrumbs',
	appDataObj = 'appDataObj',
	appRow = 'appRow',
	appTab = 'appTab',
	navApp = 'navApp',
	navTree = 'navTree'
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

export class TokenApp extends Token {
	constructor() {
		super()
	}
}
export class TokenAppCrumbs extends TokenApp {
	crumbIdx: number
	constructor(crumbIdx: number) {
		super()
		this.crumbIdx = crumbIdx
	}
}

export class TokenAppDo extends TokenApp {
	action: TokenAppDoAction
	dataObj: DataObj
	constructor(action: TokenAppDoAction, dataObj: DataObj) {
		super()
		this.action = action
		this.dataObj = dataObj
	}
}
export enum TokenAppDoAction {
	back = 'back',
	listEdit = 'listEdit',
	listNew = 'listNew',
	detailDelete = 'detailDelete',
	detailNew = 'detailNew',
	detailSaveAs = 'detailSaveAs',
	detailSaveInsert = 'detailSaveInsert',
	detailSaveUpdate = 'detailSaveUpdate',
	none = 'none'
}

export class TokenAppDoDetail extends TokenAppDo {
	confirm: TokenAppDoDetailConfirm | undefined
	constructor(action: TokenAppDoAction, dataObj: DataObj, confirm?: TokenAppDoDetailConfirm) {
		super(action, dataObj)
		this.confirm = confirm
	}
}

export class TokenAppDoDetailConfirm {
	buttonConfirmLabel: string
	msg: string
	title: string
	constructor(title: string, msg: string, buttonConfirmLabel: string) {
		this.buttonConfirmLabel = buttonConfirmLabel
		this.msg = msg
		this.title = title
	}
}

export class TokenAppDoList extends TokenAppDo {
	rowNbr: number
	constructor(action: TokenAppDoAction, dataObj: DataObj, rowNbr: number) {
		super(action, dataObj)
		this.rowNbr = rowNbr
	}
}

export class TokenAppDoName extends TokenApp {
	dataObjName: string
	constructor(dataObjName: string) {
		super()
		this.dataObjName = dataObjName
	}
}

export class TokenAppRow extends TokenApp {
	rowAction: AppRowActionType
	constructor(rowAction: AppRowActionType) {
		super()
		this.rowAction = rowAction
	}
}
export class TokenAppTab extends TokenApp {
	tabIdx: number
	constructor(tabIdx: number) {
		super()
		this.tabIdx = tabIdx
	}
}
export class TokenAppTreeNodeId extends TokenApp {
	nodeId: string
	constructor(nodeId: string) {
		super()
		this.nodeId = nodeId
	}
}
export class TokenAppTreeNode extends TokenApp {
	node: Node
	constructor(node: Node) {
		super()
		this.node = node
	}
}
export class TokenAppTreeReset extends TokenApp {
	constructor() {
		super()
	}
}

export class TokenAppTreeSetParent extends TokenApp {
	constructor() {
		super()
	}
}
