import { Field, FieldAccess, type FieldRaw, type FieldCustomRaw } from '$comps/form/field'
import { memberOfEnum, strRequired, valueOrDefault } from '$comps/types'
import { getEnhancement } from '$enhance/actions/_actions'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/form/fieldCustom.ts'

export class FieldCustom extends Field {
	codeType: FieldCustomType
	label: string
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldCustom'
		super(obj, index)
		this.name += '.' + index.toString()
		this.access = FieldAccess.readonly
		const el: any = valueOrDefault(obj.customElement, {})
		this.codeType = memberOfEnum(el._type, clazz, 'codeType', 'FieldCustomType', FieldCustomType)
		this.label = el.label
	}
}

export class FieldCustomAction extends FieldCustom {
	enhancement: Function | undefined
	method: string
	type: string
	value: string
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldCustomAction'
		super(obj, index)
		const el: FieldCustomRaw = valueOrDefault(obj.customElement, {})
		this.method = strRequired(el.action.method, clazz, 'method').toLowerCase()
		this.type = strRequired(el.action.type, clazz, 'type').toLowerCase()
		this.value = valueOrDefault(el.action.value, '').toLowerCase()
	}
	async initAction() {
		this.enhancement = await getEnhancement(this.method)
	}
}

export class FieldCustomActionButton extends FieldCustomAction {
	color: string
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldCustomActionButton'
		super(obj, index)
		const el: FieldCustomRaw = valueOrDefault(obj.customElement, {})
		this.color = el.color
	}
}
export class FieldCustomActionLink extends FieldCustomAction {
	prefix: string
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldCustomActionLink'
		super(obj, index)
		const el: FieldCustomRaw = valueOrDefault(obj.customElement, {})
		this.prefix = el.prefix
	}
}

export class FieldCustomHeader extends FieldCustom {
	size: string
	source: string
	sourceKey: string
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldCustomHeader'
		super(obj, index)
		const el: FieldCustomRaw = valueOrDefault(obj.customElement, {})
		this.size = el.size
		this.source = el.source
		this.sourceKey = el.sourceKey
	}
}

export class FieldCustomText extends FieldCustom {
	align: string
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldCustomText'
		super(obj, index)
		const el: FieldCustomRaw = valueOrDefault(obj.customElement, {})
		this.align = el.align
	}
}

export enum FieldCustomType {
	button = 'button',
	header = 'header',
	link = 'link',
	text = 'text',
	textDynamic = 'textDynamic'
}
