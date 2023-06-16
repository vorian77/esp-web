<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'
	import Icon from '$comps/Icon.svelte'

	function menu() {
		alert('Menu drawer coming soon!')
	}
</script>

<!-- justify-self-end -->
<AppShell>
	<svelte:fragment slot="header">
		<div class="bg-neutral-50 p-4 w-full flex flex-row justify-between">
			<div class="">
				<slot name="lead" />
			</div>

			<div class="">
				<slot name="center" />
			</div>

			<div class="" on:click={menu} on:keyup={menu}>
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
