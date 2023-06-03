<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'
	import Icon from '$comps/Icon.svelte'

	// default - features
	export let div1Span = '1'
	export let div2Start = '2'
	export let div2Span = '4'

	function menu() {
		alert('Open menu...')
	}
</script>

<!-- justify-self-end -->
<AppShell>
	<svelte:fragment slot="header">
		<div class="p-2 w-full grid grid-cols-6 bg-neutral-100">
			<div class="col-start-1 col-span-{div1Span} justify-self-start">
				<slot name="lead" />
			</div>

			<div class="col-start-{div2Start} col-span-{div2Span} justify-self-center">
				<slot name="center" />
			</div>

			<div class="col-start-6 col-span-1 justify-self-end" on:click={menu} on:keypress={menu}>
				<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill="#3b79e1" />
			</div>
		</div>
	</svelte:fragment>

	<div id="body">
		<slot name="body" />
	</div>
</AppShell>

<style>
	#body {
		padding: 15px 15px 15px 15px;
	}
</style>
