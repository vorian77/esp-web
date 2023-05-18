<script lang="ts">
	import { process } from '$comps/esp/form/formProcess'
	import FormElInp from '$comps/esp/form/FormElInp.svelte'
	import FormElInpCheckbox from '$comps/esp/form/FormElInpCheckbox.svelte'
	import FormElInpRadio from '$comps/esp/form/FormElInpRadio.svelte'
	import FormElSelect from '$comps/esp/form/FormElSelect.svelte'
	import { Form } from '$comps/esp/form/form'
	import type { Validation, ValidityField } from '$comps/esp/form/fieldValidation'

	export let formInit = {}
	$: form = new Form(formInit)

	function setValidities(newValidities: [ValidityField]) {
		newValidities.forEach(({ index, validity }) => {
			// elements[index].validity = validity
			elements[index].setValidity(validity)
			console.log(elements[index].validity)
		})
	}

	function validateField(event) {
		const fieldName = event.target.name
		const fieldForm = event.target.form
		const formData = new FormData(fieldForm)

		// const idx = elements.findIndex((e) => e.field.name == fieldName)

		const field = elements.find((e, idx) => e.field.name == fieldName).field

		const v: Validation = formClass.validateField(field, formData)

		setValidities(v.validityFields)
	}

	function handleSubmit(event) {
		const v: Validation = formClass.validateform(event, formDefn)
		if (!v.valid) {
			console.log('submit form - invalid field:', v.validityFields)
			setValidities(v.validityFields)
		}

		// const formData = new FormData(this)
		// console.log(formData)
		// process(event, formDefn, formData, this.action)
	}
</script>

<div class="esp-card">
	<form method="POST" id={form.getId} action="form?/save" on:submit|preventDefault={handleSubmit}>
		{#each form.fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.type === 'checkbox'}
					<FormElInpCheckbox {field} />
				{:else if field.type === 'radio'}
					<FormElInpRadio {field} />
				{:else if field.element === 'select'}
					<FormElSelect {field} />
				{:else}
					<FormElInp {field} />
				{/if}
			</div>

			<!-- {JSON.stringify(elements)} -->

			<!-- {#if elements[index]?.validity.level == ValidityLevel.error}
				<div class="text-error-500 mb-3">
					<p class="">{elements[index]?.validity.message}</p>
				</div>
			{:else if elements[index]?.validity.level == ValidityLevel.warning}
				<div class="text-warning-500 mb-3">
					<p class="">{elements[index]?.validity.message}</p>
				</div>
			{/if} -->
		{/each}

		<button type="submit" class="btn variant-filled-primary w-full mt-2"
			>{form.submitButtonLabel}</button
		>
	</form>
</div>

<pre>{JSON.stringify(form.fields, null, 2)}</pre>
