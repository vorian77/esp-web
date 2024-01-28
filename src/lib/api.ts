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
	dbEdgeGetUser = 'dbEdgeGetUser',
	dbEdgeGetUserId = 'dbEdgeGetUserId',
	dbEdgeInitAdmin = 'dbEdgeInitAdmin',
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

export class TokenApiFileUpload extends TokenApi {
	file: File | undefined
	fileAction: TokenApiFileUploadAction
	storageKey: string | undefined
	constructor(
		fileAction: TokenApiFileUploadAction,
		storageKey: string | undefined = undefined,
		file: File | undefined = undefined
	) {
		const clazz = 'TokenApiFileUpload'
		super()
		this.file = file
		this.fileAction = fileAction
		this.storageKey = storageKey
	}
}

export enum TokenApiFileUploadAction {
	delete = 'delete',
	none = 'none',
	upload = 'upload'
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
	system: TokenApiQueryDataValue
	tree: TokenApiQueryDataTree
	user: TokenApiQueryDataValue
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.dataObjData = this.setData(data, 'dataObjData', undefined)
		this.parms = this.setData(data, 'parms', {})
		this.system = this.setData(data, 'system', {})
		this.tree = this.setData(data, 'tree', [])
		this.user = Object.hasOwn(data, 'user')
			? this.setData(data, 'user', {})
			: valueOrDefault(userGet(), {})
	}
	static load(currData: TokenApiQueryData) {
		const newData = new TokenApiQueryData(currData)
		newData.tree = new TokenApiQueryDataTree(currData.tree.levels)
		return newData
	}
	setData(data: any, key: string, defaultVal: any) {
		return Object.hasOwn(data, key) && data !== undefined ? data[key] : defaultVal
	}
	replaceParms(data: any) {
		this.parms = data
	}
	setParmsValue(key: string, value: any) {
		this.parms[key] = value
	}
}
export class TokenApiQueryDataTree {
	levels: Array<TokenApiQueryDataTreeLevel> = []
	constructor(levels: Array<TokenApiQueryDataTreeLevel> = []) {
		this.levels = levels
	}
	upsertData(table: string | undefined, data: any) {
		if (table) {
			const idx = this.levels.findIndex((t) => t.table === table)
			if (idx >= 0) {
				this.levels[idx].data = data
			} else {
				this.levels.push(new TokenApiQueryDataTreeLevel(table, data))
			}
		}
	}
	getRecord(table: string | undefined = undefined) {
		if (table) {
			return this.levels.find((l) => l.table === table)?.data
		} else {
			return this.levels[this.levels.length - 1]?.data
		}
	}

	getFieldData(table: string | undefined, fieldName: string) {
		const record = this.getRecord(table)
		if (fieldName && record && Object.hasOwn(record, fieldName)) {
			return record[fieldName]
		} else {
			error(500, {
				file: FILENAME,
				function: 'TokenApiQueryDataTree.getFieldData',
				message: `Field ${fieldName} not found in data tree - table: ${table}; record: ${JSON.stringify(
					record
				)}`
			})
		}
	}

	setFieldData(table: string | undefined, fieldName: string, value: any) {
		const record = this.getRecord(table)
		if (fieldName && record && Object.hasOwn(record, fieldName)) {
			record[fieldName] = value
		} else {
			error(500, {
				file: FILENAME,
				function: 'TokenApiQueryDataTree.setFieldData',
				message: `Field ${fieldName} not found in data tree - table: ${table}; record: ${JSON.stringify(
					record
				)}`
			})
		}
	}
}

export class TokenApiQueryDataTreeLevel {
	table: string
	data: DataObjRecord
	constructor(table: string, data: DataObjRecord) {
		this.data = data
		this.table = table
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

export class TokenApiUserId extends TokenApi {
	userId: string
	constructor(userId: string) {
		super()
		this.userId = userId
	}
}

export class TokenApiUserName extends TokenApi {
	userName: string
	constructor(userName: string) {
		super()
		this.userName = userName
	}
}
