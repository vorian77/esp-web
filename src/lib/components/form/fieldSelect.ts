import { Field, type FieldValue } from '$comps/form/field'
import { valueOrDefault } from '$utils/utils'
import { type FieldRaw, Validation, ValidationStatus } from '$comps/types'

export class FieldSelect extends Field {
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
