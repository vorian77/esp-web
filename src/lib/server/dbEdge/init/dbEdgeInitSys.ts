import { review } from '$server/dbEdge/types.edgeDB.server'
import {
	root,
	apps,
	users,
	codeTypes,
	codes,
	nodeObjPages,
	nodeObjPrograms,
	nodeObjHeaders,
	userType,
	userUserType,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	widgets,
	dataObjActions,
	columns
} from '$server/dbEdge/init/dbEdgeInitUtilities'
import { execute } from '$server/dbEdge/types.edgeDB.server'

const FILE = 'initSys'

export async function initSys() {
	console.log()
	console.log(`${FILE}.1`)
	await reset()
	await review(FILE + '.1', reviewQuery)
	await data()
	await review(FILE + '.2', reviewQuery)
}

const reviewQuery = 'select sys_user::User {**}'

async function reset() {
	const query = `
		delete app_cm_training::Student;
		delete sys_obj::NodeObj;  		
		delete sys_obj::Form;
		delete sys_db::Table;
		delete sys_db::Column;  
		delete sys_obj::DataObjAction;
		delete sys_user::Widget;
  	delete sys_core::Code;
  	delete sys_core::CodeType;
  	delete sys_user::UserType;
		delete sys_core::Obj;
		delete sys_user::User;
    delete sys_core::ObjRoot;
`
	await execute(query)
}

