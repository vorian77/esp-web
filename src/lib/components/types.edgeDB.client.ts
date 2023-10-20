import {
	booleanOrFalse,
	getArray,
	memberOfEnum,
	memberOfEnumOrDefault,
	nbrRequired,
	strRequired,
	valueOrDefault
} from '$lib/utils/utils'
import type { DataActionProcessType } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/types.edgeDB.ts'

export type EdgeDBItem = {
	name: string
	op: DataFieldOp
	dataType: DataFieldDataType
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

export class EdgeQL {
	objName: string
	table: Table

	fieldsId: Array<DataFieldDataId>
	fieldsOrder: Array<DataFieldOrder>
	fieldsPreset: Array<DataFieldDataPreset>
	fieldsSaveInsert: Array<DataFieldDataSave>
	fieldsSaveUpdate: Array<DataFieldDataSave>
	fieldsSelect: Array<DataFieldSelect>

	constructor(nodeObjDefn: any, processType: DataActionProcessType) {
		const obj = valueOrDefault(nodeObjDefn, {})
		this.objName = obj.name
		this.table = new Table(obj._table)

		this.fieldsId = this.initFields(obj._fieldsId, DataFieldDataId)
		this.fieldsOrder = this.initFields(obj._fieldsOrder, DataFieldOrder)
		this.fieldsPreset = this.initFields(obj._fieldsPreset, DataFieldDataPreset)
		this.fieldsSaveInsert = this.initFieldsSave(obj._fieldsSaveInsert)
		this.fieldsSaveUpdate = this.initFieldsSave(obj._fieldsSaveUpdate)
		this.fieldsSelect = this.initFields(obj._fieldsSelect, DataFieldSelect)

		// add mgmt columns
		if (this.table.hasMgmt) {
			this.addFieldMgmtUser('createdBy', this.fieldsSaveInsert)
			this.addFieldMgmtUser('modifiedBy', this.fieldsSaveInsert)
			this.addFieldMgmtUser('modifiedBy', this.fieldsSaveUpdate)
		}
		// console.log()
		// console.log('EdgeQL...')
		// console.log('fieldsId:', this.fieldsId)
		// console.log('fieldsPreset:', this.fieldsPreset)
		// console.log('fieldsSaveInsert:', this.fieldsSaveInsert)
		// console.log('fieldsSaveUpdate:', this.fieldsSaveUpdate)
	}

	addFieldMgmtUser(dbName: string, fields: Array<DataFieldDataSave>) {
		if (fields.length === 0) {
			return
		}
		const newField = {
			dbName,
			_codeDbDataType: 'expr',
			_codeDbDataSource: 'literal',
			dbDataSourceKey: '(select sys_user::getUser(<str;user;userName>))'
		}
		fields.push(new DataFieldDataSave(newField))
	}

	initFields(fields: any, fieldClass: DataField) {
		let newFields: any = []
		fields = getArray(fields)

		fields.forEach((f: any) => {
			newFields.push(new fieldClass(f))
		})
		return newFields
	}

	initFieldsSave(fields: any) {
		const reqdValKeys = ['dbName', '_codeDbDataType', '_codeDbDataSource', 'dbDataSourceKey']
		fields = getArray(fields)
		const hasAllValues = (currentField: any) => {
			for (const key of reqdValKeys) {
				if (!currentField[key]) {
					return false
				}
			}
			return true
		}
		const validFields = fields.filter(hasAllValues)
		return this.initFields(validFields, DataFieldDataSave)
	}

	getScriptDelete(parms: any) {
		const queryFilter = this.getScriptItemsFilter(this.fieldsId, parms)
		const script = 'DELETE ' + this.table.module + '::' + this.table.name + queryFilter
		console.log('getScriptDelete:', script)
		return script
	}

	getScriptSaveInsert(parms: any) {
		const queryFields = this.getScriptItemsSave(this.fieldsSaveInsert, parms)

		const script = 'INSERT ' + this.table.module + '::' + this.table.name + ' ' + queryFields

		console.log('')
		console.log('getScriptSaveInsert...')
		console.log('parms:', parms)
		console.log('script:', script)
		return script
	}

	getScriptSaveUpdate(parms: any) {
		const queryFilter = this.getScriptItemsFilter(this.fieldsId, parms)
		let queryFields = this.getScriptItemsSave(this.fieldsSaveUpdate, parms)
		if (queryFields) {
			queryFields = ' SET ' + queryFields
		}

		const script =
			'UPDATE ' + this.table.module + '::' + this.table.name + queryFilter + queryFields

		console.log('')
		console.log('getScriptSaveUpdate...')
		// console.log('parms:', parms)
		console.log('script:', script)
		return script
	}

	getScriptSelect(parms: any) {
		const queryFields = this.getScriptItemsSelect(this.fieldsSelect)
		const queryFilter = this.getScriptItemsFilter(this.fieldsId, parms)
		const queryOrder = this.getScriptItemsOrder(this.fieldsOrder)

		const script =
			'SELECT ' +
			this.table.module +
			'::' +
			this.table.name +
			queryFields +
			queryFilter +
			queryOrder

		console.log('getScriptSelect:', script)
		return script
	}
	getScriptItemsFilter(fields: Array<DataFieldDataId>, parms: any) {
		let script = ''

		fields.forEach((f) => {
			if (script) {
				script += ' AND '
			}
			script += '.' + f.dbName + ' ' + this.getOp(f.codeOp) + ' ' + this.getVal(f, parms)
		})
		if (script) {
			script = ' FILTER ' + script
		}
		return script
	}

	getScriptItemsOrder(fields: Array<DataFieldOrder>) {
		let script = ''
		fields.forEach((f) => {
			if (script) {
				script += ' THEN '
			}
			script += '.' + f.dbName + ' ' + f.codeDirection
		})
		if (script) {
			script = ' ORDER BY ' + script
		}
		return script
	}

	getScriptItemsSelect(fields: Array<DataFieldSelect>) {
		let script = ''
		fields.forEach((f) => {
			if (script) {
				script += ', '
			}
			script += f.dbName
		})
		if (script) {
			script = ' { ' + script + ' }'
		}
		return script
	}

	getScriptItemsSave(fields: Array<DataFieldDataSave>, parms: any) {
		let script = ''
		fields.forEach((f) => {
			if (script) {
				script += ', '
			}
			script += f.dbName + ' := ' + this.getVal(f, parms)
		})
		if (script) {
			script = '{ ' + script + ' }'
		}
		return script
	}

	getPresetData(parms: any) {
		console.log('getPresetData.fields:', this.fieldsPreset)
		return {}
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

	getVal(field: DataFieldData, parms: any) {
		let val = getValRaw(field, parms)

		switch (field.codeDataType) {
			// case FieldDataType.datetime:
			// 	val = 'DATETIME(' + quoteVal(val) + ')'
			// 	break

			case DataFieldDataType.expr:
				return this.getValExpr(field, parms)
				break

			case DataFieldDataType.number:
				// no change
				break

			case DataFieldDataType.str:
				val = getValQuote(val)
				break
			// case FieldDataType.subquery:
			// 	val = '(' + val + ')'
			// 	break
			case DataFieldDataType.uuid:
				val = '<uuid>' + getValQuote(val)
				break
			default:
				throw error(500, {
					file: FILENAME,
					function: 'getVal',
					message: `No case defined for data type: (${field.codeDataType}).`
				})
		}

		if (val) {
			return val
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'getFieldValue',
				message: `Get value failed for field: ${field}`
			})
		}

		function getValQuote(val: string) {
			return "'" + val + "'"
		}

		function getValRaw(field: DataFieldData, parms: any) {
			switch (field.codeSource) {
				case DataFieldSource.data:
					return parms.data[field.sourceKey]

				case DataFieldSource.literal:
					return field.sourceKey

				case DataFieldSource.user:
					return parms.user[field.sourceKey]

				default:
					throw error(500, {
						file: FILENAME,
						function: 'getValRaw',
						message: `No case defined for source: ${field.codeSource}`
					})
			}
		}
	}

	getValExpr(field: DataFieldData, parms: any): string {
		/*
			data token <[dataType];[source];[sourceKey]>
			eg. (select sys_user::getUser(<str;user;userName>))
		*/
		const expr = field.sourceKey
		const regex = /<(.*?)>/g

		const newExpr = expr.replace(regex, (t) => {
			const token = t.slice(1, t.length - 1)
			const tokenItems = token.split(';')
			const exprField = new DataFieldData({
				_codeDbDataType: tokenItems[0],
				_codeDbDataSource: tokenItems[1],
				dbDataSourceKey: tokenItems[2]
			})
			return this.getVal(exprField, parms)
		})
		console.log('getValExpr.expr:', newExpr)
		return newExpr
	}
}

