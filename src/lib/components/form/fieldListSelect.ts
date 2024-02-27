import { Field, FieldAccess, FieldItem, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/types'
import { booleanOrFalse, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class FieldListSelect extends Field {
	btnLabelComplete?: string
	dataObjName: string
	isMultiSelect: boolean
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldListSelect'
		super(obj, index)
		this.access = FieldAccess.optional
		this.btnLabelComplete = strOptional(
			obj._fieldListChips.btnLabelComplete,
			clazz,
			'btnLabelComplete'
		)
		this.dataObjName = strRequired(obj._fieldListChips._dataObjName, clazz, 'dataObjName')
		this.isMultiSelect = booleanOrFalse(obj._fieldListChips.isMultiSelect, 'isMultiSelect')
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
