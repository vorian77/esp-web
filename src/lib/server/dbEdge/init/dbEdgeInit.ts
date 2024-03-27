import { ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initReset } from '$server/dbEdge/init/dbEdgeInit0Reset'
import { initPre } from '$server/dbEdge/init/dbEdgeInit1Pre'
import { initDO } from '$server/dbEdge/init/dbEdgeInit2DO'
import { initOldUsers } from '$server/dbEdge/init/dbEdgeInitOldUsers'

// features
import { initFeatCMStudent } from '$server/dbEdge/init/dbEdgeInit0FeatStudent'
import { initFeatEmploy } from '$server/dbEdge/init/dbEdgeInit0FeatEmployment'
import { initFeatSysAdmin } from '$server/dbEdge/init/dbEdgeInit0FeatSysAdmin'
import { initReports } from '$server/dbEdge/init/dbEdgeInit0FeatReports'
import { initTraining } from '$server/dbEdge/init/dbEdgeInit2DOCMTraining'

export async function dbEdgeInit() {
	sectionHeader('Init Start')
	// await initSys()
	// await initFeatures()
	// await initFeatSysAdmin()
	await initTraining()
	await initFeatCMStudent()
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
	await initFeatEmploy()
	await initReports()
	await initTraining()
}

/* fixed field items example
{
  codeAccess: 'optional',
  codeElement: 'radio',
  columnName: 'gender',
  dbOrderSelect: 60,
  items: [
    {
      data: '1',
      display: 'Female'
    },
    {
      data: '2',
      display: 'Male'
    },
    {
      data: '3',
      display: 'Non-Binary/Third Gender'
    },
    {
      data: '4',
      display: 'Prefer Not To Say'
    }
  ]
},
*/
