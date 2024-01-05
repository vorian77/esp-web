import { Field } from '$comps/form/field'
import { strRequired, valueOrDefault } from '$utils/utils'
import { getValExpr, type FieldRaw, Validation, ValidationStatus } from '$comps/types'
import { TokenApiQueryData } from '$lib/api'
import { get } from 'svelte/store'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends Field {
	storageKeyExpr: string
	width: number

	constructor(obj: FieldRaw, index: number) {
		super(obj, index)
		obj = valueOrDefault(obj, {})
		this.storageKeyExpr = strRequired(obj._column.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}

	getKey() {
		return getValExpr(this.storageKeyExpr, new TokenApiQueryData({}))
	}

	validate(dataValue: any): Validation {
		const v = super.validate(dataValue)
		if (v.status == ValidationStatus.valid || v.status == ValidationStatus.invalid) {
			return v
		}
		return this.fieldValid(this.index)
	}
}
