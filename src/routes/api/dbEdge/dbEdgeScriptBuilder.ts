import {
	booleanOrFalse,
	getArray,
	strOptional,
	memberOfEnum,
	memberOfEnumOrDefault,
	strRequired,
	valueOrDefault,
	required
} from '$lib/utils/utils'
import { DataObjCardinality } from '$comps/types'
import type { DataObjRaw, DataObjRecord } from '$comps/types'
import { TokenApiQueryData, type TokenApiQueryDataValue } from '$comps/types.token'
import { Tree } from '$utils/utils.tree'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/dataObj/dbScriptBuilder.ts'

export class EdgeQL {
	cardinality: DataObjCardinality
	exprFilter: string | undefined
	exprObject: string | undefined
	objName: string
	tables: DataObjTables

	constructor(dataObjRaw: DataObjRaw) {
		// console.log()
		// console.log('EdgeQL...')
		const clazz = 'EdgeQL'
		const obj = valueOrDefault(dataObjRaw, {})
		this.cardinality = memberOfEnum(
			dataObjRaw._codeCardinality,
			clazz,
			'cardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.exprFilter = strOptional(obj.exprFilter, clazz, 'exprFilter')
		this.exprObject = strOptional(obj.exprObject, clazz, 'exprObject')

		// console.log('exprFilter:', this.exprFilter)
		// console.log('exprObject:', this.exprObject)

		this.objName = obj.name
		this.tables = new DataObjTables(this, obj)
	}

	getScriptDataItems(dbSelect: string, data: TokenApiQueryData) {
		return getValExpr(dbSelect, data)
	}
	queryScriptObjectExpr(data: TokenApiQueryData) {
		if (this.exprObject) {
			const script = getValExpr(this.exprObject, data)
			logScript('objectExpr', script)
			return script
		} else {
			error(500, {
				file: FILENAME,
				function: 'queryScriptObjectExpr',
				message: `No object expression provided for object: ${this.objName}`
			})
		}
	}
}

type DataObjTableMap = Map<string, DataObjTable>

class DataObjTables {
	tables: DataObjTableMap
	tree: DataObjTable[] = []
	constructor(query: EdgeQL, obj: any) {
		obj = valueOrDefault(obj, {})
		this.tables = new Map()
		const tables = getArray(obj._tables)
		tables.forEach((t: any) => {
			const table = new DataObjTable(query, t, obj)
			this.addChild(table)
			this.tables.set(table.index, table)
		})
	}
	addChild(table: DataObjTable) {
		if (!table.indexParent) return
		const parent = this.tables.get(table.indexParent)
		if (parent) {
			parent.children.push(table)
			if (parent.columnParent) table.ancestors.push(parent.columnParent)
		}
	}
	getDbTableRoot() {
		return this.tables.values().next().value.table.getObject()
	}

	getScriptTable(table: DataObjTable, actionType: DataObjTableActionType, data: TokenApiQueryData) {
		const action = table.actions.get(actionType)
		return action ? action.getScript(data) : new DataObjTableScript()
	}

	getScriptTableRoot(actionType: DataObjTableActionType, data: TokenApiQueryData) {
		return this.getScriptTable(this.getTableRoot(), actionType, data)
	}

	getScriptItemsTable(
		table: DataObjTable,
		actionType: DataObjTableActionType,
		data: TokenApiQueryData
	) {
		const action = table.actions.get(actionType)
		return action ? action.getScriptItems(data) : new DataObjTableScript()
	}

	getScriptItemsTableRoot(actionType: DataObjTableActionType, data: TokenApiQueryData) {
		return this.getScriptItemsTable(this.getTableRoot(), actionType, data)
	}
	getScriptItemsAll(actionType: DataObjTableActionType, data: TokenApiQueryData) {
		let script = new DataObjTableScript()
		this.tables.forEach((table) => {
			script.concatItemsField(this.getScriptItemsTable(table, actionType, data))
		})
		return script.itemsField
	}

