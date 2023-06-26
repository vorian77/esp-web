<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	import Icon from '$comps/Icon.svelte'
	import { goto } from '$app/navigation'

	export let data

	function goBack() {
		history.back()
	}

	function goHome() {
		goto('/apps')
	}

	$: backArrowOn = !data.cmHomePage
</script>

<AppShell user={data.user}>
	<svelte:fragment slot="lead">
		{#if backArrowOn}
			<div on:click={goBack} on:keyup={goBack}>
				<Icon name="back" width="1.5rem" height="1.5rem" fill="#3b79e1" />
			</div>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="center">
		<div class="text-blue-500 font-semibold" on:click={goHome} on:keyup={goHome}>
			{data.user.app_name}
		</div>
	</svelte:fragment>

	<svelte:fragment slot="body">
		<slot />
	</svelte:fragment>
</AppShell>
