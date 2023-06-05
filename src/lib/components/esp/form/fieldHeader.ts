import { Field } from '$comps/esp/form/field'
import { valueOrDefault } from '$utils/utils'
import { FieldAccess } from '$comps/esp/form/types'

export class FieldHeader extends Field {
	label: string
	value: string

	constructor(obj: {}, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
		this.label = valueOrDefault(obj.label, '')
		this.value = valueOrDefault(obj.value, '')
		this.access = FieldAccess.displayOnly
	}
}
