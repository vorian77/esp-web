<script>
	import FormInp from '$comps/esp/form/FormInp.svelte';
	import FormInpCheckbox from '$comps/esp/form/FormInpCheckbox.svelte';
	import FormInpRadio from '$comps/esp/form/FormInpRadio.svelte';
	import FormInpSelect from '$comps/esp/form/FormInpSelect.svelte';

	export let formDefn = {};
	// export let retrievalParms = {}
	let errors = {};

	$: fields = [...formDefn.fields];
</script>

<div class="esp-card">
	<form method="POST" id={formDefn.id} action="?/update">
		{#each fields as field, index (field.name)}
			<div class:mt-3={index}>
				{#if field.component === 'checkbox'}
					<FormInpCheckbox {field} />
				{:else if field.component === 'radio'}
					<FormInpRadio {field} />
				{:else if field.component === 'select'}
					<FormInpSelect {field} />
				{:else}
					<FormInp {field} {errors} />
				{/if}
			</div>

			{#if errors[field.name]}
				<div class="text-error-500 mb-3">
					<p class="">This field is required</p>
				</div>
			{/if}
		{/each}

		<button type="submit" class="btn variant-filled-primary w-full mt-2"
			>{formDefn.submitButtonLabel}</button
		>
	</form>
</div>
