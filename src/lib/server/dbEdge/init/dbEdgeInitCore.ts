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
	addCodeType,
	addColumn,
	addDataObjAction,
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
	await initTables()
	await initColumns()
	await initTableColumns()
	await initSysDataObjActions()
	await initDataObjFieldItemsLists()
	console.log(`${FILE}.end`)
}

async function initSysCore() {
	await rootObj()
	await rootUser()

	await apps([['app_cm'], ['app_cm_training'], ['app_db'], ['app_sys'], ['app_sys_admin']])

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
		['app_cm', 0, 'ct_cm_service_flow_status'],

		['app_cm_training', 0, 'ct_cm_training_course_cert'],
		['app_cm_training', 0, 'ct_cm_training_course_exam'],
		['app_cm_training', 0, 'ct_cm_training_course_items_included'],
		['app_cm_training', 0, 'ct_cm_training_course_items_not_included'],
		['app_cm_training', 0, 'ct_cm_training_course_rqmt'],
		['app_cm_training', 0, 'ct_cm_training_course_sector'],

		['app_cm_training', 0, 'ct_cm_training_payment_type'],

		['app_db', 0, 'ct_db_col_alignment'],
		['app_db', 0, 'ct_db_col_data_type'],

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
		owner: 'app_cm_training',
		parent: 'ct_cm_training_payment_type',
		header: 'Milestone 1 (Single Payment)',
		name: 'ct_cm_training_payment_type_milestone1',
		order: 0,
		creator: 'user_sys'
	})
	await addCodeType({
		owner: 'app_cm_training',
		parent: 'ct_cm_training_payment_type',
		header: 'Milestone 2 (Dual Payments)',
		name: 'ct_cm_training_payment_type_milestone2',
		order: 1,
		creator: 'user_sys'
	})
}

