const FILENAME = '$comps/form/types.validation.ts'

export class Validation {
	type: ValidationType
	status: ValidationStatus
	validityFields: Array<ValidityField>

	constructor(
		type: ValidationType,
		status: ValidationStatus,
		validityFields: Array<ValidityField>
	) {
		this.type = type
		this.status = status
		this.validityFields = validityFields
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
