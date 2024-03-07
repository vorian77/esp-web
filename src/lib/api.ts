import { Token } from '$comps/types.token'
import { type DataObjData, required } from '$comps/types'
import type { DataObjRaw } from '$comps/types'
import {
	TokenApiDbDataObj,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType
} from '$comps/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = 'lib/api.ts'

export enum ApiFunction {
	dbEdgeGetDataObjId = 'dbEdgeGetDataObjId',
	dbEdgeGetNodesBranch = 'dbEdgeGetNodesBranch',
	dbEdgeGetNodesLevel = 'dbEdgeGetNodesLevel',
	dbEdgeProcessQuery = 'dbEdgeProcessQuery',
	dbEdgeGetTableColumns = 'dbEdgeGetTableColumns',
	dbEdgeGetUser = 'dbEdgeGetUser',
	dbEdgeGetUserId = 'dbEdgeGetUserId',
	dbEdgeInit = 'dbEdgeInit',
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

export async function apiDbQuery(
	queryType: TokenApiQueryType,
	dataObjSource: Record<string, any>,
	queryData: TokenApiQueryData
) {
	return await apiFetch(
		ApiFunction.dbEdgeProcessQuery,
		new TokenApiQuery(queryType, new TokenApiDbDataObj(dataObjSource), queryData)
	)
}
