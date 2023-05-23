import { pipe, strRqd, strLower, valueOrDefault } from '$utils/utils'
import {
	Validation,
	ValidationType,
	ValidationStatus,
	Validity,
	ValidityField,
	ValidityType,
	ValidityLevel
} from '$comps/esp/form/form'

export class Field {
	index: number
	element: FieldElement
	name: string
	label: string
	access: FieldAccess
	disabled: boolean
	validity: Validity
	value: string

	constructor(defn: {}, index: number) {
		this.index = index
		defn = valueOrDefault(defn, {})
		this.element = pipe(defn.element, strRqd, strLower)
		this.name = strRqd(defn.name, 'field.name')
		this.label = strRqd(defn.label, 'field.label')
		this.access = valueOrDefault(defn.access, FieldAccess.required)
		this.disabled = this.access == FieldAccess.displayOnly
		this.validity = new Validity()
		this.value = valueOrDefault(defn.value, '')
	}
	// UTILITY METHODS
	initItems(itemsDefn) {
		let items = []
		itemsDefn.forEach((i) => {
			items.push(new FieldItem(i.id, i.label))
		})
		return items
	}
	validate(formData): Validation {
		const fieldValue = this.validateFieldValue(formData)

		// only validate access types that require validation
		const evalutedAccessTypes = new Set([FieldAccess.required, FieldAccess.optional])
		if (!evalutedAccessTypes.has(this.access)) {
			return this.fieldValid(this.index, fieldValue)
		}
		// optional & empty
		if (this.access == FieldAccess.optional && !fieldValue) {
			return this.fieldValid(this.index, fieldValue)
		}
		// required
		if (this.access == FieldAccess.required && !fieldValue) {
			return this.fieldInvalid(
				this.index,
				ValidityType.required,
				`"${this.label}" is required.`,
				ValidityLevel.warning
			)
		}
		return this.fieldNotInvalid(this.index, fieldValue)
	}
	validateFieldValue(formData) {
		return formData.get(this.name)
	}
	fieldValid(index: number, fieldValue: any) {
		return new Validation(
			ValidationType.field,
			ValidationStatus.valid,
			[new ValidityField(index, new Validity())],
			fieldValue
		)
	}
	fieldNotInvalid(index: number, fieldValue: any) {
		return new Validation(
			ValidationType.field,
			ValidationStatus.notinvalid,
			[new ValidityField(index, new Validity())],
			fieldValue
		)
	}
	fieldInvalid(index: number, type: ValidityType, message: string, level: ValidityLevel) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(index, new Validity(type, message, level))
		])
	}
}

export enum FieldAccess {
	required = 'required',
	optional = 'optional',
	displayOnly = 'displayonly'
}
export enum FieldElement {
	input = 'input',
	select = 'select',
	textarea = 'textarea'
}
export class FieldItem {
	id: number
	label: string
	selected: boolean

	constructor(id: number, label: string, selected = false) {
		this.id = id
		this.label = label
		this.selected = selected
	}
}
