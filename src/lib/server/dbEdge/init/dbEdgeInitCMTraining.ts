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
	tables
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addColumn,
	addCodeType,
	addDataObj,
	addDataObjFieldItems,
	addNodeProgramObj
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'init_cm_training'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initCore()
	await initDB()
	await initDataObjs()
	await initNav()
	await initUser()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

const reviewQuery = ''

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

async function initDataObjs() {
	await dataObjsCmTrainingCourse()
	await dataObjsCmTrainingCohort()
	await dataObjsCmTrainingStudent()
	await dataObjsCmTrainingCsfCohort()
}

async function initNav() {
	await navAdmin()
	await navProvider()
	await navStudent()
}

async function dbCourse() {
	await tables([['app_cm_training', 'app_cm_training', 'Course', true]])

	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_sys',
		dbSelect: `SELECT app_cm_training::Course {data := .id, display := .name} 
			FILTER .owner in (SELECT sys_user::User FILTER .userName = <str,user,userName>).orgs
			ORDER BY .name`,
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_cm_training_course_by_userName'
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
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'name', table: { mod: 'app_cm_training', name: 'Cohort' } },
		header: 'Cohort',
		name: 'cohort'
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
		edgeTypeDefn: { property: 'name', table: { mod: 'app_cm_training', name: 'Course' } },
		header: 'Course',
		name: 'course'
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
	await tables([
		['app_cm_training', 'app_cm_training', 'Cohort', true],
		['app_cm_training', 'app_cm_training', 'CsfCohort', true],
		['app_cm_training', 'app_cm_training', 'CsfCohortAttd', true]
	])
}

async function dataObjsCmTrainingCourse() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_training_course_list',
		header: 'Courses',
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'Course' },
		exprFilter: '.owner in (SELECT sys_user::User FILTER .userName = <str,user,userName>).orgs',
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
				dbOrderCrumb: 10,
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

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_training_course_detail',
		header: 'Course',
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'Course' },
		actions: ['noa_detail_new', 'noa_detail_delete'],
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
				isDisplay: false
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

async function dataObjsCmTrainingCohort() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_training_cohort_list',
		header: 'Cohorts',
		table: {
			owner: 'app_cm_training',
			mod: 'app_cm_training',
			name: 'Cohort'
		},
		exprFilter: '.course.id = <uuid,record,id>',
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
				dbOrderCrumb: 10,
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

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_training_cohort_detail',
		header: 'Cohort',
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'Cohort' },
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'course',
				dbOrderSelect: 10,
				exprPreset:
					'(SELECT app_cm_training::Course { data := .id, display := .name } FILTER .id = <uuid,record,id>)'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 15,
				exprPreset:
					'(SELECT sys_core::Org { data := .id, display := .name } FILTER .name = <str,user,org.name>)'
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
				isDisplay: false
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

