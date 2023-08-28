import * as edgedb from 'edgedb'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { valueOrDefault } from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdge.ts'

const client = edgedb.createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function dbExecute(script: string, parms: {}) {
	return await client.execute(script, parms)
}

export async function dbSelect(query: EdgeQL) {
	const script = query.getScript()
	try {
		return JSON.parse(await client.queryJSON(script))
	} catch (e) {
		throw error(500, {
			file: FILENAME,
			function: 'dbSelectSingle',
			message: `Invalid query: ${script}.`
		})
	}
}

export async function dbSelectSingle(query: EdgeQL) {
	const script = query.getScript()
	try {
		return JSON.parse(await client.querySingleJSON(script))
	} catch (e) {
		throw error(500, {
			file: FILENAME,
			function: 'dbSelectSingle',
			message: `Invalid query: ${script}.`
		})
	}
}

export class EdgeQL {
	script: string
	filter: Array<EdgeDBFilterField>
	order: Array<EdgeDBOrderField>

	constructor(script: string) {
		this.script = valueOrDefault(script, '')
		this.filter = []
		this.order = []
	}

	addFilter(name: string, dataType: EdgeDBDataType, val: any) {
		this.filter.push({ name, dataType, val })
	}

	addOrder(name: string, direction: EdgeDBFilterDirection) {
		this.order.push({ name, direction })
	}

	getScript() {
		let script = this.script
		let scriptFilter = ''
		let scriptOrder = ''

		// filter
		this.filter.forEach((f, i) => {
			if (i > 0) {
				scriptFilter += ' and '
			}
			scriptFilter += '.' + f.name + ' = ' + this.getValue(f)
		})
		script += scriptFilter ? ' FILTER ' + scriptFilter : ''

		// order
		this.order.forEach((o, i) => {
			if (i > 0) {
				scriptOrder += ' then '
			}
			scriptOrder += '.' + o.name + ' ' + o.direction
		})
		script += scriptOrder ? ' ORDER BY ' + scriptOrder : ''

		return script
	}

	getValue(field: EdgeDBFilterField) {
		let val = field.val
		switch (field.dataType) {
			case EdgeDBDataType.uuid:
				val = '<uuid>' + quoteVal(val)
				break
			// case EdgeDBDataType.datetime:
			// 	val = 'DATETIME(' + quoteVal(val) + ')'
			// 	break
			// case EdgeDBDataType.dec:
			// case EdgeDBDataType.int:
			// case EdgeDBDataType.raw:
			// 	break
			case EdgeDBDataType.str:
				val = quoteVal(val)
				break
			// case EdgeDBDataType.subquery:
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
				message: `Get value failed for field: ${field.name}.`
			})
		}
	}
}

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
