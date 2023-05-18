import { Field } from '$comps/esp/form/field'
import { memberOfEnum, valueOrDefault } from '$utils/utils'

export class FieldCheckbox extends Field {
	type: FieldType
	items: []
	constructor(defn: {}) {
		super(defn)

		defn = valueOrDefault(defn, {})
		this.type = memberOfEnum(defn.type, FieldType)

		this.items = valueOrDefault(defn.items, [])
		this.items = this.initItems(this.items)
	}
}

export enum FieldType {
	checkbox = 'checkbox'
}
