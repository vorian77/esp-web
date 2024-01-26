import { apps, userTypeResourcesPrograms, tables } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addColumn, addDataObj, addNodeProgramObj } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import { execute } from '$routes/api/dbEdge/types.dbEdge'
import initSysAdminReports from '$server/dbEdge/init/dbEdgeInitSysAdminReports'

const FILENAME = 'initSysAdmin'

export default async function init() {
	console.log()
	console.log(`${FILENAME}.start...`)
	await initAdmin()
	await reports()
	console.log(`${FILENAME}.end`)
}
async function initAdmin() {
	await resetDB()
	await initCore()
	await initApp()
	await initCodeType()
	// await initCode()
	// await initColumns()

	// await initDataObj()
	// await initDataObjTable()
	// await initDataObjColumn()
	// await initColumn()
	// await initDataObjAction()
	// await initDataObjNodeObj()
	// await initDataObjNodeObjFooter()

	// // await initConfig()
	await initResources()
}

async function reports() {
	await initSysAdminReports()
}

async function initCore() {
	await apps([['app_sys_admin']])

	await tables([
		['app_sys_admin', 'sys_core', 'SysApp', false],
		['app_sys_admin', 'sys_db', 'SysColumn', true],
		['app_sys_admin', 'sys_core', 'SysDataObj', true],
		['app_sys_admin', 'sys_core', 'SysDataObjAction', true],
		['app_sys_admin', 'sys_core', 'SysDataObjTable', true],
		['app_sys_admin', 'sys_core', 'SysDataObjColumn', true],
		['app_sys_admin', 'sys_core', 'SysNodeObj', true],
		['app_sys_admin', 'sys_core', 'SysNodeObjFooter', true],
		['app_sys_admin', 'sys_core', 'SysObjConfig', true],
		['app_sys_admin', 'sys_db', 'SysTable', true]
	])
}

