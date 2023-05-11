import faunadb from 'faunadb'
export const q = faunadb.query
import { error } from '@sveltejs/kit'

// Acquire the env var
import { FAUNADB_SECRET } from '$env/static/private'

if (typeof FAUNADB_SECRET === 'undefined' || FAUNADB_SECRET === '') {
	throw error(401, 'The FAUNADB_SECRET environment variable is not set.')
}

// Instantiate the client
export const client = new faunadb.Client({
	secret: FAUNADB_SECRET,
	domain: 'db.fauna.com',
	port: 443,
	scheme: 'https'
})

function rtnError(err) {
	console.error('Errors: [%s] %s: %s', err.name, err.message, err.errors()[0].description)
}

// DB functions
export async function dbGetFormDefn(formId) {
	try {
		const res = await client.query(q.Get(q.Ref(q.Collection('forms'), formId)))
		return await res.data
	} catch (err) {
		rtnError(err)
	}
}
