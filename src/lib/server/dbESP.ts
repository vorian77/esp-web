import axios from 'axios'
import {
	FormSourceAction,
	FormSourceDBAction,
	FormSourceType,
	FormSourceResponse,
	HTMLMETHOD
} from '$comps/esp/form/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/$server/dbESP.ts'

export async function dbESP(sourceAction: FormSourceAction, action: FormSourceDBAction, parms: {}) {
	switch (sourceAction.type) {
		case FormSourceType.api:
			return await dbESPAPI(sourceAction.method, sourceAction.url, parms)
			break

		case FormSourceType.db:
			switch (action) {
				case FormSourceDBAction.delete:
					break

				case FormSourceDBAction.select:
					console.log('dbESP.db.select...')
					let sql = sourceAction.statement
					console.log('sql - before parms:', sql)
					for (const [key, value] of Object.entries(parms)) {
						sql = sql.replace(key, value)
					}
					console.log('sql - after parms:', sql)
					return await dbESPSQL(sql)
					break

				case FormSourceDBAction.update:
					break

				default:
					throw error(500, {
						file: FILENAME,
						function: 'dbESP',
						message: `No case defined for FormSourceAction: ${action}`
					})
			}

		default:
			throw error(500, {
				file: FILENAME,
				function: 'dbESP',
				message: `No case defined for sourceAction.type: ${sourceAction.type}`
			})
	}
}

export async function dbESPAPI(method: HTMLMETHOD, url: string, parms: {}) {
	console.log('dbESPAPI...')
	let options = { method, url: 'https://esp1.kssc.com:3000/esp/' + url }
	switch (method) {
		case HTMLMETHOD.GET:
			options.params = parms
			break
		default:
			options.data = parms
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

export async function dbESPSQL(sql: string) {
	return await dbESPAPI(HTMLMETHOD.GET, 'ws_sql_execute', { sql })
}
