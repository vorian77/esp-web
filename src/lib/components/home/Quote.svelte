<script lang="ts">
	import { onMount } from 'svelte'
	import type { FormSourceResponseType } from '$comps/types'
	import Icon from '$comps/Icon.svelte'

	let quote: any = {}

	onMount(() => {
		async function getQuote() {
			const responsePromise = await fetch('/api/quote')
			const response: FormSourceResponseType = await responsePromise.json()
			quote = response.data
		}
		getQuote()
	})
</script>

<div class="bg-neutral-100 rounded-lg p-3 mb-3">
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
