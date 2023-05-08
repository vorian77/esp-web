<script>
	export let field = {}
</script>

<fieldset>
	<legend>{field.legend}</legend>

	{#each field.items as item, index (item.id)}
		<label class="flex items-center space-x-2">
			<input type="checkbox" name={field.name} value={item.id} checked={item.selected} />
			<p>{item.label}</p>
		</label>
	{/each}
</fieldset>
