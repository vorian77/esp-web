import { Field } from '$comps/esp/form/field'
import { valueOrDefault } from '$utils/utils'
import { Validation, ValidationStatus } from '$comps/esp/form/types'

export class FieldTextarea extends Field {
	rows: number
	cols: number
	constructor(obj: {}, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
		this.rows = valueOrDefault(obj.rows, 4)
		this.cols = valueOrDefault(obj.cols, 50)
	}
	validate(formData): Validation {
		const v = super.validate(formData)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index, v.data)
	}
}
