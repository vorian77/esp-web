import { Field, FieldAccess, FieldItem, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/types'
import { booleanOrFalse, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class FieldListChips extends Field {
	btnLabelComplete?: string
	columnLabelDisplay: string
	dataObjName: string
	header: string
	headerSub?: string
	isMultiSelect: boolean
	itemsList: Array<FieldItem> = []
	itemsSelected: string[] = []
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldListChips'
		super(obj, index)
		this.access = FieldAccess.optional
		this.columnLabelDisplay = strRequired(
			obj._fieldListChips.columnLabelDisplay,
			clazz,
			'columnLabelDisplay'
		)
		this.dataObjName = strRequired(obj._fieldListChips._dataObjName, clazz, 'dataObjName')
		this.header = strRequired(obj._fieldListChips.header, clazz, 'header')
		this.headerSub = strOptional(obj._fieldListChips.headerSub, clazz, 'headerSub')
		this.isMultiSelect = booleanOrFalse(obj._fieldListChips.isMultiSelect, 'isMultiSelect')
	}
	getItemsDisplay() {
		console.log('getItemsDisplay:', { itemsSelected: this.itemsSelected })
		let items: Array<FieldItem> = []
		this.itemsList.forEach((item) => {
			if (this.itemsSelected.includes(item.data)) items.push(item)
		})
		return items
	}
	setSelected(selected: string[]) {
		this.itemsSelected = selected
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
