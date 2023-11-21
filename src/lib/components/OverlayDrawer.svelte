<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import Form from '$comps/form/FormDetail.svelte'
	import NavTree from '$comps/nav/NavTree.svelte'

	const drawerStore = getDrawerStore()

	function closeDrawer() {
		drawerStore.close()
	}
	function onformCancelled() {
		$drawerStore.meta.onCloseDrawer()
		closeDrawer()
	}
	function onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeDrawer()
		}
	}
</script>

<Drawer on:backdrop={closeDrawer}>
	{#if $drawerStore.id === 'auth'}
		<div>
			<Form
				surface="esp-card-space-y"
				bind:formObj={$drawerStore.meta.formObj}
				on:formCancelled={onformCancelled}
				on:formSubmitted={$drawerStore.meta.onFormSubmitted}
				on:form-link={$drawerStore.meta.onFormLink}
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
