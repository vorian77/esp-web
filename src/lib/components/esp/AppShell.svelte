<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'
	import Icon from '$comps/Icon.svelte'

	function menu() {
		alert('Open menu...')
	}
</script>

<!-- slotDefault="place-self-center" -->
<!-- slotTrail="place-content-end" -->

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotLead="col-span-2"
			slotDefault=""
			slotTrail="col-start-4"
			background="bg-neutral-100"
		>
			<svelte:fragment slot="lead">
				<slot name="lead" />
			</svelte:fragment>

			<svelte:fragment slot="default">
				<slot name="center" />
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<div on:click={menu} on:keypress={menu}>
					<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill="#3b79e1" />
				</div>
			</svelte:fragment>
		</AppBar>
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
