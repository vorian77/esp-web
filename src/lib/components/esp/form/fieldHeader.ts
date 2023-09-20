import { Field } from '$comps/esp/form/field'
import { FieldAccess } from '$comps/types'

import { valueOrDefault } from '$utils/utils'

const COMPONENT = '/$comps/esp/form/fieldHeader.ts/'

export class FieldHeader extends Field {
	staticLabel: string
	dynamicLabelKey: string

	constructor(obj: {}, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
		this.staticLabel = valueOrDefault(obj.staticLabel, '')
		this.dynamicLabelKey = valueOrDefault(obj.dynamicLabelKey, '')
		this.access = FieldAccess.readonly
	}
}
