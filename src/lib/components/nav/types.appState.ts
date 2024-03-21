import { booleanOrFalse, required, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import {
	DataObjAction,
	DataObjActionConfirm,
	DataObjData,
	type DataObjRecord,
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
	TokenApiQueryType,
	TokenAppDialog,
	TokenAppDoDetail
} from '$comps/types.token'
import { getModalStore, type DrawerSettings, type ModalSettings } from '@skeletonlabs/skeleton'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/types.appState.ts'

export class State {
	drawerStore: any
	layout: StateLayout
	modalStore: any
	nodeType: NodeType = NodeType.home
	objHasChanged: boolean = false
	objValidToSave: boolean = true
	onRowClick: Function = (rows: any, record: any) => {}
	packet: StatePacket | undefined
	page: string = '/home'
	toastStore: any
	updateCallback?: Function
	updateFunction: Function = stateUpdateDataObj
	user: User | undefined = undefined

	constructor(obj: any) {
		const clazz = 'State'
		this.layout = required(obj.layout, clazz, 'layout')

		if (Object.hasOwn(obj, 'drawerStore')) this.drawerStore = obj.drawerStore
		if (Object.hasOwn(obj, 'modalStore')) this.modalStore = obj.modalStore
		if (Object.hasOwn(obj, 'onRowClick')) this.onRowClick = obj.onRowClick
		if (Object.hasOwn(obj, 'toastStore')) this.toastStore = obj.toastStore
		if (Object.hasOwn(obj, 'updateCallback')) this.updateCallback = obj.updateCallback
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
	setUpdateCallback(updateCallback: Function) {
		this.updateCallback = updateCallback
	}
	update(obj: any) {
		if (this.updateFunction) this.updateFunction(this, obj, this.updateCallback)
	}
	updateProperties(obj: any) {
		if (Object.hasOwn(obj, 'nodeType')) this.nodeType = obj.nodeType
		if (Object.hasOwn(obj, 'onRowClick')) this.onRowClick = obj.onRowClick
		if (Object.hasOwn(obj, 'page')) this.page = obj.page
		return this
	}
}

export class StateLayout {
	footerActionGroup?: Array<DataObjAction>
	footerCompleteButtonLabel?: string
	headerDialog?: string
	isEmbedHeight: boolean = false
	surfaceStyle: StateSurfaceStyle
	surfaceType: StateSurfaceType
	constructor(obj: any) {
		const clazz = 'StateLayout'
		this.footerActionGroup = obj.footerActionGroup ? obj.footerActionGroup : undefined
		this.footerCompleteButtonLabel = strOptional(
			obj.footerCompleteButtonLabel,
			clazz,
			'footerCompleteButtonLabel'
		)
		this.headerDialog = strOptional(obj.headerDialog, clazz, 'headerDialog')
		this.isEmbedHeight = booleanOrFalse(obj.isEmbedHeight, 'isEmbedHeight')
		this.surfaceStyle = memberOfEnum(
			obj.surfaceStyle,
			clazz,
			'surfaceStyle',
			'StateSurfaceStyle',
			StateSurfaceStyle
		)
		this.surfaceType = memberOfEnum(
			obj.surfaceType,
			clazz,
			'surfaceType',
			'StateSurfaceType',
			StateSurfaceType
		)
	}
}

export class StateObj extends State {
	data: DataObjData
	constructor(obj: any) {
		const clazz = 'StateObj'
		super(obj)
		console.log('StateObj', obj)
		this.data = new DataObjData(obj.cardinality)
		if (Object.hasOwn(obj, 'parms')) this.data.parms = obj.parms
	}
}

export class StateObjDataObj extends StateObj {
	dataObjName: string
	queryType: TokenApiQueryType
	constructor(obj: any) {
		const clazz = 'StateObjDataObj'
		super(obj)
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObj')
		this.queryType = required(obj.queryType, clazz, 'queryType')

		this.nodeType = NodeType.object
		this.packet = new StatePacket({
			component: StatePacketComponent.query,
			token: new TokenApiQuery(
				this.queryType,
				new TokenApiDbDataObj({ dataObjName: this.dataObjName }),
				new TokenApiQueryData({ dataObjData: this.data })
			)
		})
		this.page = obj.page ? obj.page : this.page
	}
}

export class StateObjDialog extends StateObj {
	actionsFieldDialog: Array<DataObjAction> = []
	btnLabelComplete?: string
	isBtnDelete: boolean
	isMultiSelect: boolean = false
	constructor(obj: any) {
		const clazz = 'StateObjDialog'
		super(obj)
		this.actionsFieldDialog = obj.actionsFieldDialog ? obj.actionsFieldDialog : []
		this.btnLabelComplete = strOptional(obj.btnLabelComplete, clazz, 'btnLabelComplete')
		this.isBtnDelete = booleanOrFalse(obj.isBtnDelete, 'isBtnDelete')
		this.isMultiSelect = booleanOrFalse(obj.isMultiSelect, 'isMultiSelect')
		this.packet = new StatePacket({
			component: StatePacketComponent.navApp,
			token: new TokenAppDialog(obj)
		})
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
	query = 'query',
	navApp = 'navApp',
	navTree = 'navTree'
}
export enum StateSurfaceStyle {
	drawer = 'drawer',
	embedded = 'embedded',
	dialogDetail = 'dialogDetail',
	dialogSelect = 'dialogSelect',
	dialogWizard = 'dialogWizard',
	page = 'page'
}
export enum StateSurfaceType {
	DataObjLayout = 'DataObjLayout',
	DataObjLayoutTab = 'DataObjLayoutTab',
	DataObjLayoutDialogDetail = 'DataObjLayoutDialogDetail'
}

export async function stateUpdateDataObj(
	state: State,
	obj: any,
	callback: Function | undefined = undefined
) {
	obj = valueOrDefault(obj, {})
	const checkObjChanged = obj?.packet?.checkObjChanged || false

	let confirm: DataObjActionConfirm | undefined = undefined

	if (obj?.packet?.token instanceof TokenAppDoDetail && obj?.packet?.token.confirm) {
		confirm = obj.packet.token.confirm
		delete obj.packet.token.confirm
	}

	if ((checkObjChanged && state?.objHasChanged) || confirm) {
		confirm = confirm
			? confirm
			: DataObjActionConfirm.new(
					'Discard Changes',
					'Are you sure you want to discard your changes?',
					'Discard Changes'
				)
		await askB4Transition(state, obj, confirm, stateUpdateDataObj, callback)
		// await askDrawer(state)
	} else {
		if (callback) await callback(obj)
	}
}

async function askB4Transition(
	state: State,
	obj: any,
	confirmConfig: DataObjActionConfirm,
	updateFunction: Function,
	updateCallback?: Function
) {
	if (state instanceof StateObjDialog) {
		if (confirm(confirmConfig.message)) {
			state.statusReset()
			updateFunction(state, obj, updateCallback)
		}
	} else {
		const modal: ModalSettings = {
			type: 'confirm',
			title: confirmConfig.title,
			body: confirmConfig.message,
			buttonTextCancel: 'Keep Editing',
			buttonTextConfirm: confirmConfig.buttonLabel,
			response: async (r: boolean) => {
				if (r) {
					state.statusReset()
					updateFunction(state, obj, updateCallback)
				}
			}
		}

		return state.modalStore.trigger(modal)
	}
}
