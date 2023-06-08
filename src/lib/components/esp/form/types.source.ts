import {
	booleanOrFalse,
	getArrayOfModels,
	memberOfEnum,
	memberOfEnumOrDefault,
	nbrOptional,
	strOptional,
	strRequired,
	valueOrDefault
} from '$utils/utils'

const FILENAME = '$comps/esp/form/types.source.ts'

export class FormSource {
	processLocally: boolean
	actions: {} = {}

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.processLocally = booleanOrFalse(obj.processLocally, 'FormSource.processLocally')

		// apis
		const apis = obj.apis ? getArrayOfModels(FormSourceActionAPI, obj.apis) : undefined
		if (apis) {
			apis.forEach((api) => {
				this.actions[api.dbAction] = api
			})
		}

		// db
		const db = obj.db ? new FormSourceActionDB(obj.db) : undefined
		if (db) {
			console.log('types.source.ts...')
			console.log('db:', db)
			this.actions[FormSourceDBAction.select] = db
			if (this.db?.updateTable) {
				this.actions[FormSourceDBAction.update] = db
			}
			if (this.db?.elements.some((e) => e.identity)) {
				this.actions[FormSourceDBAction.delete] = db
			}
		}
	}
}

export class FormSourceAction {
	target: FormSourceTarget
	type: FormSourceType | undefined
	msgSuccess: string | undefined
	msgFail: string | undefined
	parms: Array<FormSourceParm>

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.target = memberOfEnum(obj.target, 'FormSourceAction.target', FormSourceTarget)
		this.msgSuccess = strOptional(obj.msgSuccess, 'FormSourceAction.msgSuccess')
		this.msgFail = strOptional(obj.msgFail, 'FormSourceAction.msgFail')
		this.parms = getArrayOfModels(FormSourceParm, obj.parms)
	}
}

export class FormSourceActionAPI extends FormSourceAction {
	method: HTMLMETHOD
	url: string
	dbAction: FormSourceDBAction

	constructor(obj: any) {
		super(obj)

		obj = valueOrDefault(obj, {})
		this.type = FormSourceType.api
		this.method = memberOfEnum(obj.method, 'FormSourceActionAPI.method', HTMLMETHOD)
		this.url = strRequired(obj.url, FILENAME + 'FormSourceActionAPI.url')
		this.dbAction = memberOfEnum(obj.dbAction, 'FormSourceActionAPI.dbAction', FormSourceDBAction)
	}
}

export class FormSourceActionDB extends FormSourceAction {
	statement: string
	elements: Array<FormSourceElement>
	updateTable: string | undefined

	constructor(obj: any) {
		super(obj)

		obj = valueOrDefault(obj, {})
		this.type = FormSourceType.db
		this.statement = strRequired(obj.statement, FILENAME + 'FormSourceTypeDB.statement')
		this.elements = getArrayOfModels(FormSourceElement, obj.elements)
		this.updateTable = strOptional(obj.updateTable, 'FormSourceTypeDB.updateTable')
	}
}

export class FormSourceParm {
	name: string
	type: FormSourceParmType
	source: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.name = strRequired(obj.name, 'FormSourceParm.name')
		this.type = memberOfEnumOrDefault(
			obj.type,
			'FormSourceParm.type',
			FormSourceParmType,
			FormSourceParmType.form
		)
		this.source = valueOrDefault(obj.source, obj.name)
	}
}
export class FormSourceElement {
	type: FormSourceElementType
	value: number | undefined
	nameForm: string
	nameCollection: string
	identity: boolean
	update: boolean

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.type = memberOfEnum(obj.type, 'FormSourceElement.type', FormSourceElementType)
		this.value = nbrOptional(obj.value, 'FormSourceElement.value')
		this.nameForm = strRequired(obj.nameForm, FILENAME + 'FormSourceElement.nameForm')
		this.nameCollection = strRequired(
			obj.nameCollection,
			FILENAME + 'FormSourceElement.nameCollection'
		)
		this.identity = booleanOrFalse(obj.identity, 'FormSourceElement.identity')
		this.update = booleanOrFalse(obj.update, 'FormSourceElement.update')
	}
}

export function FormSourceResponse(sourceData: any) {
	const response: FormSourceResponseType = {
		success: true,
		message: '',
		data: sourceData,
		type: 'unknown'
	}

	if (Array.isArray(response.data)) {
		response.type = 'array'
	} else if (typeof response.data == 'object') {
		response.type = 'object'
		if (response.data.hasOwnProperty('success')) {
			response.success = response.data.success
			delete response.data.success
		}
		if (response.data.hasOwnProperty('message')) {
			response.message = response.data.message
			delete response.data.message
		}
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
	select = 'select',
	update = 'update'
}

export enum FormSourceParmType {
	env = 'env',
	form = 'form',
	literal = 'literal',
	params = 'params',
	user = 'user'
}
export enum FormSourceTarget {
	esp = 'esp',
	fauna = 'fauna'
}

export enum FormSourceType {
	api = 'api',
	db = 'db'
}
export enum FormSourceElementType {
	boolean = 'boolean',
	char = 'char',
	date = 'date',
	datetime = 'datetime',
	decimal = 'decimal',
	long = 'long'
}
export enum HTMLMETHOD {
	GET = 'GET',
	POST = 'POST'
}
