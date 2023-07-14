<script lang="ts">
	import type { FooterLink } from '$comps/esp/form/form'
	import { createEventDispatcher } from 'svelte'

	export let footerLink: FooterLink
	const dispatch = createEventDispatcher()

	function linkAction() {
		dispatch('form-link', footerLink.action)
	}
</script>

<div class="text-center">
	<p>
		{footerLink.prefix}
		<span class="underline-offset-auto">
			<button class="text-primary-500" on:click={linkAction}>{footerLink.label}</button>
		</span>
	</p>
</div>