async function initSysCodes() {
	await codes([
		// ct_cm_service_flow_status
		['ct_cm_service_flow_status', 'app_cm', 'Pending', 0],
		['ct_cm_service_flow_status', 'app_cm', 'Proceeding', 1],
		['ct_cm_service_flow_status', 'app_cm', 'Suspended', 3],
		['ct_cm_service_flow_status', 'app_cm', 'Completed', 4],
		['ct_cm_service_flow_status', 'app_cm', 'Dropped Out', 5],

		// ct_cm_training_course_cert
		['ct_cm_training_course_cert', 'app_cm_training', 'Asbestos Abatement', 0],
		['ct_cm_training_course_cert', 'app_cm_training', 'Lead Abatement', 0],
		['ct_cm_training_course_cert', 'app_cm_training', 'OSHA 1', 1],
		['ct_cm_training_course_cert', 'app_cm_training', 'OSHA 2', 2],

		// ct_cm_training_course_exam
		['ct_cm_training_course_exam', 'app_cm_training', 'Exam 1', 0],
		['ct_cm_training_course_exam', 'app_cm_training', 'Exam 2', 1],

		// ct_cm_training_course_items_included
		['ct_cm_training_course_items_included', 'app_cm_training', 'Fee: ACT Practice Exam', 0],
		[
			'ct_cm_training_course_items_included',
			'app_cm_training',
			'Book: Painting-Commercial & Residential Level 1',
			0
		],

		// ct_cm_training_course_items_not_included
		['ct_cm_training_course_items_not_included', 'app_cm_training', 'Item 1', 0],
		['ct_cm_training_course_items_not_included', 'app_cm_training', 'Item 2', 0],

		// ct_cm_training_course_rqmt
		['ct_cm_training_course_rqmt', 'app_cm_training', 'Min math score - 8th grade math', 0],
		['ct_cm_training_course_rqmt', 'app_cm_training', 'Min reading score - 8th grade reading', 1],

		// ct_cm_training_course_sector
		['ct_cm_training_course_sector', 'app_cm_training', 'Business and Finance', 0],
		['ct_cm_training_course_sector', 'app_cm_training', 'Construction', 1],
		['ct_cm_training_course_sector', 'app_cm_training', 'Food Preparation', 2],
		['ct_cm_training_course_sector', 'app_cm_training', 'Hospitality', 3],
		['ct_cm_training_course_sector', 'app_cm_training', 'Legal', 4],
		['ct_cm_training_course_sector', 'app_cm_training', 'Personal Care and Services', 5],
		['ct_cm_training_course_sector', 'app_cm_training', 'Transportation', 6],

		// db col - alignment
		['ct_db_col_alignment', 'app_db', 'center', 0],
		['ct_db_col_alignment', 'app_db', 'left', 1],
		['ct_db_col_alignment', 'app_db', 'justify', 2],
		['ct_db_col_alignment', 'app_db', 'right', 3],

		// db col - data type
		['ct_db_col_data_type', 'app_sys', 'bool', 0],
		['ct_db_col_data_type', 'app_sys', 'computed', 1],
		['ct_db_col_data_type', 'app_sys', 'date', 2],
		['ct_db_col_data_type', 'app_sys', 'datetime', 3],
		['ct_db_col_data_type', 'app_sys', 'decimal', 4],
		['ct_db_col_data_type', 'app_sys', 'edgeType', 5],
		['ct_db_col_data_type', 'app_sys', 'int16', 6],
		['ct_db_col_data_type', 'app_sys', 'int32', 7],
		['ct_db_col_data_type', 'app_sys', 'int64', 8],
		['ct_db_col_data_type', 'app_sys', 'json', 9],
		['ct_db_col_data_type', 'app_sys', 'str', 10],
		['ct_db_col_data_type', 'app_sys', 'uuid', 11],

		// data obj - cardinality
		['ct_sys_do_cardinality', 'app_sys', 'detail', 0],
		['ct_sys_do_cardinality', 'app_sys', 'list', 1],

		// data obj - components
		['ct_sys_do_component', 'app_sys', 'Home', 0],
		['ct_sys_do_component', 'app_sys', 'FormDetail', 1],
		['ct_sys_do_component', 'app_sys', 'FormList', 2],

		// data obj field - access
		['ct_sys_do_field_access', 'app_sys', 'optional', 0],
		['ct_sys_do_field_access', 'app_sys', 'readOnly', 1],
		['ct_sys_do_field_access', 'app_sys', 'required', 2],

		// data obj field - element
		['ct_sys_do_field_element', 'app_sys', 'checkbox', 0],
		['ct_sys_do_field_element', 'app_sys', 'custom', 1],
		['ct_sys_do_field_element', 'app_sys', 'date', 2],
		['ct_sys_do_field_element', 'app_sys', 'email', 3],
		['ct_sys_do_field_element', 'app_sys', 'file', 4],
		['ct_sys_do_field_element', 'app_sys', 'input', 5],
		['ct_sys_do_field_element', 'app_sys', 'number', 6],
		['ct_sys_do_field_element', 'app_sys', 'password', 7],
		['ct_sys_do_field_element', 'app_sys', 'radio', 8],
		['ct_sys_do_field_element', 'app_sys', 'select', 9],
		['ct_sys_do_field_element', 'app_sys', 'tel', 10],
		['ct_sys_do_field_element', 'app_sys', 'text', 11],
		['ct_sys_do_field_element', 'app_sys', 'textArea', 12],

		// data obj field - cusotm element type
		['ct_sys_do_field_element_custom_type', 'app_sys', 'button', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'header', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'link', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'text', 0],
		['ct_sys_do_field_element_custom_type', 'app_sys', 'textDynamic', 0],

		// data obj field - list direction
		['ct_sys_do_field_list_dir', 'app_sys', 'asc', 0],
		['ct_sys_do_field_list_dir', 'app_sys', 'desc', 1],

		// data obj field - op
		['ct_sys_do_field_op', 'app_sys', 'eq', 0],

		// data obj field - source
		['ct_sys_do_field_source', 'app_sys', 'calc', 0],
		['ct_sys_do_field_source', 'app_sys', 'env', 1],
		['ct_sys_do_field_source', 'app_sys', 'literal', 2],
		['ct_sys_do_field_source', 'app_sys', 'parms', 3],
		['ct_sys_do_field_source', 'app_sys', 'preset', 4],
		['ct_sys_do_field_source', 'app_sys', 'retrieve', 5],
		['ct_sys_do_field_source', 'app_sys', 'user', 6],

		// data obj - render type
		['ct_sys_do_render_type', 'app_sys', 'form', 0],

		// node obj - icons
		['ct_sys_node_obj_icon', 'app_cm', 'activities', 0],
		['ct_sys_node_obj_icon', 'app_cm', 'goals', 1],
		['ct_sys_node_obj_icon', 'app_cm', 'message', 2],
		['ct_sys_node_obj_icon', 'app_cm', 'quote-enclosed', 3],

		['ct_sys_node_obj_icon', 'app_sys', 'application', 4],
		['ct_sys_node_obj_icon', 'app_sys', 'root', 5],

		// node obj - types
		['ct_sys_node_obj_type', 'app_sys', 'header', 0],
		['ct_sys_node_obj_type', 'app_sys', 'home', 1],
		['ct_sys_node_obj_type', 'app_sys', 'object', 2],
		['ct_sys_node_obj_type', 'app_sys', 'page', 3],
		['ct_sys_node_obj_type', 'app_sys', 'program', 4],
		['ct_sys_node_obj_type', 'app_sys', 'programObject', 5],
		['ct_sys_node_obj_type', 'app_sys', 'treeRoot', 6],

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

	// await addCode({
	// 	owner: 'app_cm_training',
	// 	codeType: 'ct_cm_training_payment_type_milestone1',
	// 	header: 'Payment 1 - 100%',
	// 	name: 'milestone1_payment1',
	// 	order: 0,
	// 	creator: 'user_sys'
	// })
	// await addCode({
	// 	owner: 'app_cm_training',
	// 	codeType: 'ct_cm_training_payment_type_milestone2',
	// 	header: 'Payment 1 - 50%',
	// 	name: 'milestone2_payment1',
	// 	order: 0,
	// 	creator: 'user_sys'
	// })
	// await addCode({
	// 	owner: 'app_cm_training',
	// 	codeType: 'ct_cm_training_payment_type_milestone2',
	// 	header: 'Payment 2 - 50%',
	// 	name: 'milestone2_payment1',
	// 	order: 0,
	// 	creator: 'user_sys'
	// })
}

async function initTables() {
	await tables([
		['app_cm', 'app_cm', 'ServiceFlow', true],
		['app_cm', 'app_cm', 'Client', true],
		['app_cm', 'app_cm', 'ClientServiceFlow', true],
		['app_cm', 'app_cm', 'CsfCertification', true],
		['app_cm', 'app_cm', 'CsfNote', true],

		['app_cm_training', 'app_cm_training', 'Course', true],
		['app_cm_training', 'app_cm_training', 'Cohort', true],
		['app_cm_training', 'app_cm_training', 'CsfCohort', true],
		['app_cm_training', 'app_cm_training', 'CsfCohortAttd', true],

		['app_sys', 'default', 'Person', false],
		['app_sys', 'sys_user', 'User', false],
		['app_sys_admin', 'sys_admin', 'ObjConfig', true]
	])
}

async function initColumns() {
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Address 1',
		name: 'addr1'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Address 2',
		name: 'addr2'
	})
	await addColumn({
		codeDataType: 'str',
		creator: 'user_sys',
		header: 'Agency ID',
		name: 'agencyId',
		owner: 'app_cm',
		placeHolder: 'Enter agency ID'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'json',
		exprStorageKey: 'avatar_<raw,calc,random10>',
		header: 'Avatar',
		name: 'avatar'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'int64',
		header: 'Security Code',
		name: 'authSecurityCode',
		pattern: '^\\d{6}$',
		patternMsg: 'Security Code should be exactly 6 digits.'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Birth Date',
		name: 'birthDate'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'City',
		name: 'city'
	})
	await addColumn({
		codeDataType: 'edgeType',
		codeDataTypeComputed: 'str',
		creator: 'user_sys',
		edgeTypeDefn: {
			property: 'person.fullName',
			table: { mod: 'app_cm', name: 'Client' }
		},
		exprPreset:
			'(SELECT app_cm::Client { data := .id, display := .person.fullName } FILTER .id = <uuid,record,id>)',
		header: 'Client',
		name: 'client',
		owner: 'app_cm'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: {
			property: `serviceFlow.header ++ ' (' ++ to_str(.dateReferral) ++ ')'`,
			table: { mod: 'app_cm', name: 'ClientServiceFlow' }
		},
		header: 'Service Flow',
		name: 'clientServiceFlow'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Certification',
		name: 'codeCertification',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Ethnicity',
		name: 'codeEthnicity',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Gender',
		name: 'codeGender',
		owner: 'app_sys'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Certifications',
		isMultiSelect: true,
		name: 'codeMultiCerts'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Exams',
		isMultiSelect: true,
		name: 'codeMultiExams'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Items - Included',
		isMultiSelect: true,
		name: 'codeMultiItemsIncluded'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Items - Not Included',
		isMultiSelect: true,
		name: 'codeMultiItemsNotIncluded'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Requirements',
		isMultiSelect: true,
		name: 'codeMultiRqmts'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Race',
		name: 'codeRace',
		owner: 'app_sys'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Sector',
		name: 'codeSector'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'State',
		name: 'codeState',
		owner: 'app_sys'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Status',
		name: 'codeStatus',
		owner: 'app_sys'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'CodeType' } },
		header: 'Payment Type',
		name: 'codeTypePayment'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: {
			property: `course.name ++ ' (' ++ .name ++ ')'`,
			table: { mod: 'app_cm_training', name: 'Cohort' }
		},
		header: 'Cohort',
		name: 'cohort'
	})
	await addColumn({
		codeDataType: 'computed',
		codeDataTypeComputed: 'str',
		creator: 'user_sys',
		exprSelect: `.serviceFlow { data := .id, display := .header }`,
		header: 'Service Flow',
		isExcludeUpdate: true,
		name: 'computedServiceFlow',
		owner: 'app_cm'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'decimal',
		header: 'Cost',
		minValue: 0,
		name: 'cost'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'app_cm_training', name: 'Course' } },
		header: 'Course',
		name: 'course',
		owner: 'app_sys'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'datetime',
		header: 'Created At',
		isExcludeUpdate: true,
		isSetBySys: true,
		name: 'createdAt'
	})
	await addColumn({
		codeDataType: 'edgeType',
		codeDataTypeComputed: 'str',
		creator: 'user_sys',
		edgeTypeDefn: {
			property: 'person.fullName',
			table: { mod: 'sys_user', name: 'User' }
		},
		exprPreset:
			'(SELECT sys_user::User { data := .id, display := .person.fullName } FILTER .userName = <str,user,userName>)',
		header: 'Created By',
		isExcludeUpdate: true,
		name: 'createdBy',
		owner: 'app_sys'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Creator',
		name: 'creator'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: {
			property: `cohort.course.header ++ ' (' ++ to_str(.dateReferral) ++ ')'`,
			table: { mod: 'app_cm_training', name: 'CsfCohort' }
		},
		header: 'Cohort',
		name: 'csfCohort'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'custom_element',
		isExcludeInsert: true,
		isExcludeSelect: true,
		isExcludeUpdate: true,
		name: 'custom_element'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'custom_select',
		isExcludeInsert: true,
		isExcludeUpdate: true,
		name: 'custom_select'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Date',
		name: 'date'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'End Date',
		name: 'dateEnd'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Estimated End Date',
		name: 'dateEndEst'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Expiration Date',
		name: 'dateExpires'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Issued Date',
		name: 'dateIssued'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Referral Date',
		name: 'dateReferral'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Start Date',
		name: 'dateStart'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Estimated Start Date',
		name: 'dateStartEst'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Description',
		name: 'description'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Actions',
		name: 'detailActions'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Data Object',
		name: 'detailDataObj'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Header',
		name: 'detailHeader'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Name',
		name: 'detailName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Detail-Order',
		name: 'detailOrder'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Parent Node Name',
		name: 'detailParentNodeName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Sub Header',
		name: 'detailSubHeader'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'decimal',
		header: 'Duration',
		maxValue: 24,
		minValue: 0,
		name: 'duration',
		spinStep: '0.25'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Email',
		name: 'email'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Favorite Food',
		isMultiSelect: true,
		name: 'favFood'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'First Name',
		name: 'firstName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Full Name',
		name: 'fullName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Has Management Columns',
		name: 'hasMgmt'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Header',
		name: 'header'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Icon',
		name: 'icon'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'uuid',
		header: 'System ID',
		isSetBySys: true,
		name: 'id'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'json',
		exprStorageKey: 'image_certification_<raw,calc,random10>',
		header: 'Certification',
		name: 'imageCertification'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Active',
		name: 'isActive'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Last Name',
		name: 'lastName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Property',
		name: 'linkProperty'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Module',
		name: 'linkTableModule'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Name',
		name: 'linkTableName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Actions',
		name: 'listActions'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Data Object',
		name: 'listDataObj'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Expression Filter',
		name: 'listExprFilter'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Header',
		name: 'listHeader'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Name',
		name: 'listName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'List-Order',
		name: 'listOrder'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Parent Node Name',
		name: 'listParentNodeName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Sub Header',
		name: 'listSubHeader'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'datetime',
		header: 'Modified At',
		isSetBySys: true,
		name: 'modifiedAt'
	})
	await addColumn({
		codeDataType: 'edgeType',
		codeDataTypeComputed: 'str',
		creator: 'user_sys',
		edgeTypeDefn: {
			property: 'person.fullName',
			table: { mod: 'sys_user', name: 'User' }
		},
		exprPreset:
			'(SELECT sys_user::User { data := .id, display := .person.fullName } FILTER .userName = <str,user,userName>)',
		header: 'Modified By',
		name: 'modifiedBy',
		owner: 'app_sys'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Name',
		name: 'name'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Note',
		name: 'note'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Objects Owner',
		name: 'objsOwner'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Columns',
		name: 'outputDetailColumns'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Node',
		name: 'outputDetailNode'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Data Object',
		name: 'outputDetailDataObj'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Columns',
		name: 'outputListColumns'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Data Object',
		name: 'outputListDataObj'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Node',
		name: 'outputListNode'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Org' } },
		header: 'Owner',
		name: 'owner',
		owner: 'app_sys'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Password',
		name: 'password'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Mobile Phone',
		name: 'phoneMobile'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Org' } },
		header: 'Provider',
		name: 'provider'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Schedule',
		name: 'schedule'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'header', table: { mod: 'app_cm', name: 'ServiceFlow' } },
		header: 'Service Flow',
		name: 'serviceFlow',
		owner: 'app_cm'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'person.fullName', table: { mod: 'sys_user', name: 'Staff' } },
		header: 'Staff - Administrator',
		name: 'staffAdmin'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'person.fullName', table: { mod: 'sys_user', name: 'Staff' } },
		header: 'Staff - Agency',
		name: 'staffAgency'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'person.fullName', table: { mod: 'sys_user', name: 'Staff' } },
		header: 'Staff - Instructor',
		name: 'staffInstructor'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Module',
		name: 'tableModule'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Name',
		name: 'tableName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Owner',
		name: 'tableOwner'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Mobile Phone Number',
		name: 'userName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Zip',
		name: 'zip'
	})
}

