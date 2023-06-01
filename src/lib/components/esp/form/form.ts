import { getArrayOfModels, memberOfEnum, strLower, strRqd, valueOrDefault } from '$lib/utils/utils'

import type { Field } from '$comps/esp/form/field'
import { FieldCheckbox } from '$comps/esp/form/fieldCheckbox'
import { FieldInput } from '$comps/esp/form/fieldInput'
import { FieldRadio } from '$comps/esp/form/fieldRadio'
import { FieldSelect } from '$comps/esp/form/fieldSelect'
import { FieldTextarea } from '$comps/esp/form/fieldTextarea'

import {
	FieldElement,
	SubmitAction,
	SubmitActionParmType,
	SubmitActionTarget,
	Validation,
	ValidationType,
	ValidationStatus,
	ValidityField
} from '$comps/esp/form/types'

import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/esp/form/form.ts/'

export class Form {
	id: string
	header: string
	subHeader: string
	description: string
	submitButtonLabel: string
	submitAction: SubmitAction | undefined
	height: string
	fields: Array<Field>
	footerText: Array<FooterText>
	footerLinks: Array<FooterLink>
	data: {}

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.id = strRqd(obj.id, FILENAME + 'Form.id')
		this.header = valueOrDefault(obj.header, '')
		this.subHeader = valueOrDefault(obj.subHeader, '')
		this.description = valueOrDefault(obj.description, '')
		this.submitButtonLabel = valueOrDefault(obj.submitButtonLabel, 'Submit')
		this.submitAction = obj.submitAction ? new SubmitAction(obj.submitAction) : undefined
		this.height = valueOrDefault(obj.height, '')
		this.fields = this.initFields(obj.fields)
		this.footerText = getArrayOfModels(FooterText, obj.footerText)
		this.footerLinks = getArrayOfModels(FooterLink, obj.footerLinks)
		this.data = {}
	}

	initFields(fields) {
		fields = valueOrDefault(fields, [])
		let newFields: Array<Field> = []
		fields.forEach((field, index: number) => {
			let newField: Field
			const element = memberOfEnum(
				strLower(strRqd(field.element, 'Form.Field.element')),
				'FieldElement',
				FieldElement
			)
			switch (element) {
				case FieldElement.input:
					const type = strRqd(field.type, FILENAME + 'Form.Field.type')
					switch (type) {
						case 'checkbox':
							newField = new FieldCheckbox(field, index)
							break
						case 'radio':
							newField = new FieldRadio(field, index)
							break
						default:
							// input column
							newField = new FieldInput(field, index, newFields)
					}
					break

				case FieldElement.select:
					newField = new FieldSelect(field, index)
					break

				case FieldElement.textarea:
					newField = new FieldTextarea(field, index)
					break
			}
			newFields.push(newField)
		})
		return newFields
	}

	validateForm(formData: FormData): Validation {
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
				message: `Unable to find field: ${fieldName} in form: ${this.id}.`
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
		this.label = strRqd(obj.label, FILENAME + 'FooterLink.label')
		this.action = strRqd(obj.action, FILENAME + 'FooterLink.action')
	}
}
export class FooterText {
	label: string
	fontSize: string
	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.label = strRqd(obj.label, FILENAME + 'FooterText.label')
		this.fontSize = valueOrDefault(obj.fontSize, 'text-base')
	}
}
