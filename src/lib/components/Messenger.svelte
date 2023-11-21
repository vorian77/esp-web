<script lang="ts">
	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton'
	import { setNavStatusReset } from '$comps/nav/navStore'
	import type { DataObjStatus, ToastType } from '$comps/types'

	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export async function askB4Transition(
		navStatus: DataObjStatus,
		resetStatus: boolean,
		callback: Function
	) {
		let callbacks: Array<Function> = []
		if (resetStatus) callbacks.push(setNavStatusReset)
		callbacks.push(callback)

		if (navStatus.objHasChanged) {
			executeOnConfirm(
				'Discard Changes',
				'Are you sure you want discard your changes?',
				'Discard Changes',
				callbacks
			)
		} else {
			callbacks.forEach((c) => c())
		}
	}

	export function executeOnConfirm(
		title: string,
		body: string,
		buttonTextConfirm: string,
		callbackConfirmed: any,
		callbackCancelled: any = undefined
	) {
		const modal: ModalSettings = {
			type: 'confirm',
			title,
			body,
			buttonTextCancel: 'Keep Editing',
			buttonTextConfirm,
			response: (r: boolean) => {
				if (r) {
					if (Array.isArray(callbackConfirmed)) {
						callbackConfirmed.forEach((c) => c())
					} else {
						callbackConfirmed()
					}
				} else {
					if (callbackCancelled) callbackCancelled()
				}
			}
		}
		modalStore.trigger(modal)
	}

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