	getTableRoot() {
		return this.tables.values().next().value
	}
	logScript(type: string, script: string) {
		if (!script) return
		console.log()
		console.log(`getScript: ${type}...`)
		console.log(script)
	}
	queryScriptDelete(data: TokenApiQueryData) {
		const rootTable = this.getDbTableRoot()
		const rootFilter = this.getScriptTableRoot(DataObjTableActionType.filter, data).script
		const script = `DELETE ${rootTable} ${rootFilter}`
		logScript('delete', script)
		return script
	}
	queryScriptOrder() {
		let script = new DataObjTableScript()
		this.tables.forEach((table) => {
			script.concatItemsOrder(
				this.getScriptItemsTable(table, DataObjTableActionType.order, new TokenApiQueryData({}))
			)
		})
		return script.getScriptOrder()
	}
	queryScriptPreset(data: TokenApiQueryData) {
		let script = ''
		const scriptPresetItems = this.getScriptItemsAll(DataObjTableActionType.preset, data)
		if (scriptPresetItems) script = `SELECT { ${scriptPresetItems} }`
		logScript('preset', script)
		return script
	}
	queryScriptSave(data: TokenApiQueryData, action: DataObjTableActionType) {
		let tableArray = Array.from(this.tables, ([name, value]) => value)
		let scriptObj = new DataObjTableScript()
		let script = ''
		let branch = ''
		let prefix = ''
		let prevTable: DataObjTable | undefined = undefined

		this.setDataRoot(data)

		while (tableArray && tableArray.length > 0) {
			const table = tableArray.pop()
			if (table) {
				scriptObj = this.getScriptTable(table, action, data)
				prefix = scriptObj.concat(prefix, scriptObj.prefix, ',')

				if (tableArray.length === 0 || (prevTable && table.index === prevTable.indexParent)) {
					if (branch) scriptObj.addItemField(branch)
					script = scriptObj.getScriptTable()
					branch = script
				} else {
					branch = scriptObj.concat(branch, scriptObj.getScriptTable())
				}
			}
			prevTable = table
		}

		script = scriptObj.concat(prefix, script)
		logScript('save', script)
		return script
	}

	queryScriptSaveInsert(data: TokenApiQueryData) {
		return this.queryScriptSave(data, DataObjTableActionType.saveInsert)
	}
	queryScriptSaveUpdate(data: TokenApiQueryData) {
		return this.queryScriptSave(data, DataObjTableActionType.saveUpdate)
	}

