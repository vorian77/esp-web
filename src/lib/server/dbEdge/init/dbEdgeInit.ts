import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initReset } from '$server/dbEdge/init/dbEdgeInit0Reset'
import { initPre } from '$server/dbEdge/init/dbEdgeInit1Pre'
import { initDO } from '$server/dbEdge/init/dbEdgeInit2DO'

// features
import { initFeatCMStudent } from '$server/dbEdge/init/dbEdgeInit0FeatStudent'
import { initFeatDocument } from '$server/dbEdge/init/dbEdgeInit0FeatDocument'
import { initFeatEmploy } from '$server/dbEdge/init/dbEdgeInit0FeatEmployment'
import { initFeatSysAdmin } from '$server/dbEdge/init/dbEdgeInit0FeatysAdmin'
import { initTraining } from '$server/dbEdge/init/dbEdgeInit2DOCMTraining'

export async function dbEdgeInit() {
	sectionHeader('Init Start')
	await initFeatSysAdmin()
	// await initSys()
	// await initFeatCMStudent()
	// await initFeatDocument()
	// await initFeatEmploy()
	// await initTraining()
	sectionHeader('Init Complete')
}
export async function initSys() {
	// await initReset()
	// await initPre()
	// await initDO()
}
