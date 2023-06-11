import { Field } from '$comps/esp/form/field'
import { strRequired, valueOrDefault } from '$utils/utils'
import { Validation, ValidationStatus } from '$comps/esp/form/types'

const FILENAME = 'fieldPictureTake.ts'

export class FieldPictureTake extends Field {
	buttonLabel: string
	imageWidth: number
	imageAltText: string

	constructor(obj: {}, index: number) {
		super(obj, index)

		obj = valueOrDefault(obj, {})
		this.buttonLabel = valueOrDefault(obj.buttonLabel, 'Take Picture')
		this.imageWidth = valueOrDefault(obj.imageWidth, 300)
		this.imageAltText = strRequired(obj.imageAltText, FILENAME + '.imageAltText')
	}
	validate(formData): Validation {
		const v = super.validate(formData)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index, v.data)
	}
}
