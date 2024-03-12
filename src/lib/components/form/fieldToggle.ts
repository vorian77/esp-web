import { Field, FieldAccess, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus, valueOrDefault } from '$comps/types'

export class FieldToggle extends Field {
	valueFalse: string
	valueShow: boolean
	valueTrue: string
	constructor(obj: any, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		this.access = FieldAccess.optional
		this.valueFalse = valueOrDefault(obj._column.toggleValueFalse, undefined)
		this.valueShow = valueOrDefault(obj._column.toggleValueShow, false)
		this.valueTrue = valueOrDefault(obj._column.toggleValueTrue, undefined)
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
