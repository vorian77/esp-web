import { booleanOrFalse, required, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import {
	TokenApiDbDataObj,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$comps/types.token'

export class FormConfig {
	btnLabelComplete?: string
	data: TokenApiDbDataObj
	dataObjName: string
	queryType: TokenApiQueryType
	recordSubmitted: Record<string, any> = {}
	constructor(obj: any) {
		const clazz = 'FormConfig'
		this.btnLabelComplete = strOptional(obj.btnLabelComplete, clazz, 'btnLabelComplete')
		this.data = new TokenApiDbDataObj(required(obj.data, clazz, 'data'))
		this.dataObjName = strRequired(obj.dataObjName, clazz, 'dataObj')
		this.queryType = required(obj.queryType, clazz, 'queryType')
	}
}
