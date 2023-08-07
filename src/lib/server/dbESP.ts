import axios from 'axios'
import {
	FormSourceActionAPI,
	FormSourceActionDirect,
	FormSourceDBAction,
	FormSourceActionType,
	FormSourceItem,
	FormSourceItemDataType,
	FormSourceItemSource,
	FormSourceResponse,
	HTMLMETHOD
} from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$server/dbESP.ts'
let sql = ''

export async function dbESP(
	sourceAction: FormSourceActionAPI | FormSourceActionDirect,
	dbAction: FormSourceDBAction
) {
	switch (sourceAction.type) {
		case FormSourceActionType.api:
			// build data from source items
			let data: Record<string, any> = {}
			sourceAction.items.forEach((i) => {
				if (i.apiArg) {
					if (i.value) {
						data[i.dbName] = i.value
					} else {
						throw error(500, {
							file: FILENAME,
							function: 'dbESP',
							message: `No value derived for required apiArg: ${i.dbName}`
						})
					}
				}
			})
			return await dbESPAPI(
				sourceAction.method,
				sourceAction.url,
				data,
				sourceAction.msgSuccess,
				sourceAction.msgFail
			)
			break

		case FormSourceActionType.direct:
			if (sourceAction.statement) {
				// SQL statement
				return getSqlStatement(sourceAction)
				break
			} else {
				// construct SQL

				// compute sql
				switch (dbAction) {
					case FormSourceDBAction.delete:
						break
					case FormSourceDBAction.insert:
						break
					case FormSourceDBAction.select:
						return getSqlSelect(sourceAction)
						break
					case FormSourceDBAction.update:
						break
					case FormSourceDBAction.upsert:
						return getSqlUpdate(sourceAction)
						break
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'dbESP',
							message: `No case defined for computed DB action: ${dbAction}`
						})
				}
				break
			}

		default:
			throw error(500, {
				file: FILENAME,
				function: 'dbESP',
				message: `No case defined for sourceAction.type: ${sourceAction.type}`
			})
	}
}

export async function dbESPAPI(
	method: HTMLMETHOD,
	procedure: string,
	data: {},
	msgSuccess = '',
	msgFail = ''
) {
	let options: { method: string; url: string; params?: {}; data?: {} } = {
		method: method,
		url: 'https://esp1.kssc.com:3000/esp/' + procedure
	}
	switch (method) {
		case HTMLMETHOD.GET:
			options.params = data
			break
		default:
			options.data = data
	}

	try {
		const resp = await axios(options)
		const data = resp.data
		let newData = {}

		// set message
		if (data.hasOwnProperty('success')) {
			newData = data
			if (newData.success) {
				newData.message = msgSuccess ?? data.message ?? ''
			} else {
				newData.message = msgFail ?? data.message ?? ''
			}
		} else {
			// assume success
			newData = {
				success: true,
				message: msgSuccess,
				data
			}
		}
		return FormSourceResponse(newData)
	} catch (err: any) {
		throw error(500, {
			file: FILENAME,
			function: 'dbESPAPI',
			message: `Axios status: ${err.response?.status} stautsText: ${err.response?.statusText} message: ${err.message}`
		})
	}
}

async function getSQLExecute(
	method: HTMLMETHOD,
	sql: string,
	sourceAction: FormSourceActionDirect
) {
	return await dbESPAPI(
		method,
		'ws_sql_execute_' + method.toLowerCase(),
		{ sql },
		sourceAction.msgSuccess,
		sourceAction.msgFail
	)
}

function getSQLDelete(sourceAction: FormSourceActionDirect) {
	let cols = ''
	sourceAction.items.forEach((i) => {
		if (i.dbDelete) {
			if (cols) {
				cols += ', '
			}
			cols += i.dbName + ' = ' + getSQLColValue(i, false)
		}
	})
	let sql = 'DELETE FROM ' + getSqlTable(sourceAction) + getSqlWhere(sourceAction)
	return getSQLExecute(HTMLMETHOD.DELETE, sql, sourceAction)
}

function getSQLInsert(sourceAction: FormSourceActionDirect) {
	let cols = ''
	let vals = ''
	sourceAction.items.forEach((i) => {
		if (i.dbInsert) {
			// cols
			if (cols) {
				cols += ', '
				vals += ', '
			}
			cols += i.dbName
			vals += getSQLColValue(i, i.dbAllowNull)
		}
	})

	let sql = 'INSERT INTO ' + getSqlTable(sourceAction) + ' ' + cols + ' VALUES ' + vals
	return getSQLExecute(HTMLMETHOD.PUT, sql, sourceAction)
}

