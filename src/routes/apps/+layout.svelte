<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	export let data
</script>

<AppShell user={data.user} routeId={data.routeId}>
	<svelte:fragment slot="body">
		<slot />
	</svelte:fragment>
</AppShell>
