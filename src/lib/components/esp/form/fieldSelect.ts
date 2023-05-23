import { Field } from '$comps/esp/form/field'
import { valueOrDefault } from '$utils/utils'
import { Validation, ValidationStatus } from '$comps/esp/form/form'

export class FieldSelect extends Field {
	items: []
	constructor(defn: {}, index: number) {
		super(defn, index)

		defn = valueOrDefault(defn, {})

		this.items = valueOrDefault(defn.items, [])
		this.items = this.initItems(this.items)
	}
	validate(formData): Validation {
		const v = super.validate(formData)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		console.log('fieldSelect.index:', this.index)
		return this.fieldValid(this.index, v.data)
	}
}
