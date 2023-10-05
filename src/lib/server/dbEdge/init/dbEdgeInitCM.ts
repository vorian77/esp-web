import { execute, review } from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	users,
	codes,
	nodesPrograms,
	nodesHeaders,
	nodesPages,
	homeScreen,
	homeScreenWidget,
	homeScreenAddWidgets,
	userType,
	userTypeUsers,
	userTypeResourcesHomeScreen,
	userTypeResourcesApps,
	userTypeResourcesPrograms
} from '$server/dbEdge/init/dbEdgeInitUtilities'

const FILE = 'initCM'

export async function initCM() {
	console.log()
	console.log(`${FILE}.1`)
	await reset()
	await users([
		['CM-Staff', 'Test-User', 'user_cm_test_staff', '123'],
		['CM-Student-Applicant', 'Test-User', 'user_cm_test_student_applicant', '123'],
		['CM-Student', 'Test-User', 'user_cm_test_student', '123']
	])
	await apps([['app_cm']])
	await codes([
		// icons
		['ct_sys_icon', 'app_cm', 'goals'],
		['ct_sys_icon', 'app_cm', 'message'],
		['ct_sys_icon', 'app_cm', 'activities'],
		['ct_sys_icon', 'app_cm', 'quote-enclosed']
	])
	await nodesPrograms([
		['app_cm', 'program', 'pgm_cm_staff', 'CM-Staff', 20, 'application', '/apps', 'Home'],
		[
			'app_cm',
			'program',
			'pgm_cm_student_applicant',
			'CM-Applicant',
			30,
			'application',
			'/apps',
			'Home'
		],
		['app_cm', 'program', 'pgm_cm_student', 'CM-Student', 40, 'application', '/apps', 'Home']
	])
	await nodesPages([
		[
			'app_cm',
			['app_cm', 'pgm_cm_student_applicant'],
			'page',
			'node_cm_sa_app',
			'Application',
			10,
			'application',
			'/apps/cm/application'
		],
		[
			'app_cm',
			['app_cm', 'pgm_cm_student'],
			'page',
			'node_cm_student_app',
			'Application',
			10,
			'application',
			'/apps/cm/application'
		],
		[
			'app_cm',
			['app_cm', 'pgm_cm_student'],
			'page',
			'node_cm_student_goals',
			'Goals',
			20,
			'application',
			'/apps/cm/goals'
		],
		[
			'app_cm',
			['app_cm', 'pgm_cm_student'],
			'page',
			'node_cm_student_messages',
			'Messages',
			30,
			'application',
			'/apps/cm/messages'
		],
		[
			'app_cm',
			['app_cm', 'pgm_cm_student'],
			'page',
			'node_cm_student_activities',
			'Activities',
			40,
			'application',
			'/apps/cm/activities'
		],
		[
			'app_cm',
			['app_cm', 'pgm_cm_student'],
			'page',
			'node_cm_student_quotes',
			'Quotes',
			50,
			'application',
			'/apps/cm/quotes'
		],
		[
			'app_sys',
			['app_sys', 'node_sys_utility_header'],
			'page',
			'node_sys_utility_quotes',
			'Utility-Quotes',
			10,
			'application',
			'/apps/cm/quotes'
		]
	])
	await homeScreen([
		['app_cm', 'hs_cm_staff'],
		['app_cm', 'hs_cm_student']
	])
	await homeScreenWidget([
		['app_cm', 'hsw_cm_user'],
		['app_cm', 'hsw_cm_quotes']
	])
	await homeScreenAddWidgets([
		['hs_sys_user', ['hsw_cm_user', 'hsw_cm_quotes']],
		['hs_cm_staff', ['hsw_sys_user']],
		['hs_cm_student', ['hsw_cm_user', 'hsw_cm_quotes']]
	])
	await userType([
		['app_cm', 'ut_cm_staff'],
		['app_cm', 'ut_cm_student_applicant'],
		['app_cm', 'ut_cm_student']
	])
	await userTypeUsers([
		['ut_cm_staff', 'user_cm_test_staff'],
		['ut_cm_student_applicant', 'user_cm_test_student_applicant'],
		['ut_cm_student', 'user_cm_test_student']
	])
	await userTypeResourcesHomeScreen([
		['ut_cm_staff', 'hs_cm_staff'],
		['ut_cm_student_applicant', 'hs_cm_student'],
		['ut_cm_student', 'hs_cm_student']
	])
	await userTypeResourcesPrograms([
		['ut_cm_staff', ['app_cm', 'pgm_cm_staff']],
		['ut_cm_student_applicant', ['app_cm', 'pgm_cm_student_applicant']],
		['ut_cm_student', ['app_cm', 'pgm_cm_student']]
	])
}

async function reset() {
	const query = `
  delete sys_user::UserType filter .owner.name = "app_cm";
  delete sys_db::Table filter .owner.name = 'app_cm';
  delete sys_db::Column filter .owner.name = 'app_cm'; 
  delete sys_obj::Form filter .owner.name = 'app_cm';
  delete sys_app::Node filter .owner.name = 'app_cm'; 
  delete sys_core::Code filter .owner.name = 'app_cm';
  delete sys_core::App filter .name = 'app_cm';
	delete sys_user::User filter .userName ilike "user_cm_test%";
	`
	await execute(query)
}
