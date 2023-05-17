<script>
	export let field = {}
</script>

<fieldset>
	<legend>{field.label}</legend>

	{#each field.items as item, index (item.id)}
		{@const itemName = field.name + '.' + item.id}
		<label class="flex items-center space-x-2">
			<input type="checkbox" name={itemName} value={item.id} checked={item.selected} on:click />
			<p>{item.label}</p>
		</label>
	{/each}
</fieldset>