	queryScriptSelect(querySelectItems: string, data: TokenApiQueryData) {
		const queryFilter = this.getScriptTableRoot(DataObjTableActionType.filter, data).script
		console.log('queryFilter:', queryFilter)
		const queryOrder = this.queryScriptOrder()

		const script = `SELECT ${this.getDbTableRoot()} {\n${querySelectItems}\n} \n${queryFilter} \n${queryOrder}`
		logScript('select', script)
		return script
	}
	queryScriptSelectSys(data: TokenApiQueryData) {
		const querySelectItems = this.getScriptItemsAll(DataObjTableActionType.selectSys, data)
		return this.queryScriptSelect(querySelectItems, data)
	}
	queryScriptSelectUser(data: TokenApiQueryData) {
		const querySelectItems = this.getScriptItemsAll(DataObjTableActionType.selectUser, data)
		return this.queryScriptSelect(querySelectItems, data)
	}
	setDataRoot(data: TokenApiQueryData) {
		data.setParmsValue('rootTable', this.getDbTableRoot())
		data.setParmsValue(
			'rootFilter',
			this.getScriptTableRoot(DataObjTableActionType.filter, data).script
		)
	}
}

class DataObjTable {
	actions: DataObjTableActionMap
	ancestors: string[] = []
	children: DataObjTable[] = []
	columnParent?: string
	index: string
	indexParent?: string
	query: EdgeQL
	table: Table
	constructor(query: EdgeQL, obj: any, dataObjRaw: DataObjRaw) {
		obj = valueOrDefault(obj, {})
		const clazz = 'DataFieldTable'
		this.actions = new Map()
		this.columnParent = strOptional(obj._columnParent, clazz, 'columnParent')
		this.index = strRequired(obj.index, clazz, 'index')
		this.indexParent = strOptional(obj.indexParent, clazz, 'indexParent')
		this.query = query
		this.table = new Table(obj._table)
		this.initAction(DataObjTableActionType.filter, DataObjTableActionFilter, dataObjRaw)
		this.initAction(DataObjTableActionType.order, DataObjTableActionOrder, dataObjRaw)
		this.initAction(DataObjTableActionType.preset, DataObjTableActionPreset, dataObjRaw)
		this.initAction(DataObjTableActionType.saveInsert, DataObjTableActionSaveInsert, dataObjRaw)
		this.initAction(DataObjTableActionType.saveUpdate, DataObjTableActionSaveUpdate, dataObjRaw)
		this.initAction(DataObjTableActionType.selectSys, DataObjTableActionSelectSys, dataObjRaw)
		this.initAction(DataObjTableActionType.selectUser, DataObjTableActionSelectUser, dataObjRaw)
	}
	getFieldNameRoot(separator: string = '.') {
		if (!this.columnParent) return ''
		// console.log('getFieldNameRoot.ancestors:', this.ancestors)
		let ancestors = this.ancestors.join('.')
		return ancestors ? ancestors + '.' + this.columnParent : this.columnParent
	}
	initAction(action: DataObjTableActionType, actionClass: any, obj: DataObjRaw) {
		this.actions.set(action, new actionClass(this.query, this, action, obj))
	}
}

type DataObjTableActionMap = Map<DataObjTableActionType, DataObjTableAction>

class DataObjTableAction {
	query: EdgeQL
	table: DataObjTable
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		const clazz = `DataObjTableAction (${action})`
		this.query = query
		this.table = table
	}
	getScript(data: TokenApiQueryData): DataObjTableScript {
		return new DataObjTableScript()
	}
	getScriptItems(data: TokenApiQueryData) {
		return new DataObjTableScript()
	}
	getScriptItemsSelect(fields: DataFieldSelect[], data: TokenApiQueryData) {
		let script = new DataObjTableScript()
		let item = ''

		fields.forEach((f) => {
			const prefix = this.table.getFieldNameRoot()

			if (f.nameCustom && f.exprCustom) {
				item = f.nameCustom + ' := ' + getValExpr(f.exprCustom, data)
			} else if (!prefix && !f.link) {
				// root scalar column
				item = f.name
			} else {
				let column
				let value = ''

				// column name
				column = f.codeDataType === DataFieldDataType.link ? '_' : ''
				column += f.name

				if (f.link?.codeDisplayType === DataFieldLinkType.expression) {
					value = getValExpr(f.link.exprSelect!, data)
				} else {
					value += prefix ? prefix + '.' + f.name : f.name

					if (
						f.link?.codeDisplayType === DataFieldLinkType.column ||
						this.query.cardinality === DataObjCardinality.list
					) {
						const postfix = f.link?.columnsDisplay.join('.')
						value += postfix ? '.' + postfix : ''
					} else if (f.link) {
						value += '.id'
					}

					value = '.' + value
				}
				item = column + ' := ' + '(' + value + ')'
			}
			script.addItemField(item)
		})
		return script
	}
	// getOp(op: DataFieldOp) {
	// 	switch (op) {
	// 		case DataFieldOp.eq:
	// 			return '='
	// 			break

	// 		default:
	// 			error(500, {
	// 				file: FILENAME,
	// 				function: 'getOp',
	// 				message: `No case defined for op: ${op}`
	// 			})
	// 	}
	// }

	getScriptTypeSave(fields: DataFieldData[], data: TokenApiQueryData, isInsert: boolean) {
		let script = new DataObjTableScript()
		const isRootTable = !this.table.columnParent

		if (isInsert) {
			if (isRootTable) {
				script.setScriptInsertRoot(data)
			} else {
				script.setScriptInsertSub(this.table.columnParent!, this.table.table.getObject())
			}
		} else {
			if (isRootTable) {
				script.setScriptUpdateRoot(data)
			} else {
				script.setScriptUpdateSub(this.table, data)
			}
		}

		// root table and native fields
		fields.forEach((f) => {
			const expr = f?.link?.exprSave ? f.link.exprSave : ''
			let value = expr ? `${getValExpr(expr, data)}` : getValSave(f, data)
			if (f.isSelfReference) value = 'DETACHED ' + value
			const item = f.name + ' := ' + value
			script.addItemField(item)
		})
		return script
	}
	initList(fieldClass: any, fieldsSource: any) {
		fieldsSource = getArray(fieldsSource)
		let newFields = fieldsSource
			.filter((f: any) => f.indexTable === this.table.index)
			.map((f: any) => new fieldClass(f))

		newFields = this.initListFieldSignature(newFields, 'createdBy')
		newFields = this.initListFieldSignature(newFields, 'modifiedBy')
		return newFields
	}

