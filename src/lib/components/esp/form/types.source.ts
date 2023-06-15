import {
	arrayOfEnums,
	booleanOrFalse,
	getArray,
	getArrayOfModels,
	memberOfEnum,
	memberOfEnumOrDefault,
	strOptional,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import type { V } from 'drizzle-orm/column.d-66a08b85'

const FILENAME = '$comps/esp/form/types.source.ts'

export class FormSource {
	processLocally: boolean
	actionsMap: Record<FormSourceDBAction, number> = {
		delete: -1,
		insert: -1,
		select: -1,
		update: -1,
		upsert: -1
	}
	actions: Array<FormSourceActionAPI | FormSourceActionDirect> = []

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.processLocally = booleanOrFalse(obj.processLocally, 'FormSource.processLocally')

		// apis
		if (obj.apis) {
			this.actions = getArrayOfModels(FormSourceActionAPI, obj.apis)
			this.actions.forEach((a, i) => {
				this.actionsMap[a.dbAction] = i
			})
		}

		// db
		if (obj.directs) {
			const directs = getArrayOfModels(FormSourceActionDirect, obj.directs)
			directs.forEach((d) => {
				const i = this.actions.push(d)
				d.dbActions.forEach((action) => {
					this.actionsMap[action] = i - 1
				})
			})
		}
	}
}

export class FormSourceAction {
	target: FormSourceTarget
	type: FormSourceActionType
	items: Array<FormSourceItem>
	msgSuccess?: string
	msgFail?: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.target = memberOfEnum(
			obj.target,
			'FormSourceAction',
			'target',
			'FormSourceTarget',
			FormSourceTarget
		)
		this.type = this.type = memberOfEnum(
			obj.type,
			'FormSourceAction',
			'type',
			'FormSourceActionType',
			FormSourceActionType
		)
		this.items = getArrayOfModels(FormSourceItem, obj.items)
		this.msgSuccess = strOptional(obj.msgSuccess, 'FormSourceAction', 'msgSuccess')
		this.msgFail = strOptional(obj.msgFail, 'FormSourceAction', 'msgFail')
	}
}

export class FormSourceActionAPI extends FormSourceAction implements FormSourceAction {
	method: HTMLMETHOD
	url: string
	dbAction: FormSourceDBAction

	constructor(obj: any) {
		super(obj)

		obj = valueOrDefault(obj, {})
		this.method = memberOfEnum(
			obj.method,
			'FormSourceActionAPI',
			'method',
			'HTMLMETHOD',
			HTMLMETHOD
		)
		this.url = strRequired(obj.url, 'FormSourceActionAPI', 'url')
		this.dbAction = memberOfEnum(
			obj.dbAction,
			'FormSourceActionAPI',
			'dbAction',
			'FormSourceDBAction',
			FormSourceDBAction
		)
	}
}

export class FormSourceActionDirect extends FormSourceAction implements FormSourceAction {
	dbActions: Array<FormSourceDBAction>
	statement?: string
	singleTable?: string

	constructor(obj: any) {
		super(obj)

		obj = valueOrDefault(obj, {})
		this.dbActions = arrayOfEnums(
			obj.dbActions,
			'FormSourceActionDirect',
			'dbActions',
			'FormSourceDBAction',
			FormSourceDBAction
		)
		this.statement = strOptional(obj.statement, 'FormSourceActionDirect', 'statement')
		this.singleTable = strOptional(obj.singleTable, 'FormSourceActionDirect', 'singleTable')
	}
}

export class FormSourceItem {
	dbName: string
	fieldName?: string
	source: FormSourceItemSource
	sourceKey: string
	dbDataType: FormSourceItemDataType
	dbAllowNull: boolean
	dbPk: boolean
	dbIdentity: boolean
	dbInsert: boolean
	dbUpdate: boolean
	dbArg?: string
	value?: any

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.dbName = strRequired(obj.dbName, 'FormSourceItem', 'name')
		this.fieldName = strOptional(obj.fieldName, 'FormSourceItem', 'fieldName')
		this.source = memberOfEnumOrDefault(
			obj.source,
			'FormSourceItem',
			'source',
			'FormSourceItemSource',
			FormSourceItemSource,
			FormSourceItemSource.form
		)
		this.sourceKey = valueOrDefault(obj.sourceKey, this.dbName)
		this.dbDataType = memberOfEnum(
			obj.dbDataType,
			'FormSourceItem',
			'dbDataType',
			'FormSourceItemDataType',
			FormSourceItemDataType
		)
		this.dbAllowNull = booleanOrFalse(obj.dbAllowNull, 'FormSourceItem.dbAllowNull')
		this.dbPk = booleanOrFalse(obj.dbPk, 'FormSourceItem.dbPk')
		this.dbIdentity = booleanOrFalse(obj.dbIdentity, 'FormSourceItem.dbIdentity')
		this.dbInsert = booleanOrFalse(obj.dbInsert, 'FormSourceItem.dbInsert')
		this.dbUpdate = booleanOrFalse(obj.dbUpdate, 'FormSourceItem.dbUpdate')
		this.dbArg = valueOrDefault(obj.dbNameArg, '')
	}
}

export function FormSourceResponse(sourceData: any) {
	const response = {
		success: true,
		type: 'unknown',
		message: '',
		data: sourceData
	}

	if (Array.isArray(sourceData)) {
		response.type = 'array'
	} else if (typeof sourceData == 'object') {
		response.type = 'object'
		if (sourceData.hasOwnProperty('success')) {
			response.success = sourceData.success
			delete sourceData.success
		}
		if (sourceData.hasOwnProperty('message')) {
			response.message = sourceData.message
			delete sourceData.message
		}
		response.data = sourceData
	}
	return new Response(JSON.stringify(response))
}
export type FormSourceResponseType = {
	success: boolean
	message: string
	data: any
	type: 'array' | 'object' | 'unknown'
}

export enum FormSourceDBAction {
	delete = 'delete',
	insert = 'insert',
	select = 'select',
	update = 'update',
	upsert = 'upsert'
}
export enum FormSourceItemSource {
	env = 'env',
	data = 'data',
	form = 'form',
	literal = 'literal',
	subquery = 'subquery',
	system = 'system'
}
export enum FormSourceTarget {
	esp = 'esp'
}
export enum FormSourceActionType {
	api = 'api',
	direct = 'direct'
}
export enum FormSourceItemDataType {
	date = 'date',
	datetime = 'datetime',
	dec = 'dec',
	int = 'int',
	string = 'string'
}
export enum HTMLMETHOD {
	GET = 'GET',
	POST = 'POST'
}
