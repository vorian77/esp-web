import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initReset } from '$server/dbEdge/init/dbEdgeInit0Reset'
import { initPre } from '$server/dbEdge/init/dbEdgeInit1Pre'
import { initDO } from '$server/dbEdge/init/dbEdgeInit2DO'
import { initOldUsers } from '$server/dbEdge/init/dbEdgeInitOldUsers'

// features
import { initFeatCMStudent } from '$server/dbEdge/init/dbEdgeInit0FeatStudent'
import { initFeatDocument } from '$server/dbEdge/init/dbEdgeInit0FeatDocument'
import { initFeatEmploy } from '$server/dbEdge/init/dbEdgeInit0FeatEmployment'
import { initFeatSysAdmin } from '$server/dbEdge/init/dbEdgeInit0FeatSysAdmin'
import { initReports } from '$server/dbEdge/init/dbEdgeInit0FeatReports'
import { initTraining } from '$server/dbEdge/init/dbEdgeInit2DOCMTraining'

export async function dbEdgeInit() {
	sectionHeader('Init Start')
	await initSys()
	await initFeatures()
	// await initFeatSysAdmin()
	sectionHeader('Init Complete')
}
export async function initSys() {
	await initReset()
	await initOldUsers()
	await initPre()
	await initDO()
}

export async function initFeatures() {
	await initFeatSysAdmin()
	await initFeatCMStudent()
	await initFeatDocument()
	await initFeatEmploy()
	await initReports()
	await initTraining()
}
