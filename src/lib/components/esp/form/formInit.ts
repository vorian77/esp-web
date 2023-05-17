export function formInitFields(formDefn) {
	let newFields = []
	formDefn.fields.forEach((field, index) => {
		field.index = index

		// field type
		switch (field.type) {
			case 'email':
				if (!field.pattern) {
					field.pattern = '^[A-Za-z0-9+_.-]+@(.+)$'
				}
				break

			case 'tel':
				if (!field.pattern) {
					field.pattern = '^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$'
					field.patternReplacement = '($1) $2-$3'
				}
				break
		}

		// matchColumn
		if (field.matchColumn) {
			const idxParent = newFields.map((f) => f.name).indexOf(field.matchColumn)
			if (idxParent >= 0) {
				// set parent
				newFields[idxParent].matchColumn = {
					name: field.name,
					index: field.index,
					label: field.label
				}

				// update child
				field.matchColumn = {
					name: newFields[idxParent].name,
					index: newFields[idxParent].index,
					label: newFields[idxParent].label
				}
			}
		}

		newFields.push(field)
	})
	return newFields
}
