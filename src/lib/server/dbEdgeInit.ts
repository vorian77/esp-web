import { createClient } from 'edgedb'
import e from '../dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

let CREATOR = ''

export async function init() {
	console.log()
	console.log('edgeDB init.1')
	await reset()
	await root()
	await users()
	await apps()
	await codeTypes()
	await codes()
	await nodesPrograms()
	await nodesHeaders()
	await nodesPages()
	await nodesForms()
	await homeScreenWidget()
	await homeScreen()
	await userType()
	await userTypeUsers()
	await userTypeResourcesHomeScreen()
	await userTypeResourcesApps()
	await userTypeResourcesPrograms()
	console.log('edgeDB init.review:', review)
}

//const review = await client.query(`select sys_core::ObjRoot {*} `)
// const review = await client.query(`select sys_user::User {*} `)
const review = await client.query(`select sys_core::App {*} `)
// const review = await client.query(`select sys_app::Node {*} `)

async function reset() {
	await client.execute(`
        delete sys_app::HomeScreen;
        delete sys_app::HomeScreenWidget;
        delete sys_app::Node;
        delete sys_app::NodeObj;
        delete sys_form::Form;
				delete sys_form::FormField;
        delete sys_form::FormAction; 
				delete sys_form::FormActionItem;
        delete sys_core::Code;
        delete sys_core::CodeType;
        delete sys_user::UserType;
        delete sys_core::ObjRoot;
        delete sys_core::Obj;
        delete sys_core::Ent;
				delete cm_training::Student;
        delete sys_user::User;
`)
}

async function root() {
	await client.execute(`insert sys_core::ObjRoot { name := 'root', header:= 'Root' };`)
}

async function users() {
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.User, {
				firstName: e.cast(e.str, i[0]),
				lastName: e.cast(e.str, i[1]),
				username: e.cast(e.str, i[2]),
				password: e.cast(e.str, i[3])
			})
		})
	})
	await query.run(client, {
		data: [
			['System', 'User', 'user_sys', '!8394812kalsdjfa*!@#$$*&'],
			['Staff', 'Test-User', 'user_cm_test_staff', '123'],
			['Student-Applicant', 'Test-User', 'user_cm_test_student_applicant', '123'],
			['Student', 'Test-User', 'user_cm_test_student', '123']
		]
	})
}

async function apps() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.App, {
				owner: e.select(e.sys_core.getRoot()),
				name: e.cast(e.str, i),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, {
		data: ['app_sys', 'app_cm', 'app_training']
	})
}

async function codeTypes() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.CodeType, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, {
		data: [
			['app_sys', 'ct_sys_form_action_type'],
			['app_sys', 'ct_sys_form_action_item_data_type'],
			['app_sys', 'ct_sys_form_action_item_op'],
			['app_sys', 'ct_sys_form_action_item_source'],
			['app_sys', 'ct_sys_icon'],

			['app_sys', 'ct_sys_node_component'],
			['app_sys', 'ct_sys_node_type']
		]
	})
}

