import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initDOCMStudent } from '$server/dbEdge/init/dbEdgeInit2DOCMStudent'
import { initTraining } from '$server/dbEdge/init/dbEdgeInit2DOCMTraining'
import { initDOSysAdmin } from '$server/dbEdge/init/dbEdgeInit2DOSysAdmin'
import initDOReport from '$server/dbEdge/init/dbEdgeInit2DOReport'
import initDOSysAuth from '$server/dbEdge/init/dbEdgeInit2DOSysAuth'

export async function initDO() {
	sectionHeader('DataObj')
	await initDOCMStudent()
	await initTraining()
	await initDOReport()
	await initDOSysAdmin()
	await initDOSysAuth()
}
