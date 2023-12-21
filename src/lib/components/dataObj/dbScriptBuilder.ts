import {
	booleanOrFalse,
	getArray,
	strOptional,
	memberOfEnum,
	memberOfEnumOrDefault,
	nbrRequired,
	strRequired,
	valueOrDefault
} from '$lib/utils/utils'
import type { DataObjRaw } from '$comps/types'
import type { QueryParmData, QueryParmDataValue } from '$comps/dataObj/types.query'
import { FieldValue } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/types.edgeDB.ts'

export class EdgeQL {
	exprFilter: string | undefined
	exprObject: string | undefined
	fieldsID: Array<DataFieldDataId>
	fieldsOrder: Array<DataFieldOrder>
	fieldsPreset: Array<DataFieldPreset>
	fieldsSaveInsert: Array<DataFieldData>
	fieldsSaveUpdate: Array<DataFieldData>
	fieldsSelectUser: Array<DataFieldSelect>
	fieldsSelectSys: Array<DataFieldSelect>
	link: EdgeType | undefined
	objName: string
	table: Table

	constructor(dataObjRaw: DataObjRaw) {
		const obj = valueOrDefault(dataObjRaw, {})
		this.exprFilter = strOptional(obj.exprFilter, 'EdgeQL', 'exprFilter')
		this.exprObject = strOptional(obj.exprObject, 'EdgeQL', 'exprObject')

		this.fieldsID = this.initFields(obj._fieldsDbId, DataFieldDataId)
		this.fieldsOrder = this.initFields(obj._fieldsDbOrder, DataFieldOrder)
		this.fieldsPreset = this.initFields(obj._fieldsDbPreset, DataFieldPreset)
		this.fieldsSaveInsert = this.initFields(obj._fieldsDbSaveInsert, DataFieldData)
		this.fieldsSaveUpdate = this.initFields(obj._fieldsDbSaveUpdate, DataFieldData)
		this.fieldsSelectUser = this.initFields(obj._fieldsDbSelectUser, DataFieldSelect)
		this.fieldsSelectSys = this.initFields(obj._fieldsDbSelectSys, DataFieldSelect)

		this.link = obj.link ? new EdgeType(obj.link) : undefined
		this.objName = obj.name
		this.table = new Table(obj._table)

		// console.log()
		// console.log('EdgeQL...')
		// console.log('exprFilter:', this.exprFilter)
		// console.log('exprObject:', this.exprObject)

		// console.log('raw-defn:', obj)
		// console.log('raw-fieldsID:', obj._fieldsDbId)
		// console.log('raw-fieldsOrder:', obj._fieldsDbOrder)
		// console.log('raw-fieldsPreset:', obj._fieldsDbPreset)
		// console.log('raw-fieldsSaveInsert:', obj._fieldsDbSaveInsert)
		// console.log('raw-fieldsSaveUpdate:', obj._fieldsDbSaveUpdate)
		// console.log('raw-fieldsSelectUser:', obj._fieldsDbSelectUser)
		// console.log('raw-fieldsSelectSys:', obj._fieldsDbSelectSys)

		// console.log('fieldsID:', this.fieldsID)
		// console.log('fieldsOrder:', this.fieldsOrder)
		// console.log('fieldsPreset:', this.fieldsPreset)
		// console.log('fieldsSaveInsert:', this.fieldsSaveInsert)
		// console.log('fieldsSaveUpdate:', this.fieldsSaveUpdate)
		// console.log('fieldsSelectUser:', this.fieldsSelectUser)
		// console.log('fieldsSelectSys:', this.fieldsSelectSys)

		// add mgmt columns
		// if (this.table.hasMgmt) {
		// 	this.addFieldMgmtUser('createdBy', this.fieldsSaveInsert)
		// 	this.addFieldMgmtUser('modifiedBy', this.fieldsSaveInsert)
		// 	this.addFieldMgmtUser('modifiedBy', this.fieldsSaveUpdate)
		// }
	}

	initFields(fields: any, fieldClass: any) {
		let newFields: any = []
		fields = getArray(fields)
		fields.forEach((f: any) => {
			newFields.push(new fieldClass(f))
		})
		return newFields
	}

	private logScript(type: string, script: string) {
		if (!script) return
		console.log()
		console.log(`getScript: ${type}...`)
		console.log(script)
		console.log()
	}

