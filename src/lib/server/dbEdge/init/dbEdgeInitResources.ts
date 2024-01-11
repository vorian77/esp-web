import {
	addRoleOrg,
	addStaff,
	addRoleStaff,
	userType,
	userUserType,
	nodeObjHeaders,
	nodeObjPages,
	nodeObjPrograms,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addNodeFooter,
	addNodeProgramObj,
	addUser,
	addUserOrg
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initResources'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initNodeObjs()
	await initFooter()
	await initUserResources()
	await initUsers()
	console.log(`${FILE}.end`)
}

async function initNodeObjs() {
	await nodeObjPrograms([['app_sys', 'node_pgm_sys_admin', 'SysAdmin', 10, 'application']])
	await nodeObjHeaders([
		['app_sys', 'node_pgm_sys_admin', 'node_hdr_sys_utility_header', 'Utilities', 10, 'application']
	])
	await nodeObjPages([
		[
			'app_sys',
			'node_hdr_sys_utility_header',
			'node_page_sys_utility_quotes',
			'Utility-Quotes',
			10,
			'application',
			'/home/cm/quotes'
		]
	])

	await nodeObjPrograms([
		['app_cm_training', 'node_pgm_cm_training_staff_adm', 'AI-Role: Admin', 50, 'application'],
		[
			'app_cm_training',
			'node_pgm_cm_training_staff_provider',
			'AI-Role: Provider',
			60,
			'application'
		],
		['app_cm_training', 'node_pgm_cm_training_student', 'AI-Role: Student', 70, 'application']
	])

	// admin - data obj config
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_sys_admin_data_obj_config_list',
		header: 'Data Object Configs',
		name: 'node_obj_sys_admin_data_obj_config_list',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_pgm_sys_admin'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_sys_admin_data_obj_config_detail',
		header: 'Data Object Config',
		name: 'node_obj_sys_admin_data_obj_config_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_config_list',
		queryActions: [
			{
				name: 'dataObjConfig',
				queryTypes: ['saveInsert', 'saveUpdate'],
				timings: ['pre']
			}
		]
	})

	// training
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_training_course_list',
		header: 'Courses',
		name: 'node_obj_cm_training_course_list',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_pgm_cm_training_staff_provider'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_training_course_detail',
		header: 'Course',
		name: 'node_obj_cm_training_course_detail',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_course_list'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_training_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_training_cohort_list',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_course_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_training_cohort_detail',
		header: 'Cohort',
		name: 'node_obj_cm_training_cohort_detail',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_cohort_list'
	})

	// student
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_training_student_list',
		header: 'Students',
		name: 'node_obj_cm_training_student_list',
		order: 20,
		owner: 'app_cm_training',
		parentNodeName: 'node_pgm_cm_training_staff_provider'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_training_student_detail',
		header: 'Student',
		name: 'node_obj_cm_training_student_detail',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_student_list'
	})

	// student-service flow
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		name: 'node_obj_cm_training_service_flow_list',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_student_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		name: 'node_obj_cm_training_service_flow_detail',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_service_flow_list'
	})

	// student - cohort
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_training_csf_cohort_list',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		name: 'node_obj_cm_training_csf_cohort_detail',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_csf_cohort_list'
	})
}

async function initFooter() {
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'home',
		creator: 'user_sys',
		header: 'Home',
		name: 'node_obj_sys_footer_home',
		order: 10,
		owner: 'app_sys'
	})
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'page',
		creator: 'user_sys',
		header: 'Contact Us',
		name: 'node_obj_sys_footer_contact_us',
		order: 20,
		owner: 'app_sys',
		page: '/home/cm/contactUs'
	})
	await addNodeFooter({
		codeIcon: 'application',
		codeType: 'object',
		creator: 'user_sys',
		dataObj: 'data_obj_auth_account',
		header: 'My Account',
		name: 'node_obj_sys_footer_auth_account',
		order: 30,
		owner: 'app_sys',
		queryActions: [
			{
				name: 'myAccount',
				queryTypes: ['retrieve', 'saveUpdate'],
				timings: ['pre', 'post']
			}
		]
	})
}

async function initUserResources() {
	await userType([
		['app_cm_training', 'ut_cm_training_staff_admin'],
		['app_cm_training', 'ut_cm_training_staff_provider'],
		['app_cm_training', 'ut_cm_training_student'],
		['app_sys', 'ut_sys_admin']
	])

	await widgets([
		['app_cm', 'widget_cm_user'],
		['app_cm', 'widget_cm_quotes'],
		['app_sys', 'widget_sys_user']
	])

	await userTypeResourcesApps([
		['ut_sys_admin', 'app_cm'],
		['ut_sys_admin', 'app_cm_training'],
		['ut_sys_admin', 'app_db'],
		['ut_sys_admin', 'app_sys']
	])

	await userTypeResourcesPrograms([
		['ut_cm_training_staff_admin', 'node_pgm_cm_training_staff_adm'],
		['ut_cm_training_staff_provider', 'node_pgm_cm_training_staff_provider'],
		['ut_cm_training_student', 'node_pgm_cm_training_student'],
		['ut_sys_admin', 'node_pgm_cm_training_staff_adm'],
		['ut_sys_admin', 'node_pgm_cm_training_staff_provider'],
		['ut_sys_admin', 'node_pgm_cm_training_student'],
		['ut_sys_admin', 'node_pgm_sys_admin']
	])

	await userTypeResourcesWidgets([
		['ut_cm_training_staff_admin', 'widget_sys_user'],
		['ut_cm_training_staff_provider', 'widget_sys_user'],
		['ut_sys_admin', 'widget_sys_user']
	])

	// await userTypeResourcesWidgets([
	// 	['ut_cm_training_staff_admin', 'widget_sys_user'],
	// 	['ut_cm_training_staff_provider', 'widget_sys_user'],
	// 	['ut_cm_training_student', 'widget_cm_user'],
	// 	['ut_cm_training_student', 'widget_cm_quotes']
	// ])

	await userUserType([
		['user_sys', 'ut_cm_training_staff_admin'],
		['user_sys', 'ut_cm_training_staff_provider'],
		['user_sys', 'ut_cm_training_student'],
		['user_sys', 'ut_sys_admin']
	])

	await addRoleOrg([
		['Atlantic Impact', 'cm_training_role_org_agency'],
		['Atlantic Impact - School Site 1', 'cm_training_role_org_venue'],
		['Atlantic Impact - School Site 2', 'cm_training_role_org_venue'],
		['Atlantic Impact - School Site 3', 'cm_training_role_org_venue']
	])
}

async function initUsers() {
	await addUser({
		firstName: 'Anise',
		lastName: 'Hayes',
		owner: 'Atlantic Impact',
		password: 'Atlantic99!',
		userName: '2482317505'
	})
	await addUser({
		firstName: 'Matthew',
		lastName: 'Clayton',
		owner: 'Atlantic Impact',
		password: 'Atlantic99!',
		userName: '3136276210'
	})
	await addUser({
		firstName: 'Phyllip',
		lastName: 'Hall',
		owner: 'Atlantic Impact',
		password: 'JakeDog#1',
		userName: '2487985578'
	})

	await addUserOrg({ orgName: 'Atlantic Impact', userName: 'user_sys' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '2482317505' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '3136276210' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '2487985578' })

	await userUserType([['2482317505', 'ut_cm_training_staff_provider']])
	await userUserType([['3136276210', 'ut_cm_training_staff_provider']])
	await userUserType([['2487985578', 'ut_cm_training_staff_provider']])

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
