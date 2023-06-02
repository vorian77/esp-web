<script lang="ts">
	import AppShell from '$comps/esp/AppShell.svelte'
	import Icon from '$comps/Icon.svelte'

	function goBack() {
		history.back()
	}
</script>

<AppShell>
	<svelte:fragment slot="lead">
		<div on:click={goBack} on:keypress={goBack}>
			<Icon name="back" width="1.5rem" height="1.5rem" fill="#3b79e1" />
		</div>
	</svelte:fragment>

	<svelte:fragment slot="body">
		<slot />
	</svelte:fragment>
</AppShell>
