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
	error: ValidityError
	level: ValidityErrorLevel
	message: string

	constructor(
		error: ValidityError = ValidityError.none,
		level: ValidityErrorLevel = ValidityErrorLevel.none,
		message: string = ''
	) {
		this.error = error
		this.level = level
		this.message = message
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
	invalid = 'invalid',
	notInvalid = 'notInvalid',
	valid = 'valid'
}
export enum ValidationType {
	field = 'field',
	form = 'form'
}
export enum ValidityError {
	none = 'none',
	missingData = 'missingData',
	required = 'required',
	minLength = 'minlength',
	maxLength = 'maxlength',
	minValue = 'minvalue',
	maxValue = 'maxvalue',
	pattern = 'pattern',
	matchColumn = 'matchcolumn'
}
export enum ValidityErrorLevel {
	none = 'none',
	warning = 'warning',
	error = 'error'
}
