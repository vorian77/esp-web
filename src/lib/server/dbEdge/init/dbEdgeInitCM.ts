import {
	addCodeType,
	addColumn,
	addForm,
	addFormFieldItemsList,
	addNodeObj,
	execute
} from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	codes,
	codeTypes,
	userType,
	userUserType,
	nodeObjPrograms,
	userTypeResourcesApps,
	userTypeResourcesPrograms,
	userTypeResourcesWidgets,
	tables,
	tableColumns,
	widgets
} from '$server/dbEdge/init/dbEdgeInitUtilities'

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
		['ct_cm_service_flow_status', 'app_cm', 'Open', 1],
		['ct_cm_service_flow_status', 'app_cm', 'Suspended', 3],
		['ct_cm_service_flow_status', 'app_cm', 'Completed', 4],
		['ct_cm_service_flow_status', 'app_cm', 'Dropped Out', 5]
	])

	await tables([
		['app_cm', 'app_cm', 'Student', true],
		['app_cm', 'app_cm', 'ClientServiceFlow', true],
		['app_cm', 'app_cm', 'ClientCohort', true],
		['app_cm', 'app_cm', 'ClientCohortAttd', true],
		['app_cm', 'app_cm', 'ClientNote', true]
	])

	await addFormFieldItemsList({
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
		owner: 'app_cm',
		codeDataType: 'str',
		header: 'Agency ID',
		name: 'agencyId',
		placeHolder: 'Enter agency ID',
		creator: 'user_sys'
	})
	await addColumn({
		owner: 'app_cm',
		codeDataType: 'str',
		header: 'Service Flow',
		name: 'serviceFlow',
		placeHolder: 'Enter service flow',
		creator: 'user_sys'
	})
	await addColumn({
		owner: 'app_cm',
		codeDataType: 'str',
		header: 'Student',
		name: 'student',
		placeHolder: 'Enter student',
		creator: 'user_sys'
	})
}

async function initTableColumns() {
	await tableColumns([
		['app_cm', 'Student', 'agencyId'],
		['app_cm', 'Student', 'createdAt'],
		['app_cm', 'Student', 'createdBy'],
		['app_cm', 'Student', 'email'],
		['app_cm', 'Student', 'firstName'],
		['app_cm', 'Student', 'fullName'],
		['app_cm', 'Student', 'id'],
		['app_cm', 'Student', 'lastName'],
		['app_cm', 'Student', 'modifiedAt'],
		['app_cm', 'Student', 'modifiedBy'],
		['app_cm', 'Student', 'note']
	])
}

async function initServiceFlow() {
	await tables([['app_cm', 'app_cm', 'ServiceFlow', true]])

	/* form_cm_service_flow_list */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormList',
		codeCardinality: 'list',
		name: 'form_cm_service_flow_list',
		header: 'Service Flows',
		table: {
			owner: 'app_cm',
			mod: 'app_cm',
			name: 'ClientServiceFlow'
		},
		exprFilter: '.student.id = <uuid,tree,app_cm::Student;id>',
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
				columnName: 'dateStart',
				dbOrderSelect: 40
			},
			{
				codeAccess: 'readOnly',
				columnName: 'dateEnd',
				dbOrderSelect: 50
			},
			{
				codeAccess: 'readOnly',
				columnName: 'note',
				dbOrderSelect: 60
			}
		]
	})

	/* form_cm_service_flow_detail */
	await addForm({
		creator: 'user_sys',
		owner: 'app_cm',
		codeComponent: 'FormDetail',
		codeCardinality: 'detail',
		name: 'form_cm_service_flow_detail',
		header: 'Service Flow',
		table: { owner: 'app_cm', mod: 'app_cm', name: 'ServiceFlow' },
		actions: ['noa_detail_save', 'noa_detail_new', 'noa_detail_delete'],
		fields: [
			{
				codeAccess: 'optional',
				codeElement: 'select',
				columnName: 'codeStatus',
				dbOrderSelect: 50,
				itemsList: 'il_sys_code_order_index_by_codeTypeName',
				itemsListParms: { codeTypeName: 'ct_cm_service_flow_status' }
			},
			{
				codeAccess: 'optional',
				codeElement: 'date',
				columnName: 'dateStartEst',
				dbOrderSelect: 170
			},
			{
				codeAccess: 'optional',
				codeElement: 'textArea',
				columnName: 'note',
				dbOrderSelect: 170
			},
			{
				codeAccess: 'readOnly',
				columnName: 'id',
				dbOrderSelect: 180,
				isDbFilter: true,
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
