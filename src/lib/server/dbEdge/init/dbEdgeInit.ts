import { initSys } from '$server/dbEdge/init/dbEdgeInitSys'
import { initCM } from '$server/dbEdge/init/dbEdgeInitCM'
import { initCMTraining } from '$server/dbEdge/init/dbEdgeInitCMTraining'
import { initCMTrainingData } from '$server/dbEdge/init/dbEdgeInitCMTrainingData'
import {
	review,
	getFormById,
	getFormIdByName,
	getNodeObjsByParent,
	getUserByUserName
} from '$server/dbEdge/types.edgeDB.server'

const FILE = '/server/dbEdge/init'

let reviewQuery = ''
//reviewQuery = `select sys_core::ObjRoot {*} `
//reviewQuery = `select sys_user::User {*} `
//reviewQuery = `select sys_core::App {*} `
// reviewQuery = `select sys_core::CodeType {*} `
// reviewQuery = `select sys_core::Code {*} `
// reviewQuery = `select sys_app::Node {*} `
//reviewQuery = `select sys_app::Widget {**}`
// reviewQuery = `select sys_obj::ObjAction {*}`
// reviewQuery = `select sys_db::Table {*}`
// reviewQuery = `select sys_db::Column {*}`
reviewQuery = `select sys_core::ObjRoot {**} filter .name = 'root' order by .name`

export async function init() {
	// <temp>  230908 - database init
	// await initSys()
	// await initCM()
	// await initCMTraining()
	// await initCMTrainingData()
	// await review(FILE, reviewQuery)
	// await checkForms()
	// await checkNodes()
}

async function checkForms() {
	// console.log('user:', await getUserByUserName('user_sys'))
	// console.log('getForm...')
	// const formId = await getFormIdByName('form_training_provider_student_list')
	// const formId = await getFormIdByName('form_training_provider_student_detail')
	// const form = await getFormById(formId!.id)
	// console.log('form:', form)
	// console.log('form.fieldsSelect:', form?._fieldsSelect)
	// console.log('form.fieldsOrder:', form?._fieldsOrder)
	// console.log('form.fieldsId:', form?._fieldsId)
	// console.log('form.fieldsInsert:', form?._fieldsInsert)
	// console.log('form.fieldsUpadte:', form?._fieldsUpdate)
	// console.log('form.fieldsPreset:', form?._fieldsPreset)
}

async function checkNodes() {
	console.log('nodes...')
	const nodes = await getNodeObjsByParent('c607e14e-6494-11ee-a2aa-9b9fd93ce2be')
	console.log(nodes)
}
