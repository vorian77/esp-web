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
} from '$comps/esp/form/types'
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
			sourceAction.items.forEach(({ dbName, value }) => {
				data[dbName] = value
			})
			return await dbESPAPI(sourceAction.method, sourceAction.url, data)
			break

		case FormSourceActionType.direct:
			if (sourceAction.statement) {
				// execute sql statement
				console.log('dbESP - statement...')
			} else {
				if (!sourceAction.singleTable || sourceAction.singleTable == '') {
					throw error(500, {
						file: FILENAME,
						function: 'dbESP',
						message: `Single table not defined for source action.`
					})
				}

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
	return FormSourceResponse
}

export async function dbESPAPI(method: HTMLMETHOD, url: string, data: {}) {
	let options: { method: string; url: string; params?: {}; data?: {} } = {
		method: method,
		url: 'https://esp1.kssc.com:3000/esp/' + url
	}
	switch (method) {
		case HTMLMETHOD.GET:
			options.params = data
			break
		default:
			options.data = data
	}

	try {
		console.log('Axios.options:', options)
		const resp = await axios(options)
		const data = resp.data
		console.log('Axios.result:', data)
		return FormSourceResponse(data)
	} catch (err: any) {
		throw error(500, {
			file: FILENAME,
			function: 'dbESPAPI',
			message: `Axios status: ${err.response?.status} stautsText: ${err.response?.statusText} message: ${err.message}`
		})
	}
}

export async function dbESPSQL(sql: string, dbAction: FormSourceDBAction) {
	switch (dbAction) {
		case FormSourceDBAction.delete:
		case FormSourceDBAction.insert:

		case FormSourceDBAction.select:

		case FormSourceDBAction.update:

		case FormSourceDBAction.upsert:
		default:
			throw error(500, {
				file: FILENAME,
				function: 'dbESPSQL',
				message: `No case defined for DB Action: ${dbAction}`
			})
	}
}

async function getSQLExecute(method: HTMLMETHOD, sql: string) {
	console.log('getSQLExecute.sql:', sql)
	return await dbESPAPI(method, 'ws_sql_execute_' + method.toLowerCase(), { sql })
}

function getSqlSelect(sourceAction: FormSourceActionDirect) {
	// select columns
	let cols = ''
	let newCol = ''

	sourceAction.items.forEach((i) => {
		if (cols) {
			cols += ', '
		}
		if (i.source == FormSourceItemSource.subquery) {
			newCol = i.dbName + ' = (' + i.sourceKey + ')'
		} else {
			newCol = i.dbName
		}
		cols += newCol
	})
	let sql = 'SELECT ' + cols + ' FROM ' + sourceAction.singleTable + getSqlWhere(sourceAction)
	return getSQLExecute(HTMLMETHOD.GET, sql)
}

function getSqlUpdate(sourceAction: FormSourceActionDirect) {
	// update columns
	let cols = ''

	sourceAction.items.forEach((i) => {
		if (!i.dbUpdate && !i.dbIdentity) {
			if (cols) {
				cols += ', '
			}
			cols += '(' + i.dbName + ' = ' + getSQLColValue(i) + ')'
		}
	})
	// if (cols == '') {
	// 	throw error(500, {
	// 		file: FILENAME,
	// 		function: 'getSqlUpdate',
	// 		message: `No columns defined for update to table: ${sourceAction.singleTable}`
	// 	})
	// }

	let sql = 'UPDATE ' + sourceAction.singleTable + ' SET ' + cols + getSqlWhere(sourceAction)

	console.log('getSqlUpdate:', sql)
	//return getSQLExecute(HTMLMETHOD.POST, sql)
	return FormSourceResponse({})
}

function getSqlWhere(sourceAction: FormSourceActionDirect) {
	const idItem = getIdentityItem(sourceAction)
	return ' WHERE ' + idItem.dbName + ' = ' + idItem.value
}

function getIdentityItem(sourceAction: FormSourceActionDirect) {
	const idItem = sourceAction.items.filter((i) => i.dbIdentity)[0]
	if (idItem) {
		return idItem
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'getIdentityItem',
			message: `Cannot determine identity column for form source action: ${sourceAction.singleTable}`
		})
	}
}

function getSQLColValue(item: FormSourceItem) {
	if (item.value == null) {
		if (item.dbAllowNull) {
			return item.value
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'getSQLColValue',
				message: `Null value submitted for required field: ${item.dbName}.`
			})
		}
	}

	let val = undefined
	switch (item.dbDataType) {
		case FormSourceItemDataType.date:
		case FormSourceItemDataType.datetime:
		case FormSourceItemDataType.dec:
		case FormSourceItemDataType.int:
			val = item.value
			break

		case FormSourceItemDataType.date:
		case FormSourceItemDataType.string:
			val = item.value
			break
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
}
