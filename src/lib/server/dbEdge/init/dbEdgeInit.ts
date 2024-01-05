import { review } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import initSys from '$server/dbEdge/init/dbEdgeInitSys'
import initSysAuth from '$server/dbEdge/init/dbEdgeInitSysAuth'
import initCM from '$server/dbEdge/init/dbEdgeInitCM'
import initCMTraining from '$server/dbEdge/init/dbEdgeInitCMTraining'
import initCMTrainingData from '$server/dbEdge/init/dbEdgeInitCMTrainingData'
import initMOED_cm from '$server/dbEdge/init/dbEdgeInitMOED_cm'

const FILE = '/server/dbEdge/init'

export async function init() {
	// <temp>  230908 - database init
	// await initSys()
	// await initSysAuth()
	// await initCM()
	// await initCMTraining()
	// await initCMTrainingData()
	// await initMOED_cm()
	// await initReviewQuery()
}

async function initReviewQuery() {
	let reviewQuery = ''
	//reviewQuery = `select sys_core::ObjRoot {*} `
	//reviewQuery = `select sys_user::User {*} `
	// reviewQuery = `select sys_core::App {*} `
	// reviewQuery = `select sys_core::CodeType {*} `
	// reviewQuery = `select sys_core::Code {*} `
	// reviewQuery = `select sys_obj::NodeObj {*} `
	//reviewQuery = `select sys_app::Widget {**}`
	// reviewQuery = `select sys_obj::ObjAction {*}`
	// reviewQuery = `select sys_db::Table {*}`
	// reviewQuery = `select sys_db::Column {*}`
	// reviewQuery = `select sys_core::ObjRoot {**} filter .name = 'root' order by .name`
	await review(FILE, reviewQuery)
}
