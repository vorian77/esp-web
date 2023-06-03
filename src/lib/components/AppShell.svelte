<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'
	import Icon from '$comps/Icon.svelte'

	export let slotSpanLead = '1'
	export let slotSpanDefault = '4'

	function menu() {
		alert('Open menu...')
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-6 place-items-center"
			slotLead="col-span-{slotSpanLead} place-self-start"
			slotDefault="col-span-{slotSpanDefault} place-self-center text-green-600 font-semibold"
			slotTrail="col-span-1 place-self-end"
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
