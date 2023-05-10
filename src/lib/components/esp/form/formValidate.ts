function validity(type, message, level = 'error') {
	return { type, message, level: level }
}

export function validateForm(formData, formDefn) {}

export function validateField(field, event) {
	const fieldValue = event.target.value
	let nbrValue = Number(fieldValue)
	const evalutedAccesses = new Set([undefined, 'required', 'optional'])
	const fieldIsValid = undefined

	// not checked accesses
	if (!evalutedAccesses.has(field?.access)) {
		return fieldIsValid
	}

	// optional & empty
	if (field.access == 'optional' && !fieldValue) {
		return fieldIsValid
	}

	// required
	if ((!field.access || field.access == 'required') && !fieldValue) {
		return validity('required', `"${field.label}" is required.`, 'warning')
	}

	// minLength
	if (field.minLength || field.minLength === 0) {
		if (fieldValue.length < field.minLength) {
			return validity(
				'minLength',
				`"${field.label}" must be at least ${field.minLength} character(s). It is currently ${fieldValue.length} character(s).`
			)
		}
	}
	// maxLength
	if (field.maxLength || field.maxLength === 0) {
		if (fieldValue.length > field.maxLength) {
			return validity(
				'maxLength',
				`"${field.label}" cannot exceed ${field.maxLength} character(s). It is currently ${fieldValue.length} character(s).`
			)
		}
	}
	// minValue
	if (field.minValue || field.minValue === 0) {
		if (nbrValue < field.minValue) {
			return validity('minValue', `"${field.label}" must be at least ${field.minValue}.`)
		}
	}

	// maxValue
	if (field.maxValue || field.maxValue === 0) {
		if (nbrValue > field.maxValue) {
			return validity('maxValue', `"${field.label}" cannot exceed ${field.maxValue}.`)
		}
	}

	// pattern
	if (field.pattern) {
		const regex = new RegExp(field.pattern)
		if (!regex.test(fieldValue)) {
			const errorMsg = field.patternMsg || `The value you entered is not a valid "${field.label}".`
			return validity('pattern', errorMsg)
		}
	}

	// matchColumn
	if (field.matchColumn) {
		// process at form level
		return {
			...validity(
				'matchColumn',
				`Fields "${field.label}" and "${field.matchColumn.label}" must match.`,
				undefined
			),
			escalate: true,
			fieldGroup: [
				{ index: field.index, name: field.name },
				{ index: field.matchColumn.index, name: field.matchColumn.name }
			]
		}
	}
	return fieldIsValid
}
