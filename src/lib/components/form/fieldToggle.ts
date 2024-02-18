import { Field, FieldAccess, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/types'

export class FieldToggle extends Field {
	labelFalse?: string
	labelTrue?: string
	constructor(obj: any, index: number) {
		super(obj, index)
		this.access = FieldAccess.optional
		this.labelFalse = obj._column.toggleLabelFalse
		this.labelTrue = obj._column.toggleLabelTrue
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