	getScriptDataItems(dbSelect: string, data: QueryParmData) {
		const script = getValExpr(dbSelect, data)
		return script
	}
	getScriptDelete(data: QueryParmData) {
		const queryFilter = this.getScriptItemsFilter(this.fieldsID, data)
		const script = 'DELETE ' + this.table.getObject() + queryFilter
		this.logScript('delete', script)
		return script
	}
	getScriptObjectExpr(data: QueryParmData) {
		if (this.exprObject) {
			const script = getValExpr(this.exprObject, data)
			this.logScript('objectExpression', script)
			return script
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'getScriptObjectExpr',
				message: `No object expression provided for object: ${this.objName}`
			})
		}
	}

	getScriptPreset(data: QueryParmData) {
		let script = ''

		if (this.fieldsPreset.length > 0) {
			const queryFields = this.getScriptItemsPreset(this.fieldsPreset, data)
			script = 'SELECT ' + queryFields
		}
		this.logScript('preset', script)
		return script
	}

	getScriptSaveInsert(data: QueryParmData) {
		const queryFields = this.getScriptItemsSave(this.fieldsSaveInsert, data, true)
		let script = 'INSERT ' + this.table.getObject() + ' ' + queryFields
		this.logScript('insert', script)
		return script
	}

	getScriptSaveUpdate(data: QueryParmData) {
		const queryFilter = this.getScriptItemsFilter(this.fieldsID, data)
		let queryFields = this.getScriptItemsSave(this.fieldsSaveUpdate, data)
		if (queryFields) {
			queryFields = ' SET ' + queryFields
		}

		let script = 'UPDATE ' + this.table.getObject() + queryFilter + queryFields

		if (this.link) {
			const linkPropertyID =
				'WITH _' +
				this.link.property +
				' := (SELECT ' +
				this.table.getObject() +
				' { id } ' +
				this.getScriptItemsFilter(this.fieldsID, data) +
				')'
			script = linkPropertyID + ' ' + script
		}

		this.logScript('update', script)
		return script
	}

	getScriptSelect(data: QueryParmData, fieldsSelect: Array<DataFieldSelect>) {
		const queryFields = this.getScriptItemsSelect(fieldsSelect, data)
		const queryFilter = this.getScriptItemsFilter(this.fieldsID, data)
		const queryOrder = this.getScriptItemsOrder(this.fieldsOrder)

		const script = 'SELECT ' + this.table.getObject() + ' ' + queryFields + queryFilter + queryOrder
		this.logScript('select', script)
		return script
	}
	getScriptSelectSys(data: QueryParmData) {
		return this.getScriptSelect(data, this.fieldsSelectSys)
	}
	getScriptSelectUser(data: QueryParmData) {
		return this.getScriptSelect(data, this.fieldsSelectUser)
	}

	getScriptItemsFilter(fields: Array<DataFieldDataId>, data: QueryParmData) {
		let script = ''
		let exprFilter = ''

		if (!this.exprFilter) {
			exprFilter = `.id = <uuid,retrieve,id>`
		} else if (this.exprFilter?.toLowerCase() !== 'none') {
			exprFilter = this.exprFilter
		}

		if (exprFilter) {
			script = getValExpr(exprFilter, data)
			if (script) script = ' FILTER ' + script
		}

		return script
	}

	getScriptItemsOrder(fields: Array<DataFieldOrder>) {
		let script = ''
		fields.forEach((f) => {
			if (script) script += ' THEN '

			if (f.expr) {
				script += f.expr
			} else {
				const name =
					f.codeDataType === DataFieldDataType.str ? 'str_lower(.' + f.name + ')' : '.' + f.name
				script += name + ' ' + f.codeDirection
			}
		})
		if (script) script = ' ORDER BY ' + script
		return script
	}

	getScriptItemsPreset(fields: Array<DataFieldPreset>, data: QueryParmData) {
		let script = ''
		fields.forEach((f) => {
			if (script) script += ', '
			const item = f.name + ' := ' + getValExpr(f.expr, data)
			script += item
		})
		if (script) script = '{ ' + script + ' }'
		return script
	}

	getScriptItemsSave(fields: Array<DataFieldData>, data: QueryParmData, isInsert: boolean = false) {
		let script = ''

		// non link fields
		fields.forEach((f) => {
			if (!f.isLinkMember) {
				if (script) script += ', '
				script += f.name + ' := ' + getValSave(f, data)
			}
		})

		// link fields
		if (this.link) {
			let items = ''
			fields.forEach((f) => {
				if (f.isLinkMember) {
					if (items) items += ', '

					items += f.name + ' := ' + getValSave(f, data)
				}
			})

			if (items) {
				let linkProperty = ''
				if (isInsert) {
					linkProperty =
						this.link.property + ' := (INSERT ' + this.link.table.getObject() + ' {' + items + '}) '
				} else {
					// update
					linkProperty =
						this.link.property +
						' := (UPDATE ' +
						this.link.table.getObject() +
						' FILTER .id = _' +
						this.link.property +
						'.' +
						this.link.property +
						'.id' +
						' SET {' +
						items +
						'}) '
				}
				if (script) script += ', '
				script += linkProperty
			}
		}

		if (script) script = '{ ' + script + ' }'
		return script
	}

	getScriptItemsSelect(fields: Array<DataFieldSelect>, data: QueryParmData) {
		let script = ''
		fields.forEach((f) => {
			if (script) script += ', '
			let item = ''
			if (f.expr) {
				item += f.name + ' := ' + getValExpr(f.expr, data)
			} else if (f.isLinkMember) {
				item += f.name + ' := .' + this.link?.property + '.' + f.name
				if (f.edgeTypeDefn) item += ' {data := .id, display := .' + f.edgeTypeDefn.property + '}'
			} else if (f.edgeTypeDefn) {
				item += f.name + ': {data := .id, display := .' + f.edgeTypeDefn.property + '}'
			} else {
				item += f.name
			}
			script += item
		})

		if (script) script = '{ ' + script + ' }'
		return script
	}

	getOp(op: DataFieldOp) {
		switch (op) {
			case DataFieldOp.eq:
				return '='
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'getOp',
					message: `No case defined for op: ${op}`
				})
		}
	}
}

