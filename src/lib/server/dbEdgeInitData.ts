import { createClient } from 'edgedb'
import e from '../dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

const CREATOR = e.select(e.sys_user.getUser('user_sys'))
let q = ''
let result

export async function initData() {
	console.log()
	console.log('edgeDB-initData.1')
	await reset()
	await dataStudents()
	console.log('edgeDB-initData.review:', review)
}

const review = await client.query(`select cm_training::Student {*}`)

async function reset() {
	await client.execute(`
  delete cm_training::Student;
`)
}

async function dataStudents() {
	await client.execute(`
    with
    myCreator := (select sys_user::getUser('user_sys'))
    for x in {
      ('AE-195500', 'Jose', 'Prater', 'jp@gmail.com'),
      ('AE-196800', 'Jeron', 'Johnson', 'jj@gmail.com'),
      ('AE-197100', 'Sara', 'Payne', 'sp@gmail.com'),
      ('AE-197300', 'Elonda', 'Cruder', 'ec@gmail.com'),
      ('AE-197400', 'Christopher', 'Calhoun', 'cc@gmail.com'),
      ('AE-197500', 'Regory', 'Elliott', 're@gmail.com'),
      ('AE-197800', 'Farrah', 'May', 'fm@gmail.com'),
      ('AE-197900', 'Gerrell', 'Johnson', 'gj@gmail.com'),
      ('AE-197900', 'Cornelius', 'Williams', 'cw@gmail.com'),
      ('AE-197000', 'Chakiya', 'Long', 'cl@gmail.com'),
      ('AE-197700', 'William', 'Cobb', 'wc@gmail.com'),
      ('AE-197700', 'Italo', 'Rodriguez', 'ir@gmail.com'),
    }
    union (insert cm_training::Student {
      agencyId := x.0,
      firstName := x.1,
      lastName := x.2,
      email := x.3,
      createdBy := myCreator,
      modifiedBy := myCreator
    });
  `)
}
