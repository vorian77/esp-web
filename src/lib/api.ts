import { Token } from '$comps/types.master'
import {
	type DataObjData,
	type DataObjRecord,
	required,
	userGet,
	valueOrDefault
} from '$comps/types'
import type { DataObjRaw } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = 'lib/api.ts'

export enum ApiFunction {
	dbEdgeGetDataObjId = 'dbEdgeGetDataObjId',
	dbEdgeGetNodesBranch = 'dbEdgeGetNodesBranch',
	dbEdgeGetNodesLevel = 'dbEdgeGetNodesLevel',
	dbEdgeProcessQuery = 'dbEdgeProcessQuery',
	dbEdgeGetTableColumns = 'dbEdgeGetTableColumns',
	getUser = 'getUser',
	sendText = 'sendText'
}

export async function apiFetch(apiFunction: ApiFunction, token: Token) {
	const responsePromise: Response = await fetch('/api', {
		method: 'POST',
		body: JSON.stringify({ apiFunction, token })
	})
	return await responsePromise.json()
}

export class ApiResult {
	message: string | undefined
	success: boolean | undefined
	constructor() {}
}
export class ApiResultData extends ApiResult {
	data: Record<string, any>
	constructor(data: Record<string, any>) {
		super()
		this.data = data
		this.success = true
	}
}
export class ApiResultDo extends ApiResult {
	dataObjData: DataObjData | undefined
	dataObjRaw: DataObjRaw | undefined
	constructor() {
		super()
	}
}
export class ApiResultDoFail extends ApiResultDo {
	constructor(message: string | undefined = undefined) {
		super()
		this.message = message
		this.success = false
	}
}
export class ApiResultDoSuccess extends ApiResultDo {
	constructor(
		dataObjRaw: DataObjRaw,
		dataObjData: DataObjData,
		message: string | undefined = undefined
	) {
		super()
		const clazz = 'ApiResultSuccess'
		this.message = message
		this.dataObjData = required(dataObjData, clazz, 'dataObjData')
		this.dataObjRaw = required(dataObjRaw, clazz, 'dataObjRaw')
		this.success = true
	}
}

export class TokenApi extends Token {
	constructor() {
		super()
	}
}

export class TokenApiDataObj extends TokenApi {
	dataObjName: string
	constructor(dataObjName: string) {
		const clazz = 'TokenApiDataObj'
		super()
		this.dataObjName = dataObjName
	}
}

export class TokenApiQuery extends TokenApi {
	dataObj: TokenApiDbDataObj
	queryData: TokenApiQueryData
	queryType: TokenApiQueryType
	constructor(
		queryType: TokenApiQueryType,
		dataObj: TokenApiDbDataObj,
		queryData: TokenApiQueryData
	) {
		const clazz = 'TokenApiDb'
		super()
		this.dataObj = dataObj
		this.queryData = queryData
		this.queryType = queryType
	}
}

export class TokenApiQueryData {
	dataObjData: DataObjData | undefined
	parms: TokenApiQueryDataValue
	record: DataObjRecord
	system: TokenApiQueryDataValue
	user: TokenApiQueryDataValue
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.dataObjData = this.init(data, 'dataObjData', undefined)
		this.parms = this.init(data, 'parms', {})
		this.record = this.init(data, 'record', {})
		this.system = this.init(data, 'system', {})
		this.user = Object.hasOwn(data, 'user')
			? this.init(data, 'user', {})
			: valueOrDefault(userGet(), {})
	}
	init(data: any, key: string, defaultVal: any) {
		return Object.hasOwn(data, key) && data !== undefined ? data[key] : defaultVal
	}
	update(dataType: string, data: any) {
		switch (dataType.toLowerCase()) {
			case 'dataObjData':
				this.dataObjData = data
				break
			case 'parms':
				this.parms = data
				break
			case 'record':
				this.record = data
				break
			case 'system':
				this.system = data
				break
			case 'user':
				this.user = data
				break
			default:
				error(500, {
					file: FILENAME,
					function: 'TokenApiQueryData.update',
					message: `No case defined for data type: ${dataType}`
				})
		}
	}
}

export type TokenApiQueryDataValue = Record<string, any>

export class TokenApiDbDataObj {
	dataObjId: string | undefined
	dataObjName: string | undefined
	dataObjRaw: DataObjRaw | undefined
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const clazz = 'TokenApiDbDataObj'
		if (Object.hasOwn(obj, 'dataObjId')) this.dataObjId = obj.dataObjId
		if (Object.hasOwn(obj, 'dataObjName')) this.dataObjName = obj.dataObjName
		if (Object.hasOwn(obj, 'dataObjRaw')) this.dataObjRaw = obj.dataObjRaw
		required(
			this.dataObjId || this.dataObjName || this.dataObjRaw,
			clazz,
			'dataObjId, dataObjName or dataObjRaw'
		)
	}
}

export class TokenApiDbTableColumns {
	tableModule: string
	tableName: string
	constructor(tableModule: string, tableName: string) {
		const clazz = 'TokenApiDbTableColumns'
		this.tableModule = tableModule
		this.tableName = tableName
	}
}

export enum TokenApiQueryType {
	delete = 'delete',
	expression = 'expression',
	new = 'new',
	none = 'none',
	retrieve = 'retrieve',
	saveInsert = 'saveInsert',
	saveUpdate = 'saveUpdate'
}

export class TokenApiSendText extends Token {
	phoneMobile: string
	message: string
	constructor(phoneMobile: string, message: string) {
		super()
		this.phoneMobile = phoneMobile
		this.message = message
	}
}

export class TokenApiUser extends TokenApi {
	userId: string
	constructor(userId: string) {
		super()
		this.userId = userId
	}
}
