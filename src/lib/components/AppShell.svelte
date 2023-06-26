<script lang="ts">
	import { AppShell, Drawer, drawerStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings } from '@skeletonlabs/skeleton'
	import Navigation from '$comps/Navigation.svelte'
	import Icon from '$comps/Icon.svelte'

	export let user

	function drawerOpen(): void {
		drawerStore.open()
	}
</script>

<Drawer>
	<Navigation {user} />
</Drawer>

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<div class="bg-neutral-50 p-4 w-full flex flex-row justify-between">
			<div class="">
				<slot name="lead" />
			</div>

			<div class="">
				<slot name="center" />
			</div>

			<div class="" on:click={drawerOpen} on:keyup={drawerOpen}>
				<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill="#3b79e1" />
			</div>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation {user} />
	</svelte:fragment>

	<div class="container mx-auto p-4">
		<slot name="body" />
	</div>
</AppShell>
