<script lang="ts">
	import type { Form } from '$comps/esp/form/form'
	import type { Field } from '$comps/esp/form/field'
	import {
		FieldElement,
		Validation,
		ValidityField,
		ValidityErrorLevel,
		ValidationStatus,
		ValidityError
	} from '$comps/types'
	import FormElHeader from '$comps/esp/form/FormElHeader.svelte'
	import FormElInp from '$comps/esp/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/esp/form/FormElInpCheckbox.svelte'
	import FormElPictureTake from '$comps/esp/form/FormElPictureTake.svelte'
	import FormElInpRadio from '$comps/esp/form/FormElInpRadio.svelte'
	import FormElSelect from '$comps/esp/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/esp/form/FormElTextarea.svelte'
	import FormLink from '$comps/esp/form/FormLink.svelte'
	import { createEventDispatcher, onMount, tick } from 'svelte'
	import { error } from '@sveltejs/kit'

	const dispatch = createEventDispatcher()

	const FILENAME = '$comps/esp/form/FormDetail.svelte'
	const FORM_NAME = ''
	const SUBMIT_BUTTON_NAME = 'SUBMIT_BUTTON_NAME'

	export let formObj: Form
	export let surface = ''
	export let formHasChanged = false
	export let formValidToSubmit = true

	$: formHasChanged = formObj.fields.some((f) => f.hasChanged)
	$: formValidToSubmit = formObj.validToSubmit

	const classPopup = formObj.popup ? 'grid grid-cols-10 gap-4' : ''
	const classPopupHeader = formObj.popup ? 'col-span-9' : ''

	onMount(() => {
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
		const fieldForm = event.target.form
		const formData = new FormData(fieldForm)
		const idx = formObj.fields.findIndex((f) => f.name == fieldName)
		const v: Validation = formObj.fields[idx].validate(formData)
		setValidities(v.validityFields)
	}
	function setValidities(newValidities: Array<ValidityField>) {
		newValidities.forEach(({ index, validity }) => {
			formObj.fields[index].validity = validity
		})
		setValidToSubmit(formObj.fields.every(({ validity }) => validity.error == ValidityError.none))
	}
	function setValidToSubmit(status: boolean) {
		formObj.validToSubmit = status
	}
	function keyUp(event: KeyboardEvent) {
		const fieldName = event.target.name
		validateField(event, fieldName)
	}
	export async function submitForm() {
		// validate form
		const v: Validation = formObj.validateForm()
		if (v.status != ValidationStatus.valid) {
			setValidities(v.validityFields)
			return v
		}
		setValidToSubmit(true)

		// post form to server
		const responsePromise = await formObj.submitForm()
		const response = await responsePromise.json()

		// alert parent
		dispatch('formSubmitted', { formName: formObj.name, ...response.data })
	}

	function cancelForm(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

<div class={surface}>
	<div class="flex justify-between">
		<div>
			{#if formObj.header}
				<div class={classPopup}>
					<div class={classPopupHeader}>
						<h1 class="h1 {formObj.subHeader ? '' : 'mb-5'}">{formObj.header}</h1>
					</div>
				</div>
			{/if}
		</div>

		<div class="flex">
			<div>
				<slot name="actions" />
			</div>
			<div>
				{#if formObj.popup}
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled-error ml-2"
						on:click={cancelForm}>X</button
					>
				{/if}
			</div>
		</div>
	</div>

	{#if formObj.subHeader}
		<div class="mb-5">
			<p class="text-sm text-gray-500">
				{formObj.subHeader}
			</p>
		</div>
	{/if}

	<form id={'form_' + formObj.name} on:submit|preventDefault={submitForm}>
		{#each formObj.fields as field, idx (field.name)}
			<div class:mt-3={idx}>
				{#if field.element === FieldElement.header}
					<div class:mt-9={idx}>
						<FormElHeader bind:field formValues={formObj.values} />
					</div>
				{:else if field.element === FieldElement.input}
					{#if field.type === 'checkbox'}
						<FormElInpCheckbox bind:field on:click={validateFieldCheckbox} />
					{:else if field.type === 'radio'}
						<FormElInpRadio bind:field on:change={validateFieldBase} />
					{:else}
						<FormElInp bind:field on:change={validateFieldBase} on:keyup={keyUp} />
					{/if}
				{:else if field.element === FieldElement.pictureTake}
					<FormElPictureTake bind:field on:change={validateFieldBase} />
				{:else if field.element === FieldElement.select}
					<FormElSelect bind:field on:change={validateFieldBase} />
				{:else if field.element === FieldElement.textArea}
					<FormElTextarea bind:field on:change={validateFieldBase} on:keyup={keyUp} />
				{/if}
				Original value: {field.value}
				hasChanged: {field.hasChanged}
			</div>

			{#if formObj.fields[idx].validity.level == ValidityErrorLevel.error}
				<div class="text-error-500 mb-3">
					<p>{formObj.fields[idx].validity.message}</p>
				</div>
			{:else if formObj.fields[idx].validity.level == ValidityErrorLevel.warning}
				<div class="text-warning-500 mb-3">
					<p>{formObj.fields[idx].validity.message}</p>
				</div>
			{/if}
		{/each}

		{#if formObj.submitButtonLabel}
			<button
				id={formObj.name}
				type="submit"
				class="btn variant-filled-primary w-full mt-2"
				disabled={!formObj.validToSubmit}
			>
				{formObj.submitButtonLabel}
			</button>
		{/if}
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
