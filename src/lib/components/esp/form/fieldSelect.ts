import { Field } from '$comps/esp/form/field'
import { valueOrDefault } from '$utils/utils'
import { Validation, ValidationStatus } from '$comps/types'

export class FieldSelect extends Field {
	items: []
	constructor(obj: {}, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})

		this.items = valueOrDefault(obj.items, [])
		this.items = this.initItems(this.items)
	}
	validate(formData): Validation {
		const v = super.validate(formData)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index, v.data)
	}
}
