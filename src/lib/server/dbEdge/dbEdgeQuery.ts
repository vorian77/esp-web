import * as edgedb from 'edgedb'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import {
	DataActionItemDataType,
	DataActionItemOp,
	EdgeDBOrderDirection,
	type EdgeDBItem,
	type EdgeDBOrder
} from '$comps/types'
import { valueOrDefault } from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdge.ts'

let client = edgedb.createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function dbExecute(script: string, parms = {}) {
	return await client.execute(script, parms)
}

export async function dbSelect(query: EdgeQL) {
	const script = query.getScript()
	try {
		console.log()
		console.log('dbSelect...')
		console.log('script:', script)
		const data = JSON.parse(await client.queryJSON(script))
		console.log('data', data)
		return data
	} catch (e) {
		throw error(500, {
			file: FILENAME,
			function: 'dbSelect',
			message: `Invalid query: ${script}`
		})
	}
}

export async function dbSelectSingle(query: EdgeQL) {
	const script = query.getScript()
	try {
		console.log()
		console.log('dbSelectSingle...')
		console.log('script:', script)
		const data = JSON.parse(await client.querySingleJSON(script))
		console.log('data:', data)
		return data
	} catch (e) {
		throw error(500, {
			file: FILENAME,
			function: 'dbSelectSingle',
			message: `Invalid query: ${script}`
		})
	}
}

export class EdgeQL {
	script: string
	filter: Array<EdgeDBItem>
	insert: Array<EdgeDBItem>
	update: Array<EdgeDBItem>
	order: Array<EdgeDBOrder>

	constructor(script: string) {
		this.script = valueOrDefault(script, '')
		this.filter = []
		this.insert = []
		this.update = []
		this.order = []
	}

	addFilter(name: string, op: DataActionItemOp, dataType: DataActionItemDataType, rawVal: any) {
		this.filter.push({ name, op, dataType, rawVal })
	}

	addInsert(name: string, op: DataActionItemOp, dataType: DataActionItemDataType, rawVal: any) {
		this.insert.push({ name, op, dataType, rawVal })
	}

	addUpdate(name: string, op: DataActionItemOp, dataType: DataActionItemDataType, rawVal: any) {
		this.update.push({ name, op, dataType, rawVal })
	}

	addOrder(name: string, direction: EdgeDBOrderDirection) {
		this.order.push({ name, direction })
	}

	getScript() {
		let script = this.script
		let scriptInsert = ''
		let scriptFilter = ''
		let scriptUpdate = ''
		let scriptOrder = ''

		// console.log('getScript...')
		// console.log('script:', this.script)
		// console.log('filter:', this.filter)
		// console.log('insert:', this.insert)
		// console.log('update:', this.update)
		// console.log('order:', this.order)

		// INSERT
		script += this.getScriptExpr(this.insert, '')

		// filter
		this.filter.forEach((e, i) => {
			if (i > 0) {
				scriptFilter += ' and '
			}
			scriptFilter += '.' + e.name + ' = ' + this.getEdgeValue(e)
		})
		script += scriptFilter ? ' FILTER ' + scriptFilter : ''

		// update
		script += this.getScriptExpr(this.update, 'SET')

		// order
		this.order.forEach((e, i) => {
			if (i > 0) {
				scriptOrder += ' then '
			}
			scriptOrder += '.' + e.name + ' ' + e.direction
		})
		script += scriptOrder ? ' ORDER BY ' + scriptOrder : ''

		return script
	}

	getScriptExpr(items: Array<EdgeDBItem>, type: string) {
		let expr = ''

		items.forEach((i) => {
			if (expr.length > 0) {
				expr += ', '
			}
			expr += i.name + ' ' + i.op + ' ' + this.getEdgeValue(i)
		})
		return expr ? ' ' + type + ' { ' + expr + ' }' : ''
	}

	getEdgeValue(field: EdgeDBItem) {
		let val = field.rawVal
		switch (field.dataType) {
			case DataActionItemDataType.uuid:
				val = '<uuid>' + quoteVal(val)
				break
			// case DataActionItemDataType.datetime:
			// 	val = 'DATETIME(' + quoteVal(val) + ')'
			// 	break
			case DataActionItemDataType.number:
			case DataActionItemDataType.raw:
				// no change
				break
			case DataActionItemDataType.str:
				val = quoteVal(val)
				break
			// case DataActionItemDataType.subquery:
			// 	val = '(' + val + ')'
			// 	break
			default:
				throw error(500, {
					file: FILENAME,
					function: 'getFieldValue',
					message: `No case defined for item: (${field.name}) data type: (${field.dataType}).`
				})
		}

		function quoteVal(val: string) {
			return "'" + val + "'"
		}

		if (val) {
			return val
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'getFieldValue',
				message: `Get value failed for field: ${field.name}`
			})
		}
	}
}
