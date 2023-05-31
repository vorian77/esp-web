import {
	booleanOrFalse,
	getArrayOfModels,
	memberOfEnum,
	strRqd,
	strUpper,
	valueOrDefault
} from '$utils/utils'

const FILENAME = '$comps/esp/form/types.ts'

export class DataValue {
	name: string
	value: any

	constructor(name: string, value: any) {
		this.name = name
		this.value = value
	}
}
export class SubmitAction {
	processLocally: boolean
	target: SubmitActionTarget
	messageFailure: string
	messageSuccess: string
	method: SubmitActionMethod
	url: string
	statement: string
	parms: Array<SubmitActionParm>

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.processLocally = booleanOrFalse(
			obj.processLocally,
			FILENAME + 'SubmitAction.processLocally'
		)
		this.target = memberOfEnum(obj.target, 'SubmitActionTarget', SubmitActionTarget)
		this.messageSuccess = valueOrDefault(obj.messageSuccess, 'Form submit succeeded.')
		this.messageFailure = valueOrDefault(obj.messageFailure, 'Form submit failed.')
		this.method = [SubmitActionTarget.esp_api].includes(this.target)
			? strUpper(memberOfEnum(strUpper(obj.method), 'SubmitActionMethod', SubmitActionMethod))
			: ''
		this.url = [SubmitActionTarget.esp_api].includes(this.target)
			? strRqd(obj.url, FILENAME + 'SubmitAction.url')
			: ''
		this.statement = [SubmitActionTarget.esp_sql].includes(this.target)
			? strRqd(obj.statement, FILENAME + 'SubmitAction.statement')
			: ''

		// parms
		this.parms = getArrayOfModels(SubmitActionParm, obj.parms)
	}
}
export class SubmitActionParm {
	name: string
	type: SubmitActionParmType
	source: string

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.name = strRqd(obj.name, FILENAME + 'SubmitActionParm.name')
		this.type = memberOfEnum(
			valueOrDefault(obj.type, SubmitActionParmType.clone),
			'SubmitActionParmType',
			SubmitActionParmType
		)
		// default - data source field name is same as target field
		this.source = valueOrDefault(obj.source, obj.name)
	}
}
export class Validation {
	type: ValidationType
	status: ValidationStatus
	validityFields: Array<ValidityField>
	data: Array<DataValue> | undefined

	constructor(
		type: ValidationType,
		status: ValidationStatus,
		validityFields: Array<ValidityField>,
		data?: Array<DataValue>
	) {
		this.type = type
		this.status = status
		this.validityFields = validityFields
		this.data = data
	}
}
export class Validity {
	type: ValidityType
	message: string
	level: ValidityLevel

	constructor(
		type: ValidityType = ValidityType.valid,
		message: string = '',
		level: ValidityLevel = ValidityLevel.none
	) {
		this.type = type
		this.message = message
		this.level = level
	}
}
export class ValidityField {
	index: number
	validity: Validity

	constructor(index: number, validity: Validity) {
		this.index = index
		this.validity = validity
	}
}

export enum FieldElement {
	input = 'input',
	select = 'select',
	textarea = 'textarea'
}
export enum SubmitActionMethod {
	GET = 'GET',
	POST = 'POST'
}
export enum SubmitActionParmType {
	clone = 'clone',
	literal = 'literal'
}
export enum SubmitActionTarget {
	local = 'local',
	esp_api = 'esp_api',
	esp_sql = 'esp_sql',
	fauna = 'fauna'
}
export enum ValidationStatus {
	valid = 'valid',
	notinvalid = 'notinvalid',
	invalid = 'invalid'
}
export enum ValidationType {
	field = 'field',
	form = 'form'
}
export enum ValidityLevel {
	none = 'none',
	warning = 'warning',
	error = 'error'
}
export enum ValidityType {
	valid = 'valid',
	required = 'required',
	minLength = 'minLength',
	maxLength = 'maxLength',
	minValue = 'minValue',
	maxValue = 'maxValue',
	pattern = 'pattern',
	matchColumn = 'matchColumn'
}