async function initTableColumns() {
	await tableColumns([
		['app_cm', 'Client', 'agencyId'],
		['app_cm', 'Client', 'createdAt'],
		['app_cm', 'Client', 'createdBy'],
		['app_cm', 'Client', 'email'],
		['app_cm', 'Client', 'firstName'],
		['app_cm', 'Client', 'fullName'],
		['app_cm', 'Client', 'id'],
		['app_cm', 'Client', 'lastName'],
		['app_cm', 'Client', 'modifiedAt'],
		['app_cm', 'Client', 'modifiedBy'],
		['app_cm', 'Client', 'note']
	])
}

async function initSysDataObjActions() {
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_save',
		header: 'Save',
		order: 100
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_new',
		header: 'New',
		order: 110
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_edit',
		header: 'Edit',
		order: 120
	})
	await addDataObjAction({
		color: 'variant-filled-error',
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_delete',
		header: 'Delete',
		order: 130
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_list_columns',
		header: 'Columns',
		order: 140
	})
	await addDataObjAction({
		allTabs: true,
		color: 'none',
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_cancel',
		header: 'Cancel',
		order: 200
	})
	await addDataObjAction({
		allTabs: true,
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_save',
		header: 'Save',
		order: 210
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_save_new',
		header: 'Save/New',
		order: 220
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_save_as',
		header: 'Save As',
		order: 230
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_new',
		header: 'New',
		order: 240
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_detail_delete',
		header: 'Delete',
		order: 250,
		color: 'variant-filled-error'
	})
	await addDataObjAction({
		allTabs: true,
		color: 'bg-primary-300',
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_back',
		header: '< Back',
		order: 5
	})
	await addDataObjAction({
		creator: 'user_sys',
		owner: 'app_sys',
		name: 'noa_print',
		header: 'Print',
		order: 300
	})
}

