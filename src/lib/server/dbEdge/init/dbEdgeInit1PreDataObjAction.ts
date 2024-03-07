import { codeTypes, codes, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjAction } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreDataObjAction() {
	sectionHeader('DataObjAction')

	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'listNew',
		header: 'New',
		name: 'noa_list_new',
		order: 110,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'listEdit',
		header: 'Edit',
		name: 'noa_list_edit',
		order: 120,
		owner: 'app_sys'
	})
	await addDataObjAction({
		allTabs: true,
		checkObjChanged: false,
		codeActionType: 'none',
		color: 'none',
		header: 'Cancel',
		name: 'noa_detail_cancel',
		order: 200,
		owner: 'app_sys'
	})
	await addDataObjAction({
		allTabs: true,
		checkObjChanged: false,
		codeActionType: 'detailSaveInsert',
		header: 'Save',
		name: 'noa_detail_save',
		order: 210,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'detailSaveAs',
		header: 'Save As',
		name: 'noa_detail_save_as',
		order: 230,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'detailNew',
		header: 'New',
		name: 'noa_detail_new',
		order: 240,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'detailDelete',
		color: 'variant-filled-error',
		header: 'Delete',
		name: 'noa_detail_delete',
		order: 250,
		owner: 'app_sys'
	})
	await addDataObjAction({
		allTabs: true,
		checkObjChanged: true,
		codeActionType: 'back',
		color: 'variant-ghost-primary',
		header: '< Back',
		name: 'noa_back',
		order: 5,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'refresh',
		header: 'Refresh',
		name: 'noa_common_refresh',
		order: 300,
		owner: 'app_sys'
	})
}
