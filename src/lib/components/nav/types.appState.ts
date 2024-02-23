import { OverlayFieldChips, OverlayRecord } from '$comps/Overlay/types.overlay'
import { DataObj, initNavTree, Node, NodeType, User, userInit, valueOrDefault } from '$comps/types'
import { SurfaceType } from '$comps/types.master'
import { Token } from '$comps/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.appState.ts'

export class State {
	messageDrawer: any
	messageModal: any
	messageToast: any
	nodeType: NodeType = NodeType.home
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	overlayFieldChips?: OverlayFieldChips
	overlayRecord?: OverlayRecord
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