export function getValSave(field: DataFieldData, data: QueryParmData): any {
	const valRaw = getValRaw(field, data)
	const valFormatted = getValFormatted(field, valRaw)
	return valFormatted

	function getValRaw(field: DataFieldData, data: QueryParmData) {
		const funct = `getValSave.getValRaw: fieldName: ${field.name} - source: ${field.codeSource} - sourceKey: ${field.sourceKey}`

		switch (field.codeSource) {
			case DataFieldSource.calc:
				switch (field.sourceKey) {
					case 'random10':
						return parseInt(Math.random().toFixed(10).replace('0.', ''))

					default:
						valueNotFound(DataFieldSource.calc, {})
				}

			case DataFieldSource.literal:
				return field.sourceKey

			case DataFieldSource.parms:
				return getValue(DataFieldSource.parms, data.parms, field.sourceKey)

			case DataFieldSource.preset:
				return getValue(DataFieldSource.preset, data.preset, field.sourceKey)

			case DataFieldSource.retrieve:
				console.log('data.retrieve:', {
					fieldName: field.name,
					data: data.retrieve,
					sourceKey: field.sourceKey
				})
				return getValue(DataFieldSource.retrieve, data.retrieve, field.sourceKey)

			case DataFieldSource.system:
				return getValue(DataFieldSource.system, data.system, field.sourceKey)

			case DataFieldSource.user:
				return getValue(DataFieldSource.user, data.user, field.sourceKey)

			default:
				throw error(500, {
					file: FILENAME,
					function: funct,
					message: `No case defined for source: ${field.codeSource}`
				})
		}
		function getValue(source: DataFieldSource, data: QueryParmDataValue, key: string) {
			const result = getValueNested(data, key)
			return result ? result[1] : valueNotFound(source, data)
		}
		function getValueNested(data: QueryParmDataValue, key: string) {
			const tokens = key.split('.')
			let currentData = data
			for (let i = 0; i < tokens.length - 1; i++) {
				if (!currentData || !currentData.hasOwnProperty(tokens[i])) return false
				currentData = currentData[tokens[i]]
			}
			const idx = tokens.length - 1
			if (!currentData || !currentData.hasOwnProperty(tokens[idx])) return false
			return [true, currentData[tokens[idx]]]
		}
		function valueNotFound(source: DataFieldSource, data: QueryParmDataValue) {
			throw error(500, {
				file: FILENAME,
				function: funct,
				message: `Value null or not found for source: ${source} data: ${JSON.stringify(data)}.`
			})
		}
	}

	function getValFormatted(field: DataFieldData, val: any) {
		let valObject

		if (isAFieldValue(val)) {
			delete val.selected
			valObject = val
			val = val.data
		}

		if (field.codeDataType === DataFieldDataType.json) {
			return valObject && valObject.data ? '<json>' + getValQuote(JSON.stringify(valObject)) : '{}'
		}

		// scalar values
		if (field.codeDataType === DataFieldDataType.bool) {
			return [undefined, null].includes(val) ? false : val
		}

		if ((!val && val !== 0) || (Array.isArray(val) && val.length === 0)) return '{}'

		switch (field.codeDataType) {
			case DataFieldDataType.date:
				val = '<cal::local_date>' + getValQuote(val)
				break

			case DataFieldDataType.datetime:
				val = 'DATETIME(' + getValQuote(val) + ')'
				break

			case DataFieldDataType.edgeType:
				if (field.edgeTypeDefn) {
					const getId = (id: string) => {
						return `<uuid>${getValQuote(id)}`
					}

					let filter = ''
					if (field.isMultiSelect) {
						const vals = val.split(',')
						vals.forEach((v: string) => {
							if (filter) filter += ','
							filter += getId(v)
						})
						if (filter) filter = 'in {' + filter + '}'
					} else {
						filter = `= ${getId(val)}`
					}
					val = `(SELECT ${field.edgeTypeDefn.table.getObject()} FILTER .id ${filter})`
				}
				break

			case DataFieldDataType.decimal:
			case DataFieldDataType.int16:
			case DataFieldDataType.int32:
			case DataFieldDataType.int64:
			case DataFieldDataType.raw:
				// no change
				break

			case DataFieldDataType.str:
				val = getValQuote(val)
				break

			case DataFieldDataType.uuid:
				val = '<uuid>' + getValQuote(val)
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'getValFormatted',
					message: `No case defined for data type: (${field.codeDataType}).`
				})
		}
		return val

		function getValQuote(val: string) {
			return "'" + val + "'"
		}
	}
	function isAFieldValue(obj: any) {
		return (
			obj !== null &&
			typeof obj === 'object' &&
			!Array.isArray(obj) &&
			'data' in obj &&
			'display' in obj
		)
	}
}

