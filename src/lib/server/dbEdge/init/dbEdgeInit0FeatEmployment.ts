import {
	codeTypes,
	codes,
	ResetDb,
	sectionHeader,
	tables
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addColumn,
	addDataObj,
	addDataObjFieldItems,
	addNodeProgramObj
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initFeatEmploy() {
	await reset()
	await config()
}
export async function reset() {
	sectionHeader('Local-Reset')
	const reset = new ResetDb()

	reset.delNodeObj('node_obj_cm_employer_detail')
	reset.delNodeObj('node_obj_cm_employer_list')

	reset.delNodeObj('node_obj_cm_csf_job_placement_detail')
	reset.delNodeObj('node_obj_cm_csf_job_placement_list')

	reset.delDataObj('data_obj_cm_employer_detail')
	reset.delDataObj('data_obj_cm_employer_list')

	reset.delDataObj('data_obj_cm_csf_job_placement_detail')
	reset.delDataObj('data_obj_cm_csf_job_placement_list')

	reset.delFieldItems('il_cm_employer_by_userName')

	await reset.execute()
}

export async function config() {
	sectionHeader('Data Objects')

	// Employers
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeComponent: 'FormList',
		codeCardinality: 'list',
		exprFilter: '.owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs',
		header: 'Employers',
		name: 'data_obj_cm_employer_list',
		owner: 'app_cm',
		tables: [
			{ index: '0', table: 'CmEmployer' },
			{ columnParent: 'contact', indexParent: '0', index: '1', table: 'SysPerson' }
		],
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
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'firstName',
				dbOrderSelect: 20,
				headerAlt: 'Contact - First Name',
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'lastName',
				dbOrderSelect: 30,
				headerAlt: 'Contact - Last Name',
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'phoneAlt',
				dbOrderSelect: 40,
				headerAlt: 'Contact - Phone',
				indexTable: '1'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'email',
				dbOrderSelect: 50,
				headerAlt: 'Contact - Email',
				indexTable: '1'
			}
		]
	})
	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Employer',
		name: 'data_obj_cm_employer_detail',
		owner: 'app_cm',
		tables: [
			{ index: '0', table: 'CmEmployer' },
			{ columnParent: 'contact', indexParent: '0', index: '1', table: 'SysPerson' }
		],
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
				columnName: 'name',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'title',
				dbOrderSelect: 40,
				headerAlt: 'Contact - Title',
				indexTable: '1'
			},
			{
				columnName: 'firstName',
				dbOrderSelect: 50,
				headerAlt: 'Contact - First Name',
				indexTable: '1'
			},
			{
				columnName: 'lastName',
				dbOrderSelect: 60,
				headerAlt: 'Contact - Last Name',
				indexTable: '1'
			},
			{
				codeElement: 'tel',
				columnName: 'phoneAlt',
				dbOrderSelect: 70,
				headerAlt: 'Contact - Phone',
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				columnName: 'email',
				dbOrderSelect: 80,
				headerAlt: 'Contact - Email',
				indexTable: '1'
			},
			{
				codeAccess: 'optional',
				columnName: 'addr1',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'addr2',
				dbOrderSelect: 100,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'city',
				dbOrderSelect: 110,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeState',
				dbOrderSelect: 120,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_state' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				columnName: 'zip',
				dbOrderSelect: 130,
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
		dataObj: 'data_obj_cm_employer_list',
		header: 'Employers',
		name: 'node_obj_cm_employer_list',
		order: 25,
		owner: 'app_cm',
		parentNodeName: 'node_pgm_cm_staff_provider'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_cm_employer_detail',
		header: 'Employer',
		name: 'node_obj_cm_employer_detail',
		order: 10,
		owner: 'app_cm',
		parentNodeName: 'node_obj_cm_employer_list'
	})

	// job placement
	await addDataObj({
		actionsField: ['noa_list_new'],
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
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
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
