<script>
	import { escalate } from '$comps/esp/form/formValidateEscalate'
	import { process } from '$comps/esp/form/formProcess'
	import FormInp from '$comps/esp/form/FormInp.svelte'
	import FormInpCheckbox from '$comps/esp/form/FormInpCheckbox.svelte'
	import FormInpRadio from '$comps/esp/form/FormInpRadio.svelte'
	import FormInpSelect from '$comps/esp/form/FormInpSelect.svelte'

	import { applyAction } from '$app/forms'
	export let formDefn = {}
	let elements = []
	// export let retrievalParms = {}

	function escalateValidity(event) {
		escalate(formDefn, event, elements)
	}

	function handleSubmit(event) {
		const formData = new FormData(this)
		process(event, formDefn, formData, this.action)
	}

	$: fields = [...formDefn.fields]
</script>

<div class="esp-card">
	<form method="POST" id={formDefn.id} action="form?/save" on:submit|preventDefault={handleSubmit}>
		{#each fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.component === 'checkbox'}
					<FormInpCheckbox {field} />
				{:else if field.component === 'radio'}
					<FormInpRadio {field} />
				{:else if field.component === 'select'}
					<FormInpSelect {field} />
				{:else if !field.component}
					<FormInp {field} bind:this={elements[index]} on:escalateValidity={escalateValidity} />
				{/if}
			</div>
		{/each}

		<button type="submit" class="btn variant-filled-primary w-full mt-2"
			>{formDefn.submitButtonLabel}</button
		>
	</form>
</div>

<pre>{JSON.stringify(formDefn, null, 2)}</pre>
