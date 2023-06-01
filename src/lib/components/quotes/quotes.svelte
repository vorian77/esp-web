<script>
	import { onMount } from 'svelte'
	import Icon from '$assets/icons/Icon.svelte'
	export let quote
</script>

<div class="esp-card mb-3">
	<div class="flex flex-col items-center">
		<div>
			<Icon name="quote" width="2.5rem" height="2.5rem" fill={quote.color} />
		</div>

		<div>
			<p class="text-center text-sm italic -mt-1">
				"{quote.quote}"
			</p>
		</div>
		<p id="author" class="text-sm font-semibold mt-3" style="color: {quote.color}">
			{quote.author}
		</p>
	</div>
</div>
