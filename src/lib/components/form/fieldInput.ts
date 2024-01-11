import {
	FieldAccess,
	FieldElement,
	type FieldRaw,
	Validation,
	ValidationStatus,
	ValidationType,
	Validity,
	ValidityField,
	ValidityError,
	ValidityErrorLevel
} from '$comps/types'
import { Field } from '$comps/form/field'
import { booleanOrFalse, valueOrDefault } from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = '$comps/form/fieldInput.ts'

export class FieldInput extends Field {
	matchColumn?: MatchColumn
	maxLength?: number
	maxValue?: number
	minLength?: number
	minValue?: number
	pattern?: string
	patternMsg?: string
	patternReplacement?: string
	placeHolder: string
	spinStep?: string
	constructor(obj: FieldRaw, index: number, fields: Array<Field>) {
		super(obj, index)
		obj = valueOrDefault(obj, {})
		this.placeHolder =
			this.access !== FieldAccess.readonly
				? valueOrDefault(obj._column.placeHolder, this.label ? 'Enter ' + this.label : '')
				: ''
		if (this.access == FieldAccess.optional) {
			this.placeHolder += ' (optional)'
		}

		this.matchColumn = initMatchColumn(obj._column.matchColumn, this, fields)
		this.maxLength = obj._column.maxLength
		this.maxValue = obj._column.maxValue
		this.minLength = obj._column.minLength
		this.minValue = obj._column.minValue
		this.pattern = obj._column.pattern
		this.patternMsg = obj._column.patternMsg
		this.patternReplacement = obj._column.patternReplacement
		this.spinStep = obj._column.spinStep

		// set field type defaults
		switch (this.element) {
			case FieldElement.email:
				if (!this.pattern) {
					this.pattern = '^[A-Za-z0-9+_.-]+@(.+)$'
				}
				break
			case FieldElement.password:
				if (!this.pattern) {
					this.pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$'
					this.patternMsg =
						'Your password must be at least 8 characters long, and must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, and at least 1 special character (@$!%*#?&).'
				}
				break
			case FieldElement.tel:
				if (!this.pattern) {
					this.pattern = '^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$'
					this.patternReplacement = '($1) $2-$3'
				}
				break
		}

		function initMatchColumn(
			parentMatchColumn: string,
			thisField: FieldInput,
			fields: Array<Field>
		) {
			if (!parentMatchColumn) {
				return undefined
			}
			// const idxParent = fields.map((f) => f.name).indexOf(parentMatchColumn)
			const idxParent = fields.findIndex((f) => {
				return f.name === parentMatchColumn
			})
			if (idxParent >= 0) {
				const message =
					thisField.access !== FieldAccess.hidden
						? `Fields "${fields[idxParent].label}" and "${thisField.label}" must match.`
						: ''

				// set parent
				// fields[idxParent].matchColumn = new MatchColumn(thisField.name, thisField.index, message)

				// return this field's match column
				return new MatchColumn(parentMatchColumn, fields[idxParent].index, message)
			} else {
				error(500, {
					file: FILENAME,
					function: 'constructor.initMatchColumn',
					message: `For column: "${thisField.name}", can not find parent matchColumn: "${parentMatchColumn}"`
				})
			}
		}
	}

	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}

		let nbrValue = Number(dataValue)

		// minLength
		if (this.minLength || this.minLength === 0) {
			if (dataValue.length < this.minLength) {
				return this.fieldInvalid(
					this.index,
					ValidityError.minLength,
					ValidityErrorLevel.error,
					`"${this.label}" must be at least ${this.minLength} character(s). It is currently ${dataValue.length} character(s).`
				)
			}
		}
		// maxLength
		if (this.maxLength || this.maxLength === 0) {
			if (dataValue.length > this.maxLength) {
				return this.fieldInvalid(
					this.index,
					ValidityError.maxLength,
					ValidityErrorLevel.error,
					`"${this.label}" cannot exceed ${this.maxLength} character(s). It is currently ${dataValue.length} character(s).`
				)
			}
		}
		// minValue
		if (this.minValue || this.minValue === 0) {
			if (nbrValue < this.minValue) {
				return this.fieldInvalid(
					this.index,
					ValidityError.minValue,
					ValidityErrorLevel.error,
					`"${this.label}" must be at least ${this.minValue}`
				)
			}
		}
		// maxValue
		if (this.maxValue || this.maxValue === 0) {
			if (nbrValue > this.maxValue) {
				return this.fieldInvalid(
					this.index,
					ValidityError.maxValue,
					ValidityErrorLevel.error,
					`"${this.label}" cannot exceed ${this.maxValue}`
				)
			}
		}
		// pattern
		if (this.pattern) {
			const regex = new RegExp(this.pattern)
			if (!regex.test(dataValue)) {
				const errorMsg = this.patternMsg || `The value you entered is not a valid "${this.label}"`
				return this.fieldInvalid(
					this.index,
					ValidityError.pattern,
					ValidityErrorLevel.error,
					errorMsg
				)
			}
		}
		// matchColumn
		if (this.matchColumn) {
			// get matchColumn value
			// <temp> 231107 - add formData back to get match column value
			// const matchColumnValue = formData.get(this.matchColumn.name)
			// const matchColumnValue = formData.get(this.matchColumn.name)

			// compare values to set validiities
			let validity: Validity
			let validationStatus: ValidationStatus
			let data = undefined

			// if (dataValue == matchColumnValue) {
			// 	//equal - fields are valid
			// 	validity = new Validity()
			// 	validationStatus = ValidationStatus.valid
			// 	data = dataValue
			// } else {
			// 	validationStatus = ValidationStatus.invalid
			// 	if (!dataValue || !matchColumnValue) {
			// 		// one blank field - warning
			// 		validity = new Validity(
			// 			ValidityError.matchColumn,
			// 			ValidityErrorLevel.warning,
			// 			this.matchColumn.message
			// 		)
			// 	} else {
			// 		// both entered and unequal - error
			// 		validity = new Validity(
			// 			ValidityError.matchColumn,
			// 			ValidityErrorLevel.error,
			// 			this.matchColumn.message
			// 		)
			// 	}
			// }
			// // set validiities
			// let validityFields: [ValidityField] = [new ValidityField(this.index, validity)]
			// validityFields.push(new ValidityField(this.matchColumn.index, validity))
			// return new Validation(ValidationType.field, validationStatus, validityFields)
		}
		// default
		return this.fieldValid(this.index)
	}
}

export class MatchColumn {
	name: string
	index: number | undefined
	message: string | undefined

	constructor(name: string, index: number, message: string) {
		this.name = valueOrDefault(name, '')
		if (this.name) {
			this.index = index
			this.message = message
		}
	}
}
