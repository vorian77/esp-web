import {
	getArrayOfModels,
	memberOfEnum,
	memberOfEnumOrDefault,
	strRequired,
	valueOrDefault
} from '$lib/utils/utils'
import type { Field } from '$comps/esp/form/field'
import { FieldCheckbox } from '$comps/esp/form/fieldCheckbox'
import { FieldHeader } from '$comps/esp/form/fieldHeader'
import { FieldInput } from '$comps/esp/form/fieldInput'
import { FieldPictureTake } from '$comps/esp/form/fieldPictureTake'
import { FieldRadio } from '$comps/esp/form/fieldRadio'
import { FieldSelect } from '$comps/esp/form/fieldSelect'
import { FieldTextarea } from '$comps/esp/form/fieldTextarea'
import {
	FieldAccess,
	FieldElement,
	FieldElementInputType,
	FormSourceResponse,
	FormSource,
	Validation,
	ValidationType,
	ValidationStatus,
	ValidityField
} from '$comps/esp/form/types'

import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/esp/form/form.ts/'

export class Form {
	name: string
	header: string
	subHeader: string
	description: string
	submitButtonLabel: string
	fields: Array<Field>
	source: FormSource | undefined
	height: string
	footerText: Array<FooterText>
	footerLinks: Array<FooterLink>
	pageData: {} | undefined
	values: {} | undefined
	data: {} | undefined
	elForm: HTMLFormElement
	elSubmitButton: HTMLElement
	submitResponse: {} | undefined
	validToSubmit: boolean

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.name = strRequired(obj.name, 'Form', 'name')
		this.header = valueOrDefault(obj.header, '')
		this.subHeader = valueOrDefault(obj.subHeader, '')
		this.description = valueOrDefault(obj.description, '')
		this.submitButtonLabel = valueOrDefault(obj.submitButtonLabel, '')
		this.fields = this.initFields(obj.fields)
		this.source = obj.source ? new FormSource(obj.source) : undefined
		this.height = valueOrDefault(obj.height, '')
		this.footerText = getArrayOfModels(FooterText, obj.footerText)
		this.footerLinks = getArrayOfModels(FooterLink, obj.footerLinks)
		this.pageData = valueOrDefault(obj.pageData, {})
		this.values = valueOrDefault(obj.values, {})
		this.validToSubmit = true
	}

	initFields(fields) {
		fields = valueOrDefault(fields, [])
		let newFields: Array<Field> = []
		fields.forEach((field: {}, index: number) => {
			let newField: Field
			const element = memberOfEnumOrDefault(
				field.element,
				'Form',
				'element',
				'FieldElement',
				FieldElement,
				FieldElement.input
			)
			switch (element) {
				case FieldElement.input:
					const type = field.type
						? memberOfEnum(
								field.type,
								'Form',
								'field.element.input.type',
								'FieldElementInputType',
								FieldElementInputType
						  )
						: ''
					switch (type) {
						case FieldElementInputType.checkbox:
							newField = new FieldCheckbox(field, index)
							break
						case FieldElementInputType.radio:
							newField = new FieldRadio(field, index)
							break
						default:
							// input column
							newField = new FieldInput(field, index, newFields)
					}
					break

				case FieldElement.header:
					newField = new FieldHeader(field, index)
					break
				case FieldElement.pictureTake:
					newField = new FieldPictureTake(field, index)
					break

				case FieldElement.select:
					newField = new FieldSelect(field, index)
					break

				case FieldElement.textarea:
					newField = new FieldTextarea(field, index)
					break
				default:
					throw error(500, {
						file: FILENAME,
						function: 'initFields',
						message: `No case defined for field element: ${element} in form: ${this.name}.`
					})
			}
			newFields.push(newField)
		})
		return newFields
	}

	validateForm(): Validation {
		const formData = new FormData(this.elForm)

		// set formData
		let validityFields: Array<ValidityField> = []
		let values = {}

		// process each field
		for (let i = 0; i < this.fields.length; i++) {
			// can't break out of "forEach" loop
			const v: Validation = this.fields[i].validate(formData)

			if (v.status == ValidationStatus.valid) {
				validityFields = [...v.validityFields]
				values[this.fields[i].name] = v.data
			} else {
				return v
			}
		}
		this.data = values
		return new Validation(ValidationType.form, ValidationStatus.valid, validityFields, values)
	}

	loadValidateForm(): Validation {
		const formData = new FormData(this.elForm)

		// set formData
		let validityFields: Array<ValidityField> = []
		let formStatus = ValidationStatus.valid
		let values = {}

		// process each field
		this.fields.forEach((field) => {
			if (field.value) {
				const v: Validation = field.validate(formData)
				if (v.status == ValidationStatus.invalid) {
					validityFields = [...validityFields, ...v.validityFields]
					formStatus = ValidationStatus.invalid
				}
			} else if (field.access == FieldAccess.required) {
				// required field/no value
				const v = field.fieldMissingData(field.index)
				validityFields = [...validityFields, ...v.validityFields]
				if (formStatus != ValidationStatus.invalid) {
					formStatus = ValidationStatus.invalid
				}
			}
		})
		return new Validation(ValidationType.form, formStatus, validityFields)
	}
	async submitForm() {
		if (!this.source) {
			return FormSourceResponse({})
		}

		const formData = new FormData(this.elForm)
		let formValues = {}
		this.fields.forEach((f) => {
			formValues[f.name] = f.validateGetValue(formData)
		})
		console.log('form.FormValues:', formValues)

		const url = this.source.processLocally ? '' : '/api/form'

		const responsePromise = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				action: 'form_submit',
				formName: this.name,
				source: this.source,
				data: { ...this.pageData, ...this.data, ...formValues }
			})
		})
		const response = await responsePromise.json()

		// process response
		if (response.success) {
			this.submitResponse = { ...this.data, ...response.data }
		} else {
			this.submitResponse = {}
			alert(response.message)
		}

		return FormSourceResponse(response)
	}

	getFieldValue(fieldName: string) {
		const obj = this.fields.find((obj) => obj.name == fieldName)
		return obj?.value || ''
	}
	setFieldValue(fieldName: string, value: any) {
		const obj = this.fields.find((obj) => obj.name == fieldName)
		if (obj) {
			obj.value = value
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'setFieldValue',
				message: `Unable to find field: ${fieldName} in form: ${this.name}.`
			})
		}
	}
}

export class DataValue {
	name: string
	value: any

	constructor(name: string, value: any) {
		this.name = name
		this.value = value
	}
}
export class FooterLink {
	prefix: string
	label: string
	action: string

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.prefix = valueOrDefault(obj.prefix, '')
		this.label = strRequired(obj.label, 'FooterLink', 'label')
		this.action = strRequired(obj.action, 'FooterLink', 'action')
	}
}
export class FooterText {
	label: string
	fontSize: string
	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.label = strRequired(obj.label, 'FooterText', 'label')
		this.fontSize = valueOrDefault(obj.fontSize, 'text-base')
	}
}
