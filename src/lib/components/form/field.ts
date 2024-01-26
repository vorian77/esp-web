import {
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	required,
	strOptional,
	strRequired,
	valueOrDefault
} from '$utils/utils'
import {
	DataFieldDataType,
	DataFieldMask,
	Validation,
	ValidationType,
	ValidationStatus,
	Validity,
	ValidityField,
	ValidityError,
	ValidityErrorLevel,
	valueHasChanged
} from '$comps/types'

const COMPONENT = '/$comps/form/field.ts/'

export class Field {
	access: FieldAccess
	colorBackground: string
	dataType: DataFieldDataType
	dataTypePreset: DataFieldDataType | undefined
	element: FieldElement
	hasChanged: boolean
	isDisplay: boolean
	isDisplayable: boolean
	isMultiSelect: boolean
	index: number
	items: Array<FieldItem> = []
	itemsDb: FieldItemsDb | undefined
	label: string
	labelSide: string
	name: string
	validity: Validity
	valueInitial: any
	valueCurrent: any

	constructor(obj: FieldRaw, index: number) {
		obj = valueOrDefault(obj, {})
		this.access = memberOfEnumOrDefault(
			obj._codeAccess,
			'Field',
			'access',
			'FieldAccess',
			FieldAccess,
			FieldAccess.required
		)
		this.colorBackground =
			this.access === FieldAccess.required
				? 'bg-blue-100'
				: this.access == FieldAccess.readonly
					? 'bg-gray-200'
					: 'bg-white'
		this.dataType = memberOfEnum(
			obj._column._codeDataType,
			'Field',
			'dataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.element = memberOfEnumOrDefault(
			obj._codeElement,
			'Field',
			'element',
			'FieldElement',
			FieldElement,
			FieldElement.text
		)
		this.hasChanged = false
		this.index = index
		this.isDisplay = valueOrDefault(obj.isDisplay, true)
		this.isDisplayable = valueOrDefault(obj.isDisplayable, true)
		this.isMultiSelect = valueOrDefault(obj._column.isMultiSelect, false)
		this.items = valueOrDefault(obj.items, [])
		this.itemsDb = obj._itemsDb ? new FieldItemsDb(obj._itemsDb, obj.itemsDbParms) : undefined
		this.label = strRequired(obj.headerAlt || obj._column.header, 'Field', 'label')
		this.labelSide = valueOrDefault(obj._column.headerSide, this.label)
		this.name = strRequired(obj.nameCustom || obj._column.name, 'Field', 'name')
		this.validity = new Validity()
		this.valueInitial = null
		this.valueCurrent = null
	}

	copyValue(value: any) {
		return structuredClone(value)
	}

	getValue(formData: FormData) {
		// overridden for FormElInpCheckbox
		return formData.get(this.name)
	}

	setHasChanged(dataValue: any) {
		this.hasChanged = valueHasChanged(this.valueInitial, dataValue)
	}
	validate(dataValue: any): Validation {
		this.setHasChanged(dataValue)

		// only validate access types that require validation
		if (![FieldAccess.required, FieldAccess.optional].includes(this.access)) {
			return this.fieldValid(this.index)
		}

		// optional & empty
		if (this.access === FieldAccess.optional && !dataValue) {
			return this.fieldValid(this.index)
		}

		// required
		if (!dataValue) {
			return this.fieldInvalid(
				this.index,
				ValidityError.required,
				ValidityErrorLevel.warning,
				`"${this.label}" is required.`
			)
		}
		return this.fieldNotInvalid(this.index)
	}

	fieldValid(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.valid, [
			new ValidityField(index, new Validity())
		])
	}
	fieldNotInvalid(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.notInvalid, [
			new ValidityField(index, new Validity())
		])
	}
	fieldMissingData(index: number) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(
				index,
				new Validity(
					ValidityError.missingData,
					ValidityErrorLevel.warning,
					`"${this.label}" is required.`
				)
			)
		])
	}
	fieldInvalid(index: number, error: ValidityError, level: ValidityErrorLevel, message: string) {
		return new Validation(ValidationType.field, ValidationStatus.invalid, [
			new ValidityField(index, new Validity(error, level, message))
		])
	}
}

export enum FieldAccess {
	readonly = 'readonly',
	hidden = 'hidden',
	optional = 'optional',
	required = 'required'
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

export class FieldItemsDb {
	codeDataTypeDisplay: DataFieldDataType | undefined
	codeMask: DataFieldMask | undefined
	exprSelect: string
	name: string
	parms: any
	constructor(obj: any, parms: any) {
		const clazz = 'FieldItemsDb'
		obj = valueOrDefault(obj, {})
		this.codeDataTypeDisplay = obj._codeDataTypeDisplay
			? memberOfEnum(
					obj._codeDataTypeDisplay,
					clazz,
					'codeDataTypeDisplay',
					'DataFieldDataType',
					DataFieldDataType
				)
			: undefined
		this.codeMask = obj._codeMask
			? memberOfEnum(obj._codeMask, clazz, 'codeMask', 'DataFieldMask', DataFieldMask)
			: undefined
		this.exprSelect = strRequired(obj.exprSelect, clazz, 'exprSelect')
		this.name = strRequired(obj.name, clazz, 'name')
		this.parms = parms
	}
}

export class FieldItem {
	data: any
	display: any
	selected?: boolean
	constructor(data: any, display: any, selected: boolean | undefined = false) {
		this.data = data
		this.display = display
		this.selected = selected
	}
}

export type FieldItemsRecord = Record<string, Array<FieldItem>>

export interface FieldRaw {
	_codeAccess: string
	_codeElement: string
	_column: {
		_codeAlignment: string
		_codeDataType: string
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
		spinStep: string
	}
	_itemsDb: {
		_codeDataTypeDisplay: string
		_codeMask: string
		exprSelect: string
		name: string
	}
	customElement: FieldCustomRaw
	headerAlt: string
	height: number
	isDisplay: boolean
	isDisplayable: boolean
	items: Array<FieldItem>
	itemsDbParms: any
	nameCustom: string
	width: number
}

export class BinarySelect {
	BinarySelectTypes: Partial<Record<DataFieldDataType, [any, any]>> = {
		bool: [true, false],
		int16: [1, 0],
		str: ['Yes', 'No']
	}
	currentValue: any
	isBinarySelect: boolean
	selections: any
	constructor(dataType: DataFieldDataType, value: any) {
		const clazz = 'BinarySelect'
		this.isBinarySelect = [
			DataFieldDataType.bool,
			DataFieldDataType.int16,
			DataFieldDataType.str
		].includes(dataType)
		if (this.isBinarySelect) {
			this.selections = this.BinarySelectTypes[dataType]
			const idx = this.getIdx(value)
			this.currentValue = idx > -1 ? idx : this.selections[1]
		}
	}

	changeValue() {
		this.currentValue = this.selections[(this.getIdx(this.currentValue) + 1) % 2]
		return this.currentValue
	}

	getIdx(value: any) {
		return this.selections.findIndex((s: any) => {
			return s === value
		})
	}

	getValue() {
		return this.currentValue
	}

	isChecked() {
		return this.isBinarySelect ? this.currentValue === this.selections[0] : false
	}
}
