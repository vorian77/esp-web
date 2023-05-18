import { FieldCheckbox } from '$comps/esp/form/fieldCheckbox'
import { FieldInput } from '$comps/esp/form/fieldInput'
import { FieldRadio } from '$comps/esp/form/fieldRadio'
import { FieldSelect } from '$comps/esp/form/fieldSelect'
import { valueOrDefault, strRqd } from '$lib/utils/model.utils'
import { Validation, ValidationType } from '$comps/esp/form/fieldValidation'

export class Form {
	id: number
	name: string
	label: string
	description: string
	submitButtonLabel: string
	formDefn: {}
	formData: {}
	fields: any

	constructor(formInit: {}) {
		this.formDefn = valueOrDefault(formInit.defn, {})
		this.formData = valueOrDefault(formInit.data, {})
		this.fields = valueOrDefault(this.formDefn.fields, [])

		this.id = valueOrDefault(this.formDefn.id, 0)
		this.name = valueOrDefault(this.formDefn.name, '')
		this.label = valueOrDefault(this.formDefn.label, '')
		this.description = valueOrDefault(this.formDefn.description, '')
		this.submitButtonLabel = valueOrDefault(this.formDefn.submitButtonLabel, 'Submit')

		this.fields = this.initFields(this.formDefn.fields)
	}

	get getDefn() {
		return JSON.stringify({
			name: this.name,
			label: this.label,
			description: this.description,
			submitButtonLabel: this.submitButtonLabel,
			fields: this.fields
		})
	}

	get getId() {
		return `form_${this.id}`
	}

	initFields(fields) {
		let newFields = []
		fields.forEach((field, index) => {
			let newField
			const element = strRqd(field.element)
			switch (element) {
				case FieldElement.input:
					const type = strRqd(field.type)

					switch (type) {
						case 'checkbox':
							newField = new FieldCheckbox(field)
							break
						case 'radio':
							newField = new FieldRadio(field)
							break
						default:
							newField = new FieldInput(field)
					}
					break

				case FieldElement.select:
					newField = new FieldSelect(field)
					break

				case FieldElement.textarea:
					// const newField = new FieldTextarea(field)
					break
			}
			newField.index = index

			// matchColumn
			if (newField.matchColumn) {
				const idxParent = newFields.map((f) => f.name).indexOf(newField.matchColumn)
				if (idxParent >= 0) {
					// set parent
					newFields[idxParent].matchColumn = {
						name: newField.name,
						index: newField.index,
						label: newField.label
					}

					// update child
					newField.matchColumn = {
						name: newFields[idxParent].name,
						index: newFields[idxParent].index,
						label: newFields[idxParent].label
					}
				}
			}
			newFields.push(newField)
		})
		return newFields
	}

	validateform(event: SubmitEvent, formDefn): Validation {
		// set formData
		const form = event.target
		const formData = new FormData(form)
		let values = []

		// process each field
		for (let i = 0; i < formDefn.fields.length; i++) {
			const field = formDefn.fields[i]
			// const validation: Validation = this.validateField(field, formData)

			if (validation.valid) {
				values.push(new FieldValue(field.name, validation.data))
			} else {
				return validation
			}
		}

		console.log('form is valid: ', values)
		return new Validation(ValidationType.form, true, values)
	}
}

export enum FieldElement {
	input = 'input',
	select = 'select',
	textarea = 'textarea'
}
