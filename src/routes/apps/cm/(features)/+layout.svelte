<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	import Icon from '$comps/Icon.svelte'

	export let data
	const appName = data.user.app_name

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

	<svelte:fragment slot="center">
		{appName}
	</svelte:fragment>

	<svelte:fragment slot="body">
		<slot />
	</svelte:fragment>
</AppShell>