async function dataObjsCmTrainingStudent() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_training_student_list',
		header: 'Students',
		subHeader: 'All students enrolled in any courses.',
		table: { owner: 'app_cm', mod: 'app_cm', name: 'Client' },
		exprFilter: '.owner in (SELECT sys_user::User FILTER .userName = <str,user,userName>).orgs',
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
				dbOrderCrumb: 10,
				dbOrderList: 20,
				dbOrderSelect: 30,
				isLinkMember: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				dbOrderCrumb: 20,
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

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_training_student_detail',
		header: 'Student',
		table: { owner: 'app_cm', mod: 'app_cm', name: 'Client' },
		link: { property: 'person', table: { mod: 'default', name: 'Person' } },
		actions: ['noa_detail_new', 'noa_detail_delete'],
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
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Personal' },
				dbOrderSelect: 20
			},
			{
				columnName: 'agencyId',
				dbOrderSelect: 25
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
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Contact' },
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
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Other' },
				dbOrderSelect: 190
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
					'(SELECT sys_core::Org { data := .id, display := .name } FILTER .name = <str,user,org.name>)',
				isDisplay: false
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

async function dataObjsCmTrainingCsfCohort() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		subHeader: "Student's course enrollments.",
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'CsfCohort' },
		exprFilter: '.clientServiceFlow.id = <uuid,record,id>',
		actions: ['noa_list_new'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10
			},
			{
				codeAccess: 'readOnly',
				columnName: 'clientServiceFlow',
				dbOrderSelect: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cohort',
				dbOrderCrumb: 10,
				dbOrderSelect: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
				dbOrderList: 10,
				dbOrderSelect: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				dbOrderSelect: 60
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				dbOrderSelect: 80
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeMultiCerts',
				dbOrderSelect: 90
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 100
			}
		]
	})

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm_training',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		subHeader: "Student's course enrollment.",
		table: { owner: 'app_cm_training', mod: 'app_cm_training', name: 'CsfCohort' },
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'clientServiceFlow',
				dbOrderSelect: 20,
				exprPreset:
					'(SELECT app_cm::ClientServiceFlow { data := .id, display := .serviceFlow.name } FILTER .id = <uuid,record,id>)',
				isDisplay: true
			},
			{
				codeElement: 'select',
				columnName: 'cohort',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				itemsList: 'il_cm_training_course_by_userName'
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_service_flow_status' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
				dbOrderList: 10,
				dbOrderSelect: 50
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStart',
				dbOrderSelect: 60
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateEnd',
				dbOrderSelect: 80
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiCerts',
				dbOrderSelect: 90,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_training_course_cert' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 100
			}
		]
	})
}

// {
// 	codeAccess: 'optional',
// 	codeElement: 'checkbox',
// 	columnName: 'favFood',
// 	dbOrderSelect: 200,
// 	isLinkMember: true,
// 	items: [
// 		{
// 			data: '10',
// 			display: 'Apple'
// 		},
// 		{
// 			data: '20',
// 			display: 'Pizza'
// 		},
// 		{
// 			data: '30',
// 			display: 'Spaghetti'
// 		}
// 	]
// },
//

async function navAdmin() {
	await nodeObjPrograms([
		['app_cm_training', 'node_pgm_cm_training_staff_adm', 'AI-Role: Admin', 50, 'application']
	])
}

async function navProvider() {
	await nodeObjPrograms([
		[
			'app_cm_training',
			'node_pgm_cm_training_staff_provider',
			'AI-Role: Provider',
			60,
			'application'
		]
	])
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
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_service_flow_list',
		header: 'Service Flows',
		name: 'node_obj_cm_training_service_flow_list',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_student_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_cm_service_flow_detail',
		header: 'Service Flow',
		name: 'node_obj_cm_training_service_flow_detail',
		order: 10,
		owner: 'app_cm_training',
		parentNodeName: 'node_obj_cm_training_service_flow_list'
	})

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

	// await addNodeProgramObj({
	// 	codeIcon: 'application',
	// 	creator: 'user_sys',
	// 	header: 'Invoices',
	// 	name: 'node_obj_cm_training_invoices_list',
	// 	order: 30,
	// 	owner: 'app_cm_training',
	// 	parentNodeName: 'node_pgm_cm_training_staff_provider',
	// })
}

async function navStudent() {
	await nodeObjPrograms([
		['app_cm_training', 'node_pgm_cm_training_student', 'AI-Role: Student', 70, 'application']
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
		['ut_cm_training_staff_admin', 'node_pgm_cm_training_staff_adm'],
		['ut_cm_training_staff_provider', 'node_pgm_cm_training_staff_provider'],
		['ut_cm_training_student', 'node_pgm_cm_training_student']
	])

	await userTypeResourcesWidgets([
		['ut_cm_training_staff_admin', 'widget_sys_user'],
		['ut_cm_training_staff_provider', 'widget_sys_user']
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
		['ut_sys_admin', 'node_pgm_cm_training_staff_adm'],
		['ut_sys_admin', 'node_pgm_cm_training_staff_provider'],
		['ut_sys_admin', 'node_pgm_cm_training_student']
	])

	await userUserType([
		['user_sys', 'ut_cm_training_staff_admin'],
		['user_sys', 'ut_cm_training_staff_provider'],
		['user_sys', 'ut_cm_training_student']
	])
}
