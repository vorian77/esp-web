<script lang="ts">
	import AppShell from '$comps/esp/AppShell.svelte'

	export let data

	const user = data.user.per_name_full
</script>

<AppShell>
	<svelte:fragment slot="lead">
		<p class="text-sm">Welcome, {user}</p>
	</svelte:fragment>

	<svelte:fragment slot="body">
		<slot />
	</svelte:fragment>
</AppShell>