	initListFieldSignature(fields: any[], fieldName: string) {
		const idx = fields.findIndex((f: any) => f?.name === fieldName)
		if (idx > -1) {
			fields[idx].link = new DataFieldLink({
				columnsDisplay: ['person', 'fullName'],
				exprPreset: `(SELECT sys_user::SysUser FILTER .id = <uuid,user,id>).person.fullName`,
				exprSave: '(SELECT sys_user::SysUser FILTER .id = <uuid,user,id>)',
				table: { module: 'sys_user', name: 'SysUser' }
			})
		}
		return fields
	}
}

class DataObjTableActionFilter extends DataObjTableAction {
	fields: DataFieldDataFilter[] = []
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		super(query, table, action, obj)
		this.fields = this.initList(DataFieldDataFilter, obj._fieldsDbFilter)
	}
	getScript(data: TokenApiQueryData) {
		let script = ''
		let exprFilter = ''

		if (!this.query.exprFilter) {
			exprFilter = `.id = <uuid,tree,id>`
		} else if (this.query.exprFilter?.toLowerCase() !== 'none') {
			exprFilter = this.query.exprFilter
		}
		if (exprFilter) script = getValExpr(exprFilter, data)

		if (script) script = 'FILTER ' + script

		return new DataObjTableScript({ script })
	}
}
class DataObjTableActionOrder extends DataObjTableAction {
	fields: DataFieldOrder[] = []
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		super(query, table, action, obj)
		this.fields = this.initList(DataFieldOrder, obj._fieldsDbOrder)
	}
	getScriptItems(data: TokenApiQueryData) {
		let script = new DataObjTableScript()

		for (let i = 0; i < this.fields.length; i++) {
			const field = this.fields[i]
			if (field.expr) {
				script.setExprOrder(field.expr)
				return script
			} else {
				const item =
					field.codeDataType === DataFieldDataType.str
						? `str_lower(.${field.name})`
						: '.' + field.name
				script.addItemOrder(item, field.codeDirection, field.dbOrderList)
			}
		}
		return script
	}
}
class DataObjTableActionPreset extends DataObjTableAction {
	fields: DataFieldPreset[] = []
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		super(query, table, action, obj)
		this.fields = this.initList(DataFieldPreset, obj._fieldsDbPreset)
	}
	getScriptItems(data: TokenApiQueryData) {
		let script = new DataObjTableScript()
		this.fields.forEach((f) => {
			const expr = f.link?.exprPreset
				? f.link.exprPreset
				: f.exprPresetScalar
					? f.exprPresetScalar
					: ''

			if (expr) {
				let item = f.link ? '_' : ''
				item += f.name + ' := ' + getValExpr(expr, data)
				script.addItemField(item)
			}
		})
		return script
	}
}
class DataObjTableActionSaveInsert extends DataObjTableAction {
	fields: DataFieldData[] = []
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		super(query, table, action, obj)
		this.fields = this.initList(DataFieldData, obj._fieldsDbSaveInsert)
	}
	getScript(data: TokenApiQueryData) {
		return this.getScriptTypeSave(this.fields, data, true)
	}
}
class DataObjTableActionSaveUpdate extends DataObjTableAction {
	fields: DataFieldData[] = []
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		super(query, table, action, obj)
		this.fields = this.initList(DataFieldData, obj._fieldsDbSaveUpdate)
	}
	getScript(data: TokenApiQueryData) {
		return this.getScriptTypeSave(this.fields, data, false)
	}
}
class DataObjTableActionSelectSys extends DataObjTableAction {
	fields: DataFieldSelect[] = []
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		super(query, table, action, obj)
		this.fields = this.initList(DataFieldSelect, obj._fieldsDbSelectSys)
	}
	getScriptItems(data: TokenApiQueryData) {
		return this.getScriptItemsSelect(this.fields, data)
	}
}
class DataObjTableActionSelectUser extends DataObjTableAction {
	fields: DataFieldSelect[] = []
	constructor(query: EdgeQL, table: DataObjTable, action: DataObjTableActionType, obj: DataObjRaw) {
		super(query, table, action, obj)
		this.fields = this.initList(DataFieldSelect, obj._fieldsDbSelectUser)
	}
	getScriptItems(data: TokenApiQueryData) {
		return this.getScriptItemsSelect(this.fields, data)
	}
}

