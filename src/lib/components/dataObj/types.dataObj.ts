import {
	FieldAccess,
	FieldElement,
	type FieldRaw,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	required,
	strOptional,
	strRequired,
	Table,
	valueOrDefault,
	Validation,
	ValidationType,
	ValidationStatus,
	Validity,
	ValidityError,
	ValidityErrorLevel,
	ValidityField
} from '$comps/types'
import { type Field, FieldValue } from '$comps/form/field'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import {
	FieldCustomAction,
	FieldCustomActionButton,
	FieldCustomActionLink,
	FieldCustomHeader,
	FieldCustomText,
	FieldCustomType
} from '$comps/form/fieldCustom'
import { FieldInput } from '$comps/form/fieldInput'
import { FieldFile } from '$comps/form/fieldFile'
import { FieldRadio } from '$comps/form/fieldRadio'
import { FieldSelect } from '$comps/form/fieldSelect'
import { FieldTextarea } from '$comps/form/fieldTextarea'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.ts'

export class DataObj {
	actions: Array<DataObjAction>
	cardinality: DataObjCardinality
	component: DataObjComponent
	crumbs: Array<any> = []
	dataListRecord: DataObjListRecord = []
	data: DataObjData
	dataObjRaw: DataObjRaw
	description: string
	exprObject: string | undefined
	fields: Array<Field>
	header: string
	isPopup: boolean
	name: string
	orderItems: DataObjListOrder
	subHeader: string
	table: Table | undefined

	constructor(dataObjRaw: DataObjRaw) {
		dataObjRaw = valueOrDefault(dataObjRaw, {})
		this.actions = this.initActions(dataObjRaw._actions)
		this.cardinality = memberOfEnum(
			dataObjRaw._codeCardinality,
			'DataObj',
			'cardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.component = memberOfEnum(
			dataObjRaw._codeComponent,
			'DataObj',
			'component',
			'DataObjComponent',
			DataObjComponent
		)
		this.crumbs = this.initCrumbs(dataObjRaw._fieldsElCrumb)
		this.dataObjRaw = dataObjRaw
		this.data = new DataObjData(this.cardinality, [])
		this.description = valueOrDefault(dataObjRaw.description, '')
		this.exprObject = strOptional(dataObjRaw.exprObject, 'DataObj', 'exprObject')
		this.fields = this.initFields(dataObjRaw._fieldsEl)
		this.header = valueOrDefault(dataObjRaw.header, '')
		this.orderItems = this.initOrderItems(dataObjRaw._fieldsDbOrder)
		this.isPopup = valueOrDefault(dataObjRaw.isPopup, false)
		this.name = strRequired(dataObjRaw.name, 'DataObj', 'name')
		if (dataObjRaw._table) this.table = new Table(dataObjRaw._table)
		this.subHeader = valueOrDefault(dataObjRaw.subHeader, '')
	}

	static async constructorCustomActions(dataObjRaw: DataObjRaw) {
		const dataObj = new DataObj(dataObjRaw)
		dataObj.fields.forEach(async (f) => {
			if (f instanceof FieldCustomAction) await f.initAction()
		})
		return dataObj
	}

