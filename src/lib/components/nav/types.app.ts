import {
	DataObj,
	DataObjData,
	getUser,
	NodeApp,
	NodeNav,
	NodeType,
	ResponseBody,
	User,
	valueOrDefault
} from '$comps/types'
import type { DataObjRaw, RawNode } from '$comps/types'
import {
	apiFetch,
	ApiFunction,
	TokenApiDbDataObj,
	TokenApiQueryType,
	TokenApiQuery,
	TokenApiQueryData
} from '$lib/api'
import { SurfaceType, Token } from '$comps/types.master'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.app.ts'

export class App {
	crumbs: Array<any> = []
	levels: Array<AppLevel> = []
	private constructor(newLevel: AppLevel) {
		this.levels.push(newLevel)
	}
	static async initDataObj(token: TokenApiQuery) {
		return new App(await AppLevel.initDataObj(token))
	}
	static async initNode(node: NodeNav) {
		return new App(await AppLevel.initNode(NodeApp.initTree(node)))
	}
	async addLevel(queryType: TokenApiQueryType) {
		const newLevelIdx = this.levels.length
		const newLevel = await AppLevel.add(newLevelIdx, this.getCurrLevel().getCurrTab())
		if (newLevel) {
			this.levels.push(newLevel)
			await AppLevelTab.query(this.getCurrTab(), queryType, this)
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
	async setRowAction(rowAction: AppRowActionType) {
		if (this.levels.length > 1) {
			this.getCurrTabParent().setCurrRowByAction(rowAction)
			this.getCurrLevel().resetTabs()
			await AppLevelTab.query(this.getCurrTab(), TokenApiQueryType.retrieve, this)
		}
	}
	async updateTab(token: TokenAppDoDetail, queryType: TokenApiQueryType) {
		this.getCurrLevel().resetTabs()

		const currTab = this.getCurrTab()
		currTab.data = token.dataObj.objData
		if (!(await AppLevelTab.query(currTab, queryType, this))) return false

		if (this.levels.length > 1) await this.getCurrTabParent().updateParentList(currTab, this)
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
	static async initDataObj(token: TokenApiQuery) {
		const newLevel = new AppLevel([await AppLevelTab.initDataObj(token)])
		await AppLevelTab.query(newLevel.getCurrTab(), token.queryType)
		return newLevel
	}
	static async initNode(node: NodeApp) {
		const newLevel = new AppLevel([AppLevelTab.initNode(0, 0, node)])
		await AppLevelTab.query(newLevel.getCurrTab(), TokenApiQueryType.retrieve)
		return newLevel
	}
	static async add(newLevelIdx: number, currTab: AppLevelTab) {
		const tabs: Array<AppLevelTab> = []

		const rawNodes: {
			root: Array<RawNode>
			children: Array<RawNode>
		} = await getNodesLevel(currTab.nodeId)

		if (rawNodes.root.length === 1) {
			// add root
			tabs.push(AppLevelTab.initNode(newLevelIdx, 0, NodeApp.initDb(rawNodes.root[0])))

			// add children
			rawNodes.children.forEach(async (rawNode, idx) => {
				tabs.push(AppLevelTab.initNode(newLevelIdx, idx + 1, NodeApp.initDb(rawNode)))
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
	private constructor(
		levelIdx: number,
		idx: number,
		dataObjId: string,
		label: string = '',
		nodeId: string = ''
	) {
		this.idx = idx
		this.label = label
		this.levelIdx = levelIdx
		this.nodeId = nodeId
		this.dataObjId = dataObjId
	}
	static async initDataObj(token: TokenApiQuery) {
		const result: ResponseBody = await apiFetch(ApiFunction.dbEdgeGetDataObjId, token)
		console.log('AppLevelTab.initDataObj:', { token, result })
		if (result.success) {
			let dataObjId = result.data.id
			const tab = new AppLevelTab(0, 0, dataObjId)
			console.log('AppLevelTab.initDataObj:', { token, dataObjId, tab })
			return tab
		} else {
			error(500, {
            				file: FILENAME,
            				function: 'initDataObj',
            				message: `Error retrieving dataObj: ${token.dataObj.dataObjName}`
            			});
		}
	}
	static initNode(levelIdx: number, idx: number, node: NodeApp) {
		return new AppLevelTab(levelIdx, idx, node.dataObjId, node.label, node.id)
	}

	static async query(
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
				return

			case TokenApiQueryType.retrieve:
				if (tab.isRetrieved) return

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
                				});
		}

		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessQuery,
			new TokenApiQuery(
				queryType,
				new TokenApiDbDataObj({ dataObjId: tab.dataObjId, dataObjRaw: tab.dataObjRaw }),
				new TokenApiQueryData({ record })
			)
		)

		if (result.success) {
			// execute callbacks
			tab.data?.callbacks.forEach(async (c) => await c.callback())

			// update tab
			tab.data = result.data.dataObjData
			tab.dataObj = new DataObj(result.data.dataObjRaw)
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

	getCrumbLabelId() {
		let id = ''
		const crumbFieldNames: Array<string> = this.dataObj?.crumbs ? this.dataObj.crumbs : []
		if (crumbFieldNames.length > 0 && this.currRow !== undefined && this.currRow > -1) {
			const dataRow = this.getData() || {}
			crumbFieldNames.forEach((f) => {
				if (dataRow.hasOwnProperty(f)) {
					if (id) id += ' '
					id += dataRow[f].hasOwnProperty('display') ? dataRow[f].display : dataRow[f]
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
                				});
		}
		this.currRow = newRow
	}
	setCurrRowByNum(rowNum: number) {
		this.currRow = rowNum
	}
	async updateParentList(currTab: AppLevelTab, app: App) {
		this.reset()
		await AppLevelTab.query(this, TokenApiQueryType.retrieve, app)

		// set parent list curr row
		let rowIdx = -1
		if (this.data && currTab.data?.dataObjRow?.hasOwnProperty('record')) {
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

export class State {
	nodeType: NodeType = NodeType.home
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	packet: StatePacket | undefined
	page: string = '/home'
	surface: SurfaceType = SurfaceType.default
	updateFunction: Function
	user: User | undefined = getUser()
	constructor(updateFunction: Function) {
		this.updateFunction = updateFunction
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
	resetStatus() {
		this.updateFunction({ objHasChanged: false, objValidToSave: true })
	}
	set(packet: StatePacket) {
		this.packet = packet
	}
	update(obj: any) {
		this.updateFunction(obj)
	}
	updateProperties(obj: any) {
		if (obj.hasOwnProperty('nodeType')) this.nodeType = obj.nodeType
		if (obj.hasOwnProperty('objHasChanged')) this.objHasChanged = obj.objHasChanged
		if (obj.hasOwnProperty('objValidToSave')) this.objValidToSave = obj.objValidToSave
		if (obj.hasOwnProperty('page')) this.page = obj.page
		if (obj.hasOwnProperty('surface')) this.surface = obj.surface
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
		this.checkObjChanged = obj.hasOwnProperty('checkObjChanged') ? obj.checkObjChanged : true
		this.component = obj.hasOwnProperty('component') ? obj.component : undefined
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
        		});
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
	node: NodeNav
	constructor(node: NodeNav) {
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
