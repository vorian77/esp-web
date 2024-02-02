import { Field, FieldAccess, type FieldRaw, OverlayNode } from '$comps/form/field'
import { Validation, ValidationStatus } from '$comps/types'

export class FieldChips extends Field {
	overlayNode: OverlayNode
	constructor(obj: FieldRaw, index: number) {
		super(obj, index)
		this.access = FieldAccess.optional
		this.overlayNode = new OverlayNode(obj._overlayNode)
	}
	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
