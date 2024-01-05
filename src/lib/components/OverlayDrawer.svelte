<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import NavTree from '$comps/nav/NavTree.svelte'
	import NavAppDrawer from '$comps/nav/NavAppDrawer.svelte'

	const drawerStore = getDrawerStore()

	function closeDrawer() {
		if ($drawerStore.meta.hasOwnProperty('onCloseDrawer')) $drawerStore.meta.onCloseDrawer()
		drawerStore.close()
		$drawerStore.id = undefined
	}
	function onformCancelled() {
		closeDrawer()
	}
	function onKeyDown(event: KeyboardEvent) {
		if (!$drawerStore.id) return
		if (event.key === 'Escape') closeDrawer()
	}
</script>

<Drawer on:backdrop={closeDrawer}>
	{#if $drawerStore.id === 'auth'}
		<div>
			<NavAppDrawer
				bind:dataObjName={$drawerStore.meta.dataObjName}
				on:formCancelled={onformCancelled}
				on:customFieldAction={$drawerStore.meta.onCustomFieldAction}
			/>
		</div>
	{:else if $drawerStore.id === 'navLeft'}
		<div class="p-2">
			<NavTree state={$drawerStore.meta.state} on:treeChanged={closeDrawer} />
		</div>
	{:else if $drawerStore.id === 'navRight'}
		<div class="p-4">
			<a href="/logout" on:click={() => localStorage.clear()}>Logout</a>
		</div>
	{/if}
</Drawer>

<svelte:window on:keydown={onKeyDown} />
