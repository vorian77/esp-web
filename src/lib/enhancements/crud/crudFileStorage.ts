import { TokenApiQueryDataTree } from '$lib/api'
import { type ActionQueryParms, ActionQueryTriggerTiming } from '$comps/nav/types.appQuery'
import { State } from '$comps/nav/types.appState'
import { objDelete, objUpload } from '$utils/utils.aws'
import { type ToastSettings } from '@skeletonlabs/skeleton'
import type { ResponseBody } from '$comps/types'
import { TokenApiFileUploadAction, TokenApiQueryType } from '$lib/api'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudFileUpload.ts'

let file: File | undefined = undefined
let fileAction: TokenApiFileUploadAction
let fileStorageKey: string | undefined

export async function qaExecuteFileStorage(
	queryActionName: string,
	state: State,
	queryType: TokenApiQueryType,
	queryTiming: ActionQueryTriggerTiming,
	table: string | undefined,
	data: TokenApiQueryDataTree,
	parms: ActionQueryParms
): Promise<TokenApiQueryDataTree> {
	if (queryTiming === ActionQueryTriggerTiming.pre) {
		const fieldData = data.getFieldData(table, parms.imageField)
		fileAction = fieldData.fileAction
		fileStorageKey = fieldData.storageKey

		switch (fileAction) {
			case TokenApiFileUploadAction.delete:
				fieldData.storageKey = undefined
				break

			case TokenApiFileUploadAction.none:
				break

			case TokenApiFileUploadAction.upload:
				file = fieldData.file
				fieldData.file = JSON.stringify(fieldData.file)
				break
		}
		fieldData.fileAction = TokenApiFileUploadAction.none
		data.setFieldData(table, parms.imageField, fieldData)
	} else {
		switch (fileAction) {
			case TokenApiFileUploadAction.delete:
				if (fileStorageKey) await fileDelete(state, fileStorageKey)
				break

			case TokenApiFileUploadAction.none:
				break

			case TokenApiFileUploadAction.upload:
				if (fileStorageKey && file) {
					await fileUpload(state, fileStorageKey, file)
				}
				break
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

const fileUpload = async function (state: State, storageKey: string, file: File) {
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
