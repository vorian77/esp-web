import { codeTypes, codes, ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addColumn, addDataObj, addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import init from './dbEdgeInit2DOSysAuth'

export async function initFeatCMStudent() {
	sectionHeader('DataObject - CM-Student')
	await reset()

	await initStudent()
	await initCsf()
	await initCsfCohort()
	await initCsfCohortAttdStudent()
	await initCsfNote()
	await initCsfJobPlacement()
	await initCsfDocument()
}

async function reset() {
	sectionHeader('Local-Reset')
	const reset = new ResetDb()

	reset.delFeature('cm_csf_document')
	reset.delFeature('cm_csf_job_placement')
	reset.delFeature('cm_csf_note')
	reset.delFeature('cm_csf_cohort_attd_student')
	reset.delFeature('cm_csf_cohort')
	reset.delFeature('cm_service_flow')
	reset.delFeature('cm_client_service_flow')
	reset.delFeature('cm_student')

	await reset.execute()
}

async function initStudent() {
	await addDataObj({
		actionsFieldGroup: 'doag_base_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs',
		header: 'Students',
		name: 'data_obj_cm_student_list',
		owner: 'app_cm',
		subHeader: 'All students enrolled in any courses.',
		tables: [
			{ index: '0', table: 'CmClient' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				dbOrderCrumb: 10,
				dbOrderList: 20,
				dbOrderSelect: 30,
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				dbOrderCrumb: 20,
				dbOrderList: 10,
				dbOrderSelect: 40,
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				dbOrderSelect: 50,
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'agencyId',
				dbOrderSelect: 55,
				headerAlt: 'Group',
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_student_detail',
		header: 'Student',
		table: 'CmClient',
		tables: [
			{ index: '0', table: 'CmClient' },
			{ columnParent: 'person', indexParent: '0', index: '1', table: 'SysPerson' }
		],
		actionsFieldGroup: 'doag_base_detail',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				isDbFilter: true,
				isDisplay: false,
				dbOrderSelect: 10,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Personal' },
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				columnName: 'firstName',
				dbOrderSelect: 30,
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				columnName: 'middleName',
				dbOrderSelect: 35,
				indexTable: '1'
			},
			{
				columnName: 'lastName',
				dbOrderSelect: 40,
				indexTable: '1'
			},
			{
				codeElement: 'date',
				columnName: 'birthDate',
				dbOrderSelect: 50,
				indexTable: '1'
			},
			{
				columnName: 'agencyId',
				dbOrderSelect: 55,
				headerAlt: 'Group',
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'school',
				dbOrderSelect: 57,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeGender',
				dbOrderSelect: 60,
				indexTable: '1',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_person_gender' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeRace',
				dbOrderSelect: 70,
				indexTable: '1',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_person_race' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeEthnicity',
				dbOrderSelect: 80,
				indexTable: '1',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_person_ethnicity' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Contact' },
				dbOrderSelect: 110,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'tel',
				columnName: 'phoneMobile',
				dbOrderSelect: 120,
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				codeElement: 'tel',
				columnName: 'phoneAlt',
				dbOrderSelect: 125,
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				codeElement: 'email',
				columnName: 'email',
				dbOrderSelect: 130,
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				dbOrderSelect: 140,
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				dbOrderSelect: 150,
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				dbOrderSelect: 160,
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeState',
				dbOrderSelect: 170,
				indexTable: '1',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_state' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				dbOrderSelect: 180,
				indexTable: '1'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Other' },
				dbOrderSelect: 190,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 210,
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 215,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: '(SELECT sys_core::getOrg(<str,user,org.name>))',
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 220,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 230,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 240,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 250,
				indexTable: '0',
				isDisplay: true
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_student_list',
		header: 'Students',
		name: 'node_obj_cm_student_list',
		order: 20,
		owner: 'app_cm',
		parentNodeName: 'node_pgm_cm_staff_provider'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_student_detail',
		header: 'Student',
		name: 'node_obj_cm_student_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_student_list'
	})
}

async function initCsf() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		tables: [{ index: '0', table: 'CmClientServiceFlow' }],
		exprFilter: '.client.id = <uuid,tree,CmClient.id>',
		actionsFieldGroup: 'doag_base_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'serviceFlow',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0',
				link: { columnsDisplay: ['header'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeReferralType',
				dbOrderSelect: 40,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStartEst',
				dbOrderSelect: 60,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEndEst',
				dbOrderSelect: 80,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeReferralEndType',
				dbOrderSelect: 100,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 110,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		tables: [{ index: '0', table: 'CmClientServiceFlow' }],
		actionsFieldGroup: 'doag_base_detail',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 5,
				indexTable: '0',
				isDbFilter: true,
				isDisplay: false,
				isDisplayable: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'client',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: '(SELECT app_cm::CmClient FILTER .id = <uuid,tree,CmClient.id>)',
					table: { module: 'app_cm', name: 'CmClient' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'serviceFlow',
				dbOrderSelect: 20,
				indexTable: '0',
				fieldListItems: 'il_cm_service_flow',
				link: { table: { module: 'app_cm', name: 'CmServiceFlow' } }
			},
			{
				codeElement: 'select',
				columnName: 'codeReferralType',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_service_flow_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStartEst',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateEndEst',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStart',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateEnd',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeReferralEndType',
				dbOrderSelect: 90,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_service_flow_end_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 100,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 300,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 310,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 320,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 330,
				indexTable: '0',
				isDisplay: true
			}
		]
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		name: 'node_obj_cm_service_flow_list',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_student_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		name: 'node_obj_cm_service_flow_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_list'
	})
}

