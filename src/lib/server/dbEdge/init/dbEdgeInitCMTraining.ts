import {
	addColumn,
	addCode,
	addCodeType,
	addForm,
	addNodeObj,
	addUser,
	execute,
	review
} from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	codes,
	codeTypes,
	userType,
	userUserType,
	nodeObjPrograms,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	tables,
	tableColumns
} from '$server/dbEdge/init/dbEdgeInitUtilities'

const FILE = 'init_cm_training'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initCore()
	await initDB()
	await initForms()
	await initNav()
	await initUser()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

const reviewQuery =
	'select sys_obj::Form {name, fieldsDb:{**}, fieldsEl:{**}} filter .name = "form_training_provider_student_list"'

async function initCore() {
	await apps([['app_cm_training']])

	await codeTypes([
		['app_cm_training', 0, 'ct_cm_training_course_cert'],
		['app_cm_training', 0, 'ct_cm_training_course_exam'],
		['app_cm_training', 0, 'ct_cm_training_course_items_included'],
		['app_cm_training', 0, 'ct_cm_training_course_items_not_included'],
		['app_cm_training', 0, 'ct_cm_training_course_rqmt'],
		['app_cm_training', 0, 'ct_cm_training_course_sector'],

		['app_cm_training', 0, 'ct_cm_training_payment_type']
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

	await codes([
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
		['ct_cm_training_course_sector', 'app_cm_training', 'Transportation', 6]
	])

	// ct_cm_training_payment_type_milestone1
}

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

async function initDB() {
	await dbCourse()
	await dbCohort()
}

async function initForms() {
	await formsProviderCourse()
	await formsProviderCohort()
	await formsProviderStudent()
}

async function initNav() {
	await navAdmin()
	await navProvider()
	await navStudent()
}

async function dbCourse() {
	await tables([['app_cm_training', 'app_cm_training', 'Course', true]])

	// Course - columns
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
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'sys_core', name: 'Code' } },
		header: 'Sector',
		name: 'codeSector'
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
		codeDataType: 'decimal',
		header: 'Cost',
		name: 'cost'
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
}

async function dbCohort() {
	await tables([['app_cm_training', 'app_cm_training', 'Cohort', true]])

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'app_cm_training', name: 'Course' } },
		header: 'Course',
		name: 'course'
	})
}

async function formsProviderCourse() {
	/* node_training_provider_course_list */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'form_training_provider_course_list',
		header: 'Courses',
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'Course' },
		exprFilter: 'none',
		actions: ['noa_list_new'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isActive',
				dbOrderSelect: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderList: 10,
				dbOrderSelect: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'description',
				dbOrderSelect: 50
			}
		]
	})

	/* node_training_provider_course_detail */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'form_training_provider_course_detail',
		header: 'Course',
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'Course' },
		actions: ['noa_detail_save', 'noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'isActive',
				dbOrderSelect: 10
			},
			{
				columnName: 'name',
				dbOrderSelect: 20
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeSector',
				dbOrderSelect: 30,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_training_course_sector' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'description',
				dbOrderSelect: 40
			},
			{
				codeElement: 'number',
				columnName: 'cost',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeTypePayment',
				dbOrderSelect: 70,
				itemsList: 'il_sys_codeType_order_name_by_codeTypeParentName',
				itemsListParms: { codeTypeParentName: 'ct_cm_training_payment_type' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'schedule',
				dbOrderSelect: 80
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'owner',
				dbOrderSelect: 90,
				itemsList: 'il_sys_role_org_by_codeName',
				itemsListParms: { codeName: 'cm_training_role_org_agency' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAdmin',
				dbOrderSelect: 100,
				itemsList: 'il_sys_role_staff_by_codeName',
				itemsListParms: { codeName: 'cm_training_role_staff_admin' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 110,
				itemsList: 'il_sys_role_staff_by_codeName',
				itemsListParms: { codeName: 'cm_training_role_staff_agency' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 120,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_status' }
			},

			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiExams',
				dbOrderSelect: 130,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_training_course_exam' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiCerts',
				dbOrderSelect: 140,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_training_course_cert' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiItemsIncluded',
				dbOrderSelect: 150,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_training_course_items_included' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiItemsNotIncluded',
				dbOrderSelect: 160,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_training_course_items_not_included' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiRqmts',
				dbOrderSelect: 170,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_training_course_rqmt' }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 180,
				isDbFilter: true,
				isDisplayable: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 190,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 200,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 210,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 220,
				isDisplay: true
			}
		]
	})
}

