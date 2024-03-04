import { booleanOrFalse, required, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import {
	DataObjCardinality,
	DataObjData,
	initNavTree,
	NodeType,
	User,
	userInit
} from '$comps/types'
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
	drawerStore: any
	modalStore: any
	nodeType: NodeType = NodeType.home
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	packet: StatePacket | undefined
	page: string = '/home'
	programId?: string
	surface: SurfaceType = SurfaceType.page
	toastStore: any
	updateFunction?: Function
	user: User | undefined = undefined

	constructor(obj: any) {
		if (Object.hasOwn(obj, 'updateFunction')) this.updateFunction = obj.updateFunction
		if (Object.hasOwn(obj, 'drawerStore')) this.drawerStore = obj.drawerStore
		if (Object.hasOwn(obj, 'modalStore')) this.modalStore = obj.modalStore
		if (Object.hasOwn(obj, 'toastStore')) this.toastStore = obj.toastStore
		if (Object.hasOwn(obj, 'user')) this.user = obj.user
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

export class StateObj extends State {
	dataObjData: DataObjData
	dataObjName: string
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'StateObj'
		super(obj)
		this.dataObjData = valueOrDefault(obj.dataObjData, new DataObjData(DataObjCardinality.detail))
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObj')
		this.queryType = required(obj.queryType, clazz, 'queryType')

		this.nodeType = NodeType.object
		this.packet = new StatePacket({
			component: StatePacketComponent.navApp,
			token: new TokenApiQuery(
				this.queryType,
				new TokenApiDbDataObj({ dataObjName: this.dataObjName }),
				new TokenApiQueryData({ dataObjData: this.dataObjData })
			)
		})
		this.page = obj.page ? obj.page : this.page
		this.surface = obj.surface ? obj.surface : this.surface
	}
}

export class StateObjSelect extends StateObj {
	btnLabelComplete?: string
	isMultiSelect: boolean = false
	recordSubmitted: Record<string, any> = {}
	selectedIds: Array<string> = []
	selectedRows: Array<Record<string, any>> = []
	constructor(obj: any) {
		const clazz = 'StateObjSelect'
		super(obj)
		this.btnLabelComplete = strOptional(obj.btnLabelComplete, clazz, 'btnLabelComplete')
		this.isMultiSelect = booleanOrFalse(obj.isMultiSelect, 'isMultiSelect')
		this.selectedIds = valueOrDefault(obj.selectedIds, [])
	}
	setSelected(selectedRows: Array<Record<string, any>>) {
		this.selectedRows = selectedRows
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
