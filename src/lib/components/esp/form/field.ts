import { memberOfEnum, strRqd, strLower, valueOrDefault } from '$utils/utils'
import {
	FieldElement,
	Validation,
	ValidationType,
	ValidationStatus,
	Validity,
	ValidityField,
	ValidityType,
	ValidityLevel
} from '$comps/esp/form/types'

const COMPONENT = '/$comps/esp/form/field.ts/'

export class Field {
	index: number
	element: FieldElement
	name: string
	access: FieldAccess
	label: string
	disabled: boolean
	validity: Validity
	value: string

	constructor(obj: {}, index: number) {
		obj = valueOrDefault(obj, {})
		this.index = index
		this.element = memberOfEnum(
			strLower(strRqd(obj.element, COMPONENT + 'Field.element')),
			'FieldElement',
			FieldElement
		)
		this.name = strRqd(obj.name, COMPONENT + 'Field.name')
		this.access = memberOfEnum(
			valueOrDefault(obj.access, FieldAccess.required),
			'FieldAccess',
			FieldAccess
		)
		this.label = strRqd(obj.label, COMPONENT + 'Field.label')
		if (this.access == FieldAccess.optional) {
			this.label += ' (optional)'
		}
		this.disabled = this.access == FieldAccess.displayOnly
		this.validity = new Validity()
		this.value = valueOrDefault(obj.value, '')
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
export enum FieldAccess {
	required = 'required',
	optional = 'optional',
	displayOnly = 'displayonly'
}
