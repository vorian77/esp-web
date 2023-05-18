export function validateField(field, formData): Validation {
	const fieldValue = setFieldValue(field, formData)
	let nbrValue = Number(fieldValue)
	const fieldIndex = field.index
	const fieldAccess = field?.access

	// only validate access types that require validation (default: required)
	const evalutedAccessTypes = new Set([undefined, 'required', 'optional'])
	if (!evalutedAccessTypes.has(fieldAccess)) {
		return fieldValid()
	}

	// optional & empty
	if (fieldAccess == 'optional' && !fieldValue) {
		return fieldValid()
	}

	// required
	if ((!fieldAccess || fieldAccess == 'required') && !fieldValue) {
		return fieldInvalid(
			ValidityType.required,
			`"${field.label}" is required.`,
			ValidityLevel.warning
		)
	}

	// minLength
	if (field.minLength || field.minLength === 0) {
		if (fieldValue.length < field.minLength) {
			return fieldInvalid(
				ValidityType.minLength,
				`"${field.label}" must be at least ${field.minLength} character(s). It is currently ${fieldValue.length} character(s).`,
				ValidityLevel.error
			)
		}
	}

	// maxLength
	if (field.maxLength || field.maxLength === 0) {
		if (fieldValue.length > field.maxLength) {
			return fieldInvalid(
				ValidityType.maxLength,
				`"${field.label}" cannot exceed ${field.maxLength} character(s). It is currently ${fieldValue.length} character(s).`,
				ValidityLevel.error
			)
		}
	}
	// minValue
	if (field.minValue || field.minValue === 0) {
		if (nbrValue < field.minValue) {
			return fieldInvalid(
				ValidityType.minValue,
				`"${field.label}" must be at least ${field.minValue}.`,
				ValidityLevel.error
			)
		}
	}

	// maxValue
	if (field.maxValue || field.maxValue === 0) {
		if (nbrValue > field.maxValue) {
			return fieldInvalid(
				ValidityType.maxValue,
				`"${field.label}" cannot exceed ${field.maxValue}.`,
				ValidityLevel.error
			)
		}
	}

	// pattern
	if (field.pattern) {
		const regex = new RegExp(field.pattern)
		if (!regex.test(fieldValue)) {
			const errorMsg = field.patternMsg || `The value you entered is not a valid "${field.label}".`
			console.log('pattern...', errorMsg)
			return fieldInvalid(ValidityType.pattern, errorMsg, ValidityLevel.error)
		}
	}

	// matchColumn
	if (field.matchColumn) {
		// get matchColumn value
		const matchColumnValue = formData.get(field.matchColumn.name)

		// compare values to set validiities
		let validity: Validity

		if (fieldValue == matchColumnValue) {
			//equal - fields are valid
			console.log('match - equal...')
			validity = new Validity()
		} else {
			if (!fieldValue || !matchColumnValue) {
				// one blank field - warning
				console.log('match - one blank...')
				validity = new Validity(
					ValidityType.matchColumn,
					`Fields "${field.label}" and "${field.matchColumn.label}" must match.`,
					ValidityLevel.warning
				)
			} else {
				// both entered and unequal - error
				console.log('match - unequal...')

				validity = new Validity(
					ValidityType.matchColumn,
					`Fields "${field.label}" and "${field.matchColumn.label}" must match.`,
					ValidityLevel.error
				)
			}
		}

		// set validiities
		let validityFields: [ValidityField] = [new ValidityField(fieldIndex, validity)]
		validityFields.push(new ValidityField(field.matchColumn.index, validity))
		return new Validation(ValidationType.field, false, validityFields)
	}
	// default
	return fieldValid()

	// UTILITY FUNCTIONS
	function setFieldValue(field, formData) {
		if (field?.type != 'checkbox') {
			return formData.get(field.name)
		} else {
			// checkboxes
			let values = []
			field.items.forEach((i) => {
				const itemId = field.name + '.' + i.id
				const val = formData.get(itemId)
				if (val) {
					values.push(val)
				}
			})
			return values.length ? values : null
		}
	}

	function fieldValid() {
		return new Validation(
			ValidationType.field,
			true,
			[new ValidityField(fieldIndex, new Validity())],
			fieldValue
		)
	}
	function fieldInvalid(type: ValidityType, message: string, level: ValidityLevel) {
		return new Validation(ValidationType.field, false, [
			new ValidityField(fieldIndex, new Validity(type, message, level))
		])
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

export class Validation {
	type: ValidationType
	valid: boolean
	validityFields: [ValidityField]
	data: any

	constructor(
		type: ValidationType,
		valid: boolean,
		validityFields: [ValidityField],
		data: any = null
	) {
		this.type = type
		this.valid = valid
		this.validityFields = validityFields
		this.data = data
	}
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
export enum ValidityLevel {
	none = 'none',
	warning = 'warning',
	error = 'error'
}

export enum ValidationType {
	field = 'field',
	form = 'form'
}
