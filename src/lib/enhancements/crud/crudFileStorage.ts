import { type ActionQueryParms, ActionQueryTriggerTiming } from '$comps/nav/types.appQuery'
import { State } from '$comps/nav/types.appState'
import { objDelete, objUpload } from '$utils/utils.aws'
import { type ToastSettings } from '@skeletonlabs/skeleton'
import type { ResponseBody } from '$comps/types'
import {
	TokenApiFileUpload,
	TokenApiFileUploadData,
	TokenApiFileUploadAction,
	TokenApiQueryDataTree,
	TokenApiQueryType
} from '$comps/types.token'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudFileUpload.ts'

let file: File | undefined = undefined
let fileAction: TokenApiFileUploadAction | undefined
let storageKey: string | undefined
let uploadData: TokenApiFileUploadData

export async function qaExecuteFileStorage(
	queryActionName: string,
	state: State,
	queryType: TokenApiQueryType,
	queryTiming: ActionQueryTriggerTiming,
	table: string | undefined,
	data: TokenApiQueryDataTree,
	parms: ActionQueryParms
): Promise<TokenApiQueryDataTree> {
	const fieldData: TokenApiFileUpload = data.getFieldData(table, parms.imageField)

	console.log('qaExecuteFileStorage.fieldData', {
		queryType,
		queryTiming,
		fileAction,
		fieldData
	})
	if (
		![
			TokenApiQueryType.delete,
			TokenApiQueryType.saveInsert,
			TokenApiQueryType.saveUpdate
		].includes(queryType)
	)
		return data

	if (queryTiming === ActionQueryTriggerTiming.pre) {
		fileAction =
			queryType === TokenApiQueryType.delete
				? TokenApiFileUploadAction.delete
				: fieldData.fileAction

		switch (fileAction) {
			case TokenApiFileUploadAction.delete:
				storageKey = fieldData.storageKey
				data.setFieldData(table, parms.imageField, {})
				break

			case TokenApiFileUploadAction.none:
				break

			case TokenApiFileUploadAction.upload:
				file = fieldData.file
				uploadData = new TokenApiFileUploadData(
					fieldData.storageKey!,
					fieldData.fileName!,
					fieldData.fileType!
				)
				data.setFieldData(table, parms.imageField, uploadData)

				break

			default:
				error(500, {
					file: FILENAME,
					function: 'qaExecuteFileStorage',
					message: `Invalid fileAction: ${fieldData.fileAction}`
				})
		}
	} else {
		switch (fileAction) {
			case TokenApiFileUploadAction.delete:
				if (storageKey) await fileDelete(state, storageKey)
				break

			case TokenApiFileUploadAction.none:
				break

			case TokenApiFileUploadAction.upload:
				if (uploadData && uploadData.storageKey && file) {
					await fileUpload(state, uploadData, file)
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'qaExecuteFileStorage',
					message: `Invalid fileAction: ${fieldData.fileAction}`
				})
		}
	}

	return data
}

const fileDelete = async function (state: State, storageKey: string) {
	const result: ResponseBody = await objDelete(storageKey)
	if (!result.success) {
		alert(`Unabled to delete avatar. Processing cancelled.`)
		return
	}
	const toastSettings: ToastSettings = {
		background: 'variant-filled-secondary',
		message: 'Avatar deleted successfully!'
	}
	state.messageToast.trigger(toastSettings)
}

const fileUpload = async function (state: State, uploadData: TokenApiFileUploadData, file: File) {
	const storageKey = uploadData.isImage ? 'raw/' + uploadData.storageKey : uploadData.storageKey
	const result: ResponseBody = await objUpload(storageKey, file)
	if (!result.success) {
		alert(`Unabled to upload ${file.name}. Processing cancelled.`)
		return
	}
	const toastSettings: ToastSettings = {
		background: 'variant-filled-secondary',
		message: 'Avatar uploaded successfully!'
	}
	state.messageToast.trigger(toastSettings)
}
