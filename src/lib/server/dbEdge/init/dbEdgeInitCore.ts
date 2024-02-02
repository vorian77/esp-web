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
	addDataObjAction,
	addDataObjFieldItemsDb,
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
	await initTables()
	await initColumns()
	// await initTableColumns()
	await initSysDataObjActions()
	await initDataObjFieldItemsDb()
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
		['app_cm', 0, 'ct_cm_course_cert'],
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
		['app_sys', 0, 'ct_sys_overlay_node_type'],
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

		// ct_cm_course_cert
		['ct_cm_course_cert', 'app_cm', 'Asbestos Abatement', 0],
		['ct_cm_course_cert', 'app_cm', 'Lead Abatement', 0],
		['ct_cm_course_cert', 'app_cm', 'OSHA 1', 0],
		['ct_cm_course_cert', 'app_cm', 'OSHA 2', 0],

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
		['ct_sys_do_field_element', 'app_sys', 'chips', 0],
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

		// ct_sys_overlay_node_type
		['ct_sys_overlay_node_type', 'app_sys', 'record', 0],
		['ct_sys_overlay_node_type', 'app_sys', 'select', 0],
		['ct_sys_overlay_node_type', 'app_sys', 'selectMulti', 0],

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

async function initTables() {
	await tables([
		['app_sys', 'default', 'SysPerson', false],
		['app_sys', 'sys_core', 'SysCode', true],
		['app_sys', 'sys_core', 'SysCodeType', true],
		['app_sys', 'sys_core', 'SysOrg', true],
		['app_sys', 'sys_user', 'SysStaff', true],
		['app_sys', 'sys_user', 'SysUser', false]
	])
	await tables([
		['app_cm', 'app_cm', 'CmServiceFlow', true],
		['app_cm', 'app_cm', 'CmClient', true],
		['app_cm', 'app_cm', 'CmClientServiceFlow', true],
		['app_cm', 'app_cm', 'CmCourse', true],
		['app_cm', 'app_cm', 'CmCohort', true],
		['app_cm', 'app_cm', 'CmCsfCohort', true],
		['app_cm', 'app_cm', 'CmCsfCohortAttd', true],
		['app_cm', 'app_cm', 'CmCsfCertification', true],
		['app_cm', 'app_cm', 'CmCsfNote', true]
	])
}

async function initColumns() {
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Address 1',
		name: 'addr1'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Address 2',
		name: 'addr2'
	})
	await addColumn({
		codeDataType: 'str',
		header: 'Agency ID',
		name: 'agencyId',
		owner: 'app_cm',
		placeHolder: 'Enter agency ID'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'json',
		exprStorageKey: 'avatar_<int64,calc,random10>',
		header: 'Avatar',
		name: 'avatar'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'int64',
		header: 'Security Code',
		name: 'authSecurityCode',
		pattern: '^\\d{6}$',
		patternMsg: 'Security Code should be exactly 6 digits.'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Birth Date',
		name: 'birthDate'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'City',
		name: 'city'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Client',
		name: 'client',
		owner: 'app_cm'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Service Flow',
		name: 'csf'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Certification',
		name: 'codeCertification',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Ethnicity',
		name: 'codeEthnicity',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Gender',
		name: 'codeGender',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Certifications',
		isMultiSelect: true,
		name: 'codeMultiCerts'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Exams',
		isMultiSelect: true,
		name: 'codeMultiExams'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Items - Included',
		isMultiSelect: true,
		name: 'codeMultiItemsIncluded'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Items - Not Included',
		isMultiSelect: true,
		name: 'codeMultiItemsNotIncluded'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Requirements',
		isMultiSelect: true,
		name: 'codeMultiRqmts'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Race',
		name: 'codeRace',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Sector',
		name: 'codeSector'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'State',
		name: 'codeState',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Status',
		name: 'codeStatus',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Type',
		name: 'codeType',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Payment Type',
		name: 'codeTypePayment',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Cohort',
		name: 'cohort'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'Cost',
		minValue: 0,
		name: 'cost'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Course',
		name: 'course',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'datetime',
		header: 'Created At',
		isExcludeUpdate: true,
		isSetBySys: true,
		name: 'createdAt'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Created By',
		isExcludeUpdate: true,
		name: 'createdBy',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Cohort',
		name: 'csfCohort',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'custom_element',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		name: 'custom_element'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'bool',
		header: 'custom_select_bool',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_bool'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'custom_select_float',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_float'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'int64',
		header: 'custom_select_int',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_int'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'custom_select_str',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select_str'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Date',
		name: 'date'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'End Date',
		name: 'dateEnd'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Estimated End Date',
		name: 'dateEndEst'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Expiration Date',
		name: 'dateExpires'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Issued Date',
		name: 'dateIssued'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Referral Date',
		name: 'dateReferral'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Start Date',
		name: 'dateStart'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Estimated Start Date',
		name: 'dateStartEst'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Description',
		name: 'description'
	})

	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'Duration',
		maxValue: 24,
		minValue: 0,
		name: 'duration',
		spinStep: '0.25'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Email',
		name: 'email'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Favorite Food',
		isMultiSelect: true,
		name: 'favFood'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'First Name',
		name: 'firstName'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Full Name',
		name: 'fullName'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Header',
		name: 'header'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'uuid',
		header: 'System ID',
		isSetBySys: true,
		name: 'id'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'json',
		exprStorageKey: 'image_certification_<int64,calc,random10>',
		header: 'Certification',
		name: 'imageCertification'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Active',
		name: 'isActive'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Last Name',
		name: 'lastName'
	})

	await addColumn({
		owner: 'app_sys',
		codeDataType: 'datetime',
		header: 'Modified At',
		isSetBySys: true,
		name: 'modifiedAt'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Modified By',
		name: 'modifiedBy',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Name',
		name: 'name'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Note',
		name: 'note'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Owner',
		name: 'owner',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Password',
		name: 'password'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Person',
		name: 'person',
		owner: 'app_sys'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Mobile Phone',
		name: 'phoneMobile'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Provider',
		name: 'provider'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Schedule',
		name: 'schedule'
	})
	await addColumn({
		codeDataType: 'link',
		header: 'Service Flow',
		name: 'serviceFlow',
		owner: 'app_cm'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Staff - Administrator',
		name: 'staffAdmin'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Staff - Agency',
		name: 'staffAgency'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'link',
		header: 'Staff - Instructor',
		name: 'staffInstructor'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Mobile Phone Number',
		name: 'userName'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Zip',
		name: 'zip'
	})
}

