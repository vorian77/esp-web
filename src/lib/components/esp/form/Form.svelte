<script lang="ts">
	import type { Form } from '$comps/esp/form/form'
	import {
		FieldElement,
		Validation,
		ValidityField,
		ValidityErrorLevel,
		ValidationStatus,
		ValidityError
	} from '$comps/esp/form/types'
	import FormElHeader from '$comps/esp/form/FormElHeader.svelte'
	import FormElInp from '$comps/esp/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/esp/form/FormElInpCheckbox.svelte'
	import FormElPictureTake from '$comps/esp/form/FormElPictureTake.svelte'
	import FormElInpRadio from '$comps/esp/form/FormElInpRadio.svelte'
	import FormElSelect from '$comps/esp/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/esp/form/FormElTextarea.svelte'
	import FormLink from '$comps/esp/form/FormLink.svelte'
	import { createEventDispatcher } from 'svelte'
	import { onMount } from 'svelte'

	export let formObj: Form
	export let surface = ''
	let pictBlob

	const dispatch = createEventDispatcher()
	const submitButtonName = 'submitButton'

	onMount(() => {
		formObj.elForm = document.getElementById(formObj.name)
		formObj.elSubmitButton = document.getElementById(submitButtonName)

		// pre-validate form
		const v: Validation = formObj.loadValidateForm()
		if (v.status == ValidationStatus.invalid) {
			setValidities(v.validityFields)
			setValidToSubmit(false)
		}
	})

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
	function setValidities(newValidities: Array<ValidityField>) {
		let formStatus = ValidationStatus.valid
		newValidities.forEach(({ index, validity }) => {
			formObj.fields[index].validity = validity
		})
		setValidToSubmit(formObj.fields.every(({ validity }) => validity.error == ValidityError.none))
	}
	function setValidToSubmit(status: boolean) {
		formObj.validToSubmit = status
		// if (status) formObj.elSubmitButton.focus()
	}
	function keyUp(event: KeyboardEvent) {
		const fieldName = event.target.name
		validateField(event, fieldName)
	}
	export async function submitForm() {
		console.log('SUBMIT FORM...')
		console.log('formObj.SUBMITFORM...')

		// validate form
		const v: Validation = formObj.validateForm()
		if (v.status != ValidationStatus.valid) {
			setValidities(v.validityFields)
			return v
		}
		setValidToSubmit(true)

		// post form to server
		await formObj.submitForm()

		// alert parent
		dispatch('formSubmitted', { formName: formObj.name, ...formObj.submitResponse })
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

	Valid To Submit: {formObj.validToSubmit}

	<form id={formObj.name} on:submit|preventDefault={submitForm}>
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
					<FormElSelect bind:field formName={formObj.name} on:change={validateFieldBase} />
				{:else if field.element === FieldElement.textarea}
					<FormElTextarea bind:field on:change={validateFieldBase} />
				{:else}
					<FormElInp bind:field on:change={validateFieldBase} on:keyup={keyUp} />
				{/if}
			</div>

			{#if formObj.fields[index].validity.level == ValidityErrorLevel.error}
				<div class="text-error-500 mb-3">
					<p class="">{formObj.fields[index].validity.message}</p>
				</div>
			{:else if formObj.fields[index].validity.level == ValidityErrorLevel.warning}
				<div class="text-warning-500 mb-3">
					<p class="">{formObj.fields[index].validity.message}</p>
				</div>
			{/if}
		{/each}

		<button
			id={submitButtonName}
			type="submit"
			class="btn variant-filled-primary w-full mt-2"
			disabled={!formObj.validToSubmit}
		>
			{formObj.submitButtonLabel}
		</button>
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

<pre>{JSON.stringify(formObj.fields, null, 2)}</pre>