async function initDataObjFieldItemsLists() {
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_cm',
		dbSelect: 'SELECT app_cm::ServiceFlow {data := .id, display := .header} ORDER BY .header',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_cm_service_flow'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect: `SELECT app_cm_training::Cohort {data := .id, display := .course.name ++ ' (' ++ .name ++ ')'} 
FILTER .owner in (SELECT sys_user::User FILTER .userName = <str,user,userName>).orgs
ORDER BY .course.name`,
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_cm_training_cohort_by_userName'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_cm_training',
		dbSelect: `SELECT (
      SELECT app_cm_training::CsfCohort 
      FILTER 
        .clientServiceFlow.id = <uuid,record,id> AND 
        .codeStatus = (SELECT sys_core::getCode('ct_cm_service_flow_status', <str,parms,status>))
      ).cohort.course {data := .id, display := .name} ORDER BY .name`,
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_cm_training_course_by_csfId_status'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::Code {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .order',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_code_order_index_by_codeTypeName'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::Code {data := .id, display := .name} FILTER .codeType.name = <str,parms,codeTypeName> ORDER BY .name',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_code_order_name_by_codeTypeName'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::CodeType {data := .id, display := .header} FILTER .parent.name = <str,parms,codeTypeParentName> ORDER BY .name',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_codeType_order_name_by_codeTypeParentName'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_core::Org { data := .id, display := .name } FILTER .roles.name = <str,parms,codeName> ORDER BY .name',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_sys_role_org_by_codeName'
	})
	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect:
			'SELECT sys_user::Staff { data := .id, display := .person.fullName } FILTER .roles.name = <str,parms,codeName> ORDER BY str_lower(.person.lastName) then str_lower(.person.firstName)',
		propertyId: 'id',
		propertyLabel: 'person.fullName',
		name: 'il_sys_role_staff_by_codeName'
	})
}
