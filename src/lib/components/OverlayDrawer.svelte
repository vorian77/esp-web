<script lang="ts">
	import { drawerStore, Drawer } from '@skeletonlabs/skeleton'
	import Form from '$comps/esp/form/FormDetail.svelte'
	import Navigation from '$comps/Navigation.svelte'

	const user = {}

	const navMode = 'sidebar'
	const nodes = [['Logout', 'logout', '/logout']]

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
		<Navigation mode={navMode} {nodes} />
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
