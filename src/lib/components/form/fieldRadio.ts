import { Field, type FieldValue } from '$comps/form/field'
import { valueOrDefault } from '$utils/utils'
import { type RawFormField, Validation, ValidationStatus } from '$comps/types'

export class FieldRadio extends Field {
	constructor(obj: RawFormField, index: number) {
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
