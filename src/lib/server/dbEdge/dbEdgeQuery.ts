import * as edgedb from 'edgedb'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdge.ts'

let client = edgedb.createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function queryMultiple(script: string) {
	try {
		return JSON.parse(await client.queryJSON(script))
	} catch (e) {
		throw error(500, {
			file: FILENAME,
			function: 'queryMultiple',
			message: `Invalid query: ${script}`
		})
	}
}

export async function querySingle(script: string) {
	try {
		return JSON.parse(await client.querySingleJSON(script))
	} catch (e) {
		throw error(500, {
			file: FILENAME,
			function: 'queryMultiple',
			message: `Invalid query: ${script}`
		})
	}
}
