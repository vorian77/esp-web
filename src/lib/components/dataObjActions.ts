import {
	capitalizeFirstLetter,
	type DataObjActionParms,
	DataObjActionParmsNode,
	ToastType
} from '$comps/types'
import {
	objActionListNew,
	objActionDetailDelete,
	objActionDetailNew,
	objActionDetailSaveInsert,
	objActionDetailSaveUpdate
} from '$comps/nav/navObjActions'

const FILENAME = 'dataObjActions'

export async function action(parms: DataObjActionParms): Promise<void | boolean> {
	switch (parms.action) {
		case 'noa_list_new':
			if (parms instanceof DataObjActionParmsNode) {
				objActionListNew(parms.navNode)
			}
			break

		case 'noa_detail_delete':
			if (parms instanceof DataObjActionParmsNode) {
				let msg = ''

				if (parms.navNode.nodeObj.dataObj) {
					if (parms.status.isInsertMode) {
						if (parms.status.objHasChanged) {
							msg = 'Are you sure you want to discard this record?'
						}
					} else {
						msg = 'Are you sure you want to delete this record (this action cannot be undone)?'
					}

					if (msg) {
						parms.messenger.executeOnConfirm(
							'Confirm Delete',
							msg,
							'Delete Record',
							async () => await objActionDetailDelete(parms.navNode, parms.obj.objData)
						)
					} else {
						await objActionDetailDelete(parms.navNode, parms.obj.objData)
					}
				}
				break
			}

		case 'noa_detail_new':
			if (parms instanceof DataObjActionParmsNode) {
				if (parms.status.objHasChanged) {
					parms.messenger.executeOnConfirm(
						'New Record',
						'Are you sure you want discard your changes?',
						'Discard Changes',
						async () => await objActionDetailNew(parms.navNode)
					)
				} else {
					await objActionDetailNew(parms.navNode)
				}
				break
			}

		case 'noa_detail_save':
			let msg = ''
			if (parms instanceof DataObjActionParmsNode) {
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

				if (parms.navNode) {
					parms.messenger.toast(ToastType.warning, `Saving ${parms.objType}...`)

					if (parms.navNode.nodeObj.dataObj) {
						if (parms.status.isInsertMode) {
							await objActionDetailSaveInsert(parms.navNode, parms.obj.objData)
						} else {
							await objActionDetailSaveUpdate(parms.navNode, parms.obj.objData)
						}
						// either data was saved or an error was caught when the query was processed
						parms.messenger.toast(
							ToastType.success,
							`${capitalizeFirstLetter(parms.objType)} saved!`
						)

						// save callbacks
						await parms.obj.saveCallbackExecute()
						parms.obj.saveCallbackReset()

						return true
					}
				}
			}
			break
	}
}
