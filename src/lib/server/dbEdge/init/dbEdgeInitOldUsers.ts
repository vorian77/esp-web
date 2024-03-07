import { addUser, addUserOrg } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import {
	addRoleOrg,
	addRoleStaff,
	addStaff,
	nodeObjPrograms,
	userType,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	userUserType,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities1'

export async function initOldUsers() {
	await initUserResources()
	// await initUsers()
}

async function initUserResources() {
	await nodeObjPrograms([
		['app_cm', 'node_pgm_cm_staff_adm', 'AI-Role: Admin', 50, 'application'],
		['app_cm', 'node_pgm_cm_staff_provider', 'AI-Role: Provider', 60, 'application'],
		['app_cm', 'node_pgm_cm_student', 'AI-Role: Student', 70, 'application']
	])

	// await userType([
	// 	['app_cm', 'ut_cm_staff_admin'],
	// 	['app_cm', 'ut_cm_staff_provider'],
	// 	['app_cm', 'ut_cm_student'],
	// 	['app_sys', 'ut_sys_admin']
	// ])

	// await widgets([
	// 	['app_cm', 'widget_cm_user'],
	// 	['app_cm', 'widget_cm_quotes'],
	// 	['app_sys', 'widget_sys_user']
	// ])

	// await userTypeResourcesApps([
	// 	['ut_sys_admin', 'app_cm'],
	// 	['ut_sys_admin', 'app_cm'],
	// 	['ut_sys_admin', 'app_db'],
	// 	['ut_sys_admin', 'app_sys']
	// ])

	await userTypeResourcesPrograms([
		['ut_cm_staff_admin', 'node_pgm_cm_staff_adm'],
		['ut_cm_staff_provider', 'node_pgm_cm_staff_provider'],
		['ut_cm_student', 'node_pgm_cm_student'],
		['ut_sys_admin', 'node_pgm_cm_staff_adm'],
		['ut_sys_admin', 'node_pgm_cm_staff_provider'],
		['ut_sys_admin', 'node_pgm_cm_student']
	])

	// await userTypeResourcesWidgets([
	// 	['ut_cm_staff_admin', 'widget_sys_user'],
	// 	['ut_cm_staff_provider', 'widget_sys_user'],
	// 	['ut_sys_admin', 'widget_sys_user']
	// ])

	// await userTypeResourcesWidgets([
	// 	['ut_cm_staff_admin', 'widget_sys_user'],
	// 	['ut_cm_staff_provider', 'widget_sys_user'],
	// 	['ut_cm_student', 'widget_cm_user'],
	// 	['ut_cm_student', 'widget_cm_quotes']
	// ])

	// await userUserType([
	// 	['user_sys', 'ut_cm_staff_admin'],
	// 	['user_sys', 'ut_cm_staff_provider'],
	// 	['user_sys', 'ut_cm_student'],
	// 	['user_sys', 'ut_sys_admin']
	// ])

	// await addRoleOrg([
	// 	['Atlantic Impact', 'cm_training_role_org_agency'],
	// 	['Atlantic Impact - School Site 1', 'cm_training_role_org_venue'],
	// 	['Atlantic Impact - School Site 2', 'cm_training_role_org_venue'],
	// 	['Atlantic Impact - School Site 3', 'cm_training_role_org_venue']
	// ])
}

async function initUsers() {
	await addUser({
		firstName: 'Anise',
		lastName: 'Hayes',
		owner: 'Atlantic Impact',
		userName: '2482317505'
	})
	await addUser({
		firstName: 'Matthew',
		lastName: 'Clayton',
		owner: 'Atlantic Impact',
		userName: '3136276210'
	})
	await addUser({
		firstName: 'Erica',
		lastName: 'Hicks',
		owner: 'Atlantic Impact',
		userName: '3136272756'
	})
	await addUser({
		firstName: 'Phyllip',
		lastName: 'Hall',
		owner: 'Atlantic Impact',
		userName: '2487985578'
	})

	await addUserOrg({ orgName: 'Atlantic Impact', userName: 'user_sys' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '2482317505' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '3136276210' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '2487985578' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '3136272756' })

	await userUserType([['2482317505', 'ut_cm_staff_provider']])
	await userUserType([['3136276210', 'ut_cm_staff_provider']])
	await userUserType([['2487985578', 'ut_cm_staff_provider']])
	await userUserType([['3136272756', 'ut_cm_staff_provider']])

	await addStaff([
		['Atlantic Impact', 'Stacy', 'Administrator'],
		['Atlantic Impact', 'Stan', 'Administrator'],
		['Atlantic Impact', 'Anise', 'Hayes'],
		['Atlantic Impact', 'Matthew', 'Clayton'],
		['Atlantic Impact', 'Erica', 'Hicks'],
		['Atlantic Impact', 'Jane', 'Instructor'],
		['Atlantic Impact', 'Joe', 'Instructor']
	])

	await addRoleStaff([
		['Stacy', 'Administrator', 'cm_training_role_staff_admin'],
		['Stan', 'Administrator', 'cm_training_role_staff_admin'],

		['Anise', 'Hayes', 'cm_training_role_staff_agency'],
		['Matthew', 'Clayton', 'cm_training_role_staff_agency'],
		['Erica', 'Hicks', 'cm_training_role_staff_agency'],

		['Jane', 'Instructor', 'cm_training_role_staff_instructor'],
		['Joe', 'Instructor', 'cm_training_role_staff_instructor']
	])
}
