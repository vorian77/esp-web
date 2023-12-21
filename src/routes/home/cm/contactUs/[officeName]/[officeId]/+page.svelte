<script lang="ts">
	import { Form as FormClass } from '$comps/dataObj/dataObjOld.js'
	import Form from '$comps/form/FormDetail.svelte'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { goto } from '$app/navigation'

	export let data

	const toastStore = getToastStore()

	const formDefn = data.formDefn
	let formObj = new FormClass(formDefn)

	async function onFormSubmitted(event: CustomEvent) {
		const respData = event.detail
		if (respData?.statusCode == 202) {
			toast('We received your message and will get back with you soon!', 'variant-filled-secondary')
			goto('/home')
		} else {
			toast(
				'Unable to send your message. Please try again or report this problem.',
				'variant-filled-error'
			)
		}
	}

	function toast(message: string, background: string) {
		const t: ToastSettings = {
			message,
			background
		}
		toastStore.trigger(t)
	}
</script>

<Form bind:formObj on:formSubmitted={onFormSubmitted} />
