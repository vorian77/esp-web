import { Field } from '$comps/form/field'
import { FieldAccess, memberOfEnum, type FieldRaw } from '$comps/types'
import { valueOrDefault } from '$utils/utils'

const COMPONENT = '/$comps/form/fieldLabel.ts/'

export class FieldCustom extends Field {
	codeType: FieldCustomType
	parms: any
	constructor(obj: FieldRaw, index: number) {
		super(obj, index)
		obj = valueOrDefault(obj, {})
		this.name += '.' + index.toString()
		this.access = FieldAccess.readonly
		this.codeType = memberOfEnum(
			obj._codeCustomElType,
			'FieldLabel',
			'codeType',
			'FieldCustomType',
			FieldCustomType
		)
		this.parms = obj.customElParms
	}
}

export enum FieldCustomType {
	button = 'button',
	header = 'header',
	link = 'link',
	text = 'text',
	textDynamic = 'textDynamie'
}
