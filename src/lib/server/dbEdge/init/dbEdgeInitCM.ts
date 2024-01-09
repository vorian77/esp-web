import {
	apps,
	codes,
	codeTypes,
	userTypeResourcesApps,
	tables,
	tableColumns,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addColumn,
	addDataObj,
	addDataObjFieldItems
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'init_cm'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initCore()
	await initColumns()
	await initTableColumns()
	await initServiceFlow()
	await initResources()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

const reviewQuery = ''

async function initCore() {
	await apps([['app_cm']])

	await codeTypes([['app_cm', 0, 'ct_cm_service_flow_status']])

	await codes([
		// icons
		['ct_sys_node_obj_icon', 'app_cm', 'goals', 0],
		['ct_sys_node_obj_icon', 'app_cm', 'message', 1],
		['ct_sys_node_obj_icon', 'app_cm', 'activities', 2],
		['ct_sys_node_obj_icon', 'app_cm', 'quote-enclosed', 3],

		['ct_cm_service_flow_status', 'app_cm', 'Pending', 0],
		['ct_cm_service_flow_status', 'app_cm', 'Proceeding', 1],
		['ct_cm_service_flow_status', 'app_cm', 'Suspended', 3],
		['ct_cm_service_flow_status', 'app_cm', 'Completed', 4],
		['ct_cm_service_flow_status', 'app_cm', 'Dropped Out', 5]
	])

	await tables([
		['app_cm', 'app_cm', 'Client', true],
		['app_cm', 'app_cm', 'ClientServiceFlow', true],
		['app_cm', 'app_cm', 'ClientCohort', true],
		['app_cm', 'app_cm', 'ClientCohortAttd', true],
		['app_cm', 'app_cm', 'ClientNote', true]
	])

	await addDataObjFieldItems({
		creator: 'user_sys',
		owner: 'app_cm',
		dbSelect: 'SELECT app_cm::ServiceFlow {data := .id, display := .header} ORDER BY .header',
		propertyId: 'id',
		propertyLabel: 'name',
		name: 'il_cm_service_flow'
	})
}

async function initColumns() {
	await addColumn({
		codeDataType: 'str',
		creator: 'user_sys',
		header: 'Agency ID',
		name: 'agencyId',
		owner: 'app_cm',
		placeHolder: 'Enter agency ID'
	})
	await addColumn({
		codeDataType: 'edgeType',
		codeDataTypePreset: 'str',
		creator: 'user_sys',
		edgeTypeDefn: {
			property: 'person.fullName',
			table: { mod: 'app_cm', name: 'Client' }
		},
		exprPreset:
			'(SELECT app_cm::Client { data := .id, display := .person.fullName } FILTER .id = <uuid,record,id>)',
		header: 'Client',
		name: 'client',
		owner: 'app_cm'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'End Date',
		name: 'dateEnd'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Referral Date',
		name: 'dateReferral'
	})
	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'date',
		header: 'Start Date',
		name: 'dateStart'
	})
	await addColumn({
		codeDataType: 'edgeType',
		creator: 'user_sys',
		edgeTypeDefn: { property: 'header', table: { mod: 'app_cm', name: 'ServiceFlow' } },
		header: 'Service Flow',
		name: 'serviceFlow',
		owner: 'app_cm'
	})
	await addColumn({
		codeDataType: 'computed',
		codeDataTypePreset: 'date',
		creator: 'user_sys',
		exprSelect: `.serviceFlow { data := .id, display := .header }`,
		header: 'Service Flow',
		isExcludeUpdate: true,
		name: 'serviceFlowComputed',
		owner: 'app_cm'
	})
}

async function initTableColumns() {
	await tableColumns([
		['app_cm', 'Client', 'agencyId'],
		['app_cm', 'Client', 'createdAt'],
		['app_cm', 'Client', 'createdBy'],
		['app_cm', 'Client', 'email'],
		['app_cm', 'Client', 'firstName'],
		['app_cm', 'Client', 'fullName'],
		['app_cm', 'Client', 'id'],
		['app_cm', 'Client', 'lastName'],
		['app_cm', 'Client', 'modifiedAt'],
		['app_cm', 'Client', 'modifiedBy'],
		['app_cm', 'Client', 'note']
	])
}

async function initServiceFlow() {
	await tables([['app_cm', 'app_cm', 'ServiceFlow', true]])

	await addColumn({
		creator: 'user_sys',
		owner: 'app_sys',
		codeDataType: 'edgeType',
		edgeTypeDefn: { property: 'dateReferral', table: { mod: 'app_cm', name: 'ClientServiceFlow' } },
		header: 'Service Flow',
		name: 'clientServiceFlow'
	})

	/* data_obj_cm_service_flow_list */
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'data_obj_cm_service_flow_list',
		header: 'Service Flows',
		table: {
			owner: 'app_cm',
			mod: 'app_cm',
			name: 'ClientServiceFlow'
		},
		exprFilter: '.client.id = <uuid,record,id>',
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
				columnName: 'serviceFlowComputed',
				dbOrderCrumb: 10,
				dbOrderSelect: 20
			},
			{
				codeAccess: 'readOnly',
				columnName: 'codeStatus',
				dbOrderSelect: 25
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateReferral',
				dbOrderCrumb: 20,
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

	/* data_obj_cm_service_flow_detail */
	await addDataObj({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'data_obj_cm_service_flow_detail',
		header: 'Service Flow',
		table: { owner: 'app_cm', mod: 'app_cm', name: 'ClientServiceFlow' },
		actions: ['noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'readOnly',
				columnName: 'client',
				dbOrderSelect: 10,
				isDisplay: false
			},
			{
				codeElement: 'select',
				columnName: 'serviceFlow',
				dbOrderSelect: 20,
				itemsList: 'il_cm_service_flow'
			},
			{
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 30,
				exprPreset: `(SELECT sys_core::Code { data := .id, display := .name } FILTER .codeType.name = 'ct_cm_service_flow_status' and .name = 'Pending')`,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_service_flow_status' }
			},
			{
				codeElement: 'date',
				columnName: 'dateReferral',
				dbOrderSelect: 35
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

async function initResources() {
	await widgets([
		['app_cm', 'widget_cm_user'],
		['app_cm', 'widget_cm_quotes']
	])

	/* sys user */
	await userTypeResourcesApps([['ut_sys_admin', 'app_cm']])
}
