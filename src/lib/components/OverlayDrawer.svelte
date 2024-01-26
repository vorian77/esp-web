<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import NavTree from '$comps/nav/NavTree.svelte'
	import NavAppDrawer from '$comps/nav/NavAppDrawer.svelte'
	import { apiFetch, ApiFunction, TokenApiUser } from '$lib/api'
	import { ResponseBody, userSet } from '$comps/types'

	const drawerStore = getDrawerStore()
	const FILENAME = 'OverlayDrawer.svelte'

	function closeDrawer() {
		if ($drawerStore.meta && Object.hasOwn($drawerStore.meta, 'onCloseDrawer'))
			$drawerStore.meta.onCloseDrawer()
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

	async function dbInitAdmin(event: MouseEvent) {
		// <temp> - 240125
		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeInitAdmin,
			new TokenApiUser($drawerStore.meta.userId)
		)
		closeDrawer()
		if (result.success) {
			const user = result.data
			userSet(user)
			await $drawerStore.meta.state.resetUI(user)
		}
	}
</script>

<Drawer on:backdrop={closeDrawer}>
	{#if $drawerStore.id === 'auth'}
		<div>
			<NavAppDrawer
				bind:dataObjName={$drawerStore.meta.dataObjName}
				on:formCancelled={onformCancelled}
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
		<div hidden={!$drawerStore.meta.isSysAdmin} class="pl-4">
			<btn on:click={dbInitAdmin} on:keydown={dbInitAdmin} tabindex="0" role="button"
				>Reset Admin DB</btn
			>
		</div>
	{/if}
</Drawer>

<svelte:window on:keydown={onKeyDown} />
