import { addDataObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initSysAdmin'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initDataObjConfig()
	console.log(`${FILE}.end`)
}

async function initDataObjConfig() {
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_sys_admin_data_obj_config_list',
		header: 'Data Object Configs',
		table: {
			owner: 'app_sys_admin',
			mod: 'sys_admin',
			name: 'ObjConfig'
		},
		exprFilter: 'none',
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
				dbOrderSelect: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'tableModule',
				dbOrderSelect: 30
			},
			{
				codeAccess: 'readOnly',
				columnName: 'tableName',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'listName',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'detailName',
				dbOrderSelect: 60
			}
		]
	})

	await addDataObj({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_sys_admin_data_obj_config_detail',
		header: 'Data Object Config',
		table: { owner: 'app_sys_admin', mod: 'sys_admin', name: 'ObjConfig' },
		actions: ['noa_detail_new', 'noa_detail_save_as', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 10,
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'owner',
				dbOrderSelect: 20,
				exprPreset: `(SELECT sys_core::getOrg('System') { data := .id, display := .name })`
			},
			{
				columnName: 'name',
				dbOrderSelect: 30
			},
			{
				columnName: 'creator',
				dbOrderSelect: 40
			},
			{
				codeElement: 'checkbox',
				columnName: 'hasMgmt',
				dbOrderSelect: 45,
				exprPreset: `(SELECT true)`
			},

			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Output-List' },
				dbOrderSelect: 400
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'textArea',
				columnName: 'outputListColumns',
				dbOrderSelect: 410,
				height: 10
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'textArea',
				columnName: 'outputListNode',
				dbOrderSelect: 420,
				height: 10
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'textArea',
				columnName: 'outputListDataObj',
				dbOrderSelect: 430,
				height: 30
			},

			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Output-Detail' },
				dbOrderSelect: 500
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'textArea',
				columnName: 'outputDetailColumns',
				dbOrderSelect: 510,
				height: 10
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'textArea',
				columnName: 'outputDetailNode',
				dbOrderSelect: 520,
				height: 10
			},
			{
				codeAccess: 'readOnly',
				codeElement: 'textArea',
				columnName: 'outputDetailDataObj',
				dbOrderSelect: 530,
				height: 20
			},

			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Management' },
				dbOrderSelect: 600
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 610
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 620
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 630
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 640
			}
		]
	})
}
