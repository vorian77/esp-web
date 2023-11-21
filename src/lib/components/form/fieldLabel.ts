import { Field } from '$comps/form/field'
import { FieldAccess, type RawFormField } from '$comps/types'
import { valueOrDefault } from '$utils/utils'

const COMPONENT = '/$comps/form/fieldLabel.ts/'

export class FieldLabel extends Field {
	labelDynamicKey: string
	labelDynamicSource: string
	labelHeader: string
	labelText: string

	constructor(obj: RawFormField, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
		this.name += '.' + index.toString()
		this.labelDynamicKey = valueOrDefault(obj.labelDynamicKey, '')
		this.labelDynamicSource = valueOrDefault(obj.labelDynamicSource, '')
		this.labelHeader = valueOrDefault(obj.labelHeader, '')
		this.labelText = valueOrDefault(obj.labelText, '')
		this.access = FieldAccess.readonly
	}
}
