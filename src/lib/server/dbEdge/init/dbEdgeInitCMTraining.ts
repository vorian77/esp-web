import { addForm, addNodeObj, execute } from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	userType,
	userUserType,
	nodeObjPrograms,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	columns,
	tables,
	tableColumns
} from '$server/dbEdge/init/dbEdgeInitUtilities'

const FILE = 'initCMTraining'

export async function initCMTraining() {
	console.log()
	console.log(`${FILE}...`)
	await reset()
	await data()
	await dataForms()
	await dataNodes()
	await dataUserSys()
	// await review(FILE, reviewQuery)
}

const reviewQuery = ''

async function reset() {
	await execute(`
  delete sys_obj::NodeObj filter .owner.name = 'app_cm_training';
	delete sys_obj::Form filter .owner.name = 'app_cm_training';
  delete sys_db::Table filter .owner.name = 'app_cm_training';
  delete sys_db::Column filter .owner.name = 'app_cm_training';  
  delete sys_user::UserType filter .name ilike 'ut_cm_training%';  
  delete sys_core::App filter .name = 'app_cm_training';
`)
}

async function data() {
	await apps([['app_cm_training']])
	await nodeObjPrograms([
		[
			'app_cm_training',
			'program',
			'pgm_cm_training_staff_adm',
			'AI-Role: Admin',
			50,
			'application',
			'/home/app'
		],
		[
			'app_cm_training',
			'program',
			'pgm_cm_training_staff_provider',
			'AI-Role: Provider',
			60,
			'application',
			'/home/app'
		],
		[
			'app_cm_training',
			'program',
			'pgm_cm_training_student',
			'AI-Role: Student',
			70,
			'application',
			'/home/app'
		]
	])
	await userType([
		['app_cm_training', 'ut_cm_training_staff_admin'],
		['app_cm_training', 'ut_cm_training_staff_provider'],
		['app_cm_training', 'ut_cm_training_student']
	])

	await userTypeResourcesPrograms([
		['ut_cm_training_staff_admin', 'pgm_cm_training_staff_adm'],
		['ut_cm_training_staff_provider', 'pgm_cm_training_staff_provider'],
		['ut_cm_training_student', 'pgm_cm_training_student']
	])
	// await userTypeResourcesWidgets([
	// 	['ut_cm_training_staff_admin', 'widget_sys_user'],
	// 	['ut_cm_training_staff_provider', 'widget_sys_user'],
	// 	['ut_cm_training_student', 'widget_cm_user'],
	// 	['ut_cm_training_student', 'widget_cm_quotes']
	// ])

	await tables([['app_cm_training', 'Student', true]])
	await columns([
		[
			'app_cm_training',
			'agencyId',
			'Agency ID',
			'Agency ID',
			'str',
			'',
			'left',
			0,
			0,
			'Enter Agency Id',
			''
		]
	])
	await tableColumns([
		['app_cm_training', 'Student', 'id', '', ''],
		['app_cm_training', 'Student', 'agencyId'],
		['app_cm_training', 'Student', 'firstName'],
		['app_cm_training', 'Student', 'lastName'],
		['app_cm_training', 'Student', 'fullName'],
		['app_cm_training', 'Student', 'email'],
		['app_cm_training', 'Student', 'createdAt'],
		['app_cm_training', 'Student', 'modifiedAt'],
		['app_cm_training', 'Student', 'createdBy'],
		['app_cm_training', 'Student', 'modifiedBy']
	])
}

async function dataForms() {
	/* node_training_provider_student_list */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'form_training_provider_student_list',
		header: 'Students',
		subHeader: 'All students enrolled in any courses.',
		tableModule: 'app_cm_training',
		tableName: 'Student',
		actions: ['noa_list_new'],
		fields: [
			{
				columnName: 'id',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 10,
				isDisplayable: true,
				isDisplay: false
			},
			{
				columnName: 'agencyId',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 20
			},
			{
				columnName: 'firstName',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 30,
				isDbListOrderField: true,
				dbListOrder: 20
			},
			{
				columnName: 'lastName',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 40,
				isDbListOrderField: true,
				dbListOrder: 10
			},
			{
				columnName: 'email',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 50
			}
		]
	})
	/* node_training_provider_student_detail */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'form_training_provider_student_detail',
		header: 'Student',
		tableModule: 'app_cm_training',
		tableName: 'Student',
		actions: ['noa_detail_save', 'noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				columnName: 'id',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 10,
				isDisplay: true,
				codeDbDataSource: 'data',
				isDbIdentity: true,
				isDbSys: true
			},
			{
				columnName: 'agencyId',
				codeElement: 'input',
				codeInputType: 'text',
				dbSelectOrder: 20,
				codeDbDataSource: 'data'
			},
			{
				columnName: 'firstName',
				codeElement: 'input',
				codeInputType: 'text',
				dbSelectOrder: 30,
				codeDbDataSource: 'data'
			},
			{
				columnName: 'lastName',
				codeElement: 'input',
				codeInputType: 'text',
				dbSelectOrder: 40,
				codeDbDataSource: 'data'
			},
			{
				columnName: 'email',
				codeElement: 'input',
				codeInputType: 'email',
				dbSelectOrder: 50,
				codeDbDataSource: 'data'
			},
			{
				columnName: 'createdAt',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 60,
				isDbSys: true
			},
			{
				columnName: 'modifiedAt',
				codeElement: 'input',
				codeInputType: 'text',
				codeAccess: 'readOnly',
				dbSelectOrder: 60,
				isDbSys: true
			}
		]
	})
}

async function dataNodes() {
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'pgm_cm_training_staff_provider',
		codeType: 'object',
		name: 'node_training_provider_course_list',
		header: 'Courses',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'pgm_cm_training_staff_provider',
		codeType: 'object',
		name: 'node_training_provider_student_list',
		header: 'Students',
		order: 20,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_student_list',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'node_training_provider_student_list',
		codeType: 'object',
		name: 'node_training_provider_student_detail',
		header: 'Student',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_student_detail',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'node_training_provider_student_detail',
		codeType: 'object',
		name: 'node_training_provider_referral_list',
		header: 'Referrals',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_referral_list',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'pgm_cm_training_staff_provider',
		codeType: 'object',
		name: 'node_training_provider_invoices_list',
		header: 'Invoices',
		order: 30,
		codeIcon: 'application',
		page: '/home/app',
		creator: 'user_sys'
	})
}

async function dataUserSys() {
	await userTypeResourcesApps([['ut_sys_admin', 'app_cm_training']])
	await userUserType([
		['user_sys', 'ut_cm_training_staff_admin'],
		['user_sys', 'ut_cm_training_staff_provider'],
		['user_sys', 'ut_cm_training_student']
	])
}
