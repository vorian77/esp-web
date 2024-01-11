import { addDataObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initCMTraining'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initCMTrainingCourse()
	await initCMTrainingCohort()
	console.log(`${FILE}.end`)
}

async function initCMTrainingCourse() {
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

async function initCMTrainingCohort() {
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