	get objData() {
		let dataObjList: DataObjListRow = []
		switch (this.data.cardinality) {
			case DataObjCardinality.list:
				break

			case DataObjCardinality.detail:
				const record: DataObjRecord = {}
				this.fields.forEach((f) => {
					record[f.name] = f.valueCurrent
				})
				dataObjList.push(new DataObjRow(this.data.getRowStatus(), record))
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'objData',
					message: `No case defined for cardinality: ${this.data.cardinality} in form: ${this.name}`
				})
		}
		return new DataObjData(this.cardinality, dataObjList, this.data.callbacks)
	}
	set objData(dataSource: DataObjData) {
		this.data = dataSource
		switch (this.data.cardinality) {
			case DataObjCardinality.list:
				this.dataListRecord = dataSource.dataObjList.map((row: DataObjRow) => {
					let newRecord: DataObjRecord = {}
					for (let key in row.record) {
						newRecord[key] = row.record[key]
					}
					return newRecord
				})
				break

			case DataObjCardinality.detail:
				if (dataSource.dataObjRow) {
					const dataRow = dataSource.dataObjRow
					// console.log('dataObj.objData.dataRow.status:', dataRow.status)
					if (dataRow.record) {
						this.fields.forEach((f) => {
							if (Object.hasOwn(dataRow.record, f.name)) {
								f.valueCurrent = FieldValue.duplicate(dataRow.record[f.name])
								f.valueInitial = FieldValue.duplicate(dataRow.record[f.name])
							} else if (dataRow?.status === DataObjRowStatus.created) {
								f.valueCurrent.resetData()
								f.valueInitial.resetData()
							} else if (dataRow?.status === DataObjRowStatus.updated) {
								f.valueInitial = FieldValue.duplicate(f.valueCurrent)
							}
						})
					}
				}
				// console.log('dataObj.objData.fields:', this.fields)
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'objData',
					message: `No case defined for cardinality: ${this.data.cardinality} in form: ${this.name}`
				})
		}
	}

	getFieldIdx(fieldName: string) {
		return this.fields.findIndex((f) => f.name == fieldName)
	}

	getFieldValue(fieldName: string) {
		const idx = this.getFieldIdx(fieldName)
		return idx < 0 ? undefined : this.fields[idx].valueCurrent
	}

	initActions(actions: any) {
		actions = valueOrDefault(actions, [])
		let newActions: Array<DataObjAction> = []
		actions.forEach((a: {}) => {
			newActions.push(new DataObjAction(a))
		})
		return newActions
	}

	initCrumbs(crumbFields: any) {
		crumbFields = getArray(crumbFields)
		let list: DataObjListOrder = []
		crumbFields.forEach((cf: any) => {
			list.push(cf._name)
		})
		return list
	}

	initFields(fields: Array<FieldRaw>) {
		fields = valueOrDefault(fields, [])
		let list: Array<Field> = []
		fields.forEach((field: any, index: number) => {
			let newField: Field

			const element = memberOfEnumOrDefault(
				field._codeElement,
				'DataObj',
				'element',
				'FieldElement',
				FieldElement,
				FieldElement.text
			)
			switch (element) {
				// input
				case FieldElement.date:
				case FieldElement.email:
				case FieldElement.number:
				case FieldElement.password:
				case FieldElement.tel:
				case FieldElement.text:
					newField = new FieldInput(field, index, list)
					break

				case FieldElement.checkbox:
					newField = new FieldCheckbox(field, index)
					break

				case FieldElement.custom:
					const customType = field.customElement._type
					switch (customType) {
						case FieldCustomType.button:
							newField = new FieldCustomActionButton(field, index)
							break
						case FieldCustomType.header:
							newField = new FieldCustomHeader(field, index)
							break
						case FieldCustomType.link:
							newField = new FieldCustomActionLink(field, index)
							break
						case FieldCustomType.text:
							newField = new FieldCustomText(field, index)
							break
						default:
							error(500, {
								file: FILENAME,
								function: 'POST',
								message: `No case defined for custom field type: ${customType}`
							})
					}
					break

				case FieldElement.file:
					newField = new FieldFile(field, index)
					break

				case FieldElement.radio:
					newField = new FieldRadio(field, index)
					break

				case FieldElement.select:
					newField = new FieldSelect(field, index)
					break

				case FieldElement.textArea:
					newField = new FieldTextarea(field, index)
					break
				default:
					error(500, {
						file: FILENAME,
						function: 'initFields',
						message: `No case defined for field element: ${element} in form: ${this.name}`
					})
			}
			list.push(newField)
		})
		return list
	}

	initOrderItems(orderFields: any) {
		orderFields = getArray(orderFields)
		let list: DataObjListOrder = []
		orderFields.forEach((of: any) => {
			list.push(new DataObjListOrderField(of))
		})
		return list
	}

	preValidate(): boolean {
		let formStatus: ValidationStatus = ValidationStatus.valid
		let fieldValid: boolean

		this.fields.forEach((f) => {
			if (f.isDisplayable && f.isDisplay && f.access !== FieldAccess.readonly) {
				fieldValid = true
				if (f.valueCurrent.data) {
					const v: Validation = f.validate(f.valueCurrent.data)
					if (v.status == ValidationStatus.invalid) {
						formStatus = ValidationStatus.invalid
						fieldValid = false
						f.validity = v.validityFields[0].validity
					}
				} else {
					f.setHasChanged(f.valueCurrent.data)
					if (f.access === FieldAccess.required) {
						// required field/no value
						formStatus = ValidationStatus.invalid
						fieldValid = false
						const v = f.fieldMissingData(f.index)
						f.validity = new Validity(ValidityError.missingData, ValidityErrorLevel.silent)
					}
				}
				if (fieldValid) f.validity = new Validity()
			}
		})
		return formStatus === ValidationStatus.valid
	}

	print() {
		alert('Print functionality for this object has not yet been implemented.')
	}
	setFieldValue(fieldName: string, value: FieldValue) {
		const idx = this.getFieldIdx(fieldName)
		if (idx > -1) this.fields[idx].valueCurrent = value
	}
	getStatusChanged() {
		return this.fields.some((f: Field) => {
			return f.hasChanged
		})
	}

	validate(): Validation {
		// set formData
		let validityFields: Array<ValidityField> = []
		let status: ValidationStatus = ValidationStatus.valid

		// process each field
		this.fields.forEach((f) => {
			if (f.isDisplayable && f.isDisplay && f.access !== FieldAccess.readonly) {
				const v: Validation = f.validate(f.valueCurrent.data)
				validityFields = [...v.validityFields]
				if (v.status !== ValidationStatus.valid) status = v.status
			}
		})
		return new Validation(ValidationType.form, status, validityFields)
	}
}