export function getValExpr(expr: string, data: QueryParmData): string {
	/*
		data token <[dataType],[source],[sourceKey]>
		eg. (select sys_user::getUser(<str,user,userName>))
	*/
	const regex = /<(.*?)>/g
	const newExpr = expr.replace(regex, (t) => {
		const token = t.slice(1, t.length - 1)
		const tokenItems = token.split(',')
		if (tokenItems.length === 3) {
			const exprField = new DataFieldData({
				_codeDataType: tokenItems[0],
				_codeQueryParmDataSource: tokenItems[1],
				QueryParmDataSourceKey: tokenItems[2]
			})
			return getValSave(exprField, data)
		} else {
			// ignore
			return '<' + token + '>'
		}
	})
	return newExpr
}

class DataField {
	constructor(obj: any) {}
}
class DataFieldData extends DataField {
	codeDataType: DataFieldDataType
	codeSource: DataFieldSource
	edgeTypeDefn: EdgeTypeDefn | undefined
	isLinkMember: boolean
	isMultiSelect: boolean
	name: string | undefined
	sourceKey: string
	constructor(obj: any) {
		super(obj)
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			'DataFieldData',
			'codeDataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.codeSource = memberOfEnumOrDefault(
			obj._codeQueryParmDataSource,
			'DataFieldData',
			'codeSource',
			'DataFieldSource',
			DataFieldSource,
			DataFieldSource.retrieve
		)
		this.edgeTypeDefn = obj._edgeTypeDefn ? new EdgeTypeDefn(obj._edgeTypeDefn) : undefined
		this.isLinkMember = booleanOrFalse(obj.isLinkMember, 'DataFieldData.isLinkMember')
		this.isMultiSelect = booleanOrFalse(obj._isMultiSelect, 'DataFieldData.isMultiLink')
		this.name = strOptional(obj._name, 'DataFieldData', 'name')
		this.sourceKey = valueOrDefault(obj.QueryParmDataSourceKey, obj._name)
	}
}
class DataFieldDataId extends DataFieldData {
	codeOp: DataFieldOp
	exprFilter: string | undefined
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.codeOp = memberOfEnumOrDefault(
			obj._codeQueryParmDataOp,
			'DataFieldId',
			'codeOp',
			'DataFieldOp',
			DataFieldOp,
			DataFieldOp.eq
		)
		this.exprFilter = strOptional(obj._exprFilter, 'DataFieldDataId', 'exprFilter')
	}
}

