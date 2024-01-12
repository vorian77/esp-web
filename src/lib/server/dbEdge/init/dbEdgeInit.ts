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

const FILE = '/server/dbEdge/init'
const load = 1

export async function init() {
	if (load) {
		await resetDB()
		await initCore()
		await initSysAuth()
		await initSysAdmin()
		await initCMTraining()
		await initCMStudent()
		await initResources()
		await initCMDataAI()
		await initCMDataMOED()
		// await initReviewQuery()
	}
}

async function initReviewQuery() {
	let reviewQuery = ''
	// reviewQuery = `select sys_core::ObjRoot {**} filter .name = 'root' order by .name`
	await review(FILE, reviewQuery)
}
