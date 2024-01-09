const FILENAME = '$comps/form/types.form.field.ts'

export enum FieldAccess {
	readonly = 'readonly',
	hidden = 'hidden',
	optional = 'optional',
	required = 'required'
}

export enum FieldElement {
	checkbox = 'checkbox',
	custom = 'custom',
	date = 'date',
	email = 'email',
	file = 'file',
	number = 'number',
	password = 'password',
	radio = 'radio',
	select = 'select',
	tel = 'tel',
	text = 'text',
	textArea = 'textArea'
}

export interface FieldRaw {
	_codeAccess: string
	_codeElement: string
	_column: {
		_codeAlignment: string
		_codeDataType: string
		_codeDataTypeComputed: string
		classValue: string
		exprSelect: string
		exprStorageKey: string
		header: string
		headerSide: string
		isExcludeInsert: boolean
		isExcludeSelect: boolean
		isExcludeUpdate: boolean
		isMultiSelect: boolean
		isSetBySys: boolean
		matchColumn: string
		maxLength: number
		maxValue: number
		minLength: number
		minValue: number
		name: string
		pattern: string
		patternMsg: string
		patternReplacement: string
		placeHolder: string
	}
	customElement: FieldCustomRaw
	headerAlt: string
	height: number
	isDisplay: boolean
	isDisplayable: boolean
	items: Array<{ data: string; display: string }>
	_itemsList: {
		dbSelect: string
		name: string
		propertyId: string
		propertyLabel: string
	}
	itemsListParms: any
	width: number
}
export interface FieldCustomRaw {
	_type: string
	action: { method: string; type: string; value: string }
	align: string
	color: string
	label: string
	prefix: string
	size: string
	source: string
	sourceKey: string
}
