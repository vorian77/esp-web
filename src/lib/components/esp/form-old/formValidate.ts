export class Validity {
	type: undefined | Validity.type
	message: undefined | string
	level: undefined | Validity.level

	constructor(type?: Validity.type, message?: string, level?: Validity.level) {
		this.type = type
		this.message = message
		this.level = level
	}

	fieldValidityItem(index: number) {
		const rtnValidity = this.type
			? { type: this.type, message: this.message, level: this.level }
			: null
		return { index, validity: rtnValidity }
	}

	fieldValidity(index: number) {
		return [this.fieldValidityItem(index)]
	}

	validateField(fieldName: string, fieldValue: string, form) {}
}

export namespace Validity {
	export enum type {
		valid = 'valid',
		required = 'required',
		minLength = 'minLength',
		maxLength = 'maxLength',
		minValue = 'minValue',
		maxValue = 'maxValue',
		pattern = 'pattern',
		matchColumn = 'matchColumn'
	}

	export enum level {
		warning = 'warning',
		error = 'error'
	}

	export type validity = {}
}
