import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObj, addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initTraining() {
	sectionHeader('DataObject - CM-Training')
	await reset()
	await initCMTrainingCourse()
	await initCMTrainingCohort()
}

async function reset() {
	sectionHeader('Local-Reset')
	const reset = new ResetDb()

	reset.delNodeObj('node_obj_cm_cohort_detail')
	reset.delNodeObj('node_obj_cm_cohort_list')

	reset.delNodeObj('node_obj_cm_course_detail')
	reset.delNodeObj('node_obj_cm_course_list')

	reset.delDataObj('data_obj_cm_course_detail')
	reset.delDataObj('data_obj_cm_course_list')

	reset.delDataObj('data_obj_cm_cohort_detail')
	reset.delDataObj('data_obj_cm_cohort_list')

	await reset.execute()
}

async function initCMTrainingCourse() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs',
		header: 'Courses',
		name: 'data_obj_cm_course_list',
		owner: 'app_cm',
		tables: [{ index: '0', table: 'CmCourse' }],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 20,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cost',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeTypePayment',
				dbOrderSelect: 50,
				indexTable: '0',
				link: { columnsDisplay: ['header'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeSector',
				dbOrderSelect: 60,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				codeAlignment: 'right',
				codeElement: 'number',
				columnName: 'custom_select_int',
				dbOrderSelect: 70,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.course.id = app_cm::CmCourse.id)))`,
				headerAlt: 'Enrollments',
				indexTable: '0',
				nameCustom: 'customCohortsCount',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Course',
		name: 'data_obj_cm_course_detail',
		owner: 'app_cm',
		tables: [{ index: '0', table: 'CmCourse' }],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDbFilter: true,
				isDisplay: false,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 20,
				isDisplay: false,
				indexTable: '0',
				link: {
					exprSave: '(SELECT sys_core::getOrg(<str,user,org.name>))',
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 30,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_index_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_sys_status' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				columnName: 'name',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'cost',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeTypePayment',
				dbOrderSelect: 60,
				indexTable: '0',
				itemsDb: 'il_sys_codeType_order_name_by_codeTypeParent_name',
				itemsDbParms: { codeTypeParentName: 'ct_cm_payment_type' },
				link: { table: { module: 'sys_core', name: 'SysCodeType' } }
			},
			{
				codeElement: 'select',
				columnName: 'codeSector',
				dbOrderSelect: 70,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_index_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_course_sector' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'description',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'schedule',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAdmin',
				dbOrderSelect: 100,
				indexTable: '0',
				itemsDb: 'il_sys_role_staff_by_codeName',
				itemsDbParms: { codeName: 'cm_training_role_staff_admin' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 110,
				indexTable: '0',
				itemsDb: 'il_sys_role_staff_by_codeName',
				itemsDbParms: { codeName: 'cm_training_role_staff_agency' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiRqmts',
				dbOrderSelect: 120,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_course_rqmt' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiItemsIncluded',
				dbOrderSelect: 130,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_course_items_included' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiItemsNotIncluded',
				dbOrderSelect: 140,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_course_items_not_included' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiExams',
				dbOrderSelect: 150,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_course_exam' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'checkbox',
				columnName: 'codeMultiCerts',
				dbOrderSelect: 160,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_course_cert' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},

			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 190,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 200,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 210,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 220,
				indexTable: '0',
				isDisplay: true
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_course_list',
		header: 'Courses',
		name: 'node_obj_cm_course_list',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_pgm_cm_staff_provider'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_course_detail',
		header: 'Course',
		name: 'node_obj_cm_course_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_course_list'
	})
}

async function initCMTrainingCohort() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.course.id = <uuid,tree,CmCourse.id>',
		header: 'Cohorts',
		name: 'data_obj_cm_cohort_list',
		owner: 'app_cm',
		tables: [{ index: '0', table: 'CmCohort' }],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				indexTable: '0',
				link: { columnsDisplay: ['name'], table: { module: 'sys_core', name: 'SysOrg' } }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 30,
				headerAlt: 'Cohort ID',
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				codeAlignment: 'right',
				codeElement: 'number',
				columnName: 'custom_select_int',
				dbOrderSelect: 70,
				exprCustom: `(SELECT count((SELECT app_cm::CmCsfCohort FILTER .cohort.id = app_cm::CmCohort.id)))`,
				headerAlt: 'Enrollments',
				indexTable: '0',
				nameCustom: 'customCohortsCount',
				pattern: '[-+]?[0-9]*[.,]?[0-9]+'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_cohort_detail',
		header: 'Cohort',
		tables: [{ index: '0', table: 'CmCohort' }],
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDbFilter: true,
				isDisplay: false,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 20,
				isDisplay: false,
				indexTable: '0',
				link: {
					exprSave: '(SELECT sys_core::getOrg(<str,user,org.name>))',
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				codeAccess: 'readOnly',
				columnName: 'course',
				dbOrderSelect: 30,
				isDisplay: false,
				indexTable: '0',
				link: {
					exprSave: '(SELECT app_cm::CmCourse FILTER .id = <uuid,tree,CmCourse.id>)',
					table: { module: 'app_cm', name: 'CmCourse' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_index_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_sys_status' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				columnName: 'name',
				dbOrderSelect: 50,
				headerAlt: 'Cohort ID',
				indexTable: '0'
			},
			{
				codeElement: 'date',
				columnName: 'dateStart',
				dbOrderSelect: 52,
				indexTable: '0'
			},
			{
				codeElement: 'date',
				columnName: 'dateEnd',
				dbOrderSelect: 54,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAdmin',
				dbOrderSelect: 60,
				indexTable: '0',
				itemsDb: 'il_sys_role_staff_by_codeName',
				itemsDbParms: { codeName: 'cm_training_role_staff_admin' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 70,
				indexTable: '0',
				itemsDb: 'il_sys_role_staff_by_codeName',
				itemsDbParms: { codeName: 'cm_training_role_staff_agency' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'staffInstructor',
				dbOrderSelect: 80,
				indexTable: '0',
				itemsDb: 'il_sys_role_staff_by_codeName',
				itemsDbParms: { codeName: 'cm_training_role_staff_instructor' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 200,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 210,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 220,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 230,
				indexTable: '0',
				isDisplay: true
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_cohort_list',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_course_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_cohort_detail',
		header: 'Cohort',
		name: 'node_obj_cm_cohort_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_cohort_list'
	})
}
