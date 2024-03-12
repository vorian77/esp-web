import { Field, type FieldRaw } from '$comps/form/field'
import { strRequired, valueOrDefault } from '$utils/utils'
import { getValExpr, Validation, ValidationStatus } from '$comps/types'
import { TokenApiQueryData } from '$comps/types.token'

const FILENAME = '$comps/Form/fieldFile.ts'

export class FieldFile extends Field {
	storageKeyExpr: string
	width: number
	constructor(obj: FieldRaw, index: number, isFirstVisible: boolean) {
		super(obj, index, isFirstVisible)
		obj = valueOrDefault(obj, {})
		this.storageKeyExpr = strRequired(obj._column.exprStorageKey, 'FieldFile', 'storageKeyExpr')
		this.width = valueOrDefault(obj.width, 300)
	}

	getKey() {
		console.log('FieldFile.getKey.expr:', this.storageKeyExpr)
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
