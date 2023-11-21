import {
	getArrayOfModels,
	memberOfEnum,
	memberOfEnumOrDefault,
	strRequired,
	valueOrDefault
} from '$lib/utils/utils'
import { type Field, FieldValue } from '$comps/form/field'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import { FieldLabel } from '$comps/form/fieldLabel'
import { FieldInput } from '$comps/form/fieldInput'
import { FieldList } from '$comps/form/fieldList'
import { FieldFile } from '$comps/form/fieldFile'
import { FieldRadio } from '$comps/form/fieldRadio'
import { FieldSelect } from '$comps/form/fieldSelect'
import { FieldTextarea } from '$comps/form/fieldTextarea'
import {
	DataObj,
	FieldAccess,
	FieldElement,
	getServerResponse,
	FormSource,
	NavParms,
	NavParmsObjDetail,
	type RawFormField,
	Validation,
	ValidationType,
	ValidationStatus,
	Validity,
	ValidityError,
	ValidityField
} from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/form.ts/'

export class Form extends DataObj {
	name: string
	header: string
	subHeader: string
	description: string
	submitButtonLabel: string
	isPopup: boolean
	fields: Array<Field>
	actions: Array<FormDataObjAction>
	source: FormSource | undefined
	height: string
	footerText: Array<FormFooterText>
	footerLinks: Array<FormFooterLink>
	pageData: {} | undefined
	values: any // replace with fields.values
	submitResponse: {} | undefined
	validToSave: boolean

	constructor(defn: any) {
		super(defn)
		defn = valueOrDefault(defn, {})
		this.name = strRequired(defn.name, 'Form', 'name')
		this.header = valueOrDefault(defn.header, '')
		this.subHeader = valueOrDefault(defn.subHeader, '')
		this.description = valueOrDefault(defn.description, '')
		this.isPopup = valueOrDefault(defn.isPopup, false)
		this.fields = this.initFields(defn._fieldsEl)
		this.actions = this.initDataObjActions(defn._actions)
		this.height = valueOrDefault(defn.height, '')
		this.footerText = getArrayOfModels(FormFooterText, defn.footerText)
		this.footerLinks = getArrayOfModels(FormFooterLink, defn.footerLinks)
		this.validToSave = true

		// not using?
		this.pageData = valueOrDefault(defn.pageData, {})
		this.source = defn.source ? new FormSource(defn.source) : undefined
		this.submitButtonLabel = valueOrDefault(defn.submitButtonLabel, '')
	}

	get objData() {
		return new NavParmsObjDetail(this.fields)
	}

	set objData(parms: any) {
		let data = parms.data

		if (Array.isArray(data)) data = data[0]

		if (data) {
			if (parms.isInsertMode) {
				this.fields.forEach((f) => {
					if (data.hasOwnProperty(f.name)) {
						f.value.update(data[f.name].data, data[f.name].display)
					} else {
						f.value.update(null, null)
					}
					f.valueSelected = new FieldValue(f.value.data, f.value.display)
				})
			} else {
				// selected
				this.fields.forEach((f) => {
					console.log()
					if (data.hasOwnProperty(f.name)) {
						f.value.update(data[f.name].data, data[f.name].display)
					}
					f.valueSelected = new FieldValue(f.value.data, f.value.display)
				})
			}
			this.validToSave = this.preValidate()
		}
	}

	initDataObjActions(actions: any) {
		actions = valueOrDefault(actions, [])
		let newActions: Array<FormDataObjAction> = []
		actions.forEach((a: {}) => {
			newActions.push(new FormDataObjAction(a))
		})
		return newActions
	}

