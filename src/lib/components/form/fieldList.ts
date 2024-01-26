import { Field, type FieldRaw } from '$comps/form/field'
import { valueOrDefault } from '$utils/utils'

const COMPONENT = '/$comps/form/fieldList.ts/'

export class FieldList extends Field {
	constructor(obj: FieldRaw, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
	}
}
