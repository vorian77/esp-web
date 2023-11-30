<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import FormDetailDrawer from '$comps/form/FormDetailDrawer.svelte'
	import NavTree from '$comps/nav/NavTree.svelte'

	const drawerStore = getDrawerStore()

	function closeDrawer() {
		$drawerStore.meta.onCloseDrawer()
		drawerStore.close()
		$drawerStore.id = undefined
	}
	function onformCancelled() {
		alert('onformCancelled...')
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
			<FormDetailDrawer
				bind:formObj={$drawerStore.meta.formObj}
				on:formCancelled={onformCancelled}
				on:customFieldAction={$drawerStore.meta.onCustomFieldAction}
			/>
		</div>
	{:else if $drawerStore.id === 'navLeft'}
		<div class="p-2">
			<NavTree on:processNode={closeDrawer} />
		</div>
	{:else if $drawerStore.id === 'navRight'}
		<div class="p-4">
			<a href="/logout">Logout</a>
		</div>
	{/if}
</Drawer>

<svelte:window on:keydown={onKeyDown} />
