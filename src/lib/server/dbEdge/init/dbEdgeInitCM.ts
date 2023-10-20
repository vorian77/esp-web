import { execute, review } from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	users,
	codes,
	nodeObjPrograms,
	nodeObjHeaders,
	nodeObjPages,
	widgets,
	userType,
	userUserType,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets
} from '$server/dbEdge/init/dbEdgeInitUtilities'

const FILE = 'initCM'

export async function initCM() {
	console.log()
	console.log(`${FILE}.1`)
	await reset()
	await data()
	await dataUserSys()
	await review(FILE, reviewQuery)
}

const reviewQuery =
	'select sys_user::UserType {name, resources[is sys_user::Widget]:{name}} filter .name = "ut_sys_admin"'

async function reset() {
	const query = `
	delete sys_obj::NodeObj filter .owner.name = 'app_cm'; 
	delete sys_user::Widget filter .owner.name = 'app_cm';
  delete sys_core::Code filter .owner.name = 'app_cm';
	delete sys_user::UserType filter .owner.name = 'app_cm';
	delete sys_core::App filter .name = 'app_cm';
	delete sys_user::User filter .userName ilike "user_cm%";
	`
	await execute(query)
}

async function data() {
	await apps([['app_cm']])
	await codes([
		// icons
		['ct_sys_node_obj_icon', 'app_cm', 'goals'],
		['ct_sys_node_obj_icon', 'app_cm', 'message'],
		['ct_sys_node_obj_icon', 'app_cm', 'activities'],
		['ct_sys_node_obj_icon', 'app_cm', 'quote-enclosed']
	])
	await nodeObjPrograms([
		['app_cm', 'program', 'pgm_cm_staff', 'CM-Staff', 20, 'application', '/home/app'],
		[
			'app_cm',
			'program',
			'pgm_cm_student_applicant',
			'CM-Applicant',
			30,
			'application',
			'/home/app'
		],
		['app_cm', 'program', 'pgm_cm_student', 'CM-Student', 40, 'application', '/home/app']
	])
	await nodeObjPages([
		[
			'app_cm',
			'pgm_cm_student_applicant',
			'page',
			'node_cm_sa_app',
			'Application',
			10,
			'application',
			'/home/cm/application'
		],
		[
			'app_cm',
			'pgm_cm_student',
			'page',
			'node_cm_student_app',
			'Application',
			10,
			'application',
			'/home/cm/application'
		],
		[
			'app_cm',
			'pgm_cm_student',
			'page',
			'node_cm_student_goals',
			'Goals',
			20,
			'application',
			'/home/cm/goals'
		],
		[
			'app_cm',
			'pgm_cm_student',
			'page',
			'node_cm_student_messages',
			'Messages',
			30,
			'application',
			'/home/cm/messages'
		],
		[
			'app_cm',
			'pgm_cm_student',
			'page',
			'node_cm_student_activities',
			'Activities',
			40,
			'application',
			'/home/cm/activities'
		],
		[
			'app_cm',
			'pgm_cm_student',
			'page',
			'node_cm_student_quotes',
			'Quotes',
			50,
			'application',
			'/home/cm/quotes'
		]
	])
	await widgets([
		['app_cm', 'widget_cm_user'],
		['app_cm', 'widget_cm_quotes']
	])
	await userType([
		['app_cm', 'ut_cm_staff'],
		['app_cm', 'ut_cm_student_applicant'],
		['app_cm', 'ut_cm_student']
	])
	await userTypeResourcesPrograms([
		['ut_cm_staff', 'pgm_cm_staff'],
		['ut_cm_student_applicant', 'pgm_cm_student_applicant'],
		['ut_cm_student', 'pgm_cm_student']
	])
	await userTypeResourcesWidgets([
		['ut_cm_staff', 'widget_sys_user'],
		['ut_cm_student_applicant', 'widget_cm_user'],
		['ut_cm_student_applicant', 'widget_cm_user'],
		['ut_cm_student', 'widget_cm_user'],
		['ut_cm_student', 'widget_cm_quotes']
	])
}

async function dataUserSys() {
	/* sys user */
	await userTypeResourcesApps([['ut_sys_admin', 'app_cm']])
	// await userTypeResourcesWidgets([
	// 	['ut_sys_admin', 'widget_cm_user'],
	// 	['ut_sys_admin', 'widget_cm_quotes']
	// ])
	// await userUserType([
	// 	['user_sys', 'ut_cm_staff'],
	// 	['user_sys', 'ut_cm_student_applicant'],
	// 	['user_sys', 'ut_cm_student']
	// ])
}