async function initTableColumns() {
	await tableColumns([
		['SysUser', 'avatar'],
		['SysUser', 'favFood'],
		['SysUser', 'id'],
		['SysUser', 'createdAt'],
		['SysUser', 'createdBy'],
		['SysUser', 'modifiedAt'],
		['SysUser', 'modifiedBy'],
		['SysUser', 'userName']
	])

	await tableColumns([
		['CmClient', 'agencyId'],
		['CmClient', 'createdAt'],
		['CmClient', 'createdBy'],
		['CmClient', 'email'],
		['CmClient', 'firstName'],
		['CmClient', 'fullName'],
		['CmClient', 'id'],
		['CmClient', 'lastName'],
		['CmClient', 'modifiedAt'],
		['CmClient', 'modifiedBy'],
		['CmClient', 'note']
	])
}

async function initSysDataObjActions() {
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_save',
		header: 'Save',
		order: 100
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_new',
		header: 'New',
		order: 110
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_edit',
		header: 'Edit',
		order: 120
	})
	await addDataObjAction({
		color: 'variant-filled-error',
		owner: 'app_sys',
		name: 'noa_list_delete',
		header: 'Delete',
		order: 130
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_columns',
		header: 'Columns',
		order: 140
	})
	await addDataObjAction({
		allTabs: true,
		color: 'none',
		owner: 'app_sys',
		name: 'noa_detail_cancel',
		header: 'Cancel',
		order: 200
	})
	await addDataObjAction({
		allTabs: true,
		owner: 'app_sys',
		name: 'noa_detail_save',
		header: 'Save',
		order: 210
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_save_new',
		header: 'Save/New',
		order: 220
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_save_as',
		header: 'Save As',
		order: 230
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_new',
		header: 'New',
		order: 240
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_delete',
		header: 'Delete',
		order: 250,
		color: 'variant-filled-error'
	})
	await addDataObjAction({
		allTabs: true,
		color: 'variant-ghost-primary',
		owner: 'app_sys',
		name: 'noa_back',
		header: '< Back',
		order: 5
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_common_refresh',
		header: 'Refresh',
		order: 300
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_common_print',
		header: 'Print',
		order: 400
	})
}

async function initDataObjFieldItemsDb() {
	await addDataObjFieldItemsDb({
		exprSelect: 'SELECT app_cm::CmServiceFlow {data := .id, display := .header} ORDER BY .header',
		name: 'il_cm_service_flow',
		owner: 'app_cm'
	})
	await addDataObjFieldItemsDb({
		exprSelect: `SELECT app_cm::CmCohort {data := .id, display := .course.name ++ ' (' ++ .name ++ ')'} FILTER .owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs ORDER BY .course.name`,
		name: 'il_cm_cohort_by_userName',
		owner: 'app_sys'
	})
	await addDataObjFieldItemsDb({
		exprSelect: `SELECT (
      SELECT app_cm::CmCsfCohort 
      FILTER 
        .csf.id = <uuid,tree,CmClientServiceFlow.id> AND 
        .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', <str,parms,status>))
      ).cohort.course {data := .id, display := .name} ORDER BY .name`,
		name: 'il_cm_course_by_csfId_status',
		owner: 'app_cm'
	})
	await addDataObjFieldItemsDb({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .order',
		name: 'il_sys_code_order_index_by_codeTypeName',
		owner: 'app_sys'
	})
	await addDataObjFieldItemsDb({
		exprSelect:
			'SELECT sys_core::SysCode {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .name',
		name: 'il_sys_code_order_name_by_codeTypeName',
		owner: 'app_sys'
	})
	await addDataObjFieldItemsDb({
		exprSelect:
			'SELECT sys_core::SysCodeType {data := .id, display := .header} FILTER .parent.name = <str,parms,codeTypeParentName> ORDER BY .name',
		name: 'il_sys_codeType_order_name_by_codeTypeParentName',
		owner: 'app_sys'
	})
	await addDataObjFieldItemsDb({
		exprSelect:
			'SELECT sys_core::SysOrg { data := .id, display := .name } FILTER .roles.name = <str,parms,codeName> ORDER BY .name',
		name: 'il_sys_role_org_by_codeName',
		owner: 'app_sys'
	})
	await addDataObjFieldItemsDb({
		exprSelect:
			'SELECT sys_user::SysStaff { data := .id, display := .person.fullName } FILTER .roles.name = <str,parms,codeName> ORDER BY str_lower(.person.lastName) then str_lower(.person.firstName)',
		name: 'il_sys_role_staff_by_codeName',
		owner: 'app_sys'
	})
}