enum DataObjTableActionType {
	delete = 'delete',
	filter = 'filter',
	order = 'order',
	preset = 'preset',
	saveInsert = 'saveInsert',
	saveUpdate = 'saveUpdate',
	selectUser = 'selectUser',
	selectSys = 'selectSys'
}

class DataObjTableScript {
	exprOrder: string = ''
	itemsField: string = ''
	itemsOrder: DataObjTableScriptItemOrder[] = []
	itemsProxy: string = '<<itemsProxy>>'
	prefix: string = ''
	prefixColumn: string = ''
	script: string = ''
	constructor(obj: any = {}) {
		this.itemsField = Object.hasOwn(obj, 'itemsField') ? obj.itemsField : this.itemsField
		this.prefix = Object.hasOwn(obj, 'prefix') ? obj.prefix : this.prefix
		this.script = Object.hasOwn(obj, 'script') ? obj.script : this.script
	}
	addItemField(item: string) {
		this.itemsField = this.concat(this.itemsField, item, ', ')
	}
	addItemOrder(item: string, direction: string, order: number) {
		if (this.exprOrder) return
		const newItem = new DataObjTableScriptItemOrder(item, direction, order)
		let inserted = false
		for (let i = 0; i < this.itemsOrder.length; i++) {
			if (newItem.order <= this.itemsOrder[i].order) {
				this.itemsOrder.splice(i, 0, newItem)
				inserted = true
				return
			}
		}
		if (!inserted) this.itemsOrder.push(newItem)
	}
	concat(val1: string, val2: string, separator: string = '') {
		if (val1 && val2) return val1 + separator + '\n' + val2
		if (val1) return val1
		if (val2) return val2
		return ''
	}
	concatComma(val1: string, val2: string) {
		return this.concat(val1, val2, ',')
	}
	concatExpr(val1: string, val2: string) {
		return this.concat(val1, val2, ';')
	}
	concatItemsField(script: DataObjTableScript) {
		this.itemsField = this.concatComma(this.itemsField, script.itemsField)
	}
	concatItemsOrder(script: DataObjTableScript) {
		script.itemsOrder.forEach((item) => {
			this.addItemOrder(item.item, item.direction, item.order)
		})
	}
	getPrefixUpdate(table: DataObjTable, data: TokenApiQueryData, prefixColumn: string) {
		const rootTable = this.getRootTable(data)
		const rootFilter = this.getRootFilter(data)
		const idColumn = table.getFieldNameRoot('.') + '.id'
		return `WITH ${prefixColumn} := (SELECT ${rootTable} ${rootFilter}).${idColumn}`
	}
	getPrefixColumnUpdate(table: DataObjTable) {
		return '__' + table.getFieldNameRoot('_')
	}
	getRootFilter(data: TokenApiQueryData) {
		return data.parms.rootFilter
	}
	getRootTable(data: TokenApiQueryData) {
		return data.parms.rootTable
	}
	getScript() {
		return this.concat(this.prefix, this.script)
	}
	getScriptOrder() {
		if (this.exprOrder) return this.exprOrder

		let script = ''
		this.itemsOrder.forEach((item) => {
			if (script) script += ' THEN '
			script += item.item + ' ' + item.direction
		})
		if (script) script = 'ORDER BY ' + script
		return script
	}
	getScriptTable() {
		this.script = this.script.replace(this.itemsProxy, this.itemsField)
		return this.script
	}
	setExprOrder(expr: string) {
		this.exprOrder = expr
		this.itemsOrder = []
	}
	setScriptInsertRoot(data: TokenApiQueryData) {
		const rootTable = this.getRootTable(data)
		this.script = `INSERT ${rootTable} { ${this.itemsProxy} }`
	}
	setScriptInsertSub(parentColumn: string, subTable: string) {
		this.script = `${parentColumn} := (INSERT ${subTable} { ${this.itemsProxy} })`
	}
	setScriptUpdateRoot(data: TokenApiQueryData) {
		const rootTable = this.getRootTable(data)
		const rootFilter = this.getRootFilter(data)
		this.script = `UPDATE ${rootTable} ${rootFilter} SET { ${this.itemsProxy} }`
	}
	setScriptUpdateSub(table: DataObjTable, data: TokenApiQueryData) {
		const parentColumn = table.columnParent!
		const subTable = table.table.getObject()
		const prefixColumn = this.getPrefixColumnUpdate(table)
		this.prefix = this.concatExpr(this.prefix, this.getPrefixUpdate(table, data, prefixColumn))
		this.script = `${parentColumn} := (UPDATE ${subTable} FILTER .id = ${prefixColumn} SET { ${this.itemsProxy} })`
	}
}

