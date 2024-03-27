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
	await employers()
}
export async function reset() {
	sectionHeader('Local-Reset')
	const reset = new ResetDb()

	reset.delFeature('cm_employer')

	await reset.execute()
}

export async function employers() {
	sectionHeader('Data Objects')

	// Employers
	await addDataObj({
		actionsFieldGroup: 'doag_base_list',
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
		actionsFieldGroup: 'doag_base_detail',
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
}
