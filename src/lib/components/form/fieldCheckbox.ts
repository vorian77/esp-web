import { Field, type FieldRaw } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/types'

export class FieldCheckbox extends Field {
	constructor(obj: FieldRaw, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
	}
	validate(dataValue: any): Validation {
		if (!this.isMultiSelect && [true, false].includes(dataValue)) {
			this.setHasChanged(dataValue)
			return this.fieldValid(this.index)
		}
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
