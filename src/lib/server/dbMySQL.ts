import mysql from 'mysql2/promise'

let dbConn = await db()

async function db() {
	let mysqlconn = null

	if (!mysqlconn) {
		mysqlconn = mysql.createConnection({
			host: 'esp-web-mysql-do-user-13618756-0.b.db.ondigitalocean.com',
			port: 25060,
			user: 'doadmin',
			password: 'AVNS_sthZAdW_0hTt_9-h76N',
			database: 'defaultdb'
		})
	}
	return mysqlconn
}

export async function dbSelect(query: string) {
	let result = await dbConn.query(query)
	return result[0]
}
