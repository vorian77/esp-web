import { memberOfEnum, memberOfEnumOrDefault, strRequired, valueOrDefault } from '$lib/utils/utils'

const FILENAME = '/$comps/types.edgeDB.ts'

export type EdgeDBItem = {
	name: string
	op: DataActionItemOp
	dataType: DataActionItemDataType
	rawVal: any
}
export type EdgeDBOrder = {
	name: string
	direction: EdgeDBOrderDirection
}
export enum EdgeDBOrderDirection {
	asc = 'asc',
	desc = 'desc'
}

export class ObjectAction {
	name: string
	header: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.name = strRequired(obj.name, 'ObjectAction', 'name')
		this.header = strRequired(obj.header, 'ObjectAction', 'header')
	}
}

export class DataAction {
	query: string
	codeType: DataActionType
	items: Array<DataActionItem>

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.query = strRequired(obj.query, 'DataAction', 'query')
		this.codeType = memberOfEnum(
			obj['_codeType'],
			'DataAction',
			'codeType',
			'DataActionType',
			DataActionType
		)
		this.items = this.initItems(obj.items)
	}

	initItems(obj: any) {
		const items = valueOrDefault(obj, [])
		let newItems: Array<DataActionItem> = []
		items.forEach((item: {}, index: number) => {
			newItems.push(new DataActionItem(item))
		})
		return newItems
	}
}

export class DataActionItem {
	dbName: string
	codeSource: DataActionItemSource
	sourceKey: string
	codeDataType: DataActionItemDataType
	codeOp: DataActionItemOp | undefined
	fieldName: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.dbName = strRequired(obj.dbName, 'DataActionItem', 'dbName')
		this.codeSource = memberOfEnum(
			obj['_codeSource'],
			'DataActionItem',
			'codeSource',
			'DataActionItemSource',
			DataActionItemSource
		)
		this.sourceKey = strRequired(obj.sourceKey, 'DataActionItem', 'sourceKey')

		this.codeDataType = memberOfEnum(
			obj['_codeDataType'],
			'DataActionItem',
			'codeDataType',
			'DataActionItemDataType',
			DataActionItemDataType
		)
		this.codeOp = memberOfEnumOrDefault(
			obj['_codeOp'],
			'DataActionItem',
			'codeOp',
			'DataActionItemOp',
			DataActionItemOp,
			undefined
		)
		this.fieldName = valueOrDefault(obj.fieldName, undefined)
	}
}

export enum DataActionItemDataType {
	number = 'number',
	raw = 'raw',
	str = 'str',
	uuid = 'uuid'
}
export enum DataActionItemOp {
	equal = '=',
	assign = ':='
}
export enum DataActionItemSource {
	data = 'data',
	env = 'env',
	form = 'form',
	literal = 'literal',
	system = 'system',
	traversal = 'traversal'
}
export enum DataActionType {
	delete = 'delete',
	insert = 'insert',
	select = 'select',
	update = 'update'
}
