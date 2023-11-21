import { Field } from '$comps/form/field'
import type { RawFormField } from '$comps/types'

import { valueOrDefault } from '$utils/utils'

const COMPONENT = '/$comps/form/fieldList.ts/'

export class FieldList extends Field {
	constructor(obj: RawFormField, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
	}
}
