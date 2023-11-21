import { Field } from '$comps/form/field'
import { strRequired, valueOrDefault } from '$utils/utils'
import { getValExpr, type RawFormField, User, Validation, ValidationStatus } from '$comps/types'
import { navUser } from '$comps/nav/navStore'
import { get } from 'svelte/store'

const FILENAME = '$comps/Form/fieldFile.ts'

const user = new User(get(navUser))

export class FieldFile extends Field {
	storageKeyExpr: string
	width: number

	constructor(obj: RawFormField, index: number) {
		super(obj, index)
		obj = valueOrDefault(obj, {})
		this.storageKeyExpr = strRequired(obj._column.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}

	getKey() {
		return getValExpr(this.storageKeyExpr, { user: user.user })
	}

	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
