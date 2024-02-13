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

	reset.delColumn('codeJobType')
	reset.delColumn('codePlacementRelated')
	reset.delColumn('codeWageType')
	reset.delColumn('contact')
	reset.delColumn('dateSubmitted')
	reset.delColumn('employer')
	reset.delColumn('hoursPerWeek')
	reset.delColumn('title')
	reset.delColumn('wage')

	reset.delCodeType('ct_cm_job_type')
	reset.delCodeType('ct_cm_job_wage_type')
	reset.delCodeType('ct_cm_job_training_related')

	reset.delTable('CmCsfJobPlacement')
	reset.delTable('CmEmployer')

	await reset.execute()
}

export async function config() {
	sectionHeader('Local-Config')

	await codeTypes([
		['app_cm', 0, 'ct_cm_job_type'],
		['app_cm', 0, 'ct_cm_job_wage_type'],
		['app_cm', 0, 'ct_cm_job_training_related']
	])

	await codes([
		// ct_cm_job_type
		['ct_cm_job_type', 'app_cm', 'Full-Time', 0],
		['ct_cm_job_type', 'app_cm', 'Part-Time', 1],
		['ct_cm_job_type', 'app_cm', 'Seasonal', 2],
		['ct_cm_job_type', 'app_cm', 'Temporary', 3],

		// ct_cm_job_wage_type
		['ct_cm_job_wage_type', 'app_cm', 'Hourly', 0],
		['ct_cm_job_wage_type', 'app_cm', 'Weekly', 1],
		['ct_cm_job_wage_type', 'app_cm', 'Bi-Weekly', 2],
		['ct_cm_job_wage_type', 'app_cm', 'Monthly', 3],
		['ct_cm_job_wage_type', 'app_cm', 'Annually', 4],

		// ct_cm_job_training_related
		['ct_cm_job_training_related', 'app_cm', 'Yes', 0],
		['ct_cm_job_training_related', 'app_cm', 'No', 1],
		['ct_cm_job_training_related', 'app_cm', 'N/A', 2]
	])

	await addColumn({
		codeDataType: 'link',
		header: 'Contact',
		name: 'contact',
		owner: 'app_sys_admin'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Job Type',
		name: 'codeJobType'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Placement Related To Training',
		name: 'codePlacementRelated'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Wage Type',
		name: 'codeWageType'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Date Submitted',
		name: 'dateSubmitted'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Employer',
		name: 'employer'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'Hours Per Week',
		minValue: 0,
		name: 'hoursPerWeek'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'str',
		header: 'Title',
		name: 'title'
	})
	await addColumn({
		owner: 'app_sys',
		codeDataType: 'float64',
		header: 'Wage',
		name: 'wage'
	})

	await tables([
		['app_cm', 'app_cm', 'CmEmployer', true],
		['app_cm', 'app_cm', 'CmCsfJobPlacement', true]
	])

	await addDataObjFieldItems({
		exprSelect: `SELECT app_cm::CmEmployer {data := .id, display := .name} FILTER .owner in (SELECT sys_user::SysUser FILTER .userName = <str,user,userName>).orgs ORDER BY .name`,
		name: 'il_cm_employer_by_userName',
		owner: 'app_cm'
	})

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
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_sys_state' },
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
				itemsDb: 'il_cm_employer_by_userName',
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
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_job_wage_type' },
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
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_job_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'select',
				columnName: 'codePlacementRelated',
				dbOrderSelect: 80,
				indexTable: '0',
				itemsDb: 'il_sys_code_order_name_by_codeType_name',
				itemsDbParms: { codeTypeName: 'ct_cm_job_training_related' },
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
				itemsDb: 'il_sys_role_staff_by_codeName',
				itemsDbParms: { codeName: 'cm_training_role_staff_agency' },
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