function getSqlSelect(sourceAction: FormSourceActionDirect) {
	// select columns
	let cols = ''
	let newCol = ''

	sourceAction.items.forEach((i) => {
		if (i.dbSelect) {
			if (cols) {
				cols += ', '
			}
			if (i.source != FormSourceItemSource.none) {
				newCol = i.dbName + ' = ' + getSQLColValue(i, false)
			} else {
				newCol = i.dbName
			}
			cols += newCol
		}
	})

	if (cols.length > 0) {
		let sql = 'SELECT ' + cols
		if (sourceAction.singleTable) {
			sql += ' FROM ' + sourceAction.singleTable + getSqlWhere(sourceAction)
		}
		return getSQLExecute(HTMLMETHOD.GET, sql, sourceAction)
	} else {
		return FormSourceResponse({})
	}
}

function getSqlUpdate(sourceAction: FormSourceActionDirect) {
	// update columns
	let cols = ''

	sourceAction.items.forEach((i) => {
		if (i.dbUpdate) {
			if (cols) {
				cols += ', '
			}
			cols += i.dbName + ' = ' + getSQLColValue(i, i.dbAllowNull)
		}
	})
	if (cols == '') {
		throw error(500, {
			file: FILENAME,
			function: 'getSqlUpdate',
			message: `No updatabled columns defined for update to table: ${sourceAction.singleTable}`
		})
	}

	let sql = 'UPDATE ' + sourceAction.singleTable + ' SET ' + cols + getSqlWhere(sourceAction)

	return getSQLExecute(HTMLMETHOD.POST, sql, sourceAction)
}

function getSqlWhere(sourceAction: FormSourceActionDirect) {
	// get identity item
	let cols = ''

	sourceAction.items.forEach((i) => {
		if (i.dbWhere) {
			if (cols) {
				cols += ', '
			}
			cols += i.dbName + ' = ' + getSQLColValue(i, false)
		}
	})
	return ' WHERE ' + cols
}

function getSQLColValue(item: FormSourceItem, allowNull: boolean) {
	if (!item.value || item.value == null) {
		if (allowNull) {
			return null
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'getSQLColValue',
				message: `Null value submitted for required field: (${item.dbName}).`
			})
		}
	}
	let val = item.value
	switch (item.dbDataType) {
		case FormSourceItemDataType.date:
			val = quoteVal(val)
			break
		case FormSourceItemDataType.datetime:
			val = 'DATETIME(' + quoteVal(val) + ')'
			break
		case FormSourceItemDataType.dec:
		case FormSourceItemDataType.int:
		case FormSourceItemDataType.raw:
			val = item.value
			break

		case FormSourceItemDataType.string:
			val = quoteVal(val)
			break
		case FormSourceItemDataType.subquery:
			val = '(' + val + ')'
			break
		default:
			throw error(500, {
				file: FILENAME,
				function: 'getSQLColValue',
				message: `No case defined for item: (${item.dbName}) data type: (${item.dbDataType}).`
			})
	}

	if (val) {
		return val
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'getSQLColValue',
			message: `Get value failed for field: ${item.dbName}.`
		})
	}
	function quoteVal(val) {
		return "'" + val + "'"
	}
}

function getSqlTable(sourceAction: FormSourceActionDirect) {
	if (sourceAction.singleTable && sourceAction.singleTable.length > 0) {
		return sourceAction.singleTable
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'getSqlTable',
			message: `Single table not defined for source action.`
		})
	}
}

function getSqlStatement(sourceAction: FormSourceActionDirect) {
	let sql = sourceAction.statement || ''
	sourceAction.items.forEach((i) => {
		const dbName = i.dbName
		const value = i.value
		if (value == null || value == undefined) {
			throw error(500, {
				file: FILENAME,
				function: 'getSqlStatement',
				message: `Cannnot retrieve source. Value for db argument: ${dbName} is null or undefined.`
			})
		}
		sql = sql?.replace(dbName, value)
	})
	return getSQLExecute(HTMLMETHOD.GET, sql, sourceAction)
}
