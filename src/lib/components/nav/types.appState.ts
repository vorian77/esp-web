import { required, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import { initNavTree, NodeType, User, userInit } from '$comps/types'
import { SurfaceType } from '$comps/types.master'
import {
	Token,
	TokenApiDbDataObj,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$comps/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.appState.ts'

export class State {
	messageDrawer: any
	messageModal: any
	messageToast: any
	nodeType: NodeType = NodeType.home
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	overlay?: StateOverlay
	packet: StatePacket | undefined
	page: string = '/home'
	surface: SurfaceType = SurfaceType.default
	updateFunction: Function | undefined
	user: User | undefined = undefined
	constructor(
		updateFunction: Function | undefined,
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

	static initOverlay(drawer: any, modal: any, toast: any, overlay: StateOverlay) {
		let state: State = new State(undefined, drawer, modal, toast)

		state.nodeType = NodeType.object
		state.overlay = overlay
		state.packet = new StatePacket({
			component: StatePacketComponent.navApp,
			token: new TokenApiQuery(
				overlay.queryType,
				new TokenApiDbDataObj({ dataObjName: overlay.dataObjName }),
				new TokenApiQueryData(overlay.data)
			)
		})
		state.page = '/'
		state.surface = SurfaceType.overlay

		return state
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
			this.user = await userInit(this.user.id)
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
		this.objHasChanged = false
		this.objValidToSave = true
	}
	set(packet: StatePacket) {
		this.packet = packet
	}
	update(obj: any) {
		if (this.updateFunction) this.updateFunction(obj)
	}
	updateProperties(obj: any) {
		if (Object.hasOwn(obj, 'nodeType')) this.nodeType = obj.nodeType
		if (Object.hasOwn(obj, 'page')) this.page = obj.page
		if (Object.hasOwn(obj, 'surface')) this.surface = obj.surface
		return this
	}
}

export class StateOverlay {
	data: TokenApiDbDataObj
	dataObjName: string
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'StateOverlay'
		this.data = new TokenApiDbDataObj(required(obj.data, clazz, 'data'))
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObj')
		this.queryType = required(obj.queryType, clazz, 'queryType')
	}
}

export class StateOverlayModal extends StateOverlay {
	btnLabelComplete?: string
	recordSubmitted: Record<string, any> = {}
	constructor(obj: any) {
		const clazz = 'StateOverlayModal'
		super(obj)
		this.btnLabelComplete = strOptional(obj.btnLabelComplete, clazz, 'btnLabelComplete')
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
