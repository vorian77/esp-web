<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import { goto } from '$app/navigation'

	export let data

	const formDefn = data.formDefn
	let formObj = new FormClass(formDefn)

	async function onFormSubmitted(event) {
		const respData = event.detail
		console.log('onFormSubmit.data:', respData)
		if (respData.hasOwnProperty('cssm_date_received')) {
			alert('We received your message and will get back with you soon!')
			goto('/apps')
		} else {
			alert('Unable to send your message. Please try again or report this problem.')
		}
	}
</script>

<Form bind:formObj on:formSubmitted={onFormSubmitted} />
