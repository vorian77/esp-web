<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import NavTree from '$comps/nav/NavTree.svelte'
	import OverlayObjForm from '$comps/Overlay/OverlayObjForm.svelte'
	import { apiFetch, ApiFunction, TokenApiUserId } from '$lib/api'
	import { ResponseBody } from '$comps/types'
	import { State } from '$comps/nav/types.appState'

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
		const state: State = $drawerStore.meta.state
		const userId = state.user!.id
		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeInitAdmin,
			new TokenApiUserId(userId)
		)
		if (result.success) {
			closeDrawer()
			await state.resetUser(true)
		}
	}
</script>

<Drawer on:backdrop={closeDrawer}>
	{#if $drawerStore.id === 'auth'}
		<div>
			<OverlayObjForm
				bind:overlayNode={$drawerStore.meta.overlayNode}
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