async function initApp() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Applications',
		name: 'data_obj_sys_admin_app_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysApp' }],
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
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Application',
		name: 'data_obj_sys_admin_app_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysApp' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'owner',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::getOrg('System'))`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_app_list',
		header: 'Applications',
		name: 'node_obj_sys_admin_app_list',
		order: 10,
		owner: 'app_sys_admin'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_app_detail',
		header: 'Application',
		name: 'node_obj_sys_admin_app_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_list'
	})
}

async function initCodeType() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <uuid,tree,SysApp.id>',
		header: 'Code Types',
		name: 'data_obj_sys_admin_code_type_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysCodeType' }],
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
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Code Type',
		name: 'data_obj_sys_admin_code_type_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysCodeType' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_type_list',
		header: 'Code Types',
		name: 'node_obj_sys_admin_code_type_list',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_type_detail',
		header: 'Code Type',
		name: 'node_obj_sys_admin_code_type_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_code_type_list'
	})
}

async function initCode() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.codeType.id = <uuid,tree,SysCodeType.id>',
		header: 'Codes',
		name: 'data_obj_sys_admin_code_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysCode' }],
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
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Code',
		name: 'data_obj_sys_admin_code_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysCode' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_list',
		header: 'Codes',
		name: 'node_obj_sys_admin_code_list',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_code_type_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_code_detail',
		header: 'Code',
		name: 'node_obj_sys_admin_code_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_code_list'
	})
}

async function initColumn() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <uuid,tree,SysApp.id>',
		header: 'Columns',
		name: 'data_obj_sys_admin_column_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysColumn' }],
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
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Column',
		name: 'data_obj_sys_admin_column_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysColumn' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_column_list',
		order: 20,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_column_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_column_list'
	})
}

async function initDataObj() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <uuid,tree,SysApp.id>',
		header: 'Data Objects',
		name: 'data_obj_sys_admin_data_obj_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObj' }],
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
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object',
		name: 'data_obj_sys_admin_data_obj_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObj' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_list',
		header: 'Data Objects',
		name: 'node_obj_sys_admin_data_obj_list',
		order: 30,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_detail',
		header: 'Data Object',
		name: 'node_obj_sys_admin_data_obj_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_list'
	})
}

async function initDataObjTable() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.id IN (SELECT sys_core::SysDataObj FILTER .id = <uuid,tree,SysDataObj.id>).tables.id',
		header: 'Tables',
		name: 'data_obj_sys_admin_data_obj_table_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObjTable' }],
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
				columnName: 'order',
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'index',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'table',
				dbOrderCrumb: 10,
				dbOrderSelect: 50,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Table',
		name: 'data_obj_sys_admin_data_obj_table_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObjTable' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				columnName: 'table',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_table_list',
		header: 'Tables',
		name: 'node_obj_sys_admin_data_obj_table_list',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_table_detail',
		header: 'Table',
		name: 'node_obj_sys_admin_data_obj_table_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_table_list'
	})
}

async function initDataObjColumn() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter:
			'.id IN (SELECT sys_core::SysDataObj FILTER .id = <uuid,tree,SysDataObj.id>).columns.id',
		header: 'Columns',
		name: 'data_obj_sys_admin_data_obj_column_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObjColumn' }],
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
				columnName: 'dbOrderSelect',
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'column',
				dbOrderCrumb: 10,
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Column',
		name: 'data_obj_sys_admin_data_obj_column_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObjColumn' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'column',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_column_list',
		header: 'Columns',
		name: 'node_obj_sys_admin_data_obj_column_list',
		order: 20,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_column_detail',
		header: 'Column',
		name: 'node_obj_sys_admin_data_obj_column_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_column_list'
	})
}

async function initDataObjAction() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <uuid,tree,SysApp.id>',
		header: 'Data Object Actions',
		name: 'data_obj_sys_admin_data_obj_action_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObjAction' }],
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
				columnName: 'order',
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 20,
				dbOrderSelect: 30,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Action',
		name: 'data_obj_sys_admin_data_obj_action_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysDataObjAction' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_list',
		header: 'Data Object Actions',
		name: 'node_obj_sys_admin_data_obj_action_list',
		order: 40,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_action_detail',
		header: 'Data Object Action',
		name: 'node_obj_sys_admin_data_obj_action_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_action_list'
	})
}

async function initDataObjNodeObj() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <uuid,tree,SysApp.id>',
		header: 'Node Objects',
		name: 'data_obj_sys_admin_node_obj_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysNodeObj' }],
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
				columnName: 'order',
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 20,
				dbOrderSelect: 30,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Node Object',
		name: 'data_obj_sys_admin_node_obj_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysNodeObj' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_node_obj_list',
		header: 'Node Objects',
		name: 'node_obj_sys_admin_node_obj_list',
		order: 50,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_node_obj_detail',
		header: 'Node Object',
		name: 'node_obj_sys_admin_node_obj_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_node_obj_list'
	})
}

async function initDataObjNodeObjFooter() {
	await addDataObj({
		actionsField: ['noa_list_new'],
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <uuid,tree,SysApp.id>',
		header: 'Node Object Footer',
		name: 'data_obj_sys_admin_node_obj_footer_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysNodeObjFooter' }],
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
				columnName: 'order',
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 20,
				dbOrderSelect: 30,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsField: ['noa_detail_new', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Node Object Footer',
		name: 'data_obj_sys_admin_node_obj_footer_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysNodeObjFooter' }],
		fields: [
			{
				columnName: 'id',
				dbOrderSelect: 10,
				indexTable: '0',
				isDisplay: false
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdAt',
				dbOrderSelect: 1000,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'createdBy',
				dbOrderSelect: 1010,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedAt',
				dbOrderSelect: 1020,
				indexTable: '0',
				isDisplay: true
			},
			{
				codeAccess: 'readOnly',
				columnName: 'modifiedBy',
				dbOrderSelect: 1030,
				indexTable: '0',
				isDisplay: true
			}
		]
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_node_obj_footer_list',
		header: 'Node Object Footers',
		name: 'node_obj_sys_admin_node_obj_footer_list',
		order: 60,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_node_obj_footer_detail',
		header: 'Node Object Footer',
		name: 'node_obj_sys_admin_node_obj_footer_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_node_obj_footer_list'
	})
}

async function initColumns() {
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Order - Select',
		name: 'dbOrderSelect'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Column',
		name: 'column'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Creator',
		name: 'creator'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Actions',
		name: 'detailActions'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Data Object',
		name: 'detailDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Header',
		name: 'detailHeader'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Name',
		name: 'detailName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Detail-Order',
		name: 'detailOrder'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Parent Node Name',
		name: 'detailParentNodeName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Detail-Sub Header',
		name: 'detailSubHeader'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Field Name',
		name: 'fieldName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'bool',
		header: 'Has Management Columns',
		name: 'hasMgmt'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Icon',
		name: 'icon'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Index',
		name: 'index'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Parent Index',
		name: 'indexParent'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Property',
		name: 'linkProperty'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Module',
		name: 'linkTableModule'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Link-Table Name',
		name: 'linkTableName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Actions',
		name: 'listActions'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Data Object',
		name: 'listDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Expression Filter',
		name: 'listExprFilter'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Header',
		name: 'listHeader'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Name',
		name: 'listName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'List-Order',
		name: 'listOrder'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Parent Node Name',
		name: 'listParentNodeName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'List-Sub Header',
		name: 'listSubHeader'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Objects Owner',
		name: 'objsOwner'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'int16',
		header: 'Order',
		name: 'order'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Columns',
		name: 'outputDetailColumns'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Node',
		name: 'outputDetailNode'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output Detail-Data Object',
		name: 'outputDetailDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Columns',
		name: 'outputListColumns'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Data Object',
		name: 'outputListDataObj'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Output List-Node',
		name: 'outputListNode'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Table',
		name: 'table'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Module',
		name: 'tableModule'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Name',
		name: 'tableName'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'str',
		header: 'Table-Owner',
		name: 'tableOwner'
	})
	await addColumn({
		owner: 'app_sys_admin',
		codeDataType: 'link',
		header: 'Tables',
		name: 'tables'
	})
}

async function initResources() {
	await userTypeResourcesPrograms([['ut_sys_admin', 'node_obj_sys_admin_app_list']])
}

export async function resetDB() {
	let query = ''
	const tables: Array<string> = []

	addStatement(
		`UPDATE sys_user::SysUserType FILTER .name = 'ut_sys_amin' SET { resources -= (SELECT sys_core::getNodeObjByName('node_pgm_sys_admin')) }`
	)

	// tables in delete order
	tables.push('sys_core::SysNodeObj')
	tables.push('sys_core::SysDataObj')
	tables.push('sys_core::SysObjConfig')

	tables.push('sys_db::SysTable')
	tables.push('sys_db::SysColumn')
	tables.push('sys_core::SysDataObjAction')

	tables.push('sys_core::SysCode')
	tables.push('sys_core::SysCodeType')

	tables.forEach((t) => {
		addStatement(`DELETE ${t} FILTER .owner.name = 'app_sys_admin'`)
	})

	addStatement('DELETE sys_core::SysApp FILTER .name = "app_sys_admin"')

	await execute(query)
	console.log('Admin-DB reset complete...')

	function addStatement(statement: string) {
		if (query) query += ' '
		query += statement + ';'
	}
}

async function initConfig() {
	await addDataObj({
		owner: 'app_sys_admin',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_sys_admin_data_obj_config_list',
		header: 'Data Object Configs',
		table: 'SysObjConfig',
		exprFilter: 'none',
		actionsField: ['noa_list_new'],
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
		actionsField: ['noa_detail_new', 'noa_detail_save_as', 'noa_detail_delete'],
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object Config',
		name: 'data_obj_sys_admin_data_obj_config_detail',
		owner: 'app_sys_admin',
		actionsQuery: [
			{
				name: 'qa_data_obj_config',
				queryTypes: ['saveInsert', 'saveUpdate'],
				timings: ['pre']
			}
		],
		table: 'SysObjConfig',
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
				exprPresetScalar: `(SELECT sys_core::getOrg('System'))`,
				link: { _table: { mod: 'sys_core', name: 'SysOrg' } }
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
				exprPresetScalar: `(SELECT true)`
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
		dataObj: 'data_obj_sys_admin_data_obj_config_list',
		header: 'Data Object Configs',
		name: 'node_obj_sys_admin_data_obj_config_list',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_pgm_sys_admin'
	})
	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_data_obj_config_detail',
		header: 'Data Object Config',
		name: 'node_obj_sys_admin_data_obj_config_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_data_obj_config_list'
	})
}
