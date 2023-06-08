<script lang="ts">
	import type { Form } from '$comps/esp/form/form'
	import {
		FieldElement,
		type FormSourceResponseType,
		Validation,
		ValidityField,
		ValidityLevel,
		ValidationStatus
	} from '$comps/esp/form/types'
	import FormElHeader from '$comps/esp/form/FormElHeader.svelte'
	import FormElInp from '$comps/esp/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/esp/form/FormElInpCheckbox.svelte'
	import FormElPictureTake from '$comps/esp/form/FormElPictureTake.svelte'
	import FormElInpRadio from '$comps/esp/form/FormElInpRadio.svelte'
	import FormElSelect from '$comps/esp/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/esp/form/FormElTextarea.svelte'
	import FormLink from '$comps/esp/form/FormLink.svelte'
	import DATABUS from '$lib/utils/databus.utils'
	import { createEventDispatcher } from 'svelte'

	export let formObj: Form
	export let surface = ''

	let pictBlob

	const dispatch = createEventDispatcher()

	function validateFieldBase(event) {
		const fieldName = event.target.name
		validateField(event, fieldName)
	}
	function validateFieldCheckbox(event) {
		const fieldName = event.target.name.split('.')[0]
		validateField(event, fieldName)
	}
	function validateField(event, fieldName) {
		const idx = formObj.fields.findIndex((f) => f.name == fieldName)

		const fieldForm = event.target.form
		const formData = new FormData(fieldForm)

		const v: Validation = formObj.fields[idx].validate(formData)
		setValidities(v.validityFields)
	}
	function setValidities(newValidities: [ValidityField]) {
		newValidities.forEach(({ index, validity }) => {
			formObj.fields[index].validity = validity
		})
	}

	async function submitForm(event: Event) {
		console.log('formObj.SUBMITFORM...')
		// validate form
		const formEl = event.target as HTMLFormElement
		const formData = new FormData(formEl)

		const v: Validation = formObj.validateForm(formData)
		if (v.status != ValidationStatus.valid) {
			setValidities(v.validityFields)
			return v
		}

		// save form data to bus
		DATABUS.upsert('form', formObj.id, formObj.data)
		console.log('formObj.data:', formObj.data)

		// post form to server
		if (formObj.source) {
			const url = formObj.source.processLocally ? '' : '/api/form'

			const responsePromise = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					action: 'form_submit',
					formId: formObj.id,
					source: formObj.source,
					data: { ...formObj.pageData, ...formObj.data }
				})
			})
			const response: FormSourceResponseType = await responsePromise.json()
			console.log('response:', response)

			// process response
			if (!response.success) {
				alert(response.message)
				return
			}
			formObj.submitResponse = response.data
		} else {
			formObj.submitResponse = formObj.data
		}
		// alert parent
		dispatch('formSubmitted', { formId: formObj.id, ...formObj.submitResponse })
	}
</script>

<div class="{surface} ">
	{#if formObj.header}
		<h1 class="h1 {formObj.subHeader ? '' : 'mb-5'}">{formObj.header}</h1>
	{/if}
	{#if formObj.subHeader}
		<div class="mb-5">
			<p class="text-sm text-gray-500">
				{formObj.subHeader}
			</p>
		</div>
	{/if}

	<form id={formObj.id} on:submit|preventDefault={submitForm}>
		{#each formObj.fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.type === 'checkbox'}
					<FormElInpCheckbox bind:field on:click={validateFieldCheckbox} />
				{:else if field.type === 'radio'}
					<FormElInpRadio bind:field on:change={validateFieldBase} />
				{:else if field.element === FieldElement.header}
					<FormElHeader bind:field pageData={formObj.pageData} values={formObj.values} />
				{:else if field.element === FieldElement.pictureTake}
					<FormElPictureTake bind:field bind:blob={pictBlob} on:change={validateFieldBase} />
					{#if field.pictBlob}
						blob: {field.pictBlob}
					{/if}
				{:else if field.element === FieldElement.select}
					<FormElSelect bind:field formName={formObj.id} on:change={validateFieldBase} />
				{:else if field.element === FieldElement.textarea}
					<FormElTextarea bind:field on:change={validateFieldBase} />
				{:else}
					<FormElInp bind:field on:change={validateFieldBase} />
				{/if}
			</div>

			{#if formObj.fields[index].validity.level == ValidityLevel.error}
				<div class="text-error-500 mb-3">
					<p class="">{formObj.fields[index].validity.message}</p>
				</div>
			{:else if formObj.fields[index].validity.level == ValidityLevel.warning}
				<div class="text-warning-500 mb-3">
					<p class="">{formObj.fields[index].validity.message}</p>
				</div>
			{/if}
		{/each}

		<button type="submit" class="btn variant-filled-primary w-full mt-2"
			>{formObj.submitButtonLabel}</button
		>
	</form>
	{#each formObj.footerText as txt}
		<div class="text-center {txt.fontSize}">
			<p>{txt.label}</p>
		</div>
	{/each}
	{#each formObj.footerLinks as link}
		<FormLink footerLink={link} on:form-link />
	{/each}
</div>
