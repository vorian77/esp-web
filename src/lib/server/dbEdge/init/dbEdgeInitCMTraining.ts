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
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_course_list',
		header: 'Courses',
		table: 'CmCourse',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs',
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
				columnName: 'codeStatus',
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
				columnName: 'cost',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeTypePayment',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSector',
				dbOrderSelect: 60
			}
		]
	})

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_course_detail',
		header: 'Course',
		table: 'CmCourse',
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDbFilter: true,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 20,
				exprPreset:
					'(SELECT sys_core::SysOrg { data := .id, display := .name } FILTER .name = <str,user,org.name>)',
				isDisplay: false
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 30,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_status' }
			},
			{
				columnName: 'name',
				dbOrderSelect: 40
			},
			{
				codeElement: 'number',
				columnName: 'cost',
				dbOrderSelect: 50
			},
			{
				codeElement: 'select',
				columnName: 'codeTypePayment',
				dbOrderSelect: 60,
				itemsList: 'il_sys_codeType_order_name_by_codeTypeParentName',
				itemsListParms: { codeTypeParentName: 'ct_cm_payment_type' }
			},
			{
				codeElement: 'select',
				columnName: 'codeSector',
				dbOrderSelect: 70,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_sector' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'description',
				dbOrderSelect: 80
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'schedule',
				dbOrderSelect: 90
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
				codeElement: 'checkbox',
				columnName: 'codeMultiRqmts',
				dbOrderSelect: 120,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_rqmt' }
			},

			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiItemsIncluded',
				dbOrderSelect: 130,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_items_included' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiItemsNotIncluded',
				dbOrderSelect: 140,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_items_not_included' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiExams',
				dbOrderSelect: 150,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_exam' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiCerts',
				dbOrderSelect: 160,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_cert' }
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
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_cohort_list',
		header: 'Cohorts',
		table: 'CmCohort',
		exprFilter: '.course.id = <uuid,tree,CmCourse.id>',
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
				columnName: 'codeStatus',
				dbOrderSelect: 40
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
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_cohort_detail',
		header: 'Cohort',
		table: 'CmCohort',
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDbFilter: true,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 20,
				exprPreset:
					'(SELECT sys_core::SysOrg { data := .id, display := .name } FILTER .name = <str,user,org.name>)',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'course',
				dbOrderSelect: 30,
				exprPreset:
					'(SELECT app_cm::CmCourse { data := .id, display := .name } FILTER .id = <uuid,tree,CmCourse.id>)',
				isDisplay: false
			},
			{
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_status' }
			},
			{
				columnName: 'name',
				dbOrderSelect: 50,
				headerAlt: 'Cohort ID'
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
				dbOrderSelect: 90
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 200,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 210,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 220,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 230,
				isDisplay: true
			}
		]
	})
}
