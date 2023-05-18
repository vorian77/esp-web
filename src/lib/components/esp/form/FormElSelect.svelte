<script lang="ts">
	import type { FieldSelect } from '$comps/esp/form/fieldSelect'
	export let field: FieldSelect
</script>

<label class="label">
	<span>{field.label}</span>

	<select class="select" name={field.name}>
		<option disabled selected value>Select an option</option>
		{#each field.items as { id, label }, index (id)}
			<option value={id}>{label}</option>
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
