export class Validity {
	type: undefined | Validity.type
	message: undefined | string
	level: undefined | Validity.level

	constructor(type?: Validity.type, message?: string, level?: Validity.level) {
		this.type = type
		this.message = message
		this.level = level
	}
}

export namespace Validity {
	export enum Type {
		valid = 'valid',
		required = 'required',
		minLength = 'minLength',
		maxLength = 'maxLength',
		minValue = 'minValue',
		maxValue = 'maxValue',
		pattern = 'pattern',
		matchColumn = 'matchColumn'
	}

	export enum Level {
		warning = 'warning',
		error = 'error'
	}
}