async function initCsfCohort() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		subHeader: "Student's course enrollments.",
		tables: [{ index: '0', table: 'CmCsfCohort' }],
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		actionsFieldGroup: 'doag_base_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cohort',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				indexTable: '0',
				link: {
					exprSelect: `(.cohort.course.name ++ ' (' ++ .cohort.name ++ ')' ++ ' (' ++ std::to_str(<cal::local_date>.cohort.dateStart) ++ ')')`
				}
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				dbOrderCrumb: 20,
				dbOrderList: 10,
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 100,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		tables: [{ index: '0', table: 'CmCsfCohort' }],
		actionsFieldGroup: 'doag_base_detail',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csf',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave:
						'(SELECT app_cm::CmClientServiceFlow filter.id = (<uuid,tree,CmClientServiceFlow.id>))',
					table: { module: 'app_cm', name: 'CmClientServiceFlow' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'cohort',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_cm_cohort_by_userName',
				link: { table: { module: 'app_cm', name: 'CmCohort' } }
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_service_flow_status' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'date',
				columnName: 'dateStart',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateEnd',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 110,
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
		dataObj: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		name: 'node_obj_cm_csf_cohort_list',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		name: 'node_obj_cm_csf_cohort_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_cohort_list'
	})
}

async function initCsfCohortAttdStudent() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_attd_student_list',
		header: 'Attendance Records',
		tables: [{ index: '0', table: 'CmCsfCohortAttd' }],
		exprFilter: '.csfCohort.id = <uuid,tree,CmCsfCohort.id>',
		actionsFieldGroup: 'doag_base_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'cohortAttd',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				headerAlt: 'Date',
				indexTable: '0',
				link: {
					columnsDisplay: ['date'],
					table: { module: 'app_cm', name: 'CmCohortAttd' }
				}
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeCmCohortAttdDuration',
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'computedHours',
				dbOrderSelect: 40,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_attd_student_detail',
		header: 'Attendance',
		tables: [{ index: '0', table: 'CmCsfCohortAttd' }],
		actionsFieldGroup: 'doag_base_detail',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csfCohort',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: '(SELECT app_cm::CmCsfCohort filter.id = (<uuid,tree,CmCsfCohort.id>))',
					table: { module: 'app_cm', name: 'CmCsfCohort' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'cohortAttd',
				dbOrderSelect: 30,
				headerAlt: 'Date',
				indexTable: '0',
				fieldListItems: 'il_cm_cohort_attd_cohort',
				link: { table: { module: 'app_cm', name: 'CmCohortAttd' } }
			},
			{
				codeElement: 'radio',
				columnName: 'codeCmCohortAttdDuration',
				dbOrderSelect: 35,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_index_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_cohort_attd_duration' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'float64',
				columnName: 'computedHours',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 50,
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
		dataObj: 'data_obj_cm_csf_cohort_attd_student_list',
		header: 'Attendance Records',
		name: 'node_obj_cm_csf_cohort_attd_student_list',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_cohort_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_cohort_attd_student_detail',
		header: 'Attendance',
		name: 'node_obj_cm_csf_cohort_attd_student_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_cohort_attd_student_list'
	})
}

async function initCsfNote() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_note_list',
		header: 'Case Notes',
		tables: [{ index: '0', table: 'CmCsfNote' }],
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		actionsFieldGroup: 'doag_base_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				codeDbListDir: 'desc',
				codeElement: 'date',
				columnName: 'date',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				dbOrderSelect: 40,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 50,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_note_detail',
		header: 'Case Note',
		tables: [{ index: '0', table: 'CmCsfNote' }],
		actionsFieldGroup: 'doag_base_detail',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csf',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave:
						'(SELECT app_cm::CmClientServiceFlow filter.id = (<uuid,tree,CmClientServiceFlow.id>))',
					table: { module: 'app_cm', name: 'CmClientServiceFlow' }
				}
			},
			{
				codeElement: 'date',
				columnName: 'date',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeType',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_case_note_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 50,
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
		dataObj: 'data_obj_cm_csf_note_list',
		header: 'Case Notes',
		name: 'node_obj_cm_csf_note_list',
		order: 20,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_note_detail',
		header: 'Case Note',
		name: 'node_obj_cm_csf_note_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_note_list'
	})
}

