import { Field } from '$comps/esp/form/field'
import { memberOfEnum, valueOrDefault } from '$utils/utils'
import { Validation, ValidationStatus } from '$comps/esp/form/form'

export class FieldTextarea extends Field {
	rows: number
	cols: number
	constructor(defn: {}, index: number) {
		super(defn, index)

		defn = valueOrDefault(defn, {})
		this.rows = valueOrDefault(defn.rows, 4)
		this.cols = valueOrDefault(defn.cols, 50)
	}
	validate(formData): Validation {
		const v = super.validate(formData)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index, v.data)
	}
}
