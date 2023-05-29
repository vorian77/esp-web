import { Field } from '$comps/esp/form/field'
import { memberOfEnum, valueOrDefault } from '$utils/utils'
import { Validation, ValidationStatus } from '$comps/esp/form/form'

export class FieldRadio extends Field {
	type: FieldType
	items: []
	constructor(defn: {}, index: number) {
		super(defn, index)

		defn = valueOrDefault(defn, {})
		// this.type = (defn.type, 'FieldType', FieldType)
		this.type = memberOfEnum(defn.type, 'FieldType', FieldType)

		this.items = valueOrDefault(defn.items, [])
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

export enum FieldType {
	checkbox = 'radio'
}
