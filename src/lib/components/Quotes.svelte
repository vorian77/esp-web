<script>
	import { onMount } from 'svelte'
	import Icon from '$comps/Icon.svelte'
	export let quote
</script>

<div class="rounded-lg p-3 mb-3 bg-neutral-100">
	<div class="flex flex-col items-center">
		<div>
			<Icon name="quote-enclosed" width="4rem" height="4rem" fill={quote.color} />
		</div>

		<div>
			<p class="text-center text-sm italic -mt-1">
				"{quote.quote}"
			</p>
		</div>
		<p id="author" class="text-lg font-semibold mt-3">
			{quote.author}
		</p>
	</div>
</div>
