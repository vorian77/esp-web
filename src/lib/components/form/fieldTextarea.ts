import { Field } from '$comps/form/field'
import { valueOrDefault } from '$utils/utils'
import { type FieldRaw, Validation, ValidationStatus } from '$comps/types'

export class FieldTextarea extends Field {
	rows: number
	cols: number
	classValue: string

	constructor(obj: FieldRaw, index: number) {
		super(obj, index)
		obj = valueOrDefault(obj, {})
		this.rows = valueOrDefault(obj.height, 3)
		this.cols = valueOrDefault(obj.width, 0)
		this.classValue = valueOrDefault(obj._column.classValue, '')
	}

	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
