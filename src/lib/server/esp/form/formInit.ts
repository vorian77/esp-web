import { dbGetFormDefn } from '$server/db'

export async function formInit(formId) {
	async function getDefn() {
		const result = await dbGetFormDefn(formId)
		if (!result) {
			throw error(404, `Could not retrieve form id: ${formId}.`)
		}
		return result
	}

	function buildFields(fields) {
		let newFields = []
		fields.forEach((field, index) => {
			field['index'] = index

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

	let formDefn = await getDefn()

	formDefn.fields = buildFields(formDefn.fields)

	return formDefn
}
