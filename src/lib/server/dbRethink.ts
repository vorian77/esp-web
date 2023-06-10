import r from 'rethinkdb'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/dbRethink.ts'

const config = {
	host: '167.99.155.231',
	port: 8080,
	db: 'esp_web'
}

try {
	var conn = r.connect(config)
} catch (err) {
	console.error('Unable to connect to rethinkDB.')
}

function rtnError(err, func: string) {
	throw error(401, {
		file: FILENAME,
		function: func,
		message: `Error: ${err}`
	})
}

// todo.createdAt = r.now(); // Set the field `createdAt` to the current time
// var result = yield r.table('todos').insert(todo, {returnChanges: true}).run(this._rdbConn);

export async function dbTest() {
	// database check
	try {
		let result = 'default'
		// const result = await sql`select version()`
		console.log(result)
	} catch (err) {
		console.log('error:', err)
		// rtnError(err, 'dbGetDoc')
	}
}
