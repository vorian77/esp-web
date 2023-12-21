import * as edgedb from 'edgedb'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdge.ts'

let client = edgedb.createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function queryExecute(script: string) {
	if (!script) return {}
	try {
		return await client.execute(script)
	} catch (e: any) {
		throw error(500, {
			file: FILENAME,
			function: 'queryExecute',
			message: `Invalid query: ${script} ${e.message}`
		})
	}
}

export async function queryMultiple(script: string) {
	if (!script) return {}
	try {
		return JSON.parse(await client.queryJSON(script))
	} catch (e: any) {
		throw error(500, {
			file: FILENAME,
			function: 'queryMultiple',
			message: `Invalid query: ${script} ${e.message}`
		})
	}
}

export async function querySingle(script: string) {
	if (!script) return {}
	try {
		return JSON.parse(await client.querySingleJSON(script))
	} catch (e: any) {
		throw error(500, {
			file: FILENAME,
			function: 'querySingle',
			message: `Invalid query: ${script} ${e.message}`
		})
	}
}

export async function transaction(queries: Array<string>) {
	return await client.transaction(async (tx) => {
		for (const query of queries) {
			await tx.execute(query)
		}
	})
}
