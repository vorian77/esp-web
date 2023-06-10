import { Field } from '$comps/esp/form/field'
import { FieldAccess } from '$comps/esp/form/types'

import { strRequired, valueOrDefault, getArray } from '$utils/utils'

const COMPONENT = '/$comps/esp/form/fieldHeader.ts/'

export class FieldHeader extends Field {
	staticLabel: string
	dynamicLabel: DynamicLabel | undefined

	constructor(obj: {}, index: number) {
		console.log('fieldHeader...')
		console.log('field:', obj)
		super(obj, index)

		obj = valueOrDefault(obj, {})
		this.staticLabel = valueOrDefault(obj.label, '')
		this.dynamicLabel = obj.value ? new DynamicLabel(obj.value) : undefined
		this.access = FieldAccess.displayOnly
	}
}

export class DynamicLabel {
	source: string
	path: Array<string>

	constructor(obj) {
		obj = valueOrDefault(obj, {})
		this.source = strRequired(obj.source, COMPONENT + 'DynamicLabel.source')
		this.path = getArray(obj.path)
	}
}
