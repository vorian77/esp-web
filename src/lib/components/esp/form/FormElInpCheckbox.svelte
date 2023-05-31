<script lang="ts">
	import type { FieldCheckbox } from '$comps/esp/form/fieldCheckbox'
	export let field: FieldCheckbox
</script>

<fieldset>
	<legend>{field.label}</legend>

	{#each field.items as { id, label, selected }, index (id)}
		{@const itemName = field.name + '.' + id}
		<label class="flex items-center space-x-2">
			<input type="checkbox" name={itemName} value={id} checked={selected} on:click />
			<p>{label}</p>
		</label>
	{/each}
</fieldset>
