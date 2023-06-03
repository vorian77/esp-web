<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'
	import Icon from '$comps/Icon.svelte'

	function menu() {
		alert('Open menu...')
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div
			id="app-bar"
			class="p-2 w-full grid grid-cols-3 justify-items-stretch content-center bg-neutral-100"
		>
			<div class="justify-self-start">
				<slot name="lead" />
			</div>

			<div class="justify-self-center">
				<slot name="center" />
			</div>

			<div class="justify-self-end" on:click={menu} on:keypress={menu}>
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
