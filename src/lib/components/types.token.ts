import {
	DataObj,
	type DataObjData,
	type DataObjRecord,
	required,
	userGet,
	valueOrDefault
} from '$comps/types'
import type { DataObjRaw } from '$comps/types'
import { AppRowActionType } from '$comps/nav/types.app'
import { Node } from '$comps/nav/types.node'
import { error } from '@sveltejs/kit'

const FILENAME = 'lib/api.ts'

export class Token {
	constructor() {}
}

export class TokenApi extends Token {
	constructor() {
		super()
	}
}

export class TokenApiFileUpload extends TokenApi {
	file: File | undefined
	fileAction: TokenApiFileUploadAction
	fileName: string | undefined
	fileType: string | undefined
	storageKey: string | undefined
	constructor(
		fileAction: TokenApiFileUploadAction,
		storageKey: string | undefined,
		file: File | undefined = undefined
	) {
		const clazz = 'TokenApiFileUpload'
		super()
		this.file = file
		this.fileAction = fileAction
		this.fileName = file ? file.name : undefined
		this.fileType = file ? file.type : undefined
		this.storageKey = storageKey
	}
}

export class TokenApiFileUploadData {
	fileName: string
	fileType: string
	isImage: boolean
	isPDF: boolean
	storageKey: string
	constructor(storageKey: string, fileName: string, fileType: string) {
		this.fileName = fileName
		this.storageKey = storageKey
		this.fileType = fileType
		this.isImage = fileType ? fileType.includes('image') : false
		this.isPDF = fileType ? fileType.includes('pdf') : false
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

	getRecord(table: string | undefined = undefined) {
		if (table) {
			return this.levels.find((l) => l.table === table)?.data
		} else {
			return this.levels[this.levels.length - 1]?.data
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
}

export class TokenApiQueryDataTreeLevel {
	data: DataObjRecord
	table: string
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
	dataObj = 'dataObj',
	delete = 'delete',
	expression = 'expression',
	fieldItems = 'fieldItems',
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

export class TokenApp extends Token {
	constructor() {
		super()
	}
}
export class TokenAppCrumbs extends TokenApp {
	crumbIdx: number
	constructor(crumbIdx: number) {
		super()
		this.crumbIdx = crumbIdx
	}
}

export class TokenAppDo extends TokenApp {
	action: TokenAppDoAction
	dataObj: DataObj
	constructor(action: TokenAppDoAction, dataObj: DataObj) {
		super()
		this.action = action
		this.dataObj = dataObj
	}
}
export enum TokenAppDoAction {
	back = 'back',
	listEdit = 'listEdit',
	listNew = 'listNew',
	detailDelete = 'detailDelete',
	detailNew = 'detailNew',
	detailSaveAs = 'detailSaveAs',
	detailSaveInsert = 'detailSaveInsert',
	detailSaveUpdate = 'detailSaveUpdate',
	none = 'none',
	refresh = 'refresh'
}

export class TokenAppDoDetail extends TokenAppDo {
	confirm: TokenAppDoDetailConfirm | undefined
	constructor(action: TokenAppDoAction, dataObj: DataObj, confirm?: TokenAppDoDetailConfirm) {
		super(action, dataObj)
		this.confirm = confirm
	}
}

export class TokenAppDoDetailConfirm {
	buttonConfirmLabel: string
	msg: string
	title: string
	constructor(title: string, msg: string, buttonConfirmLabel: string) {
		this.buttonConfirmLabel = buttonConfirmLabel
		this.msg = msg
		this.title = title
	}
}

export class TokenAppDoList extends TokenAppDo {
	listFilterIds: Array<string>
	listRowId: string
	constructor(
		action: TokenAppDoAction,
		dataObj: DataObj,
		listFilterIds: Array<string>,
		listRowId: string
	) {
		super(action, dataObj)
		this.listFilterIds = listFilterIds
		this.listRowId = listRowId
	}
}

export class TokenAppDoName extends TokenApp {
	dataObjName: string
	constructor(dataObjName: string) {
		super()
		this.dataObjName = dataObjName
	}
}

export class TokenAppRow extends TokenApp {
	rowAction: AppRowActionType
	constructor(rowAction: AppRowActionType) {
		super()
		this.rowAction = rowAction
	}
}
export class TokenAppTab extends TokenApp {
	tabIdx: number
	constructor(tabIdx: number) {
		super()
		this.tabIdx = tabIdx
	}
}
export class TokenAppTreeNode extends TokenApp {
	node: Node
	constructor(node: Node) {
		super()
		this.node = node
	}
}
export class TokenAppTreeNodeId extends TokenApp {
	nodeId: string
	constructor(nodeId: string) {
		super()
		this.nodeId = nodeId
	}
}

export class TokenAppTreeReset extends TokenApp {
	constructor() {
		super()
	}
}

export class TokenAppTreeSetParent extends TokenApp {
	constructor() {
		super()
	}
}
