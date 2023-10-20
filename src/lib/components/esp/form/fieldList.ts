import { Field } from '$comps/esp/form/field'
import { FieldAccess } from '$comps/types'

import { valueOrDefault } from '$utils/utils'

const COMPONENT = '/$comps/esp/form/fieldList.ts/'

export class FieldList extends Field {
	constructor(obj: {}, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
	}
}
