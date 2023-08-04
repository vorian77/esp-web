<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	export let data
</script>

{data.user.host}

<AppShell user={data.user} routeId={data.routeId}>
	<svelte:fragment slot="body">
		<slot />
	</svelte:fragment>
</AppShell>
