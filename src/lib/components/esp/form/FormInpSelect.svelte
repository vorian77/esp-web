<script>
	export let field = {}
</script>

<label class="label">
	<span>{field.label}</span>

	<select class="select" name={field.name}>
		<option disabled selected value>Select an option</option>
		{#each field.items as item, index (item.id)}
			<option class="" value={item.id}>{item.label}</option>
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
