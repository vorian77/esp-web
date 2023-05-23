import {
	Validation,
	ValidationStatus,
	ValidationType,
	Validity,
	ValidityField,
	ValidityType,
	ValidityLevel
} from '$comps/esp/form/form'
import { Field } from '$comps/esp/form/field'
import { memberOfEnum, valueOrDefault } from '$utils/utils'

export class FieldInput extends Field {
	type: FieldType
	placeHolder: string

	matchColumn: string
	minLength: number
	maxLength: number
	minValue: number
	maxValue: number
	pattern: string
	patternMsg: string
	patternReplacement: string

	constructor(defn: {}, index: number) {
		super(defn, index)

		defn = valueOrDefault(defn, {})
		this.type = memberOfEnum(defn.type, FieldType)
		this.placeHolder = valueOrDefault(defn.placeHolder, '')

		this.matchColumn = defn.matchColumn
		this.minLength = defn.minLength
		this.maxLength = defn.maxLength
		this.minValue = defn.minValue
		this.maxValue = defn.maxValue
		this.pattern = defn.pattern
		this.patternMsg = defn.patternMsg
		this.patternReplacement = defn.patternReplacement

		// set field type defaults
		switch (this.type) {
			case FieldType.email:
				if (!this.pattern) {
					this.pattern = '^[A-Za-z0-9+_.-]+@(.+)$'
				}
				break
			case FieldType.password:
				if (!this.pattern) {
					this.pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$'
					this.patternMsg =
						'Your password must be at least 8 characters long, and must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, and at least 1 special character (@$!%*#?&).'
				}
				break
			case FieldType.tel:
				if (!this.pattern) {
					this.pattern = '^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$'
					this.patternReplacement = '($1) $2-$3'
				}
				break
		}
	}

	validate(formData): Validation {
		const v = super.validate(formData)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		const fieldValue = v.data
		let nbrValue = Number(fieldValue)

		// minLength
		if (this.minLength || this.minLength === 0) {
			if (fieldValue.length < this.minLength) {
				return this.fieldInvalid(
					this.index,
					ValidityType.minLength,
					`"${this.label}" must be at least ${this.minLength} character(s). It is currently ${fieldValue.length} character(s).`,
					ValidityLevel.error
				)
			}
		}
		// maxLength
		if (this.maxLength || this.maxLength === 0) {
			if (fieldValue.length > this.maxLength) {
				return this.fieldInvalid(
					this.index,
					ValidityType.maxLength,
					`"${this.label}" cannot exceed ${this.maxLength} character(s). It is currently ${fieldValue.length} character(s).`,
					ValidityLevel.error
				)
			}
		}
		// minValue
		if (this.minValue || this.minValue === 0) {
			if (nbrValue < this.minValue) {
				return this.fieldInvalid(
					this.index,
					ValidityType.minValue,
					`"${this.label}" must be at least ${this.minValue}.`,
					ValidityLevel.error
				)
			}
		}
		// maxValue
		if (this.maxValue || this.maxValue === 0) {
			if (nbrValue > this.maxValue) {
				return this.fieldInvalid(
					this.index,
					ValidityType.maxValue,
					`"${this.label}" cannot exceed ${this.maxValue}.`,
					ValidityLevel.error
				)
			}
		}
		// pattern
		if (this.pattern) {
			const regex = new RegExp(this.pattern)
			if (!regex.test(fieldValue)) {
				const errorMsg = this.patternMsg || `The value you entered is not a valid "${this.label}".`
				console.log('pattern...', errorMsg)
				return this.fieldInvalid(this.index, ValidityType.pattern, errorMsg, ValidityLevel.error)
			}
		}
		// matchColumn
		if (this.matchColumn) {
			// get matchColumn value
			const matchColumnValue = formData.get(this.matchColumn.name)

			// compare values to set validiities
			let validity: Validity
			let validationStatus: ValidationStatus
			let data = undefined

			if (fieldValue == matchColumnValue) {
				//equal - fields are valid
				validity = new Validity()
				validationStatus = ValidationStatus.valid
				data = fieldValue
			} else {
				validationStatus = ValidationStatus.invalid
				if (!fieldValue || !matchColumnValue) {
					// one blank field - warning
					validity = new Validity(
						ValidityType.matchColumn,
						this.matchColumn.message,
						ValidityLevel.warning
					)
				} else {
					// both entered and unequal - error
					validity = new Validity(
						ValidityType.matchColumn,
						this.matchColumn.message,
						ValidityLevel.error
					)
				}
			}
			// set validiities
			let validityFields: [ValidityField] = [new ValidityField(this.index, validity)]
			validityFields.push(new ValidityField(this.matchColumn.index, validity))
			return new Validation(ValidationType.field, validationStatus, validityFields, data)
		}
		// default
		return this.fieldValid(this.index, fieldValue)
	}
}

export enum FieldType {
	date = 'date',
	email = 'email',
	number = 'number',
	password = 'password',
	tel = 'tel',
	text = 'text'
}
