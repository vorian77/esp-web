import { Field, FieldAccess, type FieldRaw, OverlayNodeFieldItems } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/form/types.validation'
import { DataObj } from '$comps/types'

export class FieldTable extends Field {
	dataObjList: DataObj
	dataObjDetail: DataObj
	constructor(obj: FieldRaw, index: number) {
		super(obj, index)
		// this.access = FieldAccess.optional
		// this.overlayNodeFieldItems = new OverlayNodeFieldItems(obj._overlayNodeFieldItems)
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}