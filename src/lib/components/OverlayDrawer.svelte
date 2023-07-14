<script lang="ts">
	import { drawerStore, Drawer } from '@skeletonlabs/skeleton'
	import Form from '$comps/esp/form/Form.svelte'
	import Navigation from '$comps/Navigation.svelte'

	const user = {}

	function closeDrawer() {
		$drawerStore.id = ''
		if ($drawerStore.meta.onCloseDrawer) {
			$drawerStore.meta.onCloseDrawer()
		}
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
		<Navigation {user} mode="sidebar" />
	{:else if $drawerStore.id === 'auth'}
		<div>
			<Form
				surface="esp-card-space-y"
				bind:formObj={$drawerStore.meta.formObj}
				on:formCancelled={closeDrawer}
				on:formSubmitted={$drawerStore.meta.onFormSubmitted}
				on:form-link={$drawerStore.meta.onFormLink}
			/>
		</div>
	{/if}
</Drawer>

<svelte:window on:keydown={handleKeydown} />
