import faunadb from 'faunadb'
export const q = faunadb.query
import { error } from '@sveltejs/kit'

// Acquire the env var
import { FAUNADB_SECRET } from '$env/static/private'

const FILENAME = '/server/dbFauna.ts'

if (typeof FAUNADB_SECRET === 'undefined' || FAUNADB_SECRET === '') {
	throw error(401, {
		file: FILENAME,
		function: '',
		message: 'The FAUNADB_SECRET environment variable is not set.'
	})
}

// Instantiate the client
export const client = new faunadb.Client({
	secret: FAUNADB_SECRET,
	domain: 'db.fauna.com',
	port: 443,
	scheme: 'https'
})

function rtnError(err, f) {
	throw error(401, {
		file: FILENAME,
		function: f,
		message: `Errors: ${err.name} ${err.message}: ${err.errors()[0].description}`
	})
}

// DB functions
export async function dbGetDoc(collection: string, id: string) {
	try {
		const res = await client.query(q.Get(q.Ref(q.Collection(collection), id)))
		return await res.data
	} catch (err) {
		rtnError(err, 'dbGetDoc')
	}
}
