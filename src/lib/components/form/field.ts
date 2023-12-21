import {
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	required,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import {
	DataFieldDataType,
	FieldAccess,
	FieldElement,
	type FieldRaw,
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
	colorBackground: string
	dataType: DataFieldDataType
	dataTypePreset: DataFieldDataType | undefined
	element: FieldElement
	hasChanged: boolean
	isDisplay: boolean
	isDisplayable: boolean
	isMultiSelect: boolean
	index: number
	items: Array<FieldValue>
	itemsList: FieldItemsList | undefined
	label: string
	labelSide: string
	name: string
	validity: Validity
	valueInitial: FieldValue
	valueCurrent: FieldValue

	constructor(obj: FieldRaw, index: number) {
		obj = valueOrDefault(obj, {})
		this.access = memberOfEnumOrDefault(
			obj._codeAccess,
			'Field',
			'access',
			'FieldAccess',
			FieldAccess,
			FieldAccess.required
		)
		this.colorBackground =
			this.access === FieldAccess.required
				? 'bg-blue-100'
				: this.access == FieldAccess.readonly
				  ? 'bg-gray-200'
				  : 'bg-white'
		this.dataType = memberOfEnum(
			obj._column._codeDataType,
			'Field',
			'dataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.dataTypePreset = obj._column._codeDataTypePreset
			? memberOfEnum(
					obj._column._codeDataTypePreset,
					'Field',
					'dataType',
					'DataFieldDataType',
					DataFieldDataType
			  )
			: undefined
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
		this.items = this.initItems(obj.items)
		this.itemsList = obj._itemsList
			? new FieldItemsList(obj._itemsList, obj.itemsListParms)
			: undefined
		this.label = strRequired(obj.headerAlt || obj._column.header, 'Field', 'label')
		this.labelSide = valueOrDefault(obj._column.headerSide, this.label)
		this.name = strRequired(obj._column.name, 'Field', 'name')
		this.validity = new Validity()
		this.valueInitial = new FieldValue(undefined, undefined, [])
		this.valueCurrent = new FieldValue(undefined, undefined, [])
	}

	getValue(formData: FormData) {
		// overridden for FormElInpCheckbox
		return formData.get(this.name)
	}
	initItems(items: Array<{ data: any; display: any }>) {
		items = getArray(items)
		let newItems: Array<FieldValue> = []
		items.forEach((item) => {
			newItems.push(new FieldValue(item.data, item.display, []))
		})
		return newItems
	}
	setHasChanged(dataValue: any) {
		this.hasChanged = valueHasChanged(this.valueInitial.data, dataValue)
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

export class FieldItemsList {
	dbSelect: string
	name: string
	parms: any
	propertyId: string
	propertyLabel: string
	constructor(obj: any, parms: any) {
		const clazz = 'FieldItemList'
		obj = valueOrDefault(obj, {})
		this.dbSelect = strRequired(obj.dbSelect, clazz, 'dbSelect')
		this.name = strRequired(obj.name, clazz, 'name')
		this.parms = parms
		this.propertyId = strRequired(obj.propertyId, clazz, 'propertyId')
		this.propertyLabel = strRequired(obj.propertyLabel, clazz, 'propertyLabel')
	}
}

export type FieldItems = Array<FieldValue>

export class FieldValue {
	data: any
	display: any
	items: FieldItems
	selected: boolean | undefined
	constructor(
		data: any,
		display: any,
		items: FieldItems,
		selected: boolean | undefined = undefined
	) {
		this.data = data
		this.display = display
		this.items = items
		this.selected = selected
	}
	static duplicate(value: FieldValue) {
		return new FieldValue(value.data, value.display, value.items, value.selected)
	}
	resetData() {
		this.data = null
		this.display = null
		this.selected = undefined
	}
	update(newValData: any, newValDisplay: any) {
		this.data = newValData
		this.display = newValDisplay
	}
}
