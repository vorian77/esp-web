import {
	root,
	apps,
	users,
	codeTypes,
	codes,
	nodesPrograms,
	nodesHeaders,
	homeScreen,
	homeScreenWidget,
	homeScreenAddWidgets,
	userType,
	userTypeUsers,
	userTypeResourcesHomeScreen,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	objActions,
	columns,
	tables,
	tableColumns
} from '$server/dbEdge/init/dbEdgeInitUtilities'
import { execute } from '$server/dbEdge/types.edgeDB.server'

const FILE = 'initSys'

export async function initSys() {
	console.log()
	console.log(`${FILE}.1`)
	await reset()
	await root()
	await users([['System', 'User', 'user_sys', '!8394812kalsdjfa*!@#$$*&']])
	await apps([['app_sys'], ['app_db']])
	await codeTypes([
		['app_db', 'ct_db_col_alignment'],

		['app_sys', 'ct_sys_data_action_type'],
		['app_sys', 'ct_sys_edgedb_data_type'],
		['app_sys', 'ct_sys_data_action_item_op'],
		['app_sys', 'ct_sys_data_action_item_source'],

		['app_sys', 'ct_sys_form_field_access'],
		['app_sys', 'ct_sys_form_field_element'],
		['app_sys', 'ct_sys_form_field_input'],

		['app_sys', 'ct_sys_icon'],

		['app_sys', 'ct_sys_node_type'],

		['app_sys', 'ct_sys_node_obj_cardinality'],
		['app_sys', 'ct_sys_node_obj_component']
	])
	await codes([
		// db col - alignment
		['ct_db_col_alignment', 'app_db', 'left'],
		['ct_db_col_alignment', 'app_db', 'center'],
		['ct_db_col_alignment', 'app_db', 'justify'],
		['ct_db_col_alignment', 'app_db', 'right'],

		// edgedb - data type
		['ct_sys_edgedb_data_type', 'app_sys', 'bool'],
		['ct_sys_edgedb_data_type', 'app_sys', 'datetime'],
		['ct_sys_edgedb_data_type', 'app_sys', 'expr'],
		['ct_sys_edgedb_data_type', 'app_sys', 'int64'],
		['ct_sys_edgedb_data_type', 'app_sys', 'json'],
		['ct_sys_edgedb_data_type', 'app_sys', 'str'],
		['ct_sys_edgedb_data_type', 'app_sys', 'uuid'],

		// data action - type
		['ct_sys_data_action_type', 'app_sys', 'select-filter'],
		['ct_sys_data_action_type', 'app_sys', 'select-fields'],
		['ct_sys_data_action_type', 'app_sys', 'select-order'],
		['ct_sys_data_action_type', 'app_sys', 'insert-fields'],
		['ct_sys_data_action_type', 'app_sys', 'update-filter'],
		['ct_sys_data_action_type', 'app_sys', 'update-fields'],
		['ct_sys_data_action_type', 'app_sys', 'delete-filter'],

		// data action item - op
		['ct_sys_data_action_item_op', 'app_sys', '='],

		// data action item - source
		['ct_sys_data_action_item_source', 'app_sys', 'calc'],
		['ct_sys_data_action_item_source', 'app_sys', 'data'],
		['ct_sys_data_action_item_source', 'app_sys', 'env'],
		['ct_sys_data_action_item_source', 'app_sys', 'literal'],
		['ct_sys_data_action_item_source', 'app_sys', 'traversal'],
		['ct_sys_data_action_item_source', 'app_sys', 'user'],

		// form field - access
		['ct_sys_form_field_access', 'app_sys', 'hidden'],
		['ct_sys_form_field_access', 'app_sys', 'optional'],
		['ct_sys_form_field_access', 'app_sys', 'readOnly'],
		['ct_sys_form_field_access', 'app_sys', 'required'],

		// form field - element
		['ct_sys_form_field_element', 'app_sys', 'header'],
		['ct_sys_form_field_element', 'app_sys', 'input'],
		['ct_sys_form_field_element', 'app_sys', 'listField'],
		['ct_sys_form_field_element', 'app_sys', 'pictureTake'],
		['ct_sys_form_field_element', 'app_sys', 'select'],
		['ct_sys_form_field_element', 'app_sys', 'textArea'],

		// form field - input
		['ct_sys_form_field_input', 'app_sys', 'checkbox'],
		['ct_sys_form_field_input', 'app_sys', 'date'],
		['ct_sys_form_field_input', 'app_sys', 'email'],
		['ct_sys_form_field_input', 'app_sys', 'listField'],
		['ct_sys_form_field_input', 'app_sys', 'number'],
		['ct_sys_form_field_input', 'app_sys', 'password'],
		['ct_sys_form_field_input', 'app_sys', 'radio'],
		['ct_sys_form_field_input', 'app_sys', 'tel'],
		['ct_sys_form_field_input', 'app_sys', 'text'],

		// icons
		['ct_sys_icon', 'app_sys', 'application'],

		// node types
		['ct_sys_node_type', 'app_sys', 'header'],
		['ct_sys_node_type', 'app_sys', 'object'],
		['ct_sys_node_type', 'app_sys', 'page'],
		['ct_sys_node_type', 'app_sys', 'program'],

		// node obj - cardinality
		['ct_sys_node_obj_cardinality', 'app_sys', 'list'],
		['ct_sys_node_obj_cardinality', 'app_sys', 'detail'],

		// node_obj - components
		['ct_sys_node_obj_component', 'app_sys', 'Home'],
		['ct_sys_node_obj_component', 'app_sys', 'FormList'],
		['ct_sys_node_obj_component', 'app_sys', 'FormDetail']
	])
	await nodesPrograms([
		['app_sys', 'program', 'pgm_sys_admin', 'Administration', 10, 'application', '/apps', 'Home']
	])
	await nodesHeaders([
		[
			'app_sys',
			['app_sys', 'pgm_sys_admin'],
			'header',
			'node_sys_utility_header',
			'Utilities',
			40,
			'application',
			'/apps',
			'Home'
		]
	])
	await homeScreen([['app_sys', 'hs_sys_user']])
	await homeScreenWidget([['app_sys', 'hsw_sys_user']])
	await homeScreenAddWidgets([['hs_sys_user', ['hsw_sys_user']]])

	await userType([['app_sys', 'ut_sys_admin']])
	await userTypeUsers([['ut_sys_admin', 'user_sys']])
	await userTypeResourcesHomeScreen([['ut_sys_admin', 'hs_sys_user']])
	await userTypeResourcesApps([
		['ut_sys_admin', 'app_sys'],
		['ut_sys_admin', 'app_cm'],
		['ut_sys_admin', 'app_cm_training']
	])
	await userTypeResourcesPrograms([
		['ut_sys_admin', ['app_sys', 'pgm_sys_admin']],
		['ut_sys_admin', ['app_cm', 'pgm_cm_staff']],
		['ut_sys_admin', ['app_cm', 'pgm_cm_student_applicant']],
		['ut_sys_admin', ['app_cm', 'pgm_cm_student']],

		['ut_sys_admin', ['app_cm_training', 'pgm_training_staff_adm']],
		['ut_sys_admin', ['app_cm_training', 'pgm_training_staff_provider']],
		['ut_sys_admin', ['app_cm_training', 'pgm_training_student']]
	])
	await objActions([
		['app_sys', 'noa_list_save', 'Save', 100],
		['app_sys', 'noa_list_new', 'New', 110],
		['app_sys', 'noa_list_edit', 'Edit', 120],
		['app_sys', 'noa_list_delete', 'Delete', 130],
		['app_sys', 'noa_list_columns', 'Columns', 140],

		['app_sys', 'noa_detail_save', 'Save', 200],
		['app_sys', 'noa_detail_save_new', 'Save/New', 210],
		['app_sys', 'noa_detail_save_as', 'Save As', 220],
		['app_sys', 'noa_detail_new', 'New', 230],
		['app_sys', 'noa_detail_delete', 'Delete', 240],

		['app_sys', 'noa_print', 'Print', 300]
	])

	// columns - sys
	await columns([
		['app_sys', 'id', 'System ID', 'System ID', 'uuid', '', 'left', 0, 0],
		['app_sys', 'createdAt', 'Created At', 'Created At', 'datetime', '', 'left', 0, 0],
		['app_sys', 'modifiedAt', 'Modified At', 'Modified At', 'datetime', '', 'left', 0, 0],
		[
			'app_sys',
			'createdBy',
			'Created By',
			'Created By',
			'expr',
			'(select sys_user::getUser([("user", "userName")]))',
			'left',
			0,
			0
		],
		[
			'app_sys',
			'modifiedBy',
			'Modified By',
			'Modified By',
			'expr',
			'(select sys_user::getUser([("user", "userName")]))',
			'left',
			0,
			0
		],
		[
			'app_sys',
			'owner',
			'Owner',
			'Owner',
			'expr',
			'(select sys_core::getEnt([("traversal","","name", "str")]))',
			'left',
			0,
			0
		]
	])

	// columns - common
	await columns([
		['app_sys', 'firstName', 'First Name', 'First Name', 'str', '', 'left', 0, 0],
		['app_sys', 'lastName', 'Last Name', 'Last Name', 'str', '', 'left', 0, 0],
		['app_sys', 'fullName', 'Full Name', 'Full Name', 'str', '', 'left', 0, 0],
		['app_sys', 'email', 'Email', 'Email', 'str', '', 'left', 0, 0]
	])

	// await review(FILE, reviewQuery)
}

async function reset() {
	const query = `
  	delete sys_app::HomeScreen;
    delete sys_app::HomeScreenWidget;
    delete sys_app::Node;
		delete sys_app::Node filter exists .obj;
		delete sys_obj::NodeObj;  
		delete sys_obj::FormField;
		delete sys_obj::DataAction; 
		delete sys_obj::DataActionItem;
		delete sys_obj::ObjAction;
		delete sys_obj::Form;
		delete sys_db::Table;
		delete sys_db::Column;  
    delete sys_core::Code;
    delete sys_core::CodeType;
    delete sys_user::UserType;
    delete sys_core::ObjRoot;
    delete sys_core::Obj;
    delete sys_core::Ent;
		delete cm_training::Student;
    delete sys_user::User;
		delete sys_core::App;
`
	await execute(query)
}
