import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { initPreColumn } from '$server/dbEdge/init/dbEdgeInit1PreColumn'
import { initPreDataObjAction } from '$server/dbEdge/init/dbEdgeInit1PreDataObjAction'
import { initPreDataObjFieldItem } from '$server/dbEdge/init/dbEdgeInit1PreDataObjFieldItem'
import { initDataObjFieldChips } from '$server/dbEdge/init/dbEdgeInit1PreDataObjFieldChips'
import { initPreTable } from '$server/dbEdge/init/dbEdgeInit1PreTable'
import { initPreTableColumn } from '$server/dbEdge/init/dbEdgeInit1PreTableColumn'

export async function initPre() {
	sectionHeader('Pre')
	await initPreColumn()
	await initPreDataObjAction()
	await initPreDataObjFieldItem()
	await initDataObjFieldChips()
	await initPreTable()
	await initPreTableColumn()
}
