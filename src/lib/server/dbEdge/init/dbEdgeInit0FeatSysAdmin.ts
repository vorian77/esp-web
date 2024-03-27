import {
	ResetDb,
	sectionHeader,
	userTypeResourcesPrograms
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addColumn,
	addDataObj,
	addDataObjFieldItems,
	addDataObjFieldListConfig,
	addDataObjFieldListSelect,
	addNodeProgramObj
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initFeatSysAdmin() {
	sectionHeader('DataObject - SysAdmin')
	await reset()
	await initFeatures()
}

async function reset() {
	sectionHeader('Reset')
	const reset = new ResetDb()

	reset.addStatement(
		`UPDATE sys_user::SysUserType FILTER .name = 'ut_sys_admin' SET { resources -= (SELECT sys_core::getNodeObjByName('node_obj_sys_admin_app_list')) }`
	)

	reset.delFeature('sys_admin_data_obj_config')
	reset.delFeature('sys_admin_table')
	reset.delFeature('sys_admin_node_obj_footer')
	reset.delFeature('sys_admin_node_obj')
	reset.delFeature('sys_admin_data_obj_action')
	reset.delFeature('sys_admin_data_obj_column')
	reset.delFeature('sys_admin_data_obj_table')
	reset.delFeature('sys_admin_data_obj')
	reset.delFeature('sys_admin_column')
	reset.delFeature('sys_admin_code')
	reset.delFeature('sys_admin_code_type')
	reset.delFeature('sys_admin_app')

	reset.delFieldSelect('field_list_select_sys_column')

	reset.delFieldConfig('flc_data_obj_tables')
	reset.delDataObj('doflc_data_obj_tables_edit')
	reset.delDataObj('doflc_data_obj_tables_display')

	await reset.execute()
}

async function initFeatures() {
	await initFieldListConfigDataObjTables()
	await initApp()
	await initCodeType()
	await initCode()
	await initDataObj()
	await initDataObjTable()

	// await initDataObjColumn() - do not implemented

	await initColumn()
	await initDataObjAction()
	await initDataObjNodeObj()
	await initDataObjNodeObjFooter()
	await initTable()

	// await initConfig() - do not implement
}

async function initFieldListConfigDataObjTables() {
	sectionHeader('Field List Config - DataObj.Tables')

	await addDataObj({
		actionsFieldGroup: 'doag_base_config_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: `.id IN (SELECT sys_core::SysDataObj FILTER .id = <uuid,parms,listRecordIdParent>).tables.id`,
		header: 'Data Object - Tables',
		name: 'doflc_data_obj_tables_display',
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
				columnName: 'index',
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'table',
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'indexParent',
				dbOrderSelect: 40,
				headerAlt: 'Parent Table Index',
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'columnParent',
				dbOrderSelect: 50,
				headerAlt: 'Parent Table Column',
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				dbOrderList: 10,
				dbOrderSelect: 60,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsFieldGroup: 'doag_base_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Data Object - Table',
		name: 'doflc_data_obj_tables_edit',
		owner: 'app_sys_admin',
		parentColumn: 'tables',
		parentTable: 'SysDataObj',
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
				columnName: 'index',
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'table',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_table_order_name',
				link: { table: { module: 'sys_db', name: 'SysTable' } }
			},
			{
				codeAccess: 'optional',
				columnName: 'indexParent',
				dbOrderSelect: 40,
				headerAlt: 'Parent Table Index',
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'columnParent',
				dbOrderSelect: 50,
				fieldListItems: 'il_sys_column_order_name',
				headerAlt: 'Parent Table Column',
				indexTable: '0',
				link: { table: { module: 'sys_db', name: 'SysColumn' } }
			},
			{
				columnAccess: 'optional',
				columnName: 'order',
				dbOrderSelect: 60,
				indexTable: '0'
			}
		]
	})

	await addDataObjFieldListConfig({
		actionsFieldGroup: 'doag_base_dialog_detail',
		dataObjConfig: 'doflc_data_obj_tables_edit',
		dataObjDisplay: 'doflc_data_obj_tables_display',
		name: 'flc_data_obj_tables',
		isMultiSelect: true,
		owner: 'app_sys_admin'
	})
}