	initFields(fields: Array<RawFormField>) {
		fields = valueOrDefault(fields, [])
		let newFields: Array<Field> = []
		fields.forEach((field: any, index: number) => {
			let newField: Field

			const element = memberOfEnumOrDefault(
				field._codeElement,
				'Form',
				'element',
				'FieldElement',
				FieldElement,
				FieldElement.text
			)
			switch (element) {
				// input
				case FieldElement.date:
				case FieldElement.email:
				case FieldElement.number:
				case FieldElement.password:
				case FieldElement.tel:
				case FieldElement.text:
					newField = new FieldInput(field, index, newFields)
					break

				case FieldElement.checkbox:
					newField = new FieldCheckbox(field, index)
					break

				case FieldElement.file:
					newField = new FieldFile(field, index)
					break

				case FieldElement.label:
					newField = new FieldLabel(field, index)
					break

				case FieldElement.radio:
					newField = new FieldRadio(field, index)
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

	getFieldIdx(fieldName: string) {
		return this.fields.findIndex((f) => f.name == fieldName)
	}

	getFormElement(): HTMLFormElement | undefined {
		const formName = 'form_' + this.name
		const formEl = document.getElementById(formName)
		return formEl ? formEl : undefined
	}

	hasChanged() {
		return this.fields.some((f: Field) => {
			return f.hasChanged
		})
	}

	// async submitForm() {
	// 	if (!this.source) {
	// 		return FormSourceResponse({})
	// 	}

	// 	const responsePromise: Response = await fetch(this.source.processURL, {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			action: 'form_submit',
	// 			formName: this.name,
	// 			source: this.source,
	// 			data: { ...this.dataGet(), ...this.pageData }
	// 		})
	// 	})
	// 	const response = await responsePromise.json()

	// 	// process response
	// 	if (response.message) {
	// 		alert(response.message)
	// 	}
	// 	if (response.success) {
	// 		this.submitResponse = { ...this.values, ...response.data }
	// 	} else {
	// 		this.submitResponse = {}
	// 	}
	// 	return FormSourceResponse(response)
	// }

	preValidate(): boolean {
		let formStatus: ValidationStatus = ValidationStatus.valid
		let fieldValid: boolean

		this.fields.forEach((f) => {
			if (f.isDisplayable && f.isDisplay && f.access !== FieldAccess.readonly) {
				fieldValid = true
				if (f.value.data) {
					const v: Validation = f.validate(f.value.data)
					if (v.status == ValidationStatus.invalid) {
						formStatus = ValidationStatus.invalid
						fieldValid = false
						f.validity = v.validityFields[0].validity
					}
				} else {
					f.setHasChanged(f.value.data)
					if (f.access === FieldAccess.required) {
						// required field/no value
						formStatus = ValidationStatus.invalid
						fieldValid = false
						const v = f.fieldMissingData(f.index)
						f.validity = v.validityFields[0].validity
					}
				}
				if (fieldValid) {
					f.validity = new Validity()
				}
			}
		})
		return formStatus === ValidationStatus.valid
	}

	validate(): Validation {
		// set formData
		let validityFields: Array<ValidityField> = []
		let status: ValidationStatus = ValidationStatus.valid

		// process each field
		this.fields.forEach((f) => {
			if (f.isDisplayable && f.isDisplay && f.access !== FieldAccess.readonly) {
				const v: Validation = f.validate(f.value.data)
				validityFields = [...v.validityFields]
				if (v.status !== ValidationStatus.valid) status = v.status
			}
		})
		return new Validation(ValidationType.form, status, validityFields)
	}
}

class FormDataObjAction {
	name: string
	header: string
	color: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.name = strRequired(obj.name, 'ObjectAction', 'name')
		this.header = strRequired(obj.header, 'ObjectAction', 'header')
		this.color = valueOrDefault(obj.color, 'variant-filled-primary')
	}
}

class FormDataValue {
	name: string
	value: any

	constructor(name: string, value: any) {
		this.name = name
		this.value = value
	}
}
export class FormFooterLink {
	prefix: string
	label: string
	action: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.prefix = valueOrDefault(obj.prefix, '')
		this.label = strRequired(obj.label, 'FooterLink', 'label')
		this.action = strRequired(obj.action, 'FooterLink', 'action')
	}
}
class FormFooterText {
	label: string
	fontSize: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.label = strRequired(obj.label, 'FooterText', 'label')
		this.fontSize = valueOrDefault(obj.fontSize, 'text-base')
	}
}