async function codes() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.Code, {
				codeType: e.select(e.sys_core.getCodeType(e.cast(e.str, i[0]))),
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[1]))),
				name: e.cast(e.str, i[2]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, {
		data: [
			// form - source action
			['ct_sys_form_action_type', 'app_sys', 'delete'],
			['ct_sys_form_action_type', 'app_sys', 'insert'],
			['ct_sys_form_action_type', 'app_sys', 'select'],
			['ct_sys_form_action_type', 'app_sys', 'update'],
			['ct_sys_form_action_type', 'app_sys', 'upsert'],

			// form action item - data type
			['ct_sys_form_action_item_data_type', 'app_sys', 'bool'],
			['ct_sys_form_action_item_data_type', 'app_sys', 'int64'],
			['ct_sys_form_action_item_data_type', 'app_sys', 'json'],
			['ct_sys_form_action_item_data_type', 'app_sys', 'str'],
			['ct_sys_form_action_item_data_type', 'app_sys', 'uuid'],

			// form action item - op
			['ct_sys_form_action_item_op', 'app_sys', '='],

			// form action item - source
			['ct_sys_form_action_item_source', 'app_sys', 'calc'],
			['ct_sys_form_action_item_source', 'app_sys', 'env'],
			['ct_sys_form_action_item_source', 'app_sys', 'data'],
			['ct_sys_form_action_item_source', 'app_sys', 'form'],
			['ct_sys_form_action_item_source', 'app_sys', 'literal'],

			// icons
			['ct_sys_icon', 'app_cm', 'application'],
			['ct_sys_icon', 'app_cm', 'goals'],
			['ct_sys_icon', 'app_cm', 'message'],
			['ct_sys_icon', 'app_cm', 'activities'],
			['ct_sys_icon', 'app_cm', 'quote-enclosed'],

			// node - components
			['ct_sys_node_component', 'app_sys', 'home'],
			['ct_sys_node_component', 'app_sys', 'form-list'],
			['ct_sys_node_component', 'app_sys', 'form-detail'],

			// node types
			['ct_sys_node_type', 'app_sys', 'form'],
			['ct_sys_node_type', 'app_sys', 'header'],
			['ct_sys_node_type', 'app_sys', 'page'],
			['ct_sys_node_type', 'app_sys', 'program']
		]
	})
}

async function nodesPrograms() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', e.cast(e.str, i[1]))),
				name: e.cast(e.str, i[2]),
				header: e.cast(e.str, i[3]),
				order: e.cast(e.int64, i[4]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[5]))),
				page: e.cast(e.str, i[6]),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_node_component', e.cast(e.str, i[7]))),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, {
		data: [
			['app_sys', 'program', 'pgm_sys_admin', 'Administration', 10, 'application', '/apps', 'home'],
			['app_cm', 'program', 'pgm_cm_staff', 'CM-Staff', 20, 'application', '/apps', 'home'],
			[
				'app_cm',
				'program',
				'pgm_cm_student_applicant',
				'CM-Applicant',
				30,
				'application',
				'/apps',
				'home'
			],
			['app_cm', 'program', 'pgm_cm_student', 'CM-Student', 40, 'application', '/apps', 'home'],
			[
				'app_training',
				'program',
				'pgm_training_staff_adm',
				'Staff-Administrator',
				50,
				'application',
				'/apps',
				'home'
			],
			[
				'app_training',
				'program',
				'pgm_training_staff_provider',
				'Staff-Provider',
				60,
				'application',
				'/apps',
				'home'
			],
			[
				'app_training',
				'program',
				'pgm_training_student',
				'Student',
				70,
				'application',
				'/apps',
				'home'
			]
		]
	})
}

async function nodesHeaders() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_app.getNode(e.cast(e.str, i[1][0]), e.cast(e.str, i[1][1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', e.cast(e.str, i[2]))),
				name: e.cast(e.str, i[3]),
				header: e.cast(e.str, i[4]),
				order: e.cast(e.int64, i[5]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[6]))),
				page: e.cast(e.str, i[7]),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_node_component', e.cast(e.str, i[8]))),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})

	return await query.run(client, {
		data: [
			[
				'app_sys',
				['app_sys', 'pgm_sys_admin'],
				'header',
				'node_sys_utility_header',
				'Utilities',
				40,
				'application',
				'/apps',
				'home'
			]
		]
	})
}

async function nodesPages() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_app.getNode(e.cast(e.str, i[1][0]), e.cast(e.str, i[1][1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', e.cast(e.str, i[2]))),
				name: e.cast(e.str, i[3]),
				header: e.cast(e.str, i[4]),
				order: e.cast(e.int64, i[5]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[6]))),
				page: e.cast(e.str, i[7]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})

	return await query.run(client, {
		data: [
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
		]
	})
}

