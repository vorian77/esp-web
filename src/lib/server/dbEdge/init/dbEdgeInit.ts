import initSys from '$server/dbEdge/init/dbEdgeInitSys'
import initCM from '$server/dbEdge/init/dbEdgeInitCM'
import initCMTraining from '$server/dbEdge/init/dbEdgeInitCMTraining'
import initCMTrainingData from '$server/dbEdge/init/dbEdgeInitCMTrainingData'
import initMOED_cm from '$server/dbEdge/init/dbEdgeInitMOED_cm'

import {
	review,
	getFormById,
	getFormIdByName,
	getNodeObjsByParent
} from '$server/dbEdge/types.edgeDB.server'

const FILE = '/server/dbEdge/init'

export async function init() {
	// <temp>  230908 - database init
	// await initSys()
	// await initCM()
	// await initCMTraining()
	// await initCMTrainingData()
	// await initMOED_cm()
	// await initReviewQuery()
	// await initReviewForm()
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

async function initReviewForm() {
	// console.log()
	// console.log('user:', await getUserByUserName('user_sys'))
	// console.log('getForm...')
	// const formId = await getFormIdByName('form_training_provider_student_list')
	// const formId = await getFormIdByName('form_training_provider_student_detail')
	// console.log('formId:', formId)
	// const form = await getFormById(formId!.id)
	// console.log('form:', form)
	// console.log('form.fieldsSelect:', form?._fieldsSelect)
	// console.log('form.fieldsSelectUpdate:', form?._fieldsSelectUpdate)
	// console.log('form.fieldsOrder:', form?._fieldsOrder)
	// console.log('form.fieldsId:', form?._fieldsId)
	// console.log('form._fieldsSaveInsert:', form?._fieldsSaveInsert)
	// console.log('form._fieldsSaveUpdate:', form?._fieldsSaveUpdate)
	// console.log('form.fieldsPreset:', form?._fieldsPreset)
	// console.log('nodes...')
	// const nodes = await getNodeObjsByParent('46df2d22-74d0-11ee-a4cb-37af29448c9c')
}
