import { addDataObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initCMStudent'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initCMStudent()
	await initStudentCsf()
	await initStudentCsfCohort()
	await initStudentCsfCohortAttd()
	await initStudentCsfCertification()
	await initStudentCsfNote()
	console.log(`${FILE}.end`)
}

async function initCMStudent() {
	await addDataObj({
		actionsField: ['noa_list_new'],
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
				columnName: 'agencyId',
				dbOrderSelect: 20,
				indexTable: '0'
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
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
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
				columnName: 'agencyId',
				dbOrderSelect: 25,
				indexTable: '0'
			},
			{
				columnName: 'firstName',
				dbOrderSelect: 30,
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
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeGender',
				dbOrderSelect: 60,
				indexTable: '1',
				itemsDb: 'il_sys_code_order_index_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_sys_person_gender' },
				link: { columnsDisplay: ['header'], table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeRace',
				dbOrderSelect: 70,
				indexTable: '1',
				itemsDb: 'il_sys_code_order_index_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_sys_person_race' },
				link: { columnsDisplay: ['header'], table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeEthnicity',
				dbOrderSelect: 80,
				indexTable: '1',
				itemsDb: 'il_sys_code_order_index_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_sys_person_ethnicity' },
				link: { columnsDisplay: ['header'], table: { module: 'sys_core', name: 'SysCode' } }
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
				itemsDb: 'il_sys_code_order_name_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_sys_state' },
				link: { columnsDisplay: ['header'], table: { module: 'sys_core', name: 'SysCode' } }
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
}

// {
//   codeAccess: 'optional',
//   codeElement: 'radio',
//   columnName: 'gender',
//   dbOrderSelect: 60,
//   items: [
//     {
//       data: '1',
//       display: 'Female'
//     },
//     {
//       data: '2',
//       display: 'Male'
//     },
//     {
//       data: '3',
//       display: 'Non-Binary/Third Gender'
//     },
//     {
//       data: '4',
//       display: 'Prefer Not To Say'
//     }
//   ]
// },

async function initStudentCsf() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		tables: [{ index: '0', table: 'CmClientServiceFlow' }],
		exprFilter: '.client.id = <uuid,tree,CmClient.id>',
		actionsField: ['noa_list_new'],
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
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
				dbOrderSelect: 25,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStartEst',
				dbOrderSelect: 40,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEndEst',
				dbOrderSelect: 60,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 80,
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
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
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
				itemsDb: 'il_cm_service_flow',
				link: { table: { module: 'app_cm', name: 'CmServiceFlow' } }
			},
			{
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderSelect: 25,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 30,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_index_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_cm_service_flow_status' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStartEst',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStart',
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
				columnName: 'dateEnd',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 180,
				indexTable: '0',
				isDbFilter: true,
				isDisplay: false,
				isDisplayable: true
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
}

async function initStudentCsfCohort() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		subHeader: "Student's course enrollments.",
		tables: [{ index: '0', table: 'CmCsfCohort' }],
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		actionsField: ['noa_list_new'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'csf',
			// 	dbOrderSelect: 20,
			// 	indexTable: '0',
			// 	isDisplay: true,
			// 	link: {
			// 		exprSelect: `(.csf.serviceFlow.header ++ ' (' ++ to_str(.csf.dateReferral) ++ ')')`
			// 	}
			// },
			{
				codeAccess: 'readOnly',
				columnName: 'cohort',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				indexTable: '0',
				link: { exprSelect: `(.cohort.course.name ++ ' (' ++ .cohort.name ++ ')')` }
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
				codeDbListDir: 'desc',
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
				dbOrderList: 10,
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
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
				columnName: 'codeMultiCerts',
				dbOrderSelect: 90,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
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
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
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
				itemsDb: 'il_cm_cohort_by_userName',
				link: { table: { module: 'app_cm', name: 'CmCohort' } }
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_index_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_cm_service_flow_status' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
				dbOrderList: 10,
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStartEst',
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
				columnName: 'dateEndEst',
				dbOrderSelect: 80,
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
				codeElement: 'checkbox',
				columnName: 'codeMultiCerts',
				dbOrderSelect: 100,
				indexTable: '0',
				headerAlt: 'Certifications Earned',
				itemsDb: 'il_sys_code_order_name_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_cm_course_cert' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
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
}

async function initStudentCsfCohortAttd() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_attd_list',
		header: 'Attendances',
		tables: [{ index: '0', table: 'CmCsfCohortAttd' }],
		exprFilter: '.csfCohort.id = <uuid,tree,CmCsfCohort.id>',
		actionsField: ['noa_list_new'],
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
				link: { columnsDisplay: ['id'] }
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
				columnName: 'duration',
				dbOrderSelect: 40,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_attd_detail',
		header: 'Attendance',
		tables: [{ index: '0', table: 'CmCsfCohortAttd' }],
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
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
				codeElement: 'date',
				columnName: 'date',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'duration',
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
}

async function initStudentCsfCertification() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_certification_list',
		header: 'Certifications',
		tables: [{ index: '0', table: 'CmCsfCertification' }],
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		actionsField: ['noa_list_new'],
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
				columnName: 'course',
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeCertification',
				dbOrderSelect: 40,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateExpires',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 60,
				indexTable: '0',
				isDisplay: false
			}
		]
	})

	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_certification_detail',
		header: 'Certification',
		tables: [{ index: '0', table: 'CmCsfCertification' }],
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		actionsQuery: [
			{
				name: 'qa_file_storage',
				parms: { imageField: 'imageCertification' },
				triggers: [
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
				codeElement: 'select',
				columnName: 'course',
				dbOrderSelect: 30,
				indexTable: '0',
				itemsDb: 'il_cm_course_by_csfId_status',
				itemsDbParms: { status: 'Completed' },
				link: { table: { module: 'app_cm', name: 'CmCourse' } }
			},
			{
				codeElement: 'select',
				columnName: 'codeCertification',
				dbOrderSelect: 40,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_name_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_cm_course_cert' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'date',
				columnName: 'dateIssued',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateExpires',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
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
				codeElement: 'file',
				columnName: 'imageCertification',
				dbOrderSelect: 80,
				indexTable: '0',
				width: 300
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
}

async function initStudentCsfNote() {
	await addDataObj({
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_note_list',
		header: 'Case Notes',
		tables: [{ index: '0', table: 'CmCsfNote' }],
		exprFilter: '.csf.id = <uuid,tree,CmClientServiceFlow.id>',
		actionsField: ['noa_list_new'],
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
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
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
				itemsDb: 'il_sys_code_order_name_by_codeTypeName',
				itemsDbParms: { codeTypeName: 'ct_cm_case_note_type' },
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
}