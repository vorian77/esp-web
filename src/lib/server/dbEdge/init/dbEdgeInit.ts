import { resetDB } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { review } from '$server/dbEdge/init/dbEdgeInitUtilities2'
import initCore from '$server/dbEdge/init/dbEdgeInitCore'
import initSysAuth from '$server/dbEdge/init/dbEdgeInitSysAuth'
import initSysAdmin from '$server/dbEdge/init/dbEdgeInitSysAdmin'
import initCMStudent from '$server/dbEdge/init/dbEdgeInitCMStudent'
import initCMTraining from '$server/dbEdge/init/dbEdgeInitCMTraining'
import initResources from '$server/dbEdge/init/dbEdgeInitResources'
import initCMDataAI from '$server/dbEdge/init/dbEdgeInitCMDataAI'
import initCMDataMOED from '$server/dbEdge/init/dbEdgeInitCMDataMOED'
import { getDataObjByName, queryMultiple, querySingle } from '$routes/api/dbEdge/types.dbEdge'
import { getDataObjId, getDataObjById } from '$routes/api/dbEdge/dbEdgeUtilities'

const FILE = '/server/dbEdge/init'
const load = 0

export async function init() {
	if (load) {
		await resetDB()
		await initCore()
		await initSysAuth()
		await initCMTraining()
		await initCMStudent()
		await initResources()
		await initCMDataAI()
		// await initCMDataMOED()
		// await reviewDO()
		// await initReviewQuery()
		// await initSysAdmin()
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
