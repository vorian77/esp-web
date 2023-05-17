<script lang="ts">
	import { process } from '$comps/esp/form/formProcess'
	import FormInp from '$comps/esp/form/FormInp.svelte'
	import FormInpCheckbox from '$comps/esp/form/FormInpCheckbox.svelte'
	import FormInpRadio from '$comps/esp/form/FormInpRadio.svelte'
	import FormInpSelect from '$comps/esp/form/FormInpSelect.svelte'
	import { Form, ValidityField, Validation, ValidityLevel } from '$comps/esp/form/form'

	export let formDefn = {}
	$: elements = []

	// export let retrievalParms = {}
	const formClass = new Form()

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

	$: fields = [...formDefn.fields]
</script>

<div class="esp-card">
	<form method="POST" id={formDefn.id} action="form?/save" on:submit|preventDefault={handleSubmit}>
		{#each fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.type === 'checkbox'}
					<FormInpCheckbox {field} />
				{:else if field.type === 'radio'}
					<FormInpRadio {field} />
				{:else if field.element === 'select'}
					<FormInpSelect {field} bind:this={elements[index]} on:change={validateField} />
				{:else if !field.component}
					<FormInp {field} bind:this={elements[index]} on:change={validateField} />
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
			>{formDefn.submitButtonLabel}</button
		>
	</form>
</div>

<pre>{JSON.stringify(formDefn, null, 2)}</pre>
