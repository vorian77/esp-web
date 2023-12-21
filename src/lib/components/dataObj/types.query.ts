import type { FieldValue } from '$comps/form/field'
import { getUser, required, strOptional, strRequired, valueOrDefault } from '$comps/types'
import type { AppObjActionType } from '$comps/nav/types.app'
import { DataObj, DataObjProcessType } from '$comps/types'
import type { DataObjRaw } from '$comps/types'

export type DataObjData = Array<QueryParmDataRow>

export type DataRowRecord = Record<string, FieldValue>

export enum DataRowStatus {
	created = 'created',
	deleted = 'deleted',
	notSelected = 'notSelected',
	retrieved = 'retrieved',
	selected = 'selected',
	unknown = 'unknown',
	updated = 'updated'
}

export class QueryParm {
	action: QueryParmAction
	actionType: AppObjActionType
	data: QueryParmData
	dataObjId: string | undefined
	dataObjRaw: DataObjRaw | undefined
	constructor(
		dataObj: { dataObjId: string | undefined; dataObjRaw: DataObjRaw | undefined },
		action: QueryParmAction,
		actionType: AppObjActionType,
		data: QueryParmData
	) {
		this.action = action
		this.actionType = actionType
		this.data = data
		this.dataObjId = dataObj.dataObjId
		this.dataObjRaw = dataObj.dataObjRaw
		required(this.dataObjId || this.dataObjRaw, 'QueryParm', 'dataObjId or dataObjRaw')
	}
}
export enum QueryParmAction {
	processAction = 'processAction',
	retrieve = 'retrieve'
}

export class QueryParmData {
	object: Array<QueryParmDataRow>
	parms: QueryParmDataValue
	preset: QueryParmDataValue
	retrieve: QueryParmDataValue
	system: QueryParmDataValue
	user: QueryParmDataValue
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.object = this.getData(data, 'object')
		this.parms = this.getData(data, 'parms')
		this.preset = this.getData(data, 'preset')
		this.retrieve = this.getData(data, 'retrieve')
		this.system = this.getData(data, 'system')
		this.user = valueOrDefault(getUser(), {})
	}
	getData(data: any, key: string) {
		return data.hasOwnProperty(key) && data !== undefined ? data[key] : {}
	}
}
export class QueryParmDataRow {
	record: DataRowRecord = {}
	status: DataRowStatus | undefined
	constructor(status: DataRowStatus, record: DataRowRecord) {
		this.record = record
		this.status = status
	}
}

export type QueryParmDataValue = Record<string, any>

export class QueryResult {
	dataObjData: any | undefined
	dataObjRaw: DataObjRaw | undefined
	message: string | undefined
	success: boolean | undefined
	constructor() {}
}
export class QueryResultFail extends QueryResult {
	constructor(message: string | undefined = undefined) {
		super()
		this.message = message
		this.success = false
	}
}
export class QueryResultSuccess extends QueryResult {
	constructor(dataObjRaw: DataObjRaw, dataObjData: any, message: string | undefined = undefined) {
		super()
		const clazz = 'QueryResultSuccess'
		this.message = message
		this.dataObjData = required(dataObjData, clazz, 'dataObjData')
		this.dataObjRaw = required(dataObjRaw, clazz, 'dataObjRaw')
		this.success = true
	}
}

export function setSelectedRecords(dataObjData: DataObjData, selectedRowIds: Array<number>) {
	dataObjData.forEach((row: QueryParmDataRow) => {
		row.status = selectedRowIds.includes(row.record.id.data)
			? DataRowStatus.selected
			: DataRowStatus.notSelected
	})
	return dataObjData
}
