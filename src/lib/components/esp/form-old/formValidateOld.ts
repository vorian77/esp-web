import { formFieldValidityType, formFieldValidityLevel } from '$comps/esp/form/form'

enum type {
	required = 'required',
	minLength = 'minLength',
	maxLength = 'maxLength',
	minValue = 'minValue',
	maxValue = 'maxValue',
	pattern = 'pattern',
	matchColumn = 'matchColumn'
}

type validity = null | {
	type: type
	message: string
	level: formFieldValidityLevel
}

function validityValid(index: Int16Array) {
	return [{ index, validity: null }]
}

function validity(type: type, message: string, level: formFieldValidityLevel) {
	return { type, message, level }
}

function fieldValidityItem(index: Int16Array, validity: validity) {
	return { index, validity }
}

function fieldValidity(
	index: Int16Array,
	type: type,
	message: string,
	level: formFieldValidityLevel
) {
	return [fieldValidityItem(index, validity(type, message, level))]
}

export function validateForm(formData, formDefn) {}

export function validateField(field, value: string, elements) {
	const fieldIsValid = undefined
	const fieldValue = value
	let nbrValue = Number(fieldValue)

	// not checked accesses
	const evalutedAccesses = new Set([undefined, 'required', 'optional'])
	if (!evalutedAccesses.has(field?.access)) {
		return validityValid(field.index)
	}

	// optional & empty
	if (field?.access == 'optional' && !fieldValue) {
		return validityValid(field.index)
	}

	// required
	if ((!field.access || field.access == 'required') && !fieldValue) {
		console.log(field.index, fieldValue)
		return fieldValidity(
			field.index,
			type.required,
			`"${field.label}" is required.`,
			formFieldValidityLevel.warning
		)
	}

	// minLength
	if (field.minLength || field.minLength === 0) {
		if (fieldValue.length < field.minLength) {
			return fieldValidity(
				field.index,
				type.minLength,
				`"${field.label}" must be at least ${field.minLength} character(s). It is currently ${fieldValue.length} character(s).`,
				formFieldValidityLevel.error
			)
		}
	}
	// maxLength
	if (field.maxLength || field.maxLength === 0) {
		if (fieldValue.length > field.maxLength) {
			return fieldValidity(
				field.index,
				type.maxLength,
				`"${field.label}" cannot exceed ${field.maxLength} character(s). It is currently ${fieldValue.length} character(s).`,
				formFieldValidityLevel.error
			)
		}
	}
	// minValue
	if (field.minValue || field.minValue === 0) {
		if (nbrValue < field.minValue) {
			return fieldValidity(
				field.index,
				type.minValue,
				`"${field.label}" must be at least ${field.minValue}.`,
				formFieldValidityLevel.error
			)
		}
	}

	// maxValue
	if (field.maxValue || field.maxValue === 0) {
		if (nbrValue > field.maxValue) {
			return fieldValidity(
				field.index,
				type.maxValue,
				`"${field.label}" cannot exceed ${field.maxValue}.`,
				formFieldValidityLevel.error
			)
		}
	}

	// pattern
	if (field.pattern) {
		const regex = new RegExp(field.pattern)
		if (!regex.test(fieldValue)) {
			const errorMsg = field.patternMsg || `The value you entered is not a valid "${field.label}".`
			return fieldValidity(field.index, type.pattern, errorMsg, formFieldValidityLevel.error)
		}
	}

	// matchColumn
	if (field.matchColumn) {
		// if (values.every((val, i, arr) => val === arr[0])) {
		// 	// equal - fields are valid
		// 	newValidity = undefined
		// }

		let fieldValidities = []

		const newValidity = validity(
			type.matchColumn,
			`Fields "${field.label}" and "${field.matchColumn.label}" must match.`,
			formFieldValidityLevel.error
		)

		fieldValidities.push(fieldValidityItem(field.index, newValidity))
		fieldValidities.push(fieldValidityItem(field.matchColumn.index, newValidity))

		return fieldValidities
	}
	return validityValid(field.index)
}