async function nodesForms() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_app.getNode(e.cast(e.str, i[1][0]), e.cast(e.str, i[1][1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', e.cast(e.str, i[2]))),
				name: e.cast(e.str, i[3]),
				header: e.cast(e.str, i[4]),
				order: e.cast(e.int64, i[5]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[6]))),
				page: e.cast(e.str, i[7]),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_node_component', e.cast(e.str, i[8]))),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})

	return await query.run(client, {
		data: [
			[
				'app_sys',
				['app_sys', 'pgm_sys_admin'],
				'form',
				'node_sys_app_list',
				'Applications',
				10,
				'application',
				'/apps',
				'form-list'
			],
			[
				'app_sys',
				['app_sys', 'pgm_sys_admin'],
				'form',
				'node_sys_user_list',
				'Users',
				20,
				'application',
				'/apps',
				'form-list'
			],
			[
				'app_sys',
				['app_sys', 'pgm_sys_admin'],
				'form',
				'node_sys_org_list',
				'Organizations',
				30,
				'application',
				'/apps',
				'form-list'
			],
			[
				'app_training',
				['app_training', 'pgm_training_staff_provider'],
				'form',
				'node_training_provider_student_list',
				'Students',
				10,
				'application',
				'/apps',
				'form-list'
			]
		]
	})
}

async function homeScreenWidget() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.HomeScreenWidget, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, {
		data: [
			['app_sys', 'hsw_sys_user'],
			['app_cm', 'hsw_cm_user'],
			['app_cm', 'hsw_cm_quotes']
		]
	})
}

async function homeScreen() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.HomeScreen, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				widgets: e.assert_distinct(
					e.for(e.json_array_unpack(i[2]), (y) => {
						return e.select(e.sys_app.getHomeScreenWidget(e.cast(e.str, y)))
					})
				),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, {
		data: [
			['app_sys', 'hs_sys_user', ['hsw_sys_user', 'hsw_cm_user', 'hsw_cm_quotes']],
			['app_cm', 'hs_cm_staff', ['hsw_sys_user', 'hsw_cm_quotes']],
			['app_cm', 'hs_cm_student', ['hsw_cm_user', 'hsw_cm_quotes']]
		]
	})
}

async function userType() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.UserType, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, {
		data: [
			['app_sys', 'ut_sys_admin'],
			['app_cm', 'ut_cm_staff'],
			['app_cm', 'ut_cm_student_applicant'],
			['app_cm', 'ut_cm_student']
		]
	})
}

async function userTypeUsers() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					users: { '+=': e.select(e.sys_user.getUser(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, {
		data: [
			['ut_sys_admin', 'user_sys'],
			['ut_cm_staff', 'user_cm_test_staff'],
			['ut_cm_student_applicant', 'user_cm_test_student_applicant'],
			['ut_cm_student', 'user_cm_test_student']
		]
	})
}

async function userTypeResourcesHomeScreen() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: { '+=': e.select(e.sys_app.getHomeScreen(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, {
		data: [
			['ut_sys_admin', 'hs_sys_user'],
			['ut_cm_staff', 'hs_cm_staff'],
			['ut_cm_student_applicant', 'hs_cm_student'],
			['ut_cm_student', 'hs_cm_student']
		]
	})
}

async function userTypeResourcesApps() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: { '+=': e.select(e.sys_core.getEnt(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, {
		data: [
			['ut_sys_admin', 'app_sys'],
			['ut_sys_admin', 'app_cm'],
			['ut_sys_admin', 'app_training']
		]
	})
}

async function userTypeResourcesPrograms() {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: {
						'+=': e.select(e.sys_app.getNode(e.cast(e.str, i[1][0]), e.cast(e.str, i[1][1])))
					}
				}
			}))
		})
	})
	return await query.run(client, {
		data: [
			['ut_sys_admin', ['app_sys', 'pgm_sys_admin']],
			['ut_sys_admin', ['app_cm', 'pgm_cm_staff']],
			['ut_sys_admin', ['app_cm', 'pgm_cm_student_applicant']],
			['ut_sys_admin', ['app_cm', 'pgm_cm_student']],

			['ut_cm_staff', ['app_cm', 'pgm_cm_staff']],
			['ut_cm_student_applicant', ['app_cm', 'pgm_cm_student_applicant']],
			['ut_cm_student', ['app_cm', 'pgm_cm_student']],

			['ut_sys_admin', ['app_training', 'pgm_training_staff_adm']],
			['ut_sys_admin', ['app_training', 'pgm_training_staff_provider']],
			['ut_sys_admin', ['app_training', 'pgm_training_student']]
		]
	})
}
