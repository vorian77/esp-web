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
	console.log(`${FILE}.end`)
}

async function initCMStudent() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_student_list',
		header: 'Students',
		subHeader: 'All students enrolled in any courses.',
		table: 'CmClient',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs',
		link: { property: 'person', table: { mod: 'default', name: 'SysPerson' } },
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
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_student_detail',
		header: 'Student',
		table: 'CmClient',
		link: { property: 'person', table: { mod: 'default', name: 'SysPerson' } },
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
				codeElement: 'date',
				columnName: 'birthDate',
				dbOrderSelect: 50,
				isLinkMember: true
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeGender',
				dbOrderSelect: 60,
				isLinkMember: true,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_person_gender' }
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
				columnName: 'codeEthnicity',
				dbOrderSelect: 80,
				isLinkMember: true,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_sys_person_ethnicity' }
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
					'(SELECT sys_core::SysOrg { data := .id, display := .name } FILTER .name = <str,user,org.name>)',
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

// {
//   codeAccess: 'optional',
//   codeElement: 'radio',
//   columnName: 'gender',
//   dbOrderSelect: 60,
//   isLinkMember: true,
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
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_client_service_flow_list',
		header: 'Service Flows',
		table: 'CmClientServiceFlow',
		exprFilter: '.client.id = <uuid,tree,CmClient.id>',
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
				columnName: 'computedServiceFlow',
				dbOrderCrumb: 10,
				dbOrderSelect: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
				dbOrderSelect: 25
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStartEst',
				dbOrderSelect: 40,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateStart',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEndEst',
				dbOrderSelect: 60,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				dbOrderSelect: 70
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 80
			}
		]
	})

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_client_service_flow_detail',
		header: 'Service Flow',
		table: 'CmClientServiceFlow',
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'client',
				dbOrderSelect: 10,
				exprPreset:
					'(SELECT app_cm::CmClient { data := .id, display := .person.fullName } FILTER .id = <uuid,tree,CmClient.id>)',
				isDisplay: false
			},
			{
				codeElement: 'select',
				columnName: 'serviceFlow',
				dbOrderSelect: 20,
				itemsList: 'il_cm_service_flow'
			},
			{
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderSelect: 25
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 30,
				exprPreset: `(SELECT sys_core::SysCode { data := .id, display := .name } FILTER .codeType.name = 'ct_cm_service_flow_status' and .name = 'Pending')`,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_service_flow_status' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStartEst',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStart',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateEndEst',
				dbOrderSelect: 60
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateEnd',
				dbOrderSelect: 70
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 80
			},
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 180,
				isDbFilter: true,
				isDisplay: false,
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

async function initStudentCsfCohort() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_list',
		header: 'Cohorts',
		subHeader: "Student's course enrollments.",
		table: 'CmCsfCohort',
		exprFilter: '.clientServiceFlow.id = <uuid,tree,CmClientServiceFlow.id>',
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
				columnName: 'clientServiceFlow',
				dbOrderSelect: 20,
				isDisplay: false
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
				codeDbListDir: 'desc',
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
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_detail',
		header: 'Cohort',
		subHeader: "Student's course enrollment.",
		table: 'CmCsfCohort',
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'clientServiceFlow',
				dbOrderSelect: 20,
				exprPreset: `(SELECT app_cm::CmClientServiceFlow { data := .id, display := .serviceFlow.name ++ ' (' ++ to_str(.dateReferral) ++ ')'} FILTER .id = <uuid,tree,CmClientServiceFlow.id>)`,
				isDisplay: false
			},
			{
				codeElement: 'select',
				columnName: 'cohort',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				itemsList: 'il_cm_cohort_by_userName'
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 40,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_service_flow_status' }
			},
			{
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
				headerAlt: 'Certifications Earned',
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_cert' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 100
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

async function initStudentCsfCohortAttd() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_cohort_attd_list',
		header: 'Attendances',
		table: 'CmCsfCohortAttd',
		exprFilter: '.csfCohort.id = <uuid,tree,CmCsfCohort.id>',
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
				columnName: 'csfCohort',
				dbOrderSelect: 20,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				codeDbListDir: 'desc',
				codeElement: 'date',
				columnName: 'date',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'duration',
				dbOrderSelect: 40
			}
		]
	})

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_cohort_attd_detail',
		header: 'Attendance',
		table: 'CmCsfCohortAttd',
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'csfCohort',
				dbOrderSelect: 20,
				exprPreset: `(SELECT app_cm::CmCsfCohort { data := .id, display := .cohort.name ++ ' (' ++ to_str(.dateReferral) ++ ')'} FILTER .id = <uuid,tree,CmCsfCohort.id>)`,
				isDisplay: false
			},
			{
				codeElement: 'date',
				columnName: 'date',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 30
			},
			{
				codeElement: 'number',
				columnName: 'duration',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 50
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

async function initStudentCsfCertification() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_csf_certification_list',
		header: 'Certifications',
		table: 'CmCsfCertification',
		exprFilter: '.clientServiceFlow.id = <uuid,tree,CmClientServiceFlow.id>',
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
				columnName: 'clientServiceFlow',
				dbOrderSelect: 20,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'course',
				dbOrderSelect: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeCertification',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateIssued',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateExpires',
				dbOrderSelect: 60
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 60,
				isDisplay: false
			}
		]
	})

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_csf_certification_detail',
		header: 'Certification',
		table: 'CmCsfCertification',
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'clientServiceFlow',
				dbOrderSelect: 20,
				exprPreset: `(SELECT app_cm::CmClientServiceFlow { data := .id, display := .serviceFlow.name ++ ' (' ++ to_str(.dateReferral) ++ ')'} FILTER .id = <uuid,tree,CmClientServiceFlow.id>)`,
				isDisplay: false
			},
			{
				codeElement: 'select',
				columnName: 'course',
				dbOrderSelect: 30,
				itemsList: 'il_cm_course_by_csfId_status',
				itemsListParms: { status: 'Completed' }
			},
			{
				codeElement: 'select',
				columnName: 'codeCertification',
				dbOrderSelect: 40,
				itemsList: 'il_sys_code_order_name_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_course_cert' }
			},
			{
				codeElement: 'date',
				columnName: 'dateIssued',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateExpires',
				dbOrderSelect: 60
			},
			{
				codeElement: 'select',
				columnName: 'staffAgency',
				dbOrderSelect: 70,
				itemsList: 'il_sys_role_staff_by_codeName',
				itemsListParms: { codeName: 'cm_training_role_staff_agency' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 80
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
