const FILENAME = '$comps/esp/form/types.validation.ts'

export class DataValue {
	name: string
	value: any

	constructor(name: string, value: any) {
		this.name = name
		this.value = value
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
	minLength = 'minlength',
	maxLength = 'maxlength',
	minValue = 'minvalue',
	maxValue = 'maxvalue',
	pattern = 'pattern',
	matchColumn = 'matchcolumn'
}
