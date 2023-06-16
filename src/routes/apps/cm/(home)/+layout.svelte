<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	import User from '$routes/apps/cm/(home)/User.svelte'

	export let data
</script>

<AppShell>
	<svelte:fragment slot="lead">
		<p class="text-blue-500 font-semibold">{data.user.app_name}</p>
	</svelte:fragment>

	<svelte:fragment slot="body">
		<User bind:user={data.user} />
		<slot />
	</svelte:fragment>
</AppShell>