async function formsProviderCohort() {
	/* node_training_provider_cohort_list */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'form_training_provider_cohort_list',
		header: 'Cohorts',
		table: {
			owner: 'app_cm_training',
			mod: 'app_cm_training',
			name: 'Cohort'
		},
		exprFilter: '.course.id = <uuid,tree,app_cm_training::Course;id>',
		actions: ['noa_list_new'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderList: 10,
				dbOrderSelect: 30,
				headerAlt: 'Cohort ID'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 40
			}
		]
	})

	/* node_training_provider_cohort_detail */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'form_training_provider_cohort_detail',
		header: 'Cohort',
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'Cohort' },
		actions: ['noa_detail_save', 'noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'course',
				dbOrderSelect: 10,
				exprPreset:
					'(SELECT app_cm_training::Course { data := .id, display := .name } FILTER .id = <uuid,tree,app_cm_training::Course;id>)'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 15,
				exprPreset:
					'(SELECT sys_core::Org { data := .id, display := .name } FILTER .name = <str,user,organization>)'
			},
			{
				columnName: 'name',
				dbOrderSelect: 20,
				headerAlt: 'Cohort ID'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 50,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_status' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAdmin',
				dbOrderSelect: 60,
				itemsList: 'il_sys_role_staff_by_codeName',
				itemsListParms: { codeName: 'cm_training_role_staff_admin' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 70,
				itemsList: 'il_sys_role_staff_by_codeName',
				itemsListParms: { codeName: 'cm_training_role_staff_agency' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffInstructor',
				dbOrderSelect: 80,
				itemsList: 'il_sys_role_staff_by_codeName',
				itemsListParms: { codeName: 'cm_training_role_staff_instructor' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 170
			},
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 180,
				isDbFilter: true,
				isDisplayable: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 190,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 200,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 210,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 220,
				isDisplay: true
			}
		]
	})
}

async function formsProviderStudent() {
	/* node_training_provider_student_list */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'form_training_provider_student_list',
		header: 'Students',
		subHeader: 'All students enrolled in any courses.',
		table: { owner: 'app_cm', mod: 'app_cm', name: 'Student' },
		exprFilter: 'none',
		link: { property: 'person', table: { mod: 'default', name: 'Person' } },
		actions: ['noa_list_new'],
		fields: [
			{
				columnName: 'owner',
				isDisplayable: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'agencyId',
				dbOrderSelect: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				dbOrderList: 20,
				dbOrderSelect: 30,
				isLinkMember: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				dbOrderList: 10,
				dbOrderSelect: 40,
				isLinkMember: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				dbOrderSelect: 50,
				isLinkMember: true
			}
		]
	})

	/* node_training_provider_student_detail */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'form_training_provider_student_detail',
		header: 'Student',
		table: { owner: 'app_cm', mod: 'app_cm', name: 'Student' },
		link: { property: 'person', table: { mod: 'default', name: 'Person' } },
		actions: ['noa_detail_save', 'noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				isDbFilter: true,
				isDisplay: false,
				dbOrderSelect: 10
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'header',
				columnName: 'custom_element',
				customElParms: { label: 'Personal' },
				dbOrderSelect: 20
			},
			{
				columnName: 'firstName',
				dbOrderSelect: 30,
				isLinkMember: true
			},
			{
				columnName: 'lastName',
				dbOrderSelect: 40,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'birthDate',
				dbOrderSelect: 50,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				codeElement: 'radio',
				columnName: 'gender',
				dbOrderSelect: 60,
				isLinkMember: true,
				items: [
					{
						data: '1',
						display: 'Female'
					},
					{
						data: '2',
						display: 'Male'
					},
					{
						data: '3',
						display: 'Non-Binary/Third Gender'
					},
					{
						data: '4',
						display: 'Prefer Not To Say'
					}
				]
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeRace',
				dbOrderSelect: 70,
				isLinkMember: true,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_person_race' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'ethnicity',
				dbOrderSelect: 80,
				isLinkMember: true,
				items: [
					{
						data: '8965',
						display: 'Hispanic-Latino'
					},
					{
						data: '8966',
						display: 'Not Hispanic-Latino'
					},
					{
						data: '9705',
						display: 'Prefer Not To Say'
					}
				]
			},
			{
				columnName: 'agencyId',
				dbOrderSelect: 90
			},
			{
				codeAccess: 'optional',
				codeElement: 'file',
				columnName: 'avatar',
				dbOrderSelect: 100,
				isLinkMember: true,
				width: 300
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'header',
				columnName: 'custom_element',
				customElParms: { label: 'Contact' },
				dbOrderSelect: 110
			},
			{
				codeAccess: 'optional',
				codeElement: 'tel',
				columnName: 'phoneMobile',
				dbOrderSelect: 120,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				codeElement: 'email',
				columnName: 'email',
				dbOrderSelect: 130,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				dbOrderSelect: 140,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				dbOrderSelect: 150,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				dbOrderSelect: 160,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeState',
				dbOrderSelect: 170,
				isLinkMember: true,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_state' }
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				dbOrderSelect: 180,
				isLinkMember: true
			},
			{
				codeElement: 'custom',
				codeCustomElType: 'header',
				columnName: 'custom_element',
				customElParms: { label: 'Other' },
				dbOrderSelect: 190
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'favFood',
				dbOrderSelect: 200,
				isLinkMember: true,
				items: [
					{
						data: '10',
						display: 'Apple'
					},
					{
						data: '20',
						display: 'Pizza'
					},
					{
						data: '30',
						display: 'Spaghetti'
					}
				]
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 210,
				isLinkMember: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 215,
				exprPreset:
					'(SELECT sys_core::Org { data := .id, display := .name } FILTER .name = <str,user,organization>)'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 220,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 230,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 240,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 250,
				isDisplay: true
			}
		]
	})
}

