import * as edgedb from 'edgedb'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = edgedb.createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function dbTest() {
	// const rtn = await client.query('select 1 + 1')
	// console.log('dbEdge.test:', rtn)

	try {
		const result = await client.query(`
	    select global sys_user::SYS_USER {*}
	  `)
		console.log('dbEdge.test:', JSON.stringify(result, null, 2))
	} catch (e) {
		console.log('error:', e)
	}
}
