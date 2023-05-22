<script lang="ts">
	import { process } from '$comps/esp/form/formProcess'
	import {
		Form,
		FooterText,
		Validation,
		ValidityField,
		ValidityLevel,
		ValidationStatus
	} from '$comps/esp/form/form'
	import FormElInp from '$comps/esp/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/esp/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/esp/form/FormElInpRadio.svelte'
	import FormElSelect from '$comps/esp/form/FormElSelect.svelte'
	import FormElTextarea from '$comps/esp/form/FormElTextarea.svelte'
	import FormLink from '$comps/esp/form/FormLink.svelte'
	import { applyAction, enhance, type SubmitFunction } from '$app/forms'
	import DATABUS from '$lib/utils/databus.utils'
	import { createEventDispatcher } from 'svelte'

	export let formInit = {}
	$: form = new Form(formInit)

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

	function validateForm(formData): Validation {
		const v: Validation = form.validateForm(formData)
		if (v.status != ValidationStatus.valid) {
			setValidities(v.validityFields)
			return v
		}
		DATABUS.upsert('form', form.id, v.data)
		return v
	}

	const handleSubmit = () => {
		// before form submit
		const elem = document.getElementById(form.id)
		const formData = new FormData(elem)

		const v: Validation = validateForm(formData)
		if (v.status == ValidationStatus.invalid) {
			return
		}

		// temp
		dispatch('form-submitted', form.id)
	}

	const handleSubmitOld: SubmitFunction = ({ form, data, action, cancel, submitter }) => {
		// before form submit
		const v: Validation = validateForm(data)
		if (v.status == ValidationStatus.invalid) {
			alert(`handleSubmit - validation failed...`)
			cancel
		}

		// temp
		alert(`handleSubmit - formId: ${form.id}`)
		dispatch('form-submitted', form.id)
		cancel()

		// submitting

		// results
		return async ({ result }) => {
			if (result.type === 'success') {
				console.log('result: sucess')
				await applyAction(result)
			}

			if (result.type === 'failure') {
				console.log('result: failure')
			}
		}
	}

	function setValidities(newValidities: [ValidityField]) {
		newValidities.forEach(({ index, validity }) => {
			form.fields[index].validity = validity
		})
	}
</script>

<div class="esp-card">
	{#if form.header}
		<h1 class={form.subHeader ? '-mb-3' : ''}>{form.header}</h1>
	{/if}
	{#if form.subHeader}
		<div class="-mt-8">
			<p class="text-sm text-gray-500">
				{form.subHeader}
			</p>
		</div>
	{/if}
	<!-- <form id={form.id} method="POST" action={form.action} use:enhance={handleSubmit}> -->
	<form id={form.id} method="POST" on:submit|preventDefault={handleSubmit}>
		{#each form.fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.type === 'checkbox'}
					<FormElInpCheckbox {field} on:click={validateFieldCheckbox} />
				{:else if field.type === 'radio'}
					<FormElInpRadio {field} on:change={validateFieldBase} />
				{:else if field.element === 'select'}
					<FormElSelect {field} on:change={validateFieldBase} />
				{:else if field.element === 'textarea'}
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
		<div class="text-center {txt.size}">
			<p>{txt.label}</p>
		</div>
	{/each}
	{#each form.footerLinks as link}
		<FormLink footerLink={link} on:form-link />
	{/each}
</div>

<!-- <pre>{JSON.stringify(form, null, 2)}</pre> -->
