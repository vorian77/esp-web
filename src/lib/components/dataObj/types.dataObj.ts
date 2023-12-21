import {
	FieldAccess,
	FieldElement,
	type FieldRaw,
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
import { DataRowStatus, QueryParmDataRow } from '$comps/dataObj/types.query'
import type { DataObjData, DataRowRecord } from '$comps/dataObj/types.query'
import { type Field, FieldValue } from '$comps/form/field'
import { FieldCheckbox } from '$comps/form/fieldCheckbox'
import { FieldCustom } from '$comps/form/fieldCustom'
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
	dataObjRaw: DataObjRaw
	dataRowStatuses: Array<DataRowStatus> = []
	description: string
	exprObject: string | undefined
	fields: Array<Field>
	header: string
	isPopup: boolean
	name: string
	statusChanged: boolean = false
	statusValidToSave: boolean = true
	orderItems: DataObjListOrder
	saveCallbacks: Array<DataObjCallback> = []
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
	get objData() {
		const record: DataRowRecord = {}
		this.fields.forEach((f) => {
			record[f.name] = f.valueCurrent
		})
		return [new QueryParmDataRow(this.dataRowStatuses[0], record)]
	}
	set objData(dataObjData: DataObjData) {
		this.dataRowStatuses = dataObjData.map((dr) => dr.status) as Array<DataRowStatus>
		const dataRow = dataObjData[0]
		console.log('dataObj.dataRow:', dataRow)

		this.fields.forEach((f) => {
			if (dataRow.record.hasOwnProperty(f.name)) {
				f.valueCurrent = FieldValue.duplicate(dataRow.record[f.name])
				f.valueInitial = FieldValue.duplicate(dataRow.record[f.name])
			} else if (dataRow.status === DataRowStatus.created) {
				f.valueCurrent.resetData()
				f.valueInitial.resetData()
			} else if (dataRow.status === DataRowStatus.updated) {
				f.valueInitial = FieldValue.duplicate(f.valueCurrent)
			}
		})
		this.statusValidToSave = this.preValidate()
		this.statusChanged = false
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
					newField = new FieldCustom(field, index)
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
					throw error(500, {
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

	saveCallbackAdd(field: string, callback: Function) {
		const idx = this.saveCallbacks.findIndex((c) => {
			return c.field === field
		})
		if (idx >= 0) {
			this.saveCallbacks[idx].callback = callback
		} else {
			this.saveCallbacks.push(new DataObjCallback(field, callback))
		}
	}
	async saveCallbackExecute() {
		if (this.saveCallbacks) {
			for (let i = 0; i < this.saveCallbacks.length; i++) {
				await this.saveCallbacks[i].callback()
			}
		}
	}
	saveCallbackReset() {
		this.saveCallbacks = []
	}
	setFieldValue(fieldName: string, value: FieldValue) {
		const idx = this.getFieldIdx(fieldName)
		if (idx > -1) this.fields[idx].valueCurrent = value
	}
	setStatusChanged() {
		this.statusChanged = this.fields.some((f: Field) => {
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
		this.allTabs = obj.hasOwnProperty('allTabs') && obj.allTabs !== null ? obj.allTabs : false
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

export class DataObjStatus {
	isInsertMode: boolean
	objHasChanged: boolean
	objValidToSave: boolean
	constructor(obj: any = {}) {
		obj = valueOrDefault(obj, {})
		this.isInsertMode = obj.isInsertMode ? obj.isInsertMode : false
		this.objHasChanged = obj.objHasChanged ? obj.objHasChanged : false
		this.objValidToSave = obj.objValidToSave ? obj.objValidToSave : true
	}
	reset() {
		this.isInsertMode = false
		this.objHasChanged = false
		this.objValidToSave = true
	}
	setObjChanged(status: boolean) {
		this.objHasChanged = status
	}
	setObjValid(status: boolean) {
		this.objValidToSave = status
	}
	setInsertMode(mode: boolean) {
		this.isInsertMode = mode
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
export enum DataObjCardinality {
	list = 'list',
	detail = 'detail'
}
export enum DataObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail'
}
export enum NavRowActionType {
	first = 'first',
	left = 'left',
	right = 'right',
	last = 'last'
}
