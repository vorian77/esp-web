import postgres from 'postgres'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/dbPostgres.ts'

import { PGURL } from '$env/static/private'

const sql = postgres(PGURL + '?sslmode=require')
export default sql

function rtnError(err, func: string) {
	throw error(401, {
		file: FILENAME,
		function: func,
		message: `Error: ${err}`
	})
}

// services
export async function dbGetForm(name: string) {
	try {
		const result = await sql`SELECT * FROM form WHERE form_name = ${name}`
		return result[0]
	} catch (err) {
		rtnError(err, 'dbGetForm')
	}
}

export async function dbVersion() {
	// database check
	try {
		const result = await sql`select version()`
		console.log(result[0])
	} catch (err) {
		console.log('error:', err)
		// rtnError(err, 'dbGetDoc')
	}
}
