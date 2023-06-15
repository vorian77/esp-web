<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	import Icon from '$comps/Icon.svelte'
	import { goto } from '$app/navigation'

	function goBack() {
		history.back()
	}

	function goHome() {
		goto('/apps/cm')
	}
</script>

<AppShell>
	<svelte:fragment slot="lead">
		<div on:click={goBack} on:keyup={goBack}>
			<Icon name="back" width="1.5rem" height="1.5rem" fill="#3b79e1" />
		</div>
	</svelte:fragment>

	<svelte:fragment slot="center">
		<div class="text-blue-500 font-semibold" on:click={goHome} on:keyup={goHome} />
		Administration
	</svelte:fragment>

	<svelte:fragment slot="body">
		<slot />
	</svelte:fragment>
</AppShell>

<slot />