class DataField {
	constructor(obj: any) {}
}
class DataFieldData extends DataField {
	codeDataType: DataFieldDataType
	codeSource: DataFieldSource
	sourceKey: string
	constructor(obj: any) {
		super(obj)
		this.codeDataType = memberOfEnum(
			obj._codeDbDataType,
			'DataFieldId',
			'codeDataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.codeSource = memberOfEnum(
			obj._codeDbDataSource,
			'DataFieldData',
			'codeSource',
			'DataFieldSource',
			DataFieldSource
		)
		this.sourceKey = strRequired(obj.dbDataSourceKey, 'DataField', 'sourceKey')
	}
}
class DataFieldDataId extends DataFieldData {
	dbName: string
	codeOp: DataFieldOp
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dbName = strRequired(obj.dbName, 'DataFieldId', 'dbName')
		this.codeOp = memberOfEnumOrDefault(
			obj._codeDbDataOp,
			'DataFieldId',
			'codeOp',
			'DataFieldOp',
			DataFieldOp,
			DataFieldOp.eq
		)
	}
}
class DataFieldDataPreset extends DataFieldData {
	fieldName: string
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.fieldName = strRequired(obj.fieldName, 'DataFieldPreset', 'fieldName')
	}
}
class DataFieldDataSave extends DataFieldData {
	dbName: string
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dbName = strRequired(obj.dbName, 'DataFieldSave', 'dbName')
	}
}
class DataFieldSelect extends DataField {
	dbName: string
	fieldName: string
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dbName = strRequired(obj.dbName, 'DataFieldSelect', 'dbName')
		this.fieldName = strRequired(obj.fieldName, 'DataFieldSelect', 'fieldName')
	}
}
class DataFieldOrder extends DataField {
	dbName: string
	codeDirection: DataFieldDirection
	order: number

	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dbName = strRequired(obj.dbName, 'DataFieldOrder', 'dbName')
		this.codeDirection = memberOfEnum(
			obj._codeDbListDir,
			'DataFieldOrder',
			'codeDirection',
			'DataFieldDirection',
			DataFieldDirection
		)
		this.order = nbrRequired(obj.dbListOrder, 'DataFieldOrder.order')
	}
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
export class Table {
	module: string
	name: string
	hasMgmt: boolean

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.module = strRequired(obj.module, 'Table', 'module')
		this.name = strRequired(obj.name, 'ObjectAction', 'name')
		this.hasMgmt = booleanOrFalse(obj.hasMgmt, 'ObjectAction')
	}
	getObject() {
		return this.module + '::' + this.name + ' '
	}
}

export enum DataActionSaveMode {
	insert = 'insert',
	update = 'update'
}
export enum DataActionType {
	delete = 'delete',
	insert = 'insert',
	select = 'select',
	update = 'update'
}
export enum DataFieldDataType {
	expr = 'expr',
	number = 'number',
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
	data = 'data',
	env = 'env',
	expr = 'expr',
	form = 'form',
	literal = 'literal',
	system = 'system',
	traversal = 'traversal',
	user = 'user'
}
