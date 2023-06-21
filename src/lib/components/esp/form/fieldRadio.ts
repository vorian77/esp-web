import { Field } from '$comps/esp/form/field'
import { memberOfEnum, valueOrDefault } from '$utils/utils'
import { FieldElementInputType, Validation, ValidationStatus } from '$comps/esp/form/types'

export class FieldRadio extends Field {
	type: FieldElementInputType
	items: []
	constructor(obj: {}, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
		this.type = memberOfEnum(
			obj.type,
			'FieldRadio',
			'type',
			'FieldElementInputType',
			FieldElementInputType
		)

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
