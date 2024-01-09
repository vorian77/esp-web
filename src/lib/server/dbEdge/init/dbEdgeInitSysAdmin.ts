import {
	apps,
	codes,
	codeTypes,
	nodeObjPrograms,
	tables,
	tableColumns,
	userTypeResourcesApps,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addColumn,
	addDataObj,
	addDataObjFieldItems,
	addNodeProgramObj
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initSysAdmin'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initCore()
	await initObjBuilder()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

const reviewQuery = ''

async function initCore() {
	await apps([['app_sys_admin']])
}

async function initObjBuilder() {
	await tables([['app_sys_admin', 'sys_admin', 'ObjConfig', true]])

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Creator',
		name: 'creator'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Actions',
		name: 'detailActions'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Data Object',
		name: 'detailDataObj'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Header',
		name: 'detailHeader'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Name',
		name: 'detailName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Detail-Order',
		name: 'detailOrder'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Parent Node Name',
		name: 'detailParentNodeName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Sub Header',
		name: 'detailSubHeader'
	})

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Has Management Columns',
		name: 'hasMgmt'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Icon',
		name: 'icon'
	})

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Property',
		name: 'linkProperty'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Module',
		name: 'linkTableModule'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Name',
		name: 'linkTableName'
	})

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Actions',
		name: 'listActions'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Data Object',
		name: 'listDataObj'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Expression Filter',
		name: 'listExprFilter'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Header',
		name: 'listHeader'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Name',
		name: 'listName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'List-Order',
		name: 'listOrder'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Parent Node Name',
		name: 'listParentNodeName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Sub Header',
		name: 'listSubHeader'
	})

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Objects Owner',
		name: 'objsOwner'
	})

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Columns',
		name: 'outputDetailColumns'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Node',
		name: 'outputDetailNode'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Data Object',
		name: 'outputDetailDataObj'
	})

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Columns',
		name: 'outputListColumns'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Data Object',
		name: 'outputListDataObj'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Node',
		name: 'outputListNode'
	})

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Module',
		name: 'tableModule'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Name',
		name: 'tableName'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Owner',
		name: 'tableOwner'
	})

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

	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_sys_admin_data_obj_config_list',
		header: 'Data Object Configs',
		name: 'node_obj_sys_admin_data_obj_config_list',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_pgm_sys_admin'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		creator: 'user_sys',
		dataObj: 'data_obj_sys_admin_data_obj_config_detail',
		header: 'Data Object Config',
		name: 'node_obj_sys_admin_data_obj_config_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_config_list',
		queryActions: [
			{
				name: 'dataObjConfig',
				queryTypes: ['saveInsert', 'saveUpdate'],
				timings: ['pre']
			}
		]
	})
}
