import { ResetDb } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { review } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import initCore from '$server/dbEdge/init/dbEdgeInitOldCore'
import initSysAuth from '$server/dbEdge/init/dbEdgeInit2DOSysAuth'
// import initSysAdmin from '$server/dbEdge/init/dbEdgeInit0FeatysAdmin'
// import initCMStudent from '$server/dbEdge/init/dbEdgeInit0FeatStudent'
// import initCMTraining from '$server/dbEdge/init/dbEdgeInit2DOCMTraining'
import initCMDataAI from '$server/dbEdge/init/dbEdgeInitOldCMDataAI'
import initCMDataMOED from '$server/dbEdge/init/dbEdgeInitOldCMDataMOED'
import { getDataObjByName, queryMultiple, querySingle } from '$routes/api/dbEdge/types.dbEdge'
import { getDataObjId, getDataObjById } from '$routes/api/dbEdge/dbEdgeUtilities'

const FILE = '/server/dbEdge/init'
const load = false

export async function init() {
	if (load) {
		await reset()
		await initCore()
		await initSysAuth()
		// await initCMTraining()
		// await initCMStudent()
		await initCMDataAI()
		// await initCMDataMOED()
		// await reviewDO()
		await initSysAdmin()
	}
}

async function reviewDO() {
	const dataObjName = 'data_obj_auth_login'
	console.log('init..')

	const dataObjId = await getDataObjId(dataObjName)
	console.log()
	console.log('dbEdgeInit.review...')
	console.log('dataObjId:', { dataObjId })

	if (dataObjId && Object.hasOwn(dataObjId, 'id')) {
		const dataObj = await getDataObjById(dataObjId.id)
		if (dataObj) {
			console.log()
			console.log('dataObj:')
			console.log('name:', dataObj.name)
			console.log(dataObj)

			// console.log()
			// console.log('dataObj._tables:')
			// console.log(dataObj?._tables)

			// console.log()
			// console.log('dataObj._fieldsDbId._tables:')
			// console.log(dataObj?._fieldsDbId[0]._tables)

			// const queryData = new TokenApiQueryData({})
			// const query = new EdgeQL(dataObj)
			// const result = query.getScriptSelectUser(queryData)
			// query.getScriptPreset(queryData)
			// query.getScriptSaveUpdate(queryData)

			// const rawDataList = await queryMultiple(query.getScriptSelectUser(queryData))
			// query.getScriptSelectUser(queryData)
		}
	}
}

async function initReviewQuery() {
	//let reviewQuery = ''
	// reviewQuery = `select sys_core::ObjRoot {**} filter .name = 'root' order by .name`
	//await review(FILE, reviewQuery)
}

async function reset() {
	const resetDb = new ResetDb()

	resetDb.addStatement('UPDATE sys_user::SysUser SET { modifiedBy := sys_user::getRootUser()}')

	resetDb.delTableRecords('app_cm::CmCsfCohortAttd')
	resetDb.delTableRecords('app_cm::CmCsfCohort')
	resetDb.delTableRecords('app_cm::CmCsfNote')
	resetDb.delTableRecords('app_cm::CmClientServiceFlow')
	resetDb.delTableRecords('app_cm::CmClient')

	resetDb.delTableRecords('app_cm::CmCohort')
	resetDb.delTableRecords('app_cm::CmCourse')
	resetDb.delTableRecords('app_cm::CmServiceFlow')

	resetDb.delTableRecords('sys_core::SysNodeObj')

	resetDb.addStatement(`UPDATE sys_core::SysDataObjColumn SET { fieldChips := {} }`)

	resetDb.delTableRecords('sys_core::SysDataObj')
	resetDb.delTableRecords('sys_core::SysDataObjFieldListItems')
	resetDb.delTableRecords('sys_core::SysDataObjTable')
	resetDb.delTableRecords('sys_core::SysObjConfig')

	resetDb.delTableRecords('sys_db::SysTable')
	resetDb.delTableRecords('sys_db::SysColumn')
	resetDb.delTableRecords('sys_core::SysDataObjAction')
	resetDb.delTableRecords('sys_user::SysWidget')
	resetDb.delTableRecords('sys_user::SysUserType')

	resetDb.delTableRecords('sys_user::SysStaff')

	resetDb.delTableRecords('sys_user::SysUser')

	resetDb.delTableRecords('sys_core::SysCode')
	resetDb.delTableRecords('sys_core::SysCodeType')

	resetDb.addStatement(`DELETE default::SysPerson FILTER .firstName not in  {"Root", "System"}`)

	resetDb.delTableRecords('sys_core::SysObj')
	resetDb.delTableRecords('sys_user::UserRoot')
	resetDb.delTableRecords('sys_core::ObjRoot')

	await resetDb.execute()
}
