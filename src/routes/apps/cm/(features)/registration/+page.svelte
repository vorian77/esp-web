<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton'
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'

	export let data
	let submitForm = async () => {}
	let lockedState: boolean = false

	const forms = initForms(['reg_personal'])

	function initForms(list: []) {
		let forms = {}
		list.forEach((f) => {
			forms[f] = new FormDefn(data[f])
		})
		return forms
	}

	async function onNextHandler(e: {
		step: number
		state: { current: number; total: number }
	}): void {
		console.log('event:next', e)
		await forms['reg_personal'].submitForm()
	}
</script>

<h1 class="h1">MOED Youth Opportunity Program Registration</h1>
<p class="p mb-10">This wizard walks you though submitting an application to MOED YO-Baltimore.</p>

<Stepper
	badge="variant-filled-secondary"
	active="variant-filled-primary"
	buttonNext="variant-filled-primary"
	on:next={onNextHandler}
>
	<Step locked={!forms['reg_personal'].validToSubmit}>
		<svelte:fragment slot="header">About Me</svelte:fragment>
		<Form bind:formObj={forms['reg_personal']} />
	</Step>
	<Step>
		<svelte:fragment slot="header">(header)</svelte:fragment>
		Step 2
	</Step>
	<Step>
		<svelte:fragment slot="header">(header)</svelte:fragment>
		Step 3
	</Step>
</Stepper>
