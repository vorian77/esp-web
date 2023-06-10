import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import { integer, pgTable, serial, text, timestamp, varchar, json } from 'drizzle-orm/pg-core'
// import { InferModel, eq, sql } from 'drizzle-orm'
import { InferModel, eq } from 'drizzle-orm'
import { Pool } from 'pg'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/dbPostgres.ts'

import { PGURL } from '$env/static/private'

const sql = postgres(PGURL + '?sslmode=require')
export default sql

export const form = pgTable('form', {
	form_id: serial('form_id').primaryKey(),
	form_name: text('form_name').notNull()
})

export type User = InferModel<typeof form>

const pool = new Pool({
	connectionString: PGURL + '?sslmode=require'
})

const db = drizzle(pool)

function rtnError(err, func: string) {
	throw error(401, {
		file: FILENAME,
		function: func,
		message: `Error: ${err}`
	})
}

// services
export async function dbDrizzle() {
	const allForms = await db
		.select({
			form_id: form.form_id,
			form_name: form.form_name
		})
		.from(form)
	return allForms
}
