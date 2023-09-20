export enum EdgeDBDataType {
	str = 'str',
	uuid = 'uuid'
}
export enum EdgeDBFilterDirection {
	asc = 'asc',
	desc = 'desc'
}
export type EdgeDBFilterField = {
	name: string
	dataType: EdgeDBDataType
	val: any
}
export type EdgeDBOrderField = {
	name: string
	direction: EdgeDBFilterDirection
}

export type FormAction = {
	type: 'insert' | 'select'
	query: string
	filterItems: FormItem[]
}

export type FormItem = {
	dbName: string
	source: FormItemSource
	sourceKey: string
	data_type: EdgeDBDataType | null
	op: string | null
}

export enum FormItemSource {
	env = 'env',
	data = 'data',
	form = 'form',
	literal = 'literal',
	none = 'none',
	system = 'system'
}
