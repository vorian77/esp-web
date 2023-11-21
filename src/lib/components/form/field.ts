import {
	booleanOrFalse,
	memberOfEnum,
	memberOfEnumOrDefault,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import {
	DataFieldDataType,
	FieldAccess,
	FieldElement,
	type RawFormField,
	Validation,
	ValidationType,
	ValidationStatus,
	Validity,
	ValidityField,
	ValidityError,
	ValidityErrorLevel,
	valueHasChanged
} from '$comps/types'

const COMPONENT = '/$comps/form/field.ts/'

export class Field {
	access: FieldAccess
	dataType: DataFieldDataType
	element: FieldElement
	hasChanged: boolean
	isDisplay: boolean
	isDisplayable: boolean
	isMultiSelect: boolean
	index: number
	items: Array<FieldValue> = []
	label: string
	labelSide: string
	name: string
	validity: Validity
	value: FieldValue
	valueSelected: FieldValue

	constructor(obj: RawFormField, index: number) {
		obj = valueOrDefault(obj, {})
		this.access = memberOfEnumOrDefault(
			obj._codeAccess,
			'Field',
			'access',
			'FieldAccess',
			FieldAccess,
			FieldAccess.required
		)
		this.dataType = memberOfEnum(
			obj._column._codeDataType,
			'Field',
			'dataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.element = memberOfEnumOrDefault(
			obj._codeElement,
			'Field',
			'element',
			'FieldElement',
			FieldElement,
			FieldElement.text
		)
		this.hasChanged = false
		this.index = index
		this.isDisplay = valueOrDefault(obj.isDisplay, true)
		this.isDisplayable = valueOrDefault(obj.isDisplayable, true)
		this.isMultiSelect = valueOrDefault(obj._column.isMultiSelect, false)
		this.label = strRequired(obj._column.header, 'Field', 'label')
		this.labelSide = valueOrDefault(obj._column.headerSide, this.label)
		this.name = strRequired(obj._column.name, 'Field', 'name')
		this.validity = new Validity()

		this.items = this.initListItems(obj.items)
		this.value = new FieldValue(undefined, undefined)
		this.valueSelected = this.value
	}

	initListItems(rawItems: any) {
		rawItems = valueOrDefault(rawItems, [])

		let newItems: Array<FieldValue> = []
		rawItems.forEach((i: FieldValue) => {
			newItems.push(new FieldValue(i.data, i.display))
		})

		return newItems
	}

	getValue(formData: FormData) {
		// overridden for FormElInpCheckbox
		return formData.get(this.name)
	}

	setHasChanged(dataValue: any) {
		this.hasChanged = valueHasChanged(this.valueSelected.data, dataValue)
	}

	validate(dataValue: any): Validation {
		this.setHasChanged(dataValue)

		// only validate access types that require validation
		if (![FieldAccess.required, FieldAccess.optional].includes(this.access)) {
			return this.fieldValid(this.index)
		}

		// optional & empty
		if (this.access === FieldAccess.optional && !dataValue) {
			return this.fieldValid(this.index)
		}

		// required
		if (!dataValue) {
			return this.fieldInvalid(
				this.index,
				ValidityError.required,
				ValidityErrorLevel.warning,
				`"${this.label}" is required.`
			)
		}
		return this.fieldNotInvalid(this.index)
	}

	fieldValid(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.valid, [
			new ValidityField(index, new Validity())
		])
	}
	fieldNotInvalid(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.notInvalid, [
			new ValidityField(index, new Validity())
		])
	}
	fieldMissingData(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(
				index,
				new Validity(
					ValidityError.missingData,
					ValidityErrorLevel.warning,
					`"${this.label}" is required.`
				)
			)
		])
	}
	fieldInvalid(index: number, error: ValidityError, level: ValidityErrorLevel, message: string) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(index, new Validity(error, level, message))
		])
	}
}

export class FieldValue {
	data: any
	display: any
	selected: boolean | undefined

	constructor(data: any, display: any, selected = undefined) {
		this.data = data
		this.display = display
		this.selected = selected
	}

	update(newValData: any, newValDisplay: any) {
		this.data = newValData
		this.display = newValDisplay
	}
}
