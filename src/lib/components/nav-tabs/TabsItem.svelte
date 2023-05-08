<script>
	export let label = '';
	export let selected = false;
</script>

<div>
	<button
		class="rounded-md px-3 py-2 text-sm font-medium {selected
			? 'bg-gray-100 text-gray-700'
			: 'text-gray-500 hover:text-gray-700'}"
		on:click
	>
		{label}
	</button>
</div>
