import { memberOfEnum, strRequired, valueOrDefault } from '$lib/utils/utils'
import { NavParms, NavTreeNode, Table } from '$comps/types'
import type Messenger from '$comps/Messenger.svelte'

export class DataObj {
	cardinality: DataObjCardinality
	component: DataObjComponent
	data: any
	defn: any
	isInsertMode: boolean | undefined
	saveCallbacks: Array<DataObjCallback> = []
	table: Table | undefined

	constructor(defn: any) {
		defn = valueOrDefault(defn, {})
		this.cardinality = memberOfEnum(
			defn._codeCardinality,
			'DataObj',
			'cardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.component = memberOfEnum(
			defn._codeComponent,
			'DataObj',
			'component',
			'DataObjComponent',
			DataObjComponent
		)
		this.defn = defn
		if (this.defn._table) this.table = new Table(this.defn._table)
	}
	get objData() {
		return new NavParms()
	}
	set objData(parms: NavParms) {}

	print() {
		alert('Print functionality for this object has not yet been implemented.')
	}

	saveCallbackAdd(field: string, callbacks: any) {
		const idx = this.saveCallbacks.findIndex((c) => {
			return c.field === field
		})
		if (idx >= 0) {
			this.saveCallbacks[idx].callbacks = callbacks
		} else {
			this.saveCallbacks.push({ field, callbacks })
		}
	}
	async saveCallbackExecute() {
		if (this.saveCallbacks) {
			for (let i = 0; i < this.saveCallbacks.length; i++) {
				if (Array.isArray(this.saveCallbacks[i].callbacks)) {
					this.saveCallbacks[i].callbacks.forEach((c: Function) => c())
				} else {
					await this.saveCallbacks[i].callbacks()
				}
			}
		}
	}
	saveCallbackReset() {
		this.saveCallbacks = []
	}
	validate() {}
}

type DataObjCallback = {
	field: string
	callbacks: any
}

export class DataObjActionParms {
	action: string
	objType: string
	obj: DataObj
	status: DataObjStatus
	messenger: Messenger

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.action = strRequired(obj.action, 'DataObjActionParms', 'action')
		this.objType = strRequired(obj.objType, 'DataObjActionParms', 'objType')
		this.obj = obj.obj
		this.status = obj.status
		this.messenger = obj.messenger
	}
}

export class DataObjActionParmsNode extends DataObjActionParms {
	navNode: NavTreeNode
	constructor(obj: any) {
		super(obj)
		this.navNode = obj.navNode
	}
}

export class DataObjStatus {
	isInsertMode: boolean = false
	listRowsCurrent: number = -1
	listRowsTotal: number = -1
	objHasChanged: boolean = false
	objValidToSave: boolean = true

	constructor() {
		this.reset()
	}

	reset() {
		this.isInsertMode = false
		this.listRowsCurrent = -1
		this.listRowsTotal = -1
		this.objHasChanged = false
		this.objValidToSave = true
	}

	setList(rowsCurrent: number, rowsTotal: number) {
		this.listRowsCurrent = rowsCurrent
		this.listRowsTotal = rowsTotal
	}
	setObjChanged(status: boolean) {
		this.objHasChanged = status
	}
	setObjValid(status: boolean) {
		this.objValidToSave = status
	}
	setInsertMode(mode: boolean) {
		this.isInsertMode = mode
	}
}

export enum DataObjProcessType {
	delete = 'delete',
	preset = 'preset',
	saveInsert = 'saveInsert',
	saveUpdate = 'saveUpdate',
	select = 'select'
}
export enum DataObjCardinality {
	list = 'list',
	detail = 'detail'
}
export enum DataObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail'
}
export enum DataObjRowChange {
	first = 'first',
	left = 'left',
	right = 'right',
	last = 'last'
}
