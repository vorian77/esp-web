import { Field, FieldAccess, FieldItem, type FieldRaw } from '$comps/form/field'
import { DataObj, DataObjAction, Validation, ValidationStatus } from '$comps/types'
import { booleanOrFalse, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class FieldListConfig extends Field {
	actionsFieldDialog: Array<DataObjAction> = []
	dataObjNameConfig: string
	dataObjNameDisplay: string
	isMultiSelect: boolean
	valuesRaw: FieldListChipValues = []
	valuesSelected: FieldListChipValues = []
	constructor(obj: FieldRaw, index: number) {
		const clazz = 'FieldListConfig'
		super(obj, index)
		this.access = FieldAccess.optional
		this.actionsFieldDialog = DataObj.initActions(obj._fieldListConfig._actionsFieldGroup)
		this.dataObjNameConfig = strRequired(
			obj._fieldListConfig._dataObjNameConfig,
			clazz,
			'dataObjNameConfig'
		)
		this.dataObjNameDisplay = strRequired(
			obj._fieldListConfig._dataObjNameDisplay,
			clazz,
			'dataObjNameDisplay'
		)
		this.isMultiSelect = booleanOrFalse(obj._fieldListConfig.isMultiSelect, 'isMultiSelect')
	}
	// setSelected(rows: Array<Record<string, any>>) {
	// 	this.valuesSelected = rows.map((row) => ({ id: row.id, value: row[this.columnLabelDisplay] }))
	// 	this.valueCurrent = rows.map((row) => row.id)
	// }
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}

export type FieldListChipValues = Array<{ id: string; value: any }>
