import { sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjAction } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreDataObjAction() {
	sectionHeader('DataObjAction')

	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_save',
		header: 'Save',
		order: 100
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_new',
		header: 'New',
		order: 110
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_edit',
		header: 'Edit',
		order: 120
	})
	await addDataObjAction({
		color: 'variant-filled-error',
		owner: 'app_sys',
		name: 'noa_list_delete',
		header: 'Delete',
		order: 130
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_list_columns',
		header: 'Columns',
		order: 140
	})
	await addDataObjAction({
		allTabs: true,
		color: 'none',
		owner: 'app_sys',
		name: 'noa_detail_cancel',
		header: 'Cancel',
		order: 200
	})
	await addDataObjAction({
		allTabs: true,
		owner: 'app_sys',
		name: 'noa_detail_save',
		header: 'Save',
		order: 210
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_save_new',
		header: 'Save/New',
		order: 220
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_save_as',
		header: 'Save As',
		order: 230
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_new',
		header: 'New',
		order: 240
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_detail_delete',
		header: 'Delete',
		order: 250,
		color: 'variant-filled-error'
	})
	await addDataObjAction({
		allTabs: true,
		color: 'variant-ghost-primary',
		owner: 'app_sys',
		name: 'noa_back',
		header: '< Back',
		order: 5
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_common_refresh',
		header: 'Refresh',
		order: 300
	})
	await addDataObjAction({
		owner: 'app_sys',
		name: 'noa_common_print',
		header: 'Print',
		order: 400
	})
}
