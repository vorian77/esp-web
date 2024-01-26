import { Field, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/types'

export class FieldRadio extends Field {
	constructor(obj: FieldRaw, index: number) {
		super(obj, index)
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
