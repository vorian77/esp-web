<script lang="ts">
	import type { FieldSelect } from '$comps/esp/form/fieldSelect'
	import { onMount } from 'svelte'
	export let field: FieldSelect

	const fieldId = 'field' + field.index

	onMount(() => {
		document.getElementById(fieldId).selectedIndex =
			field.items.findIndex((i) => i.id == field.value) + 1
	})
</script>

<label for={field.name} class="label">
	<span>{field.label}</span>
	<select class="select" name={field.name} id={fieldId} on:change>
		<option disabled selected value>Select an option</option>
		{#each field.items as { id, label }, index (id)}
			<option value={id} selected={id == field.value}>{label} </option>
		{/each}
	</select>
</label>

<style>
	select {
		@apply bg-white rounded-lg;
	}

	select option {
		background: white;
		color: black;
	}
</style>
