import { execute, review } from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	codes,
	nodeObjPrograms,
	nodeObjHeaders,
	nodeObjPages,
	userType,
	userUserType,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities'

const FILE = 'init_MOED_cm'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await reset()
	await data()
	await dataUserSys()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

const reviewQuery =
	'select sys_user::UserType {name, resources[is sys_user::Widget]:{name}} filter .name = "ut_sys_admin"'

async function reset() {
	const query = `
	delete sys_obj::NodeObj filter .owner.name = 'app_moed_cm'; 
	delete sys_user::UserType filter .owner.name = 'app_moed_cm';
	delete sys_core::App filter .name = 'app_moed_cm';
	delete sys_user::User filter .userName ='user_moed'
	`
	await execute(query)
}

async function data() {
	// await users([['Baltimore', 'MOED', 'user_moed', '!alfjasf*!@#$$*&']])

	await apps([['app_moed_cm']])
	await nodeObjPrograms([
		['app_moed_cm', 'program', 'pgm_moed_cm_staff', 'CM-Staff', 20, 'application', '/home/app'],
		[
			'app_moed_cm',
			'program',
			'pgm_moed_cm_student_applicant',
			'CM-Applicant',
			30,
			'application',
			'/home/app'
		],
		['app_moed_cm', 'program', 'pgm_moed_cm_student', 'CM-Student', 40, 'application', '/home/app']
	])
	await nodeObjPages([
		[
			'app_moed_cm',
			'pgm_moed_cm_student_applicant',
			'page',
			'node_cm_sa_app',
			'Application',
			10,
			'application',
			'/home/cm/application'
		],
		[
			'app_moed_cm',
			'pgm_moed_cm_student',
			'page',
			'node_cm_student_app',
			'Application',
			10,
			'application',
			'/home/cm/application'
		],
		[
			'app_moed_cm',
			'pgm_moed_cm_student',
			'page',
			'node_cm_student_goals',
			'Goals',
			20,
			'application',
			'/home/cm/goals'
		],
		[
			'app_moed_cm',
			'pgm_moed_cm_student',
			'page',
			'node_cm_student_messages',
			'Messages',
			30,
			'application',
			'/home/cm/messages'
		],
		[
			'app_moed_cm',
			'pgm_moed_cm_student',
			'page',
			'node_cm_student_activities',
			'Activities',
			40,
			'application',
			'/home/cm/activities'
		],
		[
			'app_moed_cm',
			'pgm_moed_cm_student',
			'page',
			'node_cm_student_quotes',
			'Quotes',
			50,
			'application',
			'/home/cm/quotes'
		]
	])
	await userType([
		['app_moed_cm', 'ut_moed_cm_staff'],
		['app_moed_cm', 'ut_moed_cm_student_applicant'],
		['app_moed_cm', 'ut_moed_cm_student']
	])
	await userTypeResourcesPrograms([
		['ut_moed_cm_staff', 'pgm_moed_cm_staff'],
		['ut_moed_cm_student_applicant', 'pgm_moed_cm_student_applicant'],
		['ut_moed_cm_student', 'pgm_moed_cm_student']
	])
}

async function dataUserSys() {
	/* sys user */
	await userTypeResourcesApps([['ut_sys_admin', 'app_moed_cm']])
	await userTypeResourcesPrograms([
		['ut_sys_admin', 'pgm_moed_cm_staff'],
		['ut_sys_admin', 'pgm_moed_cm_student_applicant'],
		['ut_sys_admin', 'pgm_moed_cm_student']
	])
	await userUserType([
		['user_sys', 'ut_moed_cm_staff'],
		['user_sys', 'ut_moed_cm_student_applicant'],
		['user_sys', 'ut_moed_cm_student']
	])
}
