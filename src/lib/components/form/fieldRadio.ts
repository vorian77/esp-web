import { Field, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus, booleanOrFalse } from '$comps/types'

export class FieldRadio extends Field {
	isDisplayBlock: boolean
	constructor(obj: FieldRaw, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldRadio'
		super(obj, index, isFirstVisible)
		this.isDisplayBlock = booleanOrFalse(obj.isDisplayBlock, clazz)
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
