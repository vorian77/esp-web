<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton'
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import AddressSelect from '$comps/AddressSelect.svelte'
	import { onMount } from 'svelte'

	export let data
	let cm_ssr_site: number = 0

	onMount(() => {
		cm_ssr_site = data.formDefns[2].pageData.cm_ssr_site
	})

	const forms = initForms(data.formDefns)
	function initForms(list: []) {
		let forms = []
		list.forEach((defn) => {
			forms.push([defn, new FormClass(defn)])
		})
		return forms
	}

	async function onStepHandler(e) {
		const currentStep = e.detail.step
		const nextStep = e.detail.state.current
		// alert(`current: ${currentStep} - next: ${nextStep}`)

		// save data on current step
		await forms[currentStep][1].submitForm()

		// retrieve data on next step
		// forms[nextStep][1] = new FormDefn(forms[nextStep][0])
	}

	async function onCompleteHandler(e): void {
		const currentStep = e.detail.step
		// console.log('event:step:', currentStep)
		forms[currentStep][1].pageData.cm_ssr_site = cm_ssr_site
		await forms[currentStep][1].submitForm()
		alert(
			'Great job completing your application. New opportunity begins today! We will review your information and get back with you soon!'
		)
		history.back()
	}
</script>

<h1 class="h1">MOED Youth Opportunity Program Registration</h1>
<p class="p mb-10">This wizard walks you though submitting an application to MOED YO-Baltimore.</p>

<Stepper
	badge="variant-filled-secondary"
	active="variant-filled-primary"
	buttonNext="variant-filled-primary"
	on:next={onStepHandler}
	on:back={onStepHandler}
	on:complete={onCompleteHandler}
>
	{#each forms.filter((f, i) => i < 2) as form, i}
		<Step locked={!forms[i][1].validToSubmit}>
			<svelte:fragment slot="header">{forms[i][0].description}</svelte:fragment>
			<Form bind:formObj={forms[i][1]} />
		</Step>
	{/each}

	<Step locked={!(cm_ssr_site > 0)}>
		<svelte:fragment slot="header">{forms[2][0].description}</svelte:fragment>
		<AddressSelect bind:formObj={forms[2][1]} bind:currentSite={cm_ssr_site} />
	</Step>
</Stepper>