class DataObjTableScriptItemOrder {
	item: string
	direction: string
	order: number
	constructor(item: string, direction: string, order: number) {
		this.item = item
		this.direction = direction
		this.order = order
	}
}

export function getValSave(field: DataFieldData, data: TokenApiQueryData): any {
	return getValFormatted(field, getValRaw(field, data))

	function getValRaw(field: DataFieldData, data: TokenApiQueryData) {
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

			case DataFieldSource.system:
				return getValue(DataFieldSource.system, data.system, field.sourceKey)

			case DataFieldSource.tree:
				const items = field.sourceKey.split('.')
				let record: DataObjRecord | undefined = undefined
				let property = ''

				switch (items.length) {
					case 1:
						property = items[0]
						record = data.tree.getRecord()
						break

					case 2:
						record = data.tree.getRecord(items[0])
						property = items[1]
						break

					default:
						error(500, {
							file: FILENAME,
							function: funct,
							message: `Invalid configuration of tree data token: ${field.sourceKey}`
						})
				}
				if (record) return getValue(DataFieldSource.tree, record, property)

			case DataFieldSource.user:
				return getValue(DataFieldSource.user, data.user, field.sourceKey)

			default:
				error(500, {
					file: FILENAME,
					function: funct,
					message: `No case defined for source: ${field.codeSource}`
				})
		}
		function getValue(source: DataFieldSource, data: TokenApiQueryDataValue, key: string) {
			const result = getValueNested(data, key)
			return result ? result[1] : valueNotFound(source, data)
		}
		function getValueNested(data: TokenApiQueryDataValue, key: string) {
			const tokens = key.split('.')
			let currentData = data
			for (let i = 0; i < tokens.length - 1; i++) {
				if (!currentData || !Object.hasOwn(currentData, tokens[i])) return false
				currentData = currentData[tokens[i]]
			}
			const idx = tokens.length - 1
			if (!currentData || !Object.hasOwn(currentData, tokens[idx])) return false
			return [true, currentData[tokens[idx]]]
		}
		function valueNotFound(source: DataFieldSource, data: TokenApiQueryDataValue) {
			error(500, {
				file: FILENAME,
				function: funct,
				message: `Value null or not found for source: ${source} data: ${JSON.stringify(data)}.`
			})
		}
	}

	function getValFormatted(field: DataFieldData, val: any) {
		if (field.codeDataType === DataFieldDataType.json) {
			return val ? '<json>' + getValQuote(JSON.stringify(val)) : '{}'
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

			case DataFieldDataType.float64:
			case DataFieldDataType.int16:
			case DataFieldDataType.int32:
			case DataFieldDataType.int64:
				// no change
				break

			case DataFieldDataType.link:
				const getId = (id: string) => {
					return `<uuid>${getValQuote(id)}`
				}

				if (field.link) {
					let filter = ''
					if (field.isMultiSelect) {
						val.forEach((v: string) => {
							if (v !== null && v !== undefined) {
								if (filter) filter += ','
								filter += getId(v)
							}
						})
						if (filter) filter = 'in array_unpack([' + filter + '])'
					} else {
						if (val) filter = `= ${getId(val)}`
					}
					val = filter ? `(SELECT ${field.link.table?.getObject()} FILTER .id ${filter})` : '{}'
				}
				break

			case DataFieldDataType.str:
				val = `"${val}"`
				break

			case DataFieldDataType.uuid:
				val = '<uuid>' + getValQuote(val)
				break

			default:
				error(500, {
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
}

export function getValExpr(expr: string, data: TokenApiQueryData): string {
	/*
		data token <[dataType],[source],[sourceKey]>
		eg. (select sys_user::getUser(<str,user,userName>))
	*/
	expr = expr.replace(/(\r\n|\n|\r)/gm, '')
	expr = expr.replace(/\s+/g, ' ').trim()
	const regex = /<(.*?)>/g
	const newExpr = expr.replace(regex, (t) => {
		const token = t.slice(1, t.length - 1)
		const tokenItems = token.split(',')
		if (tokenItems.length === 3) {
			const exprField = new DataFieldData({
				_codeDataType: tokenItems[0],
				_codeDbDataSource: tokenItems[1],
				_name: 'expr',
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
	indexTable?: string
	link?: DataFieldLink
	table?: Table
	constructor(obj: any) {
		const clazz = 'DataField'
		obj = valueOrDefault(obj, {})
		this.indexTable = obj.indexTable
		this.link = obj.link ? new DataFieldLink(obj.link) : undefined
		this.table = obj._table ? new Table(obj._table) : undefined
	}
}

export class DataFieldData extends DataField {
	codeDataType: DataFieldDataType
	codeSource: DataFieldSource
	hasItems: boolean
	isMultiSelect: boolean
	isSelfReference: boolean
	name: string
	sourceKey: string
	constructor(obj: any) {
		super(obj)
		const clazz = 'DataFieldData'
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			'DataFieldData',
			'codeDataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.codeSource = memberOfEnumOrDefault(
			obj._codeDbDataSource,
			'DataFieldData',
			'codeSource',
			'DataFieldSource',
			DataFieldSource,
			DataFieldSource.tree
		)
		this.hasItems = required(obj.hasItems, clazz, 'hasItems')
		this.isMultiSelect = booleanOrFalse(obj._isMultiSelect, 'DataFieldData.isMultiLink')
		this.isSelfReference = booleanOrFalse(obj._isSelfReference, clazz)
		this.name = strRequired(obj._name, clazz, 'name')
		this.sourceKey = valueOrDefault(obj.QueryParmDataSourceKey, obj._name)
	}
}
export class DataFieldDataFilter extends DataFieldData {
	codeOp: DataFieldOp
	exprFilter: string | undefined
	constructor(obj: any) {
		super(obj)
		const clazz = 'DataFieldDataId'
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

export class DataFieldLink {
	codeDisplayDataType?: DataFieldDataType
	codeDisplayMask?: DataFieldMask
	codeDisplayType?: DataFieldLinkType
	columnsDisplay: Array<string> = []
	exprPreset?: string
	exprSave?: string
	exprSelect?: string
	table?: Table
	constructor(linkRaw: any) {
		const clazz = 'DataFieldLink'
		linkRaw = valueOrDefault(linkRaw, {})
		this.codeDisplayDataType = linkRaw._codeDisplayDataType
			? memberOfEnum(
					linkRaw._codeDisplayDataType,
					clazz,
					'codeDataTypeDisplay',
					'DataFieldDataType',
					DataFieldDataType
				)
			: undefined
		this.codeDisplayMask = linkRaw._codeDisplayMask
			? memberOfEnum(
					linkRaw._codeDisplayMask,
					clazz,
					'codeDisplayMask',
					'DataFieldMask',
					DataFieldMask
				)
			: undefined
		this.codeDisplayType = linkRaw.exprSelect
			? DataFieldLinkType.expression
			: linkRaw.columnsDisplay && linkRaw.columnsDisplay.length > 0
				? DataFieldLinkType.column
				: DataFieldLinkType.none
		linkRaw._codeMask
			? memberOfEnum(linkRaw._codeMask, clazz, 'codeMask', 'DataFieldMask', DataFieldMask)
			: undefined

		this.columnsDisplay = linkRaw.columnsDisplay
		this.exprPreset = strOptional(linkRaw.exprPreset, clazz, 'exprPreset')
		this.exprSave = strOptional(linkRaw.exprSave, clazz, 'exprSave')
		this.exprSelect = strOptional(linkRaw.exprSelect, clazz, 'exprSelect')
		this.table = linkRaw.table ? new Table(linkRaw.table) : undefined
	}
}

export class DataFieldOrder extends DataField {
	codeDataType: DataFieldDataType
	codeDirection: DataFieldDirection
	dbOrderList: number
	expr: string | undefined
	name: string | undefined
	constructor(obj: any) {
		super(obj)
		const clazz = 'DataFieldOrder'
		obj = valueOrDefault(obj, {})
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.codeDirection = memberOfEnumOrDefault(
			obj._codeDbListDir,
			clazz,
			'codeDirection',
			'DataFieldDirection',
			DataFieldDirection,
			DataFieldDirection.asc
		)
		this.expr = strOptional(obj._expr, clazz, '_expr')
		this.dbOrderList = required(obj.dbOrderList, clazz, 'dbOrderList')
		this.name = strOptional(obj._name, clazz, 'name')
	}
}
export class DataFieldPreset extends DataField {
	exprPresetScalar?: string
	hasItems: boolean
	name: string
	constructor(obj: any) {
		const clazz = 'DataFieldPreset'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.exprPresetScalar = strOptional(obj.exprPresetScalar, clazz, 'exprPresetScalar')
		this.hasItems = required(obj.hasItems, clazz, 'hasItems')
		this.name = strRequired(obj._name, clazz, 'name')
	}
}

class DataFieldSelect extends DataField {
	codeDataType: DataFieldDataType
	exprCustom?: string
	hasItems: boolean
	name: string
	nameCustom?: string
	constructor(obj: any) {
		const clazz = 'DataFieldSelect'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.codeDataType = memberOfEnum(
			obj._codeDataType,
			clazz,
			'codeDataType',
			'DataFieldDataType',
			DataFieldDataType
		)
		this.exprCustom = strOptional(obj.exprCustom, clazz, 'exprCustom')
		this.hasItems = required(obj.hasItems, clazz, 'hasItems')
		this.name = strRequired(obj._name, clazz, 'name')
		this.nameCustom = strOptional(obj.nameCustom, clazz, 'nameCustom')
	}
}

export enum DataFieldDataType {
	bool = 'bool',
	date = 'date',
	datetime = 'datetime',
	file = 'file',
	float64 = 'float64',
	int16 = 'int16',
	int32 = 'int32',
	int64 = 'int64',
	json = 'json',
	link = 'link',
	literal = 'literal',
	str = 'str',
	uuid = 'uuid'
}
export enum DataFieldDirection {
	asc = 'asc',
	desc = 'desc'
}

export enum DataFieldLinkType {
	column = 'column',
	expression = 'expression',
	none = 'none'
}
export enum DataFieldMask {
	currencyUs = 'currencyUs',
	ssn = 'ssn',
	telephone = 'telephone'
}
export enum DataFieldOp {
	eq = 'eq'
}
export enum DataFieldSource {
	calc = 'calc',
	literal = 'literal',
	parms = 'parms',
	preset = 'preset',
	system = 'system',
	tree = 'tree',
	user = 'user'
}

export class Table {
	hasMgmt: boolean
	module: string
	name: string
	constructor(obj: any) {
		const clazz = 'Table'
		this.hasMgmt = booleanOrFalse(obj.hasMgmt, clazz)
		this.module = strRequired(obj.module, clazz, 'module')
		this.name = strRequired(obj.name, clazz, 'name')
	}
	getObject() {
		return this.module + '::' + this.name
	}
}

function logScript(type: string, script: string) {
	if (!script) return
	console.log()
	console.log(`--- script.type: ${type} ---`)
	console.log(script)
}
