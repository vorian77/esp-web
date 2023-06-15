<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton'
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import { onMount } from 'svelte'

	export let data

	let lockedState: boolean = false

	const forms = initForms(data.formDefns)

	function initForms(list: []) {
		let forms = []
		list.forEach((defn) => {
			forms.push([defn, new FormDefn(defn)])
		})
		return forms
	}

	async function onCompleteHandler(e): void {
		const currentStep = e.detail.step
		console.log('event:step:', currentStep)
		await forms[currentStep][1].submitForm()
	}

	async function onNextHandler(e) {
		const currentStep = e.detail.step
		console.log('event:step:', currentStep)
		await forms[currentStep][1].submitForm()
	}
</script>

<h1 class="h1">MOED Youth Opportunity Program Registration</h1>
<p class="p mb-10">This wizard walks you though submitting an application to MOED YO-Baltimore.</p>

<Stepper
	badge="variant-filled-secondary"
	active="variant-filled-primary"
	buttonNext="variant-filled-primary"
	on:next={onNextHandler}
	on:complete={onCompleteHandler}
>
	{#each forms as f, i}
		<Step locked={!forms[i][1].validToSubmit}>
			<!-- Valid To Submit: {forms[i][1].validToSubmit} -->
			<svelte:fragment slot="header">{forms[i][0].description}</svelte:fragment>
			<Form bind:formObj={forms[i][1]} />
		</Step>
	{/each}
</Stepper>

<!-- Form[0]
<pre>{JSON.stringify(forms[0][1], null, 2)}</pre> -->
