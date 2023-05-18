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

	constructor(defn: {}) {
		super(defn)

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
}

export enum FieldType {
	date = 'date',
	email = 'email',
	number = 'number',
	password = 'password',
	tel = 'tel',
	text = 'text'
}
