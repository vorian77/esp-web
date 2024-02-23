import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initFeatCMStudent } from '$server/dbEdge/init/dbEdgeInit0FeatStudent'
import { initTraining } from '$server/dbEdge/init/dbEdgeInit2DOCMTraining'
import { initFeatSysAdmin } from '$server/dbEdge/init/dbEdgeInit0FeatysAdmin'
import initDOReport from '$server/dbEdge/init/dbEdgeInit2DOReport'
import initDOSysAuth from '$server/dbEdge/init/dbEdgeInit2DOSysAuth'

export async function initDO() {
	sectionHeader('DataObj')
	await initFeatCMStudent()
	await initTraining()
	await initDOReport()
	await initFeatSysAdmin()
	await initDOSysAuth()
}