class DataFieldOrder extends DataField {
	codeDataType: DataFieldDataType
	codeDirection: DataFieldDirection
	expr: string | undefined
	name: string | undefined
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			'DataFieldOrder',
			'codeDataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.codeDirection = memberOfEnumOrDefault(
			obj._codeDbListDir,
			'DataFieldOrder',
			'codeDirection',
			'DataFieldDirection',
			DataFieldDirection,
			DataFieldDirection.asc
		)
		this.expr = strOptional(obj._expr, 'DataFieldData', '_expr')
		this.name = strOptional(obj._name, 'DataFieldData', 'name')
	}
}
class DataFieldPreset extends DataField {
	expr: string
	name: string
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.expr = strRequired(obj._expr, 'DataFieldData', 'expr')
		this.name = strRequired(obj._name, 'DataFieldData', 'name')
	}
}

class DataFieldSelect extends DataField {
	codeDataType: DataFieldDataType
	edgeTypeDefn: EdgeTypeDefn | undefined
	expr: string | undefined
	isLinkMember: boolean
	name: string | undefined
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			'DataFieldSelect',
			'codeDataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.edgeTypeDefn = obj._edgeTypeDefn ? new EdgeTypeDefn(obj._edgeTypeDefn) : undefined
		this.expr = strOptional(obj._expr, 'DataFieldData', 'expr')
		this.isLinkMember = booleanOrFalse(obj.isLinkMember, 'DataFieldData')
		this.name = strOptional(obj._name, 'DataFieldData', 'name')
	}
}

class EdgeType {
	property: string
	table: Table
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.property = obj.property
		this.table = new Table(obj.table)
	}
}
class EdgeTypeDefn {
	property: string
	table: Table
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.property = strRequired(obj.property, 'EdgeTypeDefn', 'property')
		this.table = new Table(obj.table)
	}
}
export class Table {
	hasMgmt: boolean
	module: string
	name: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.hasMgmt = booleanOrFalse(obj.hasMgmt, 'Table')
		this.module = strRequired(obj.mod, 'Table', 'mod')
		this.name = strRequired(obj.name, 'Table', 'name')
	}
	getObject() {
		return this.module + '::' + this.name
	}
}

export enum DataFieldDataType {
	bool = 'bool',
	computed = 'computed',
	date = 'date',
	datetime = 'datetime',
	decimal = 'decimal',
	edgeType = 'edgeType',
	int16 = 'int16',
	int32 = 'int32',
	int64 = 'int64',
	json = 'json',
	raw = 'raw',
	str = 'str',
	uuid = 'uuid'
}
export enum DataFieldDirection {
	asc = 'asc',
	desc = 'desc'
}
export enum DataFieldOp {
	eq = 'eq'
}
export enum DataFieldSource {
	calc = 'calc',
	literal = 'literal',
	parms = 'parms',
	preset = 'preset',
	retrieve = 'retrieve',
	system = 'system',
	user = 'user'
}

export class BinarySelect {
	BinarySelectTypes: Partial<Record<DataFieldDataType, [any, any]>> = {
		bool: [true, false],
		int16: [1, 0],
		str: ['Yes', 'No']
	}
	selections: any
	constructor(dataType: DataFieldDataType) {
		this.selections = this.BinarySelectTypes[dataType]
	}

	isSelected(value: any) {
		return this.getIdx(value) === 0
	}

	getIdx(value: any) {
		return this.selections.findIndex((s: any) => {
			return s === value
		})
	}

	getDefault() {
		return this.selections[1]
	}

	getValue(value: any) {
		return this.selections[(this.getIdx(value) + 1) % 2]
	}
}
