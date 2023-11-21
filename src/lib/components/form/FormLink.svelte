<script lang="ts">
	import type { FormFooterLink } from '$comps/form/form'
	import { createEventDispatcher } from 'svelte'

	export let footerLink: FormFooterLink
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
