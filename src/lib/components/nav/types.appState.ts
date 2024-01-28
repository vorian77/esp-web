import { AppRowActionType } from '$comps/nav/types.app'
import { DataObj, initNavTree, Node, NodeType, User, userInit, valueOrDefault } from '$comps/types'
import { SurfaceType, Token } from '$comps/types.master'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.appState.ts'

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
	user: User | undefined = undefined
	constructor(
		updateFunction: Function,
		drawer: any,
		modal: any,
		toast: any,
		user: User | undefined = undefined
	) {
		this.updateFunction = updateFunction
		this.messageDrawer = drawer
		this.messageModal = modal
		this.messageToast = toast
		this.user = user
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
	async resetUser(loadHome: boolean) {
		if (this.user) {
			const user = await userInit(this.user.id)
			await initNavTree(this.user)
			if (loadHome) {
				this.update({
					page: '/home',
					nodeType: NodeType.home,
					packet: this.packet
				})
			}
		}
	}
	statusReset() {
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
	checkObjChanged: boolean = true
	component: StatePacketComponent
	token?: Token
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
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
	recordId: string
	constructor(action: TokenAppDoAction, dataObj: DataObj, recordId: string) {
		super(action, dataObj)
		this.recordId = recordId
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
