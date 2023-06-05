<script lang="ts">
	import type { Form } from '$comps/esp/form/form'
	import {
		FieldElement,
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

	export let form: Form
	export let responseData = {}
	export let surface = ''

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
		const idx = form.fields.findIndex((f) => f.name == fieldName)

		const fieldForm = event.target.form
		const formData = new FormData(fieldForm)

		const v: Validation = form.fields[idx].validate(formData)
		setValidities(v.validityFields)
	}
	function setValidities(newValidities: [ValidityField]) {
		newValidities.forEach(({ index, validity }) => {
			form.fields[index].validity = validity
		})
	}

	async function submitForm(event: Event) {
		// validate form
		const formEl = event.target as HTMLFormElement
		const formData = new FormData(formEl)

		const v: Validation = form.validateForm(formData)
		if (v.status != ValidationStatus.valid) {
			setValidities(v.validityFields)
			return v
		}

		// save form data to bus
		DATABUS.upsert('form', form.id, form.data)

		// post form to server
		if (form.sourceSave) {
			const url = form.sourceSave.processLocally ? '' : '/api/formFetch'

			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					action: 'form_submit',
					formId: form.id,
					source: form.sourceSave,
					data: { ...form.data, ...form.pageData }
				})
			})

			// process response
			responseData = await response.json()
			if (responseData.success == false) {
				alert(form.sourceSave.messageFailure)
				return
			}
		}
		// alert parent
		dispatch('formSubmitted', form.id)
	}
</script>

<div class="{surface} ">
	{#if form.header}
		<h1 class="h1 {form.subHeader ? '' : 'mb-5'}">{form.header}</h1>
	{/if}
	{#if form.subHeader}
		<div class="mb-5">
			<p class="text-sm text-gray-500">
				{form.subHeader}
			</p>
		</div>
	{/if}

	<form id={form.id} on:submit|preventDefault={submitForm}>
		{#each form.fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.type === 'checkbox'}
					<FormElInpCheckbox {field} on:click={validateFieldCheckbox} />
				{:else if field.type === 'radio'}
					<FormElInpRadio {field} on:change={validateFieldBase} />
				{:else if field.element === FieldElement.header}
					<FormElHeader {field} pageData={form.pageData} values={form.values} />
				{:else if field.element === FieldElement.pictureTake}
					<FormElPictureTake {field} on:change={validateFieldBase} />
				{:else if field.element === FieldElement.select}
					<FormElSelect {field} formName={form.id} on:change={validateFieldBase} />
				{:else if field.element === FieldElement.textarea}
					<FormElTextarea {field} on:change={validateFieldBase} />
				{:else}
					<FormElInp {field} on:change={validateFieldBase} />
				{/if}
			</div>

			{#if form.fields[index].validity.level == ValidityLevel.error}
				<div class="text-error-500 mb-3">
					<p class="">{form.fields[index].validity.message}</p>
				</div>
			{:else if form.fields[index].validity.level == ValidityLevel.warning}
				<div class="text-warning-500 mb-3">
					<p class="">{form.fields[index].validity.message}</p>
				</div>
			{/if}
		{/each}

		<button type="submit" class="btn variant-filled-primary w-full mt-2"
			>{form.submitButtonLabel}</button
		>
	</form>
	{#each form.footerText as txt}
		<div class="text-center {txt.fontSize}">
			<p>{txt.label}</p>
		</div>
	{/each}
	{#each form.footerLinks as link}
		<FormLink footerLink={link} on:form-link />
	{/each}
</div>

<!-- Form Definition:
<pre>{JSON.stringify(form, null, 2)}</pre> -->
