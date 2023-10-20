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
import { FieldList } from '$comps/esp/form/fieldList'
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
} from '$comps/types'
import { ObjectAction } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/esp/form/form.ts/'

export class Form {
	name: string
	header: string
	subHeader: string
	description: string
	submitButtonLabel: string
	isPopup: boolean
	fields: Array<Field>
	objActions: Array<ObjectAction>
	source: FormSource | undefined
	height: string
	footerText: Array<FooterText>
	footerLinks: Array<FooterLink>
	pageData: {} | undefined
	values: {} | undefined
	submitResponse: {} | undefined
	validToSubmit: boolean

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})

		this.edgeDBConversion(obj, obj._fields, 'fields')
		this.edgeDBConversion(obj, obj._actions, 'objActions')

		this.name = strRequired(obj.name, 'Form', 'name')
		this.header = valueOrDefault(obj.header, '')
		this.subHeader = valueOrDefault(obj.subHeader, '')
		this.description = valueOrDefault(obj.description, '')
		this.submitButtonLabel = valueOrDefault(obj.submitButtonLabel, '')
		this.isPopup = valueOrDefault(obj.isPopup, false)
		this.fields = this.initFields(obj.fields)
		this.objActions = this.initObjActions(obj.objActions)
		this.source = obj.source ? new FormSource(obj.source) : undefined
		this.height = valueOrDefault(obj.height, '')
		this.footerText = getArrayOfModels(FooterText, obj.footerText)
		this.footerLinks = getArrayOfModels(FooterLink, obj.footerLinks)
		this.pageData = valueOrDefault(obj.pageData, {})
		this.values = valueOrDefault(obj.values, {})
		this.validToSubmit = true
	}

	initFields(fields: any) {
		fields = valueOrDefault(fields, [])
		let newFields: Array<Field> = []
		fields.forEach((field: {}, index: number) => {
			let newField: Field

			this.edgeDBConversion(field, field._codeAccess, 'access')
			this.edgeDBConversion(field, field._codeElement, 'element')
			this.edgeDBConversion(field, field._codeInputType, 'type')

			this.edgeDBConversion(field, field?._column?.name, 'name')
			this.edgeDBConversion(field, field?._column?.header, 'label')

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
								'field.type',
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

				case FieldElement.listField:
					newField = new FieldList(field, index)
					break

				case FieldElement.pictureTake:
					newField = new FieldPictureTake(field, index)
					break

				case FieldElement.select:
					newField = new FieldSelect(field, index)
					break

				case FieldElement.textArea:
					newField = new FieldTextarea(field, index)
					break
				default:
					throw error(500, {
						file: FILENAME,
						function: 'initFields',
						message: `No case defined for field element: ${element} in form: ${this.name}`
					})
			}
			newFields.push(newField)
		})
		return newFields
	}

	initObjActions(actions: any) {
		actions = valueOrDefault(actions, [])
		let newActions: Array<ObjectAction> = []
		actions.forEach((a: {}) => {
			newActions.push(new ObjectAction(a))
		})

		return newActions
	}

	edgeDBConversion(obj: any, edgeVal: any, fieldPropertyName: string) {
		// <temp> remove after MongoDB migration is complete
		if (edgeVal) {
			obj[fieldPropertyName] = edgeVal
		}
	}

	getFormElement(): HTMLFormElement | undefined {
		const formName = 'form_' + this.name
		const formEl = document.getElementById(formName)
		return formEl ? formEl : undefined
	}

	validateForm(): Validation {
		const formEl = this.getFormElement()
		const formData = new FormData(formEl)
		const fieldValue = this.fields[0].getValue(formData)

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
		this.values = values
		return new Validation(ValidationType.form, ValidationStatus.valid, validityFields, values)
	}

	loadValidateForm(): Validation {
		const formEl = this.getFormElement()
		const formData = new FormData(formEl)

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

		const responsePromise = await fetch(this.source.processURL, {
			method: 'POST',
			body: JSON.stringify({
				action: 'form_submit',
				formName: this.name,
				source: this.source,
				data: { ...this.getFormValues(), ...this.pageData }
			})
		})
		const response = await responsePromise.json()

		// process response
		if (response.message) {
			alert(response.message)
		}
		if (response.success) {
			this.submitResponse = { ...this.values, ...response.data }
		} else {
			this.submitResponse = {}
		}
		return FormSourceResponse(response)
	}

	getFormValues() {
		const formEl = this.getFormElement()
		const formData = new FormData(formEl)
		let formValues = {}
		this.fields.forEach((f) => {
			formValues[f.name] = f.getValue(formData)
		})
		return formValues
	}

	resetFormValues() {
		const formEl = this.getFormElement()
		const formData = new FormData(formEl)
		this.fields.forEach((f) => {
			f.value = f.getValue(formData)
			console.log('rfv:', f.value)
		})
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
				message: `Unable to find field: ${fieldName} in form: ${this.name}`
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
