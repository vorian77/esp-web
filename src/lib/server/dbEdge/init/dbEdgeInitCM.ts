import {
	addCodeType,
	addColumn,
	addForm,
	addNodeObj,
	execute
} from '$server/dbEdge/types.edgeDB.server'
import {
	apps,
	codes,
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
	await data()
	await dataUserSys()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

const reviewQuery = ''

async function data() {
	await apps([['app_cm']])

	await codes([
		// icons
		['ct_sys_node_obj_icon', 'app_cm', 'goals', 0],
		['ct_sys_node_obj_icon', 'app_cm', 'message', 1],
		['ct_sys_node_obj_icon', 'app_cm', 'activities', 2],
		['ct_sys_node_obj_icon', 'app_cm', 'quote-enclosed', 3]
	])

	await tables([['app_cm', 'app_cm', 'Student', true]])
	await addColumn({
		owner: 'app_cm',
		codeDataType: 'str',
		header: 'Agency ID',
		name: 'agencyId',
		placeHolder: 'Enter agency ID',
		creator: 'user_sys'
	}),
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
	await widgets([
		['app_cm', 'widget_cm_user'],
		['app_cm', 'widget_cm_quotes']
	])
}

async function dataUserSys() {
	/* sys user */
	await userTypeResourcesApps([['ut_sys_admin', 'app_cm']])
}