async function data() {
	await root('*ROOTOBJ*')
	await users([['System', 'User', 'user_sys', '!8394812kalsdjfa*!@#$$*&']])
	await apps([['app_sys'], ['app_db']])

	await userType([['app_sys', 'ut_sys_admin']])
	await userUserType([['user_sys', 'ut_sys_admin']])

	await codeTypes([
		['app_db', 'ct_db_col_alignment'],
		['app_db', 'ct_db_col_data_type'],

		['app_sys', 'ct_sys_form_field_access'],
		['app_sys', 'ct_sys_form_field_element'],
		['app_sys', 'ct_sys_form_field_input'],
		['app_sys', 'ct_sys_form_field_list_dir'],
		['app_sys', 'ct_sys_form_field_op'],
		['app_sys', 'ct_sys_form_field_source'],

		['app_sys', 'ct_sys_data_obj_cardinality'],
		['app_sys', 'ct_sys_data_obj_component'],

		['app_sys', 'ct_sys_node_obj_icon'],
		['app_sys', 'ct_sys_node_obj_type']
	])
	await codes([
		// db col - alignment
		['ct_db_col_alignment', 'app_db', 'left'],
		['ct_db_col_alignment', 'app_db', 'center'],
		['ct_db_col_alignment', 'app_db', 'justify'],
		['ct_db_col_alignment', 'app_db', 'right'],

		// db col - data type
		['ct_db_col_data_type', 'app_sys', 'bool'],
		['ct_db_col_data_type', 'app_sys', 'datetime'],
		['ct_db_col_data_type', 'app_sys', 'expr'],
		['ct_db_col_data_type', 'app_sys', 'int16'],
		['ct_db_col_data_type', 'app_sys', 'int64'],
		['ct_db_col_data_type', 'app_sys', 'json'],
		['ct_db_col_data_type', 'app_sys', 'obj'],
		['ct_db_col_data_type', 'app_sys', 'str'],
		['ct_db_col_data_type', 'app_sys', 'uuid'],

		// form field - access
		['ct_sys_form_field_access', 'app_sys', 'optional'],
		['ct_sys_form_field_access', 'app_sys', 'readOnly'],
		['ct_sys_form_field_access', 'app_sys', 'required'],

		// form field - element
		['ct_sys_form_field_element', 'app_sys', 'header'],
		['ct_sys_form_field_element', 'app_sys', 'input'],
		['ct_sys_form_field_element', 'app_sys', 'pictureTake'],
		['ct_sys_form_field_element', 'app_sys', 'select'],
		['ct_sys_form_field_element', 'app_sys', 'textArea'],

		// form field - input
		['ct_sys_form_field_input', 'app_sys', 'checkbox'],
		['ct_sys_form_field_input', 'app_sys', 'date'],
		['ct_sys_form_field_input', 'app_sys', 'email'],
		['ct_sys_form_field_input', 'app_sys', 'number'],
		['ct_sys_form_field_input', 'app_sys', 'password'],
		['ct_sys_form_field_input', 'app_sys', 'radio'],
		['ct_sys_form_field_input', 'app_sys', 'tel'],
		['ct_sys_form_field_input', 'app_sys', 'text'],

		// form field - list direction
		['ct_sys_form_field_list_dir', 'app_sys', 'asc'],
		['ct_sys_form_field_list_dir', 'app_sys', 'desc'],

		// form field - op
		['ct_sys_form_field_op', 'app_sys', 'eq'],

		// form field - source
		['ct_sys_form_field_source', 'app_sys', 'calc'],
		['ct_sys_form_field_source', 'app_sys', 'data'],
		['ct_sys_form_field_source', 'app_sys', 'env'],
		['ct_sys_form_field_source', 'app_sys', 'literal'],
		['ct_sys_form_field_source', 'app_sys', 'traversal'],
		['ct_sys_form_field_source', 'app_sys', 'user'],

		// data obj - cardinality
		['ct_sys_data_obj_cardinality', 'app_sys', 'list'],
		['ct_sys_data_obj_cardinality', 'app_sys', 'detail'],

		// data obj - components
		['ct_sys_data_obj_component', 'app_sys', 'Home'],
		['ct_sys_data_obj_component', 'app_sys', 'FormList'],
		['ct_sys_data_obj_component', 'app_sys', 'FormDetail'],

		// node obj - icons
		['ct_sys_node_obj_icon', 'app_sys', 'application'],
		['ct_sys_node_obj_icon', 'app_sys', 'root'],

		// node obj - types
		['ct_sys_node_obj_type', 'app_sys', 'header'],
		['ct_sys_node_obj_type', 'app_sys', 'object'],
		['ct_sys_node_obj_type', 'app_sys', 'page'],
		['ct_sys_node_obj_type', 'app_sys', 'program']
	])
	await nodeObjHeaders([
		[
			'app_sys',
			'pgm_sys_admin',
			'header',
			'node_sys_utility_header',
			'Utilities',
			40,
			'application',
			'/home/app'
		]
	])
	await nodeObjPages([
		[
			'app_sys',
			'node_sys_utility_header',
			'page',
			'node_sys_utility_quotes',
			'Utility-Quotes',
			10,
			'application',
			'/home/cm/quotes'
		]
	])
	await nodeObjPrograms([
		['app_sys', 'program', 'pgm_sys_admin', 'SysAdmin', 10, 'application', '/home/app']
	])

	await widgets([['app_sys', 'widget_sys_user']])

	await userTypeResourcesApps([
		['ut_sys_admin', 'app_sys'],
		['ut_sys_admin', 'app_db']
	])
	await userTypeResourcesPrograms([
		['ut_sys_admin', 'pgm_sys_admin'],
		['ut_sys_admin', 'pgm_cm_staff'],
		['ut_sys_admin', 'pgm_cm_student_applicant'],
		['ut_sys_admin', 'pgm_cm_student'],

		['ut_sys_admin', 'pgm_training_staff_adm'],
		['ut_sys_admin', 'pgm_training_staff_provider'],
		['ut_sys_admin', 'pgm_training_student']
	])
	await userTypeResourcesWidgets([['ut_sys_admin', 'widget_sys_user']])
	await dataObjActions([
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
		['app_sys', 'id', 'System ID', 'System ID', 'uuid', '', 'left', 0, 0, '', ''],
		['app_sys', 'createdAt', 'Created At', 'Created At', 'datetime', '', 'left', 0, 0, '', ''],
		['app_sys', 'modifiedAt', 'Modified At', 'Modified At', 'datetime', '', 'left', 0, 0, '', ''],
		[
			'app_sys',
			'createdBy',
			'Created By',
			'Created By',
			'obj',
			'(select sys_user::getUser([("user", "userName")]))',
			'left',
			0,
			0,
			'',
			''
		],
		[
			'app_sys',
			'modifiedBy',
			'Modified By',
			'Modified By',
			'obj',
			'(select sys_user::getUser([("user", "userName")]))',
			'left',
			0,
			0,
			'',
			''
		],
		[
			'app_sys',
			'owner',
			'Owner',
			'Owner',
			'obj',
			'(select sys_core::getEnt([("traversal","","name", "str")]))',
			'left',
			0,
			0,
			'',
			''
		]
	])

	// columns - common
	await columns([
		[
			'app_sys',
			'firstName',
			'First Name',
			'First Name',
			'str',
			'',
			'left',
			0,
			0,
			'Enter first name',
			''
		],
		[
			'app_sys',
			'lastName',
			'Last Name',
			'Last Name',
			'str',
			'',
			'left',
			0,
			0,
			'',
			'Enter last name'
		],
		['app_sys', 'fullName', 'Full Name', 'Full Name', 'str', '', 'left', 0, 0, '', ''],
		['app_sys', 'email', 'Email', 'Email', 'str', '', 'left', 0, 0, 'Enter email', '']
	])
}
