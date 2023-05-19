<script lang="ts">
	import { process } from '$comps/esp/form/formProcess'
	import {
		Form,
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
	import { applyAction, enhance, type SubmitFunction } from '$app/forms'
	import { RequestResult } from 'faunadb'

	export let formInit = {}
	$: form = new Form(formInit)

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
		formData.append('data', JSON.stringify(v.data))
		formData.append('sql', form.sql)
		return v
	}

	const handleSubmit: SubmitFunction = ({ form, data, action, cancel, submitter }) => {
		// before form submit
		const v: Validation = validateForm(data)
		if (v.status == ValidationStatus.invalid) {
			cancel()
		}

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
	<form id={form.getId} method="POST" action={form.action} use:enhance={handleSubmit}>
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
</div>

<pre>{JSON.stringify(form.fields, null, 2)}</pre>
