import { codeTypes, codes, ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjAction, addDataObjActionConfirm } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreDataObjAction() {
	sectionHeader('DataObjAction')

	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'listNew',
		codeRenderShowSaveMode: 'any',
		header: 'New',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_list_new',
		order: 110,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'listEdit',
		codeRenderShowSaveMode: 'any',
		header: 'Edit',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_list_edit',
		order: 120,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'none',
		codeRenderShowSaveMode: 'any',
		color: 'none',
		header: 'Cancel',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_detail_cancel',
		order: 200,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'detailSaveInsert',
		codeRenderShowSaveMode: 'insert',
		header: 'Save',
		isRenderDisableOnInvalidToSave: true,
		isRenderShowRequiresObjHasChanged: true,
		name: 'noa_detail_save_insert',
		order: 210,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'detailSaveUpdate',
		codeRenderShowSaveMode: 'update',
		header: 'Save',
		isRenderDisableOnInvalidToSave: true,
		isRenderShowRequiresObjHasChanged: true,
		name: 'noa_detail_save_update',
		order: 220,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'detailSaveAs',
		codeRenderShowSaveMode: 'any',
		header: 'Save As',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_detail_save_as',
		order: 230,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'detailNew',
		codeRenderShowSaveMode: 'any',
		header: 'New',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_detail_new',
		order: 240,
		owner: 'app_sys'
	})
	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'detailDelete',
		codeRenderShowSaveMode: 'insert',
		color: 'variant-filled-error',
		header: 'Delete',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_detail_delete_insert',
		order: 245,
		owner: 'app_sys'
	})
	await addDataObjActionConfirm({
		confirmButtonLabel: 'Confirm Discard',
		confirmMessage: 'Are you sure you want to discard the data you have entered?',
		confirmTitle: 'Discard Data',
		name: 'noa_detail_delete_insert'
	})

	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'detailDelete',
		codeRenderShowSaveMode: 'update',
		color: 'variant-filled-error',
		header: 'Delete',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_detail_delete_update',
		order: 250,
		owner: 'app_sys'
	})
	await addDataObjActionConfirm({
		confirmButtonLabel: 'Confirm Delete',
		confirmMessage: 'Are you sure you want to delete this record (this action cannot be reversed)?',
		confirmTitle: 'Delete Record',
		name: 'noa_detail_delete_update'
	})
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'refresh',
		codeRenderShowSaveMode: 'any',
		header: 'Refresh',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_common_refresh',
		order: 300,
		owner: 'app_sys'
	})
}
