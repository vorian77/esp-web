import { codeTypes, codes, ResetDb, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'
import { addDataObjAction, addDataObjActionConfirm } from '$server/dbEdge/init/dbEdgeInitUtilities2'

export async function initPreDataObjAction() {
	sectionHeader('DataObjAction')

	// list
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'refresh',
		codeRenderShowSaveMode: 'any',
		header: 'Refresh',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_list_refresh',
		order: 100,
		owner: 'app_sys'
	})
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

	// detail
	await addDataObjAction({
		checkObjChanged: false,
		codeActionType: 'none',
		codeRenderShowSaveMode: 'any',
		color: 'none',
		header: 'Cancel',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_detail_cancel',
		order: 100,
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
		order: 110,
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
		order: 120,
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
		order: 130,
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
		order: 140,
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
		order: 150,
		owner: 'app_sys'
	})
	await addDataObjActionConfirm({
		confirmButtonLabel: 'Confirm Discard',
		confirmMessage: 'Are you sure you want to discard your data?',
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
		order: 160,
		owner: 'app_sys'
	})
	await addDataObjActionConfirm({
		confirmButtonLabel: 'Confirm Delete',
		confirmMessage: 'Are you sure you want to delete this record (this action cannot be reversed)?',
		confirmTitle: 'Delete Record',
		name: 'noa_detail_delete_update'
	})

	// config
	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'listNew',
		codeRenderShowSaveMode: 'any',
		header: 'New',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_list_config_new',
		order: 110,
		owner: 'app_sys'
	})
	await addDataObjActionConfirm({
		confirmButtonLabel: 'Ok',
		confirmMessage: 'Please save the parent record before a child record can be created.',
		confirmTitle: 'New Child Record',
		name: 'noa_list_config_new'
	})

	// dialog
	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'dialogCancel',
		codeRenderShowSaveMode: 'any',
		color: 'none',
		header: 'Cancel',
		isRenderDisableOnInvalidToSave: false,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_dialog_cancel',
		order: 100,
		owner: 'app_sys'
	})
	await addDataObjActionConfirm({
		confirmButtonLabel: 'Confirm Cancel',
		confirmMessage: 'Are you sure you want to discard your data?',
		confirmTitle: 'Cancel',
		name: 'noa_dialog_cancel'
	})

	await addDataObjAction({
		checkObjChanged: true,
		codeActionType: 'dialogDone',
		codeRenderShowSaveMode: 'any',
		header: 'Done',
		isRenderDisableOnInvalidToSave: true,
		isRenderShowRequiresObjHasChanged: false,
		name: 'noa_dialog_done',
		order: 110,
		owner: 'app_sys'
	})
}
