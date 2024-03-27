import {
	addOrgs,
	apps,
	codeTypes,
	codes,
	rootObj,
	rootUser,
	sysUser,
	tableColumns,
	tables
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addCode,
	addCodeType,
	addColumn,
	addDataObjFieldItems,
	addNodeFooter,
	addUserOrg
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initCore'

export default async function initSys() {
	console.log()
	console.log(`${FILE}.start...`)
	await initSysCore()
	await initSysCodeTypess()
	await initSysCodes()

	console.log(`${FILE}.end`)
}

async function initSysCore() {
	await rootObj()
	await rootUser()

	await apps([['app_cm'], ['app_db'], ['app_sys']])
	await addOrgs([
		['Atlantic Impact', 'Atlantic Impact Mobile'],
		['Atlantic Impact - School Site 1', ''],
		['Atlantic Impact - School Site 2', ''],
		['Atlantic Impact - School Site 3', ''],
		['System', 'System Application']
	])

	await sysUser('System', 'user_sys')
	await addUserOrg({ orgName: 'System', userName: 'user_sys' })
}
async function initSysCodeTypess() {
	await codeTypes([
		['app_cm', 0, 'ct_cm_case_note_type'],
		['app_cm', 0, 'ct_cm_service_flow_status'],
		['app_cm', 0, 'ct_cm_course_exam'],
		['app_cm', 0, 'ct_cm_course_items_included'],
		['app_cm', 0, 'ct_cm_course_items_not_included'],
		['app_cm', 0, 'ct_cm_course_rqmt'],
		['app_cm', 0, 'ct_cm_course_sector'],
		['app_cm', 0, 'ct_cm_payment_type'],
		['app_db', 0, 'ct_db_col_alignment'],
		['app_db', 0, 'ct_db_col_data_type'],
		['app_db', 0, 'ct_db_col_mask'],
		['app_sys', 0, 'ct_sys_do_cardinality'],
		['app_sys', 0, 'ct_sys_do_component'],
		['app_sys', 0, 'ct_sys_do_field_access'],
		['app_sys', 0, 'ct_sys_do_field_element'],
		['app_sys', 0, 'ct_sys_do_field_element_custom_type'],
		['app_sys', 0, 'ct_sys_do_field_list_dir'],
		['app_sys', 0, 'ct_sys_do_field_op'],
		['app_sys', 0, 'ct_sys_do_field_source'],
		['app_sys', 0, 'ct_sys_do_render_type'],
		['app_sys', 0, 'ct_sys_node_obj_icon'],
		['app_sys', 0, 'ct_sys_node_obj_type'],
		['app_sys', 0, 'ct_sys_person_ethnicity'],
		['app_sys', 0, 'ct_sys_person_gender'],
		['app_sys', 0, 'ct_sys_person_race'],
		['app_sys', 0, 'ct_sys_role_org'],
		['app_sys', 0, 'ct_sys_role_staff'],
		['app_sys', 0, 'ct_sys_state'],
		['app_sys', 0, 'ct_sys_status']
	])
	await addCodeType({
		owner: 'app_cm',
		parent: 'ct_cm_payment_type',
		header: 'Milestone 1 (Single Payment)',
		name: 'ct_cm_payment_type_milestone1',
		order: 0
	})
	await addCodeType({
		owner: 'app_cm',
		parent: 'ct_cm_payment_type',
		header: 'Milestone 2 (Dual Payments)',
		name: 'ct_cm_payment_type_milestone2',
		order: 1
	})
}

async function initSysCodes() {
	await codes([
		// ct_cm_case_note_type
		['ct_cm_case_note_type', 'app_cm', 'Assessment', 0],
		['ct_cm_case_note_type', 'app_cm', 'Case Assignment', 0],
		['ct_cm_case_note_type', 'app_cm', 'Case Closure', 0],
		['ct_cm_case_note_type', 'app_cm', 'Case Status', 0],
		['ct_cm_case_note_type', 'app_cm', 'Contact (face-to-face)', 0],
		['ct_cm_case_note_type', 'app_cm', 'Contact (non face-to-face)', 0],
		['ct_cm_case_note_type', 'app_cm', 'Crisis Situation', 0],
		['ct_cm_case_note_type', 'app_cm', 'Disruptive Behavior', 0],
		['ct_cm_case_note_type', 'app_cm', 'Eligibility Determination', 0],
		['ct_cm_case_note_type', 'app_cm', 'File Documentation', 0],
		['ct_cm_case_note_type', 'app_cm', 'Follow-Up', 0],
		['ct_cm_case_note_type', 'app_cm', 'Medical', 0],
		['ct_cm_case_note_type', 'app_cm', 'No Call/No Show', 0],
		['ct_cm_case_note_type', 'app_cm', 'Other', 0],
		['ct_cm_case_note_type', 'app_cm', 'Program Exit', 0],
		['ct_cm_case_note_type', 'app_cm', 'Punctuality', 0],
		['ct_cm_case_note_type', 'app_cm', 'Substance Abuse', 0],
		['ct_cm_case_note_type', 'app_cm', 'Supportive service', 0],
		['ct_cm_case_note_type', 'app_cm', 'Telephone Follow-Up', 0],
		['ct_cm_case_note_type', 'app_cm', 'Transportation Allowance', 0],

		// ct_cm_service_flow_status
		['ct_cm_service_flow_status', 'app_cm', 'Pending', 0],
		['ct_cm_service_flow_status', 'app_cm', 'Enrolled', 1],
		['ct_cm_service_flow_status', 'app_cm', 'Suspended', 3],
		['ct_cm_service_flow_status', 'app_cm', 'Completed', 4],
		['ct_cm_service_flow_status', 'app_cm', 'Dropped Out', 5],

		// ct_cm_course_exam
		['ct_cm_course_exam', 'app_cm', 'Exam 1', 0],
		['ct_cm_course_exam', 'app_cm', 'Exam 2', 0],

		// ct_cm_course_items_included
		['ct_cm_course_items_included', 'app_cm', 'Fee: ACT Practice Exam', 0],
		['ct_cm_course_items_included', 'app_cm', 'Book: Painting-Commercial & Residential Level 1', 0],

		// ct_cm_course_items_not_included
		['ct_cm_course_items_not_included', 'app_cm', 'Item 1', 0],
		['ct_cm_course_items_not_included', 'app_cm', 'Item 2', 0],

		// ct_cm_course_rqmt
		['ct_cm_course_rqmt', 'app_cm', 'Min math score - 8th grade math', 0],
		['ct_cm_course_rqmt', 'app_cm', 'Min reading score - 8th grade reading', 0],

		// ct_cm_course_sector
		['ct_cm_course_sector', 'app_cm', 'Business and Finance', 0],
		['ct_cm_course_sector', 'app_cm', 'Construction', 0],
		['ct_cm_course_sector', 'app_cm', 'Food Preparation', 0],
		['ct_cm_course_sector', 'app_cm', 'Hospitality', 0],
		['ct_cm_course_sector', 'app_cm', 'Legal', 0],
		['ct_cm_course_sector', 'app_cm', 'Personal Care and Services', 0],
		['ct_cm_course_sector', 'app_cm', 'Transportation', 0],

		// db col - alignment
		['ct_db_col_alignment', 'app_db', 'center', 0],
		['ct_db_col_alignment', 'app_db', 'left', 1],
		['ct_db_col_alignment', 'app_db', 'justify', 2],
		['ct_db_col_alignment', 'app_db', 'right', 3],

		// db col - data type
		['ct_db_col_data_type', 'app_sys', 'bool', 0],
		['ct_db_col_data_type', 'app_sys', 'date', 0],
		['ct_db_col_data_type', 'app_sys', 'datetime', 0],
		['ct_db_col_data_type', 'app_sys', 'file', 0],
		['ct_db_col_data_type', 'app_sys', 'float64', 0],
		['ct_db_col_data_type', 'app_sys', 'int16', 0],
		['ct_db_col_data_type', 'app_sys', 'int32', 0],
		['ct_db_col_data_type', 'app_sys', 'int64', 0],
		['ct_db_col_data_type', 'app_sys', 'json', 0],
		['ct_db_col_data_type', 'app_sys', 'link', 0],
		['ct_db_col_data_type', 'app_sys', 'literal', 0],
		['ct_db_col_data_type', 'app_sys', 'str', 0],
		['ct_db_col_data_type', 'app_sys', 'uuid', 0],
		['ct_db_col_data_type', 'app_sys', 'uuidlist', 0],

		// db col - mask
		['ct_db_col_mask', 'app_sys', 'currencyUs', 0],
		['ct_db_col_mask', 'app_sys', 'ssn', 0],
		['ct_db_col_mask', 'app_sys', 'telephone', 0],

		// data obj - cardinality
		['ct_sys_do_cardinality', 'app_sys', 'detail', 0],
		['ct_sys_do_cardinality', 'app_sys', 'list', 0],

		// data obj - components
		['ct_sys_do_component', 'app_sys', 'Home', 0],
		['ct_sys_do_component', 'app_sys', 'FormDetail', 0],
		['ct_sys_do_component', 'app_sys', 'FormList', 0],

		// data obj field - access
		['ct_sys_do_field_access', 'app_sys', 'optional', 0],
		['ct_sys_do_field_access', 'app_sys', 'readOnly', 0],
		['ct_sys_do_field_access', 'app_sys', 'required', 0],

		// data obj field - element
		['ct_sys_do_field_element', 'app_sys', 'checkbox', 0],
		['ct_sys_do_field_element', 'app_sys', 'listConfig', 0],
		['ct_sys_do_field_element', 'app_sys', 'listSelect', 0],
		['ct_sys_do_field_element', 'app_sys', 'custom', 0],
		['ct_sys_do_field_element', 'app_sys', 'date', 0],
		['ct_sys_do_field_element', 'app_sys', 'email', 0],
		['ct_sys_do_field_element', 'app_sys', 'file', 0],
		['ct_sys_do_field_element', 'app_sys', 'input', 0],
		['ct_sys_do_field_element', 'app_sys', 'number', 0],
		['ct_sys_do_field_element', 'app_sys', 'password', 0],
		['ct_sys_do_field_element', 'app_sys', 'radio', 0],
		['ct_sys_do_field_element', 'app_sys', 'select', 0],
		['ct_sys_do_field_element', 'app_sys', 'tel', 0],
		['ct_sys_do_field_element', 'app_sys', 'text', 0],
		['ct_sys_do_field_element', 'app_sys', 'textArea', 0],
		['ct_sys_do_field_element', 'app_sys', 'toggle', 0],

		// data obj field - custom element type
		['ct_sys_do_field_element_custom_type', 'app_sys', 'button', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'header', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'link', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'text', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'textDynamic', 0],

		// data obj field - list direction
		['ct_sys_do_field_list_dir', 'app_sys', 'asc', 0],
		['ct_sys_do_field_list_dir', 'app_sys', 'desc', 0],

		// data obj field - op
		['ct_sys_do_field_op', 'app_sys', 'eq', 0],

		// data obj field - source
		['ct_sys_do_field_source', 'app_sys', 'calc', 0],
		['ct_sys_do_field_source', 'app_sys', 'env', 0],
		['ct_sys_do_field_source', 'app_sys', 'literal', 0],
		['ct_sys_do_field_source', 'app_sys', 'parms', 0],
		['ct_sys_do_field_source', 'app_sys', 'preset', 0],
		['ct_sys_do_field_source', 'app_sys', 'retrieve', 0],
		['ct_sys_do_field_source', 'app_sys', 'user', 0],

		// data obj - render type
		['ct_sys_do_render_type', 'app_sys', 'form', 0],

		// node obj - icons
		['ct_sys_node_obj_icon', 'app_cm', 'activities', 0],
		['ct_sys_node_obj_icon', 'app_cm', 'goals', 0],
		['ct_sys_node_obj_icon', 'app_cm', 'message', 0],
		['ct_sys_node_obj_icon', 'app_cm', 'quote-enclosed', 0],

		['ct_sys_node_obj_icon', 'app_sys', 'application', 0],
		['ct_sys_node_obj_icon', 'app_sys', 'root', 0],

		// node obj - types
		['ct_sys_node_obj_type', 'app_sys', 'header', 0],
		['ct_sys_node_obj_type', 'app_sys', 'home', 0],
		['ct_sys_node_obj_type', 'app_sys', 'object', 0],
		['ct_sys_node_obj_type', 'app_sys', 'page', 0],
		['ct_sys_node_obj_type', 'app_sys', 'program', 0],
		['ct_sys_node_obj_type', 'app_sys', 'programObject', 0],
		['ct_sys_node_obj_type', 'app_sys', 'treeRoot', 0],

		// sys - person - ethnicity
		['ct_sys_person_ethnicity', 'app_sys', 'Hispanic-Latino', 0],
		['ct_sys_person_ethnicity', 'app_sys', 'Not Hispanic-Latino', 1],
		['ct_sys_person_ethnicity', 'app_sys', 'Prefer Not To Say', 2],

		// sys - person - gender
		['ct_sys_person_gender', 'app_sys', 'Female', 0],
		['ct_sys_person_gender', 'app_sys', 'Male', 1],
		['ct_sys_person_gender', 'app_sys', 'Non-Binary/Third Gender', 2],
		['ct_sys_person_gender', 'app_sys', 'Prefer Not To Say', 3],

		// sys - person - race
		['ct_sys_person_race', 'app_sys', 'American Indian and Alaskan Native', 0],
		['ct_sys_person_race', 'app_sys', 'Asian', 1],
		['ct_sys_person_race', 'app_sys', 'Black or African American', 2],
		['ct_sys_person_race', 'app_sys', 'Native Hawaiian and Other Pacific Islander', 3],
		['ct_sys_person_race', 'app_sys', 'Two or more races', 4],
		['ct_sys_person_race', 'app_sys', 'White', 5],
		['ct_sys_person_race', 'app_sys', 'Other', 6],
		['ct_sys_person_race', 'app_sys', 'Prefer Not To Say', 7],

		// sys - role - organization
		['ct_sys_role_org', 'app_sys', 'cm_training_role_org_agency', 0],
		['ct_sys_role_org', 'app_sys', 'cm_training_role_org_venue', 0],

		// sys - role - staff
		['ct_sys_role_staff', 'app_sys', 'cm_training_role_staff_admin', 0],
		['ct_sys_role_staff', 'app_sys', 'cm_training_role_staff_agency', 0],
		['ct_sys_role_staff', 'app_sys', 'cm_training_role_staff_instructor', 0],

		// sys - state
		['ct_sys_state', 'app_sys', 'Illinois', 0],
		['ct_sys_state', 'app_sys', 'Maryland', 0],
		['ct_sys_state', 'app_sys', 'Michigan', 0],
		['ct_sys_state', 'app_sys', 'Ohio', 0],
		['ct_sys_state', 'app_sys', 'Pennsylvania', 0],

		// sys - status
		['ct_sys_status', 'app_sys', 'Under development', 0],
		['ct_sys_status', 'app_sys', 'Submitted', 1],
		['ct_sys_status', 'app_sys', 'Under review', 2],
		['ct_sys_status', 'app_sys', 'Approved', 3],
		['ct_sys_status', 'app_sys', 'Rejected', 4]
	])

	await addCode({
		owner: 'app_cm',
		codeType: 'ct_cm_payment_type_milestone1',
		header: 'Payment 1 - 100%',
		name: 'milestone1_payment1',
		order: 0
	})
	await addCode({
		owner: 'app_cm',
		codeType: 'ct_cm_payment_type_milestone2',
		header: 'Payment 1 - 50%',
		name: 'milestone2_payment1',
		order: 0
	})
	await addCode({
		owner: 'app_cm',
		codeType: 'ct_cm_payment_type_milestone2',
		header: 'Payment 2 - 50%',
		name: 'milestone2_payment2',
		order: 0
	})
}
