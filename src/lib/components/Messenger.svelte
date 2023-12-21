<script lang="ts">
	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton'
	import { getAppStatus } from '$comps/nav/app'
	import type { NavState, ToastType } from '$comps/types'
	// import { AppStateConfirm, NavStateTokenAppObjAction } from '$comps/types'

	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export function test() {
		console.log('messenger.test...')
	}

	export async function askB4Transition() {
		// appState: NavState
		// stateSet: Function | undefined = undefined,
		// callbacksCancelled: Array<Function> | undefined = undefined
		return true
		// if (!appState.checkObjChanged || !getAppStatus().objHasChanged) return true
		// const confirm =
		// 	appState.token instanceof NavStateTokenAppObjAction && appState.token.confirm
		// 		? appState.token.confirm
		// 		: new AppStateConfirm(
		// 				'Discard Changes',
		// 				'Are you sure you want discard your changes?',
		// 				'Discard Changes'
		// 		  )
		// return await executeOnConfirm(appState, confirm, stateSet, callbacksCancelled)
	}

	// export async function executeOnConfirm(
	// 	appState: NavState,
	// 	confirm: AppStateConfirm,
	// 	stateSet: Function | undefined = undefined,
	// 	callbacksCancelled: Array<Function> | undefined = undefined
	// ) {
	// 	const modal: ModalSettings = {
	// 		type: 'confirm',
	// 		title: confirm.title,
	// 		body: confirm.msg,
	// 		buttonTextCancel: 'Keep Editing',
	// 		buttonTextConfirm: confirm.buttonConfirmLabel,
	// 		response: async (r: boolean) => {
	// 			if (r) {
	// 				// await stateSet(appState)
	// 				return true
	// 			} else {
	// 				return false
	// 				// 	if (Array.isArray(callbacksCancelled))
	// 				// 		for (const callback of callbacksCancelled) await callback()
	// 				// }
	// 			}
	// 		}
	// 	}
	// 	modalStore.trigger(modal)
	// }

	export function msgAlert(message: string) {
		alert(message)
	}

	export function toast(type: ToastType, message: string) {
		const background = {
			success: 'variant-filled-secondary',
			warning: 'variant-filled-warning',
			error: 'variant-filled-error'
		}
		const t: ToastSettings = {
			background: background[type],
			message
		}
		toastStore.trigger(t)
	}
</script>
