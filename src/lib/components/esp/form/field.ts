import { memberOfEnum, memberOfEnumOrDefault, strRequired, valueOrDefault } from '$utils/utils'
import {
	FieldAccess,
	FieldElement,
	Validation,
	ValidationType,
	ValidationStatus,
	Validity,
	ValidityField,
	ValidityError,
	ValidityErrorLevel
} from '$comps/types'

const COMPONENT = '/$comps/esp/form/field.ts/'

export class Field {
	index: number
	element: FieldElement
	name: string
	access: FieldAccess
	label: string
	validity: Validity
	value: string
	hasChanged: boolean

	constructor(obj: {}, index: number) {
		obj = valueOrDefault(obj, {})
		this.index = index
		this.element = memberOfEnumOrDefault(
			obj.element,
			'Field',
			'element',
			'FieldElement',
			FieldElement,
			FieldElement.input
		)
		this.name = strRequired(obj.name, 'Field', 'name')
		this.access = memberOfEnumOrDefault(
			obj.access,
			'Field',
			'access',
			'FieldAccess',
			FieldAccess,
			FieldAccess.required
		)
		this.label = valueOrDefault(obj.label, '')
		if (this.label && this.access == FieldAccess.optional) {
			this.label += ' (optional)'
		}
		this.validity = new Validity()
		this.value = valueOrDefault(obj.value, '')
		this.hasChanged = false
	}

	// UTILITY METHODS
	initItems(itemsDefn) {
		let items = []
		itemsDefn.forEach((i) => {
			items.push(new FieldItem(i.id, i.label))
		})
		return items
	}
	getValue(formData) {
		// overridden for checkBox
		return formData.get(this.name)
	}
	validate(formData): Validation {
		const fieldValue = this.getValue(formData)
		this.hasChanged = this.value != fieldValue

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
		if (!fieldValue) {
			return this.fieldInvalid(
				this.index,
				ValidityError.required,
				ValidityErrorLevel.warning,
				`"${this.label}" is required.`
			)
		}
		return this.fieldNotInvalid(this.index, fieldValue)
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
			ValidationStatus.notInvalid,
			[new ValidityField(index, new Validity())],
			fieldValue
		)
	}
	fieldMissingData(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(index, new Validity(ValidityError.missingData, ValidityErrorLevel.none, ''))
		])
	}
	fieldInvalid(index: number, error: ValidityError, level: ValidityErrorLevel, message: string) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(index, new Validity(error, level, message))
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