async function initApp() {
	await addDataObj({
		actionsFieldGroup: 'doag_base_list',
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
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				dbOrderSelect: 30,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsFieldGroup: 'doag_base_detail',
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
				codeAccess: 'optional',
				columnName: 'header',
				dbOrderCrumb: 15,
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

	await userTypeResourcesPrograms([['ut_sys_admin', 'node_obj_sys_admin_app_list']])

	await userTypeResourcesPrograms([
		['ut_sys_admin', 'node_pgm_cm_staff_adm'],
		['ut_sys_admin', 'node_pgm_cm_staff_provider'],
		['ut_sys_admin', 'node_pgm_cm_student']
	])
}

async function initCodeType() {
	await addDataObj({
		actionsFieldGroup: 'doag_base_list',
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
				columnName: 'parent',
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
				columnName: 'header',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				dbOrderSelect: 50,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsFieldGroup: 'doag_base_detail',
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
				columnName: 'owner',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'parent',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_codeType_order_name',
				link: { table: { module: 'sys_core', name: 'SysCodeType' } }
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'order',
				dbOrderSelect: 60,
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
		actionsFieldGroup: 'doag_base_list',
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
				columnName: 'parent',
				dbOrderSelect: 20,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeType',
				dbOrderSelect: 30,
				indexTable: '0',
				link: { columnsDisplay: ['name'] }
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderList: 10,
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueDecimal',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueInteger',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'valueString',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'order',
				dbOrderSelect: 90,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsFieldGroup: 'doag_base_detail',
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
				columnName: 'owner',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				columnName: 'codeType',
				dbOrderSelect: 30,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysCodeType FILTER .id = <uuid,tree,SysCodeType.id>)`,
					table: { module: 'sys_core', name: 'SysCodeType' }
				}
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'parent',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_id',
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				codeAccess: 'optional',
				columnName: 'valueDecimal',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				codeAccess: 'optional',
				columnName: 'valueInteger',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'valueString',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'order',
				dbOrderSelect: 90,
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
		actionsFieldGroup: 'doag_base_list',
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
			},
			{
				codeAccess: 'readOnly',
				columnName: 'header',
				dbOrderSelect: 30,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsFieldGroup: 'doag_base_detail',
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
				columnName: 'header',
				dbOrderSelect: 25,
				indexTable: '0'
			},
			{
				columnName: 'owner',
				dbOrderSelect: 15,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'codeDataType',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_db_col_data_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'select',
				columnName: 'codeAlignment',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_db_col_alignment' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				columnName: 'placeHolder',
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'headerSide',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Database' },
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeElement: 'toggle',
				columnName: 'isExcludeInsert',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeElement: 'toggle',
				columnName: 'isExcludeSelect',
				dbOrderSelect: 90,
				indexTable: '0'
			},
			{
				codeElement: 'toggle',
				columnName: 'isExcludeUpdate',
				dbOrderSelect: 100,
				indexTable: '0'
			},
			{
				codeElement: 'toggle',
				columnName: 'isSetBySys',
				dbOrderSelect: 110,
				indexTable: '0'
			},
			{
				codeElement: 'toggle',
				columnName: 'isSelfReference',
				dbOrderSelect: 120,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'File' },
				dbOrderSelect: 130,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'exprStorageKey',
				dbOrderSelect: 140,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Link' },
				dbOrderSelect: 150,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Multi-Select' },
				dbOrderSelect: 170,
				indexTable: '0'
			},
			{
				codeElement: 'toggle',
				columnName: 'isMultiSelect',
				dbOrderSelect: 180,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Numeric' },
				dbOrderSelect: 190,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'numeric',
				columnName: 'minValue',
				dbOrderSelect: 200,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'numeric',
				columnName: 'maxValue',
				dbOrderSelect: 210,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'spinStep',
				dbOrderSelect: 220,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'String' },
				dbOrderSelect: 230,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'matchColumn',
				dbOrderSelect: 240,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'numeric',
				columnName: 'minLength',
				dbOrderSelect: 250,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'numeric',
				columnName: 'maxLength',
				dbOrderSelect: 260,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'pattern',
				dbOrderSelect: 270,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'patternMsg',
				dbOrderSelect: 280,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'patternReplacement',
				dbOrderSelect: 290,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Toggle' },
				dbOrderSelect: 300,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'togglePresetTrue',
				dbOrderSelect: 305,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'toggleValueTrue',
				dbOrderSelect: 310,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'toggleValueFalse',
				dbOrderSelect: 320,
				indexTable: '0'
			},
			{
				codeElement: 'custom',
				columnName: 'custom_element',
				customElement: { _type: 'header', label: 'Text Area' },
				dbOrderSelect: 330,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'classValue',
				dbOrderSelect: 340,
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
		actionsFieldGroup: 'doag_base_list',
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
		actionsFieldGroup: 'doag_base_detail',
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
				columnName: 'owner',
				dbOrderSelect: 15,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				dbOrderSelect: 30,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'subHeader',
				dbOrderSelect: 35,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'description',
				dbOrderSelect: 40,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeCardinality',
				dbOrderSelect: 50,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_do_cardinality' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeElement: 'select',
				columnName: 'codeComponent',
				dbOrderSelect: 60,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_do_component' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'exprFilter',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'exprObject',
				dbOrderSelect: 80,
				indexTable: '0'
			},
			{
				codeElement: 'listConfig',
				columnName: 'tables',
				dbOrderSelect: 100,
				fieldListConfig: 'flc_data_obj_tables',
				indexTable: '0',
				link: { table: { module: 'sys_core', name: 'SysDataObjTable' } }
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
		actionsFieldGroup: 'doag_base_list',
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
		actionsFieldGroup: 'doag_base_detail',
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
				codeElement: 'select',
				columnName: 'table',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_table_order_name',
				link: { table: { module: 'sys_core', name: 'SysTable' } }
			}

			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'createdAt',
			// 	dbOrderSelect: 1000,
			// 	indexTable: '0',
			// 	isDisplay: true
			// },
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'createdBy',
			// 	dbOrderSelect: 1010,
			// 	indexTable: '0',
			// 	isDisplay: true
			// },
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'modifiedAt',
			// 	dbOrderSelect: 1020,
			// 	indexTable: '0',
			// 	isDisplay: true
			// },
			// {
			// 	codeAccess: 'readOnly',
			// 	columnName: 'modifiedBy',
			// 	dbOrderSelect: 1030,
			// 	indexTable: '0',
			// 	isDisplay: true
			// }
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
		actionsFieldGroup: 'doag_base_list',
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
		actionsFieldGroup: 'doag_base_detail',
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
		actionsFieldGroup: 'doag_base_list',
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
		actionsFieldGroup: 'doag_base_detail',
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
				columnName: 'owner',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'order',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'color',
				dbOrderSelect: 100,
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
		actionsFieldGroup: 'doag_base_list',
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
		actionsFieldGroup: 'doag_base_detail',
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
				columnName: 'owner',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'codeType',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_node_obj_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'parent',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_sys_node_obj_order_name',
				link: { table: { module: 'sys_core', name: 'SysNodeObj' } }
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'order',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeIcon',
				dbOrderSelect: 80,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_node_obj_icon' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'dataObj',
				dbOrderSelect: 90,
				indexTable: '0',
				fieldListItems: 'il_sys_data_obj_order_name',
				link: { table: { module: 'sys_core', name: 'SysDataObj' } }
			},
			{
				codeAccess: 'optional',
				columnName: 'page',
				dbOrderSelect: 100,
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
		actionsFieldGroup: 'doag_base_list',
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
		actionsFieldGroup: 'doag_base_detail',
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
				columnName: 'owner',
				dbOrderSelect: 20,
				indexTable: '0',
				isDisplay: false,
				link: {
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				codeElement: 'select',
				columnName: 'codeType',
				dbOrderSelect: 30,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_node_obj_type' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'parent',
				dbOrderSelect: 40,
				indexTable: '0',
				fieldListItems: 'il_sys_node_obj_order_name',
				link: { table: { module: 'sys_core', name: 'SysNodeObj' } }
			},
			{
				columnName: 'name',
				dbOrderCrumb: 10,
				dbOrderSelect: 50,
				indexTable: '0'
			},
			{
				codeAccess: 'optional',
				columnName: 'header',
				dbOrderSelect: 60,
				indexTable: '0'
			},
			{
				codeElement: 'number',
				columnName: 'order',
				dbOrderSelect: 70,
				indexTable: '0'
			},
			{
				codeElement: 'select',
				columnName: 'codeIcon',
				dbOrderSelect: 80,
				indexTable: '0',
				fieldListItems: 'il_sys_code_order_name_by_codeType_name',
				fieldListItemsParms: { codeTypeName: 'ct_sys_node_obj_icon' },
				link: { table: { module: 'sys_core', name: 'SysCode' } }
			},
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'dataObj',
				dbOrderSelect: 90,
				indexTable: '0',
				fieldListItems: 'il_sys_data_obj_order_name',
				link: { table: { module: 'sys_core', name: 'SysDataObj' } }
			},
			{
				codeAccess: 'optional',
				columnName: 'page',
				dbOrderSelect: 100,
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

async function initTable() {
	// field list select - columns
	await addDataObj({
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: 'none',
		header: 'Select Table - Columns',
		subHeader: 'Columns associated with the selected table.',
		name: 'data_obj_field_list_select_sys_column',
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

	await addDataObjFieldListSelect({
		actionsFieldGroup: 'doag_base_dialog_list',
		btnLabelComplete: 'Select Column(s)',
		dataObjDisplay: 'data_obj_field_list_select_sys_column',
		dataObjSelect: 'data_obj_field_list_select_sys_column',
		isMultiSelect: true,
		name: 'field_list_select_sys_column',
		owner: 'app_sys_admin'
	})

	// data objects
	await addDataObj({
		actionsFieldGroup: 'doag_base_list',
		codeCardinality: 'list',
		codeComponent: 'FormList',
		exprFilter: '.owner.id = <uuid,tree,SysApp.id>',
		header: 'Tables',
		name: 'data_obj_sys_admin_table_list',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysTable' }],
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
				columnName: 'mod',
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeAccess: 'readOnly',
				columnName: 'name',
				dbOrderList: 10,
				dbOrderSelect: 20,
				indexTable: '0'
			}
		]
	})

	await addDataObj({
		actionsFieldGroup: 'doag_base_detail',
		codeCardinality: 'detail',
		codeComponent: 'FormDetail',
		header: 'Table',
		name: 'data_obj_sys_admin_table_detail',
		owner: 'app_sys_admin',
		tables: [{ index: '0', table: 'SysTable' }],
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
					exprSave: `(SELECT sys_core::SysApp FILTER .id = <uuid,tree,SysApp.id>)`,
					table: { module: 'sys_core', name: 'SysOrg' }
				}
			},
			{
				columnName: 'mod',
				dbOrderCrumb: 10,
				dbOrderSelect: 10,
				indexTable: '0'
			},
			{
				columnName: 'name',
				dbOrderCrumb: 20,
				dbOrderSelect: 20,
				indexTable: '0'
			},
			{
				codeElement: 'listSelect',
				columnName: 'columns',
				dbOrderSelect: 30,
				fieldListSelect: 'field_list_select_sys_column',
				indexTable: '0',
				link: { table: { module: 'sys_db', name: 'SysColumn' } }
			},
			{
				codeElement: 'toggle',
				columnName: 'hasMgmt',
				dbOrderSelect: 40,
				exprPresetScalar: '(SELECT false)',
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
		dataObj: 'data_obj_sys_admin_table_list',
		header: 'Tables',
		name: 'node_obj_sys_admin_table_list',
		order: 120,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_app_detail'
	})

	await addNodeProgramObj({
		codeIcon: 'application',
		dataObj: 'data_obj_sys_admin_table_detail',
		header: 'Table',
		name: 'node_obj_sys_admin_table_detail',
		order: 10,
		owner: 'app_sys_admin',
		parentNodeName: 'node_obj_sys_admin_table_list'
	})
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
		actionsFieldGroup: 'doag_base_list',
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
		actionsField: ['noa_detail_new', 'noa_detail_save_as', 'noa_detail_delete_update'],
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
				dbOrderSelect: 45
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
		parentNodeName: 'node_obj_sys_admin_app_list'
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
