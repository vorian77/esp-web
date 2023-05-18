import { Field } from '$comps/esp/form/field'
import { valueOrDefault } from '$utils/utils'

export class FieldSelect extends Field {
	items: []
	constructor(defn: {}) {
		super(defn)

		defn = valueOrDefault(defn, {})

		this.items = valueOrDefault(defn.items, [])
		this.items = this.initItems(this.items)
	}
}
