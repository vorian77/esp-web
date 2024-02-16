import {
	DataFieldDataType,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
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
import { type Field, FieldAccess, FieldElement, type FieldRaw } from '$comps/form/field'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import { FieldChips } from '$comps/form/fieldChips'
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
import { FieldToggle } from '$comps/form/fieldToggle'
import { ActionsQuery, ActionQuery, queryExecute } from '$comps/nav/types.appQuery'
import { TokenApiQueryData, TokenApiQueryType } from '$lib/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/types.dataObj.ts'

export class DataObj {
	actionsField: Array<DataObjAction>
	actionsQuery?: ActionsQuery
	actionsQueryRaw: Array<ActionQuery>
	cardinality: DataObjCardinality
	component: DataObjComponent
	crumbs: Array<any> = []
	dataListRecord: DataObjListRecord = []
	data: DataObjData
	description: string
	exprObject?: string
	fields: Array<Field>
	header: string
	isPopup: boolean
	name: string
	orderItems: DataObjListOrder
	subHeader: string
	table?: Table

	constructor(dataObjRaw: DataObjRaw) {
		const clazz = 'DataObj'
		dataObjRaw = valueOrDefault(dataObjRaw, {})
		this.actionsField = this.initActions(dataObjRaw._actionsField)
		this.cardinality = memberOfEnum(
			dataObjRaw._codeCardinality,
			clazz,
			'cardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.component = memberOfEnum(
			dataObjRaw._codeComponent,
			clazz,
			'component',
			'DataObjComponent',
			DataObjComponent
		)
		this.crumbs = this.initCrumbs(dataObjRaw._fieldsElCrumb)
		this.data = new DataObjData(this.cardinality)
		this.description = valueOrDefault(dataObjRaw.description, '')
		this.exprObject = strOptional(dataObjRaw.exprObject, clazz, 'exprObject')
		this.fields = this.initFields(dataObjRaw._fieldsEl)
		this.header = valueOrDefault(dataObjRaw.header, '')
		this.orderItems = this.initOrderItems(dataObjRaw._fieldsDbOrder)
		this.isPopup = valueOrDefault(dataObjRaw.isPopup, false)
		this.name = strRequired(dataObjRaw.name, clazz, 'name')
		this.actionsQueryRaw = this.initActionsQueryRaw(dataObjRaw.actionsQuery)
		this.subHeader = valueOrDefault(dataObjRaw.subHeader, '')
		this.table =
			dataObjRaw._tables && dataObjRaw._tables.length > 0
				? new Table(dataObjRaw._tables[0]._table)
				: undefined
	}
	initActionsQueryRaw(actionsQueryRaw: any) {
		actionsQueryRaw = getArray(actionsQueryRaw)
		let newActions: Array<ActionQuery> = []
		actionsQueryRaw.forEach((a: ActionQuery) => {
			newActions.push(new ActionQuery(a))
		})
		return newActions
	}
	static async loadExtras(dataObjRaw: DataObjRaw, queryData: TokenApiQueryData) {
		const dataObj = new DataObj(dataObjRaw)
		await loadActionsField()
		await loadActionsQuery()
		await loadFieldItems(dataObj.fields)
		return dataObj

		async function loadActionsField() {
			for (const f of dataObj.fields) {
				if (f instanceof FieldCustomAction) await f.initAction()
			}
		}
		async function loadActionsQuery() {
			dataObj.actionsQuery = await ActionsQuery.load(dataObjRaw.actionsQuery)
		}
		async function loadFieldItems(fields: Array<Field>) {
			for (const field of fields) {
				if (field.itemsDb) {
					queryData.replaceParms({ ...field.itemsDb.parms, field })
					const result = await queryExecute(
						{ dataObjName: dataObj.name },
						TokenApiQueryType.fieldItems,
						queryData
					)
					field.items = result.data
				}
			}
		}
	}

	get objData() {
		let data: any
		switch (this.data.cardinality) {
			case DataObjCardinality.list:
				// <temp> - 240125 - will change when data is manipulated in lists
				data = []
				break

			case DataObjCardinality.detail:
				const record: DataObjRecord = {}
				this.fields.forEach((f) => {
					if (f.dataType === DataFieldDataType.json) {
						record[f.name] = f.valueCurrent
					} else {
						record[f.name] = f.valueCurrent
					}
				})
				// console.log('types.dataObj.getObjData', { record })
				data = new DataObjRecordRow(this.data.getRowStatus(), record)
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'objData',
					message: `No case defined for cardinality: ${this.data.cardinality} in form: ${this.name}`
				})
		}
		return new DataObjData(this.cardinality, data)
	}
	set objData(dataSource: DataObjData) {
		this.data = dataSource
		switch (this.data.cardinality) {
			case DataObjCardinality.list:
				this.dataListRecord = dataSource.dataObjRowList.map((row: DataObjRecordRow) => {
					let newRecord: DataObjRecord = {}
					for (let key in row.record) {
						newRecord[key] = row.record[key]
					}
					return newRecord
				})
				break

			case DataObjCardinality.detail:
				const dataRow = dataSource.dataObjRow
				const status = dataRow.status
				const record = dataRow.record
				const hasData = Object.keys(record).length > 0
				// console.log('dataObj.objData.dataRow:', { record, status, hasData })

				this.fields.forEach((f) => {
					// console.log('dataObj.objData.field:', f.name)
					if (hasData && Object.hasOwn(dataRow.record, f.name)) {
						// console.log('from db: ', f.name)
						f.valueCurrent = f.copyValue(dataRow.record[f.name])
						f.valueInitial = f.copyValue(dataRow.record[f.name])
					} else if (status === DataObjRecordStatus.created) {
						// console.log('insert - nullifying: ', f.name)
						f.valueCurrent = null
						f.valueInitial = null
					} else if (status === DataObjRecordStatus.updated) {
						// console.log('update - copying: ', f.name)
						f.valueInitial = f.copyValue(f.valueCurrent)
					}
				})
				// console.log('dataObj.objData.fields:', this.fields)
				break
		}
	}

	getFieldIdx(fieldName: string) {
		return this.fields.findIndex((f) => f.name == fieldName)
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

				case FieldElement.chips:
					newField = new FieldChips(field, index)
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
				case FieldElement.toggle:
					newField = new FieldToggle(field, index)
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
				if (f.valueCurrent) {
					const v: Validation = f.validate(f.valueCurrent)
					if (v.status == ValidationStatus.invalid) {
						formStatus = ValidationStatus.invalid
						fieldValid = false
						f.validity = v.validityFields[0].validity
					}
				} else {
					f.setHasChanged(f.valueCurrent)
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
				const v: Validation = f.validate(f.valueCurrent)
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
	dataObjRow: DataObjRecordRow
	dataObjRowList: DataObjRecordRowList = []
	constructor(cardinality: DataObjCardinality, data: any = undefined) {
		const clazz = 'DataObjData'
		this.cardinality = cardinality
		if (data === undefined) {
			this.dataObjRow = new DataObjRecordRow(DataObjRecordStatus.unknown, {})
			this.dataObjRowList = []
		} else if (cardinality === DataObjCardinality.detail) {
			this.dataObjRow = Array.isArray(data) ? data[0] : data
			this.dataObjRowList = []
		} else {
			this.dataObjRowList = data
			this.dataObjRow = new DataObjRecordRow(DataObjRecordStatus.unknown, {})
		}
	}
	getData() {
		return this.cardinality === DataObjCardinality.detail
			? this.dataObjRow.record
			: this.dataObjRowList
	}
	getRecordValue(key: string) {
		if (!this.hasRecord()) return undefined
		return this.dataObjRow.record[key]
	}
	hasRecord() {
		if (!this.dataObjRow) return false
		if (!this.dataObjRow.record) return false
		return Object.keys(this.dataObjRow.record).length > 0
	}
	static loadData(data: DataObjData) {
		if (data.cardinality === DataObjCardinality.detail) {
			return new DataObjData(data.cardinality, data.dataObjRow)
		} else {
			return new DataObjData(data.cardinality, data.dataObjRowList)
		}
	}
	setRecord(record: DataObjRecord) {
		this.dataObjRow.record = record
	}
	getRowStatus() {
		return this.cardinality === DataObjCardinality.detail && this.dataObjRow
			? this.dataObjRow.status
			: DataObjRecordStatus.unknown
	}
	setSelectedRecords(selectedRowIds: Array<number>) {
		this.dataObjRowList.forEach((row: DataObjRecordRow) => {
			row.status = selectedRowIds.includes(row.record.id)
				? DataObjRecordStatus.selected
				: DataObjRecordStatus.notSelected
		})
	}
}

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

export type DataObjListRecord = Array<DataObjRecord>

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
	_actionsField?: any
	_codeCardinality: string
	_codeComponent: string
	_fieldsEl: any
	_fieldsElCrumb?: any
	_fieldsDbFilter?: any
	_fieldsDbOrder?: any
	_fieldsDbPreset?: any
	_fieldsDbSaveInsert?: any
	_fieldsDbSaveUpdate?: any
	_fieldsDbSelectSys?: any
	_fieldsDbSelectUser?: any
	_tables?: any
	_updateTables?: Array<any>
	actionsQuery?: Array<any> | null
	description?: string | null
	exprFilter?: string | null
	exprObject?: string | null
	header: string | null
	id?: string
	isPopup: boolean | null
	name: string
	subHeader?: string | null
}

export type DataObjRecord = Record<string, any>

export class DataObjRecordRow {
	record: DataObjRecord = {}
	status: DataObjRecordStatus
	constructor(status: DataObjRecordStatus, record: DataObjRecord) {
		this.record = record
		this.status = status
	}
}

export type DataObjRecordRowList = Array<DataObjRecordRow>

export enum DataObjRecordStatus {
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