async function initCsfJobPlacement() {
	await addDataObj({
		actionsFieldGroup: 'doag_base_list',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		header: 'Job Placements',
		name: 'data_obj_cm_csf_job_placement_list',
		owner: 'app_cm',
		tables: [{ index: '0', table: 'CmCsfJobPlacement' }],
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
				columnName: 'dateStart',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'employer',
				dbOrderCrumb: 20,
				dbOrderList: 20,
				dbOrderSelect: 20,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'title',
				dbOrderCrumb: 30,
				dbOrderList: 30,
				dbOrderSelect: 30,
				indexTable: '0'
			}
		]
	})
	await addDataObj({
		actionsFieldGroup: 'doag_base_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Job Placement',
		name: 'data_obj_cm_csf_job_placement_detail',
		owner: 'app_cm',
		tables: [{ index: '0', table: 'CmCsfJobPlacement' }],
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
				columnName: 'csf',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave:
						'(SELECT app_cm::CmClientServiceFlow filter.id = (<uuid,tree,CmClientServiceFlow.id>))',
					table: { module: 'app_cm', name: 'CmClientServiceFlow' }
				}
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Placement' },
				dbOrderSelect: 25,
				indexTable: '0'
			},
			{
				codeElement: 'date',
				columnName: 'dateStart',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'employer',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_cm_employer_by_userName',
				link: { table: { module: 'app_cm', name: 'CmEmployer' } }
			},
			{
				columnName: 'title',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'wage',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeWageType',
				dbOrderSelect: 70,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_job_wage_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'number',
				columnName: 'hoursPerWeek',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeJobType',
				dbOrderSelect: 70,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_job_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'select',
				columnName: 'codePlacementRelated',
				dbOrderSelect: 80,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_job_training_related' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Submission' },
				dbOrderSelect: 100,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 110,
				indexTable: '0',
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParms: { codeName: 'cm_training_role_staff_agency' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeElement: 'date',
				columnName: 'dateSubmitted',
				dbOrderSelect: 120,
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
		dataObj: 'data_obj_cm_csf_job_placement_list',
		header: 'Job Placements',
		name: 'node_obj_cm_csf_job_placement_list',
		order: 30,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_job_placement_detail',
		header: 'Job Placement',
		name: 'node_obj_cm_csf_job_placement_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_job_placement_list'
	})
}

async function initCsfDocument() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		tables: [{ index: '0', table: 'CmCsfDocument' }],
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		actionsFieldGroup: 'doag_base_list',
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csf',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: { columnsDisplay: ['id'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				dbOrderSelect: 40,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'isShareWithClient',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 70,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'staffAgency',
				dbOrderSelect: 80,
				indexTable: '0',
				link: { columnsDisplay: ['person', 'fullName'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateExpires',
				dbOrderSelect: 90,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		tables: [{ index: '0', table: 'CmCsfDocument' }],
		actionsFieldGroup: 'doag_base_detail',
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: { imageField: 'file' },
				triggers: [
					{ type: 'delete', timing: 'pre' },
					{ type: 'delete', timing: 'post' },
					{ type: 'retrieve', timing: 'post' },
					{ type: 'saveInsert', timing: 'pre' },
					{ type: 'saveUpdate', timing: 'pre' },
					{ type: 'saveInsert', timing: 'post' },
					{ type: 'saveUpdate', timing: 'post' }
				]
			}
		],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csf',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave:
						'(SELECT app_cm::CmClientServiceFlow filter.id = (<uuid,tree,CmClientServiceFlow.id>))',
					table: { module: 'app_cm', name: 'CmClientServiceFlow' }
				}
			},
			{
				codeElement: 'date',
				columnName: 'dateIssued',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeType',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_cm_doc_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'toggle',
				columnName: 'isShareWithClient',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'file',
				columnName: 'file',
				dbOrderSelect: 60,
				indexTable: '0',
				width: 300
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 80,
				indexTable: '0',
				fieldListItems: 'il_sys_role_staff_by_codeName',
				fieldListItemsParms: { codeName: 'cm_training_role_staff_agency' },
				link: { table: { module: 'sys_user', name: 'SysStaff' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateExpires',
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
		dataObj: 'data_obj_cm_csf_document_list',
		header: 'Documents',
		name: 'node_obj_cm_csf_document_list',
		order: 40,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_service_flow_detail'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_csf_document_detail',
		header: 'Document',
		name: 'node_obj_cm_csf_document_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_csf_document_list'
	})
}
