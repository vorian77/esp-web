import {
	type DataObjRaw,
	getUser,
	memberOfEnum,
	NavRowActionType,
	NodeNav,
	QueryParmAction,
	QueryParmDataRow,
	User,
	valueOrDefault
} from '$comps/types'
import type { Query } from 'pg'

export class NavState {
	callbacks: Array<Function> | undefined
	checkObjChanged: boolean
	component: NavStateComponent
	page: 'home' | 'app'
	token: NavStateToken | undefined
	user: User | undefined = getUser()
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.callbacks = obj.callbacks ? obj.callbacks : []
		this.checkObjChanged = obj.hasOwnProperty('checkObjChanged') ? obj.checkObjChanged : true
		this.component = NavStateComponent[obj.component as keyof typeof NavStateComponent]
		this.page = obj.page ? obj.page : 'app'
		this.token = obj.token ? obj.token : undefined
	}
}
export enum NavStateComponent {
	back = 'back',
	crumbs = 'crumbs',
	footer = 'footer',
	objAction = 'objAction',
	page = 'page',
	row = 'row',
	tab = 'tab',
	tree = 'tree'
}
export class NavStateToken {
	constructor() {}
}
export class NavStateTokenApp extends NavStateToken {
	constructor() {
		super()
	}
}
export class NavStateTokenAppCrumbs extends NavStateTokenApp {
	crumbIdx: number
	constructor(crumbIdx: number) {
		super()
		this.crumbIdx = crumbIdx
	}
}
export class NavStateTokenAppObjAction extends NavStateTokenApp {
	actionType: NavStateTokenActionType
	confirm: NavStateTokenAppObjActionConfirm | undefined
	dataObjData: Array<QueryParmDataRow> | undefined
	dataObjRaw: DataObjRaw | undefined
	dbProcess: boolean
	constructor(obj: any) {
		super()
		this.actionType = memberOfEnum(
			obj.actionType,
			'NavStateTokenAppObjAction',
			'actionType',
			'NavStateTokenActionType',
			NavStateTokenActionType
		)
		this.confirm = obj.confirm ? obj.confirm : undefined
		this.dataObjData = obj.hasOwnProperty('dataObjData') ? obj.dataObjData : undefined
		this.dataObjRaw = obj.hasOwnProperty('dataObjRaw') ? obj.dataObjRaw : undefined
		this.dbProcess = obj.hasOwnProperty('dbProcess') ? obj.dbProcess : true
	}
}
export class NavStateTokenAppObjActionConfirm {
	buttonConfirmLabel: string
	msg: string
	title: string
	constructor(title: string, msg: string, buttonConfirmLabel: string) {
		this.buttonConfirmLabel = buttonConfirmLabel
		this.msg = msg
		this.title = title
	}
}
export class NavStateTokenAppRow extends NavStateTokenApp {
	rowAction: NavRowActionType
	constructor(rowAction: NavRowActionType) {
		super()
		this.rowAction = rowAction
	}
}
export class NavStateTokenAppTab extends NavStateTokenApp {
	tabIdx: number
	constructor(tabIdx: number) {
		super()
		this.tabIdx = tabIdx
	}
}
export class NavStateTokenAppTree extends NavStateTokenApp {
	node: NodeNav
	constructor(node: NodeNav) {
		super()
		this.node = node
	}
}

export enum NavStateTokenActionType {
	back = 'back',
	listEdit = 'listEdit',
	listNew = 'listNew',
	detailDelete = 'detailDelete',
	detailNew = 'detailNew',
	detailSaveInsert = 'detailSaveInsert',
	detailSaveUpdate = 'detailSaveUpdate',
	none = 'none'
}
