import { Field, FieldAccess, FieldItem, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/types'
import { booleanOrFalse, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class FieldListChips extends Field {
	btnLabelComplete?: string
	columnLabelDisplay: string
	dataObjName: string
	isMultiSelect: boolean
	valuesRaw: FieldListChipValues = []
	valuesSelected: FieldListChipValues = []
	constructor(obj: FieldRaw, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldListChips'
		super(obj, index, isFirstVisible)
		this.access = FieldAccess.optional
		this.btnLabelComplete = strOptional(
			obj._fieldListChips.btnLabelComplete,
			clazz,
			'btnLabelComplete'
		)
		this.columnLabelDisplay = strRequired(
			obj._fieldListChips.columnLabelDisplay,
			clazz,
			'columnLabelDisplay'
		)
		this.dataObjName = strRequired(obj._fieldListChips._dataObjName, clazz, 'dataObjName')
		this.isMultiSelect = booleanOrFalse(obj._fieldListChips.isMultiSelect, 'isMultiSelect')
	}
	setSelected(rows: Array<Record<string, any>>) {
		this.valuesSelected = rows.map((row) => ({ id: row.id, value: row[this.columnLabelDisplay] }))
		this.valueCurrent = rows.map((row) => row.id)
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}

export type FieldListChipValues = Array<{ id: string; value: any }>
