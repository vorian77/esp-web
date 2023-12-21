import { NavStateComponent, ObjActionConfirm, capitalizeFirstLetter, ToastType } from '$comps/types'
import { triggerState } from '$comps/nav/app'
import type Messenger from '$comps/Messenger.svelte'

const FILENAME = 'dataObjActions'

export async function action(parms: any): Promise<void | boolean> {
	// let parm: AppStateParm
	let msg = ''

	switch (parms.action) {
		case 'noa_list_new':
			// objAction(AppStateDataActionType.listNew, new AppStateParm())
			break

		case 'noa_detail_delete':
			// if (parms.status.isInsertMode) {
			// 	if (parms.status.objHasChanged) {
			// 		msg = 'Are you sure you want to discard this record?'
			// 	}
			// } else {
			// 	msg = 'Are you sure you want to delete this record (this action cannot be undone)?'
			// }

			// parm = msg
			// 	? (parm = new AppStateParm({
			// 			data: parms.obj.objData,
			// 			confirm: new AppStateConfirm('Confirm Delete', msg, 'Delete Record')
			// 	  }))
			// 	: (parm = new AppStateParm({ data: parms.obj.objData }))
			// objAction(AppStateDataActionType.detailDelete, parm)
			break

		case 'noa_detail_new':
			// parm = parms.status.objHasChanged
			// 	? new AppStateParm({
			// 			data: {},
			// 			confirm: new AppStateConfirm(
			// 				'New Record',
			// 				'Are you sure you want discard your changes?',
			// 				'Discard Changes'
			// 			)
			// 	  })
			// 	: (parm = new AppStateParm())
			// objAction(AppStateDataActionType.detailNew, parm)
			break

		case 'noa_detail_save':
			if (!parms.status.objValidToSave) {
				msg = `Please check your ${parms.objType}. It is not valid to save.`
				parms.messenger.msgAlert(msg)
				return false
			}

			if (!parms.status.objHasChanged) {
				msg = `Nothing to save. ${capitalizeFirstLetter(parms.objType)} has not changed.`
				parms.messenger.toast(ToastType.warning, msg)
				return false
			}

			/* process save */
			parms.messenger.toast(ToastType.warning, `Saving ${parms.objType}...`)

			// objAction(
			// 	parms.status.isInsertMode
			// 		? AppStateDataActionType.detailSaveInsert
			// 		: AppStateDataActionType.detailSaveUpdate,
			// 	new AppStateParm({ data: parms.obj.objData })
			// )

			// <temp> 231204 - bug?? - either data was saved or an error was thrown when the query was processed
			parms.messenger.toast(ToastType.success, `${capitalizeFirstLetter(parms.objType)} saved!`)

			// save callbacks
			await parms.obj.saveCallbackExecute()
			parms.obj.saveCallbackReset()

			return true

			break
	}
}

// function objAction(actionType: AppStateDataActionType, actionParm: AppStateParm) {
// 	await triggerState({
// 		component: AppStateComponent.objAction,
// 		dataActionType: actionType,
// 		data: actionParm
// 	})
// }
