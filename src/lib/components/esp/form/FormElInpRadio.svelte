<script lang="ts">
	import type { FieldRadio } from '$comps/esp/form/fieldRadio'
	export let field: FieldRadio
</script>

<fieldset>
	<legend>{field.label}</legend>

	{#each field.items as { id, label, selected }, index (id)}
		<label class="flex items-center space-x-2">
			<input type="radio" name={field.name} value={id} checked={selected} />
			<p>{label}</p>
		</label>
	{/each}
</fieldset>
