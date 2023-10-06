import { initSys } from '$server/dbEdge/init/dbEdgeInitSys'
import { initCM } from '$server/dbEdge/init/dbEdgeInitCM'
import { initCMTraining } from '$server/dbEdge/init/dbEdgeInitCMTraining'
import { initCMTrainingData } from '$server/dbEdge/init/dbEdgeInitCMTrainingData'
import { review } from '$server/dbEdge/types.edgeDB.server'

const FILE = 'initDB'

let reviewQuery = ''
//reviewQuery = `select sys_core::ObjRoot {*} `
//reviewQuery = `select sys_user::User {*} `
//reviewQuery = `select sys_core::App {*} `
// reviewQuery = `select sys_core::CodeType {*} `
// reviewQuery = `select sys_core::Code {*} `
// reviewQuery = `select sys_app::Node {*} `
//reviewQuery = `select sys_app::HomeScreen {**}`
// reviewQuery = `select sys_user::UserType {**}`
// reviewQuery = `select sys_obj::ObjAction {*}`
// reviewQuery = `select sys_db::Table {*}`
// reviewQuery = `select sys_db::Column {*}`
// reviewQuery = `select sys_obj::Form {*}`
reviewQuery = `select sys_user::UserType {name, resources: {name}} filter .name = 'ut_sys_admin'`

export async function init() {
	// <temp>  230908 - database init
	console.log()
	// console.log(`${FILE}.1`)
	// await initSys()
	// await initCM()
	await initCMTraining()
	// await initCMTrainingData()
	await review(FILE, reviewQuery)
}
