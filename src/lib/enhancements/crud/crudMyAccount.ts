import { App } from '$comps/nav/types.app'
import { ActionQueryTriggerTiming } from '$comps/nav/types.appQuery'
import { State } from '$comps/nav/types.appState'
import { TokenApiQueryType } from '$lib/api'
import type { DataObjRecord, ResponseBody } from '$comps/types'
import { userUpdate } from '$comps/types'
import { getURLDownload, objDelete, objExists, objUpload } from '$utils/utils.aws'
import { type ToastSettings } from '@skeletonlabs/skeleton'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/crud/crudMyAccount.ts'

let file: File | undefined = undefined
let fileStorageKey: string = ''

export default async function action(
	state: State,
	data: DataObjRecord,
	queryActionTiming: ActionQueryTriggerTiming,
	queryType: TokenApiQueryType
) {
	console.log('crudMyAccount', { queryActionTiming, queryType, data })

	if (
		queryActionTiming === ActionQueryTriggerTiming.post &&
		queryType === TokenApiQueryType.retrieve
	) {
		if (Object.hasOwn(data, 'avatar')) {
			fileStorageKey = data.avatar
			console.log('crudMyAccount.post/retrive', { file, fileStorageKey })
		}
	}

	if (
		queryActionTiming === ActionQueryTriggerTiming.pre &&
		queryType === TokenApiQueryType.saveUpdate
	) {
		if (Object.hasOwn(data, 'avatar')) {
			file = data.avatar.data
			console.log('crudMyAccount.pre/save', { file, fileStorageKey })
		}
	}

	if (
		queryActionTiming === ActionQueryTriggerTiming.post &&
		queryType === TokenApiQueryType.saveUpdate
	) {
		userUpdate(data)
		console.log('crudMyAccount.post/save', { file, fileStorageKey })

		if (fileStorageKey && file) {
			await fileUpload(state, fileStorageKey, file)
		} else {
			if (fileStorageKey) await fileDelete(state, fileStorageKey)
		}
	}
	return data
}

const fileDelete = async function (state: State, storageKey: string) {
	console.log('crudMyAccount.fileDelete:', { storageKey })
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
	console.log('crudMyAccount.fileUpload:', { storageKey, file })
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
