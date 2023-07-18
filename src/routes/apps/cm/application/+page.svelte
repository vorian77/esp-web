<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton'
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import ElgDocsList from '$routes/apps/cm/docs/ElgDocsList.svelte'
	import AddressSelect from '$comps/AddressSelect.svelte'
	import { toastStore } from '@skeletonlabs/skeleton'
	import { onMount } from 'svelte'

	export let data
	const docsStatus = data.docsStatus
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

		switch (currentStep) {
			case 0:
				// about me
				await forms[0][1].submitForm()
				break
			case 1:
				// contact info
				await forms[1][1].submitForm()
				break
			case 2:
				// office preference
				forms[2][1].pageData.cm_ssr_site = cm_ssr_site
				await forms[2][1].submitForm()
				break
		}
	}

	async function onCompleteHandler(e): void {
		// update status
		const responsePromise = await fetch('/apps/cm/application', {
			method: 'POST'
		})
		const response = await responsePromise.json()
		toastStore.trigger({
			message:
				'Great job completing your application. New opportunity begins today! We will review your information and get back with you soon!'
		})
		history.back()
	}
</script>

<h1 class="h1">MOED Youth Opportunity Program Application</h1>
<p class="p mb-10">This wizard walks you though submitting an application to MOED YO-Baltimore.</p>

<Stepper
	badge="variant-filled-secondary"
	active="variant-filled-primary"
	buttonNext="variant-filled-primary"
	on:next={onStepHandler}
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

	<Step>
		<svelte:fragment slot="header">Proofs of Eligibility</svelte:fragment>
		<ElgDocsList {docsStatus} />
	</Step>
</Stepper>
