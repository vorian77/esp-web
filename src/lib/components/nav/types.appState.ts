import { booleanOrFalse, required, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import {
	DataObjAction,
	DataObjData,
	initNavTree,
	memberOfEnum,
	NodeType,
	User,
	userInit
} from '$comps/types'
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
	layout: StateLayout
	modalStore: any
	nodeType: NodeType = NodeType.home
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	packet: StatePacket | undefined
	page: string = '/home'
	programId?: string
	toastStore: any
	updateFunction?: Function
	user: User | undefined = undefined

	constructor(obj: any) {
		const clazz = 'State'
		this.layout = required(obj.layout, clazz, 'layout')

		if (Object.hasOwn(obj, 'drawerStore')) this.drawerStore = obj.drawerStore
		if (Object.hasOwn(obj, 'modalStore')) this.modalStore = obj.modalStore
		if (Object.hasOwn(obj, 'toastStore')) this.toastStore = obj.toastStore
		if (Object.hasOwn(obj, 'updateFunction')) this.updateFunction = obj.updateFunction
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
		return this
	}
}

export class StateLayout {
	layoutType: StateLayoutType
	surfaceType: StateSurfaceType
	headerDialog?: string
	footerActionGroup?: Array<DataObjAction>
	footerCompleteButtonLabel?: string
	constructor(obj: any) {
		const clazz = 'StateLayout'
		this.layoutType = memberOfEnum(
			obj.layoutType,
			clazz,
			'layoutType',
			'StateLayoutType',
			StateLayoutType
		)
		this.surfaceType = memberOfEnum(
			obj.surfaceType,
			clazz,
			'surfaceType',
			'surfaceType',
			StateSurfaceType
		)
		this.headerDialog = strOptional(obj.headerDialog, clazz, 'headerDialog')
		this.footerActionGroup = obj.footerActionGroup ? obj.footerActionGroup : undefined
		this.footerCompleteButtonLabel = strOptional(
			obj.footerCompleteButtonLabel,
			clazz,
			'footerCompleteButtonLabel'
		)
	}
}

export enum StateLayoutType {
	LayoutObj = 'LayoutObj',
	LayoutObjTab = 'LayoutObjTab',
	LayoutObjWizard = 'LayoutObjWizard'
}

export class StateObj extends State {
	dataObjData?: DataObjData
	dataObjName: string
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'StateObj'
		super(obj)
		this.dataObjData = valueOrDefault(obj.dataObjData, undefined)
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObj')
		this.queryType = required(obj.queryType, clazz, 'queryType')

		this.nodeType = NodeType.object
		this.packet = new StatePacket({
			component: StatePacketComponent.query,
			token: new TokenApiQuery(
				this.queryType,
				new TokenApiDbDataObj({ dataObjName: this.dataObjName }),
				new TokenApiQueryData({ dataObjData: this.dataObjData })
			)
		})
		this.page = obj.page ? obj.page : this.page
	}
}

export class StateObjModal extends StateObj {
	btnLabelComplete?: string
	isBtnDelete: boolean
	isMultiSelect: boolean = false
	records: StateObjModalRecords = []
	constructor(obj: any) {
		const clazz = 'StateObjSelect'
		super(obj)
		this.btnLabelComplete = strOptional(obj.btnLabelComplete, clazz, 'btnLabelComplete')
		this.isBtnDelete = booleanOrFalse(obj.isBtnDelete, 'isBtnDelete')
		this.isMultiSelect = booleanOrFalse(obj.isMultiSelect, 'isMultiSelect')
	}
	setRecords(records: Array<Record<string, any>>) {
		this.records = records
	}
}

export type StateObjModalRecords = Array<Record<string, any>>

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
	query = 'query',
	navApp = 'navApp',
	navTree = 'navTree'
}
export enum StateSurfaceType {
	embedded = 'embedded',
	overlay = 'overlay',
	page = 'page'
}
