<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { goto } from '$app/navigation'

	export let data

	const formDefn = data.formDefn
	let formObj = new FormClass(formDefn)

	async function onFormSubmitted(event) {
		const respData = event.detail
		if (respData?.statusCode == 202) {
			toast('We received your message and will get back with you soon!', 'variant-filled-secondary')
			goto('/apps')
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
