<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import Form from '$comps/esp/form/FormDetail.svelte'
	import NavTree from '$comps/nav/NavTree.svelte'
	import { NavMode, NavNode } from '$comps/types'

	const user = {}
	const nodes = [['Logout', 'logout', '/logout']]
	const drawerStore = getDrawerStore()

	function onformCancelled() {
		$drawerStore.meta.onCloseDrawer()
		closeDrawer()
	}

	function closeDrawer() {
		drawerStore.close()
	}
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDrawer()
		}
	}
</script>

<Drawer on:backdrop={closeDrawer}>
	{#if $drawerStore.id === 'navSide'}
		<NavTree mode={NavMode.sidebar} {nodes} />
	{:else if $drawerStore.id === 'auth'}
		<div>
			<Form
				surface="esp-card-space-y"
				bind:formObj={$drawerStore.meta.formObj}
				on:formCancelled={onformCancelled}
				on:formSubmitted={$drawerStore.meta.onFormSubmitted}
				on:form-link={$drawerStore.meta.onFormLink}
			/>
		</div>
	{/if}
</Drawer>

<svelte:window on:keydown={handleKeydown} />