async function navAdmin() {
	await nodeObjPrograms([
		[
			'app_cm_training',
			'program',
			'pgm_cm_training_staff_adm',
			'AI-Role: Admin',
			50,
			'application',
			'/home/app'
		]
	])
}

async function navProvider() {
	await nodeObjPrograms([
		[
			'app_cm_training',
			'program',
			'pgm_cm_training_staff_provider',
			'AI-Role: Provider',
			60,
			'application',
			'/home/app'
		]
	])
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'pgm_cm_training_staff_provider',
		codeType: 'object',
		name: 'node_training_provider_course_list',
		header: 'Courses',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_course_list',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'node_training_provider_course_list',
		codeType: 'object',
		name: 'node_training_provider_course_detail',
		header: 'Course',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_course_detail',
		creator: 'user_sys'
	})

	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'node_training_provider_course_detail',
		codeType: 'object',
		name: 'node_training_provider_cohort_list',
		header: 'Cohorts',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_cohort_list',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'node_training_provider_cohort_list',
		codeType: 'object',
		name: 'node_training_provider_cohort_detail',
		header: 'Cohort',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_cohort_detail',
		creator: 'user_sys'
	})

	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'pgm_cm_training_staff_provider',
		codeType: 'object',
		name: 'node_training_provider_student_list',
		header: 'Students',
		order: 20,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_student_list',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'node_training_provider_student_list',
		codeType: 'object',
		name: 'node_training_provider_student_detail',
		header: 'Student',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_student_detail',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'node_training_provider_student_detail',
		codeType: 'object',
		name: 'node_training_provider_referral_list',
		header: 'Referrals',
		order: 10,
		codeIcon: 'application',
		page: '/home/app',
		dataObj: 'form_training_provider_referral_list',
		creator: 'user_sys'
	})
	await addNodeObj({
		owner: 'app_cm_training',
		parentNodeName: 'pgm_cm_training_staff_provider',
		codeType: 'object',
		name: 'node_training_provider_invoices_list',
		header: 'Invoices',
		order: 30,
		codeIcon: 'application',
		page: '/home/app',
		creator: 'user_sys'
	})
}

async function navStudent() {
	await nodeObjPrograms([
		[
			'app_cm_training',
			'program',
			'pgm_cm_training_student',
			'AI-Role: Student',
			70,
			'application',
			'/home/app'
		]
	])
}

async function initUser() {
	await initUserApp()
	await initUserSys()
}

async function initUserApp() {
	await userType([
		['app_cm_training', 'ut_cm_training_staff_admin'],
		['app_cm_training', 'ut_cm_training_staff_provider'],
		['app_cm_training', 'ut_cm_training_student']
	])

	await userTypeResourcesPrograms([
		['ut_cm_training_staff_admin', 'pgm_cm_training_staff_adm'],
		['ut_cm_training_staff_provider', 'pgm_cm_training_staff_provider'],
		['ut_cm_training_student', 'pgm_cm_training_student']
	])

	// await userTypeResourcesWidgets([
	// 	['ut_cm_training_staff_admin', 'widget_sys_user'],
	// 	['ut_cm_training_staff_provider', 'widget_sys_user'],
	// 	['ut_cm_training_student', 'widget_cm_user'],
	// 	['ut_cm_training_student', 'widget_cm_quotes']
	// ])
}

async function initUserSys() {
	await userTypeResourcesApps([['ut_sys_admin', 'app_cm_training']])

	await userTypeResourcesPrograms([
		['ut_sys_admin', 'pgm_cm_training_staff_adm'],
		['ut_sys_admin', 'pgm_cm_training_staff_provider'],
		['ut_sys_admin', 'pgm_cm_training_student']
	])

	await userUserType([
		['user_sys', 'ut_cm_training_staff_admin'],
		['user_sys', 'ut_cm_training_staff_provider'],
		['user_sys', 'ut_cm_training_student']
	])
}
