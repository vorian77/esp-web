import { Field, FieldAccess, FieldItem, type FieldRaw } from '$comps/form/field'
import { DataObj, DataObjAction, Validation, ValidationStatus } from '$comps/types'
import { booleanOrFalse, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class FieldListSelect extends Field {
	actionsFieldDialog: Array<DataObjAction> = []
	btnLabelComplete?: string
	dataObjNameDisplay: string
	dataObjNameSelect: string
	isMultiSelect: boolean
	constructor(obj: FieldRaw, index: number, isFirstVisible: boolean) {
		const clazz = 'FieldListSelect'
		super(obj, index, isFirstVisible)
		this.access = FieldAccess.optional
		this.actionsFieldDialog = DataObj.initActions(obj._fieldListSelect._actionsFieldGroup)
		this.btnLabelComplete = strOptional(
			obj._fieldListSelect.btnLabelComplete,
			clazz,
			'btnLabelComplete'
		)
		this.dataObjNameDisplay = strRequired(
			obj._fieldListSelect._dataObjNameDisplay,
			clazz,
			'dataObjNameDisplay'
		)
		this.dataObjNameSelect = strRequired(
			obj._fieldListSelect._dataObjNameSelect,
			clazz,
			'dataObjNameSelect'
		)
		this.isMultiSelect = booleanOrFalse(obj._fieldListSelect.isMultiSelect, 'isMultiSelect')

		// update complete action header
		if (this.btnLabelComplete) {
			this.actionsFieldDialog.forEach((action) => {
				if (action.name === 'noa_dialog_done') {
					action.header = this.btnLabelComplete!
				}
			})
		}
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
