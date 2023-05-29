import { FieldCheckbox } from '$comps/esp/form/fieldCheckbox'
import { FieldInput } from '$comps/esp/form/fieldInput'
import { FieldRadio } from '$comps/esp/form/fieldRadio'
import { FieldSelect } from '$comps/esp/form/fieldSelect'
import { FieldTextarea } from '$comps/esp/form/fieldTextarea'
import {
	booleanOrFalse,
	getArray,
	getArrayOfModels,
	memberOfEnum,
	strLower,
	strRqd,
	strUpper,
	valueOrDefault
} from '$lib/utils/utils'
import type { Field } from '$comps/esp/form/field'
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
		console.log(FILENAME + '.values...')
		console.log(values)
		this.data = values
		return new Validation(ValidationType.form, ValidationStatus.valid, validityFields, values)
	}

	getSubmitActionParms() {
		switch (this.submitAction?.target) {
			case SubmitActionTarget.esp_api:
				let parms = {}
				this.submitAction.parms.forEach(({ name, type, source }) => {
					switch (type) {
						case SubmitActionParmType.clone:
							// parms[name] = getValue(source, data)
							parms[name] = this.data[name]
							break
						case SubmitActionParmType.literal:
							parms[name] = source
							break
						default:
							throw error(500, {
								file: FILENAME,
								function: 'submitActionData',
								message: `No case defined for Form.SubmitAction.parms.type: "${type}".`
							})
					}
				})
				return parms
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'submitActionData',
					message: `No case defined for Form.submitAction.type: "${this.submitAction.type}".`
				})
		}
	}

	updateSubmitAction(submitAction: SubmitAction, data: {}) {
		this.submitAction = submitAction
		this.data = data
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
export class SubmitAction {
	processLocally: boolean
	target: SubmitActionTarget
	messageFailure: string
	messageSuccess: string
	method: SubmitActionMethod
	url: string
	statement: string
	parms: Array<SubmitActionParm>

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.processLocally = booleanOrFalse(
			obj.processLocally,
			FILENAME + 'SubmitAction.processLocally'
		)
		this.target = memberOfEnum(obj.target, 'SubmitActionTarget', SubmitActionTarget)
		this.messageSuccess = valueOrDefault(obj.messageSuccess, 'Form submit succeeded.')
		this.messageFailure = valueOrDefault(obj.messageFailure, 'Form submit failed.')
		this.method = [SubmitActionTarget.esp_api].includes(this.target)
			? strUpper(memberOfEnum(strUpper(obj.method), 'SubmitActionMethod', SubmitActionMethod))
			: ''
		this.url = [SubmitActionTarget.esp_api].includes(this.target)
			? strRqd(obj.url, FILENAME + 'SubmitAction.url')
			: ''
		this.statement = [SubmitActionTarget.esp_sql].includes(this.target)
			? strRqd(obj.statement, FILENAME + 'SubmitAction.statement')
			: ''

		// parms
		this.parms = getArrayOfModels(SubmitActionParm, obj.parms)
	}
}
export class SubmitActionParm {
	name: string
	type: SubmitActionParmType
	source: string

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.name = strRqd(obj.name, FILENAME + 'SubmitActionParm.name')
		this.type = memberOfEnum(
			valueOrDefault(obj.type, SubmitActionParmType.clone),
			'SubmitActionParmType',
			SubmitActionParmType
		)
		// default - data source field name is same as target field
		this.source = valueOrDefault(obj.source, obj.name)
	}
}
export class Validation {
	type: ValidationType
	status: ValidationStatus
	validityFields: Array<ValidityField>
	data: Array<DataValue> | undefined

	constructor(
		type: ValidationType,
		status: ValidationStatus,
		validityFields: Array<ValidityField>,
		data?: Array<DataValue>
	) {
		this.type = type
		this.status = status
		this.validityFields = validityFields
		this.data = data
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
export enum FieldElement {
	input = 'input',
	select = 'select',
	textarea = 'textarea'
}
export enum SubmitActionMethod {
	GET = 'GET',
	POST = 'POST'
}
export enum SubmitActionParmType {
	clone = 'clone',
	literal = 'literal'
}
export enum SubmitActionTarget {
	local = 'local',
	esp_api = 'esp_api',
	esp_sql = 'esp_sql',
	fauna = 'fauna'
}
export enum ValidationStatus {
	valid = 'valid',
	notinvalid = 'notinvalid',
	invalid = 'invalid'
}
export enum ValidationType {
	field = 'field',
	form = 'form'
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
