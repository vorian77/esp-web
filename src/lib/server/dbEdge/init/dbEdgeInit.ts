import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initReset } from '$server/dbEdge/init/dbEdgeInit0Reset'
import { initPre } from '$server/dbEdge/init/dbEdgeInit1Pre'
import { initDO } from '$server/dbEdge/init/dbEdgeInit2DO'

// features
import { initFeatEmploy } from '$server/dbEdge/init/dbEdgeInit0FeatEmployment'
import { initFeatDocument } from '$server/dbEdge/init/dbEdgeInit0FeatDocument'
import { initTraining } from '$server/dbEdge/init/dbEdgeInit2DOCMTraining'
import { initDOCMStudent } from '$server/dbEdge/init/dbEdgeInit2DOCMStudent'

export async function dbEdgeInit() {
	sectionHeader('Init Start')
	// await initSys()
	// await initDOCMStudent()
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