export class DataObjAction {
	allTabs: boolean
	name: string
	header: string
	color: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.allTabs = Object.hasOwn(obj, 'allTabs') && obj.allTabs !== null ? obj.allTabs : false
		this.name = strRequired(obj.name, 'ObjectAction', 'name')
		this.header = strRequired(obj.header, 'ObjectAction', 'header')
		this.color = valueOrDefault(obj.color, 'variant-filled-primary')
	}
}

export class DataObjCallback {
	field: string
	callback: Function
	constructor(field: string, callback: Function) {
		this.field = field
		this.callback = callback
	}
}
export enum DataObjCardinality {
	list = 'list',
	detail = 'detail'
}
export enum DataObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail'
}

export class DataObjData {
	cardinality: DataObjCardinality
	callbacks: Array<DataObjCallback> = []
	dataObjList: DataObjListRow
	dataObjRow: DataObjRow
	constructor(
		cardinality: DataObjCardinality,
		dataObjList: DataObjListRow,
		callbacks: Array<DataObjCallback> = []
	) {
		const clazz = 'DataObjData'
		this.callbacks = callbacks
		this.cardinality = cardinality
		this.dataObjList = dataObjList
		this.dataObjRow =
			cardinality === DataObjCardinality.detail && dataObjList.length > 0
				? required(dataObjList[0], clazz, 'dataObjRow')
				: {}
	}
	callbacksAdd(field: string, callback: Function) {
		const idx = this.callbacks.findIndex((c) => {
			return c.field === field
		})
		if (idx >= 0) {
			this.callbacks[idx].callback = callback
		} else {
			this.callbacks.push(new DataObjCallback(field, callback))
		}
	}
	callbacksReset() {
		this.callbacks = []
	}
	getRowStatus() {
		return this.cardinality === DataObjCardinality.detail && this.dataObjRow
			? this.dataObjRow.status
			: DataObjRowStatus.unknown
	}
	setSelectedRecords(selectedRowIds: Array<number>) {
		this.dataObjList.forEach((row: DataObjRow) => {
			row.status = selectedRowIds.includes(row.record.id.data)
				? DataObjRowStatus.selected
				: DataObjRowStatus.notSelected
		})
	}
}

export type DataObjListRecord = Array<DataObjRecord>

export type DataObjListRow = Array<DataObjRow>

export type DataObjListOrder = Array<DataObjListOrderField>

export class DataObjListOrderField {
	name: string
	direction: 'asc' | 'desc'
	constructor(obj: any) {
		const clazz = 'DataObjListOrderField'
		obj = valueOrDefault(obj, {})
		this.name = strRequired(obj._name, clazz, 'name')
		this.direction = obj._codeDbListDir ? obj._codeDbListDir : 'asc'
	}
}
export enum DataObjProcessType {
	delete = 'delete',
	none = 'none',
	object = 'object',
	preset = 'preset',
	saveInsert = 'saveInsert',
	saveUpdate = 'saveUpdate',
	select = 'select'
}
export interface DataObjRaw {
	_actions: any
	_codeCardinality: string
	_codeComponent: string
	_fieldsEl: any
	_fieldsElCrumb: any
	_fieldsDbId: any
	_fieldsDbOrder: any
	_fieldsDbPreset: any
	_fieldsDbSaveInsert: any
	_fieldsDbSaveUpdate: any
	_fieldsDbSelectSys: any
	_fieldsDbSelectUser: any
	_table: any
	description: string | null
	exprFilter: string | null
	exprObject: string | null
	header: string | null
	id: string
	isPopup: boolean | null
	link: any
	name: string
	subHeader: string | null
}

export type DataObjRecord = Record<string, FieldValue>

export class DataObjRow {
	record: DataObjRecord = {}
	status: DataObjRowStatus
	constructor(status: DataObjRowStatus, record: DataObjRecord) {
		this.record = record
		this.status = status
	}
}
export enum DataObjRowStatus {
	created = 'created',
	deleted = 'deleted',
	notSelected = 'notSelected',
	retrieved = 'retrieved',
	selected = 'selected',
	unknown = 'unknown',
	updated = 'updated'
}
export class DataObjStatus {
	objHasChanged: boolean
	objValidToSave: boolean
	constructor(obj: any = {}) {
		obj = valueOrDefault(obj, {})
		this.objHasChanged = obj.objHasChanged ? obj.objHasChanged : false
		this.objValidToSave = obj.objValidToSave ? obj.objValidToSave : true
	}
	reset() {
		this.objHasChanged = false
		this.objValidToSave = true
	}
	setObjChanged(status: boolean) {
		this.objHasChanged = status
	}
	setObjValid(status: boolean) {
		this.objValidToSave = status
	}
}
