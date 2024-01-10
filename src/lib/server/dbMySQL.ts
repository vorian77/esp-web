// import { MYSQL_PASSWORD } from '$env/static/private'

let dbConn = await db()

async function db() {
	let mysqlconn = null

	if (!mysqlconn) {
		// mysqlconn = mysql.createConnection({
		// 	host: 'esp-web-mysql-do-user-13618756-0.b.db.ondigitalocean.com',
		// 	port: 25060,
		// 	user: 'doadmin',
		// 	password: MYSQL_PASSWORD,
		// 	database: 'esp'
		// })
	}
	return mysqlconn
}

export async function dbSelect(query: string) {
	// let result = await dbConn.query(query)
	// return result[0]
}

// import { dbSelect } from '$server/dbMySQL'
// const r = dbSelect('select * from esp.sessions')
// const d = await r
// console.log(d)
