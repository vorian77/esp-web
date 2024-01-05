import { Field } from '$comps/form/field'
import { FieldAccess, memberOfEnum, type FieldRaw } from '$comps/types'
import { valueOrDefault } from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/fieldCustom.ts'

export class FieldCustom extends Field {
	codeType: FieldCustomType
	label: string
	parms:
		| FieldCustomParmsButton
		| FieldCustomParmsHeader
		| FieldCustomParmsLink
		| FieldCustomParmsText
	constructor(obj: FieldRaw, index: number) {
		super(obj, index)
		this.name += '.' + index.toString()
		this.access = FieldAccess.readonly
		const el: any = valueOrDefault(obj.customElement, {})
		this.codeType = memberOfEnum(
			el._type,
			'FieldLabel',
			'codeType',
			'FieldCustomType',
			FieldCustomType
		)
		this.label = el.label
		switch (this.codeType) {
			case FieldCustomType.button:
				this.parms = new FieldCustomParmsButton(el)
				break
			case FieldCustomType.header:
				this.parms = new FieldCustomParmsHeader(el)
				break
			case FieldCustomType.link:
				this.parms = new FieldCustomParmsLink(el)
				break
			case FieldCustomType.text:
				this.parms = new FieldCustomParmsText(el)
				break
			default:
				error(500, {
                					file: FILENAME,
                					function: 'POST',
                					message: `No case defined for type: ${this.codeType}`
                				});
		}
	}
}

export class FieldCustomParmsAction {
	function?: string
	type: string
	value: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.function = obj.function
		this.type = obj.type
		this.value = obj.value
	}
}
export class FieldCustomParmsButton {
	color: string
	action: FieldCustomParmsAction
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.color = obj.color
		this.action = new FieldCustomParmsAction(obj.action)
	}
}
export class FieldCustomParmsHeader {
	size: string
	source: string
	sourceKey: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.size = obj.size
		this.source = obj.source
		this.sourceKey = obj.sourceKey
	}
}

export class FieldCustomParmsLink {
	action: FieldCustomParmsAction
	prefix: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.action = new FieldCustomParmsAction(obj.action)
		this.prefix = obj.prefix
	}
}

export class FieldCustomParmsText {
	align: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.align = obj.align
	}
}

export enum FieldCustomType {
	button = 'button',
	header = 'header',
	link = 'link',
	text = 'text',
	textDynamic = 'textDynamie'
}
