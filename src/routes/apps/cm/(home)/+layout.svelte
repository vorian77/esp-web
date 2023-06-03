<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	import User from '$routes/apps/cm/(home)/User.svelte'

	export let data
</script>

<AppShell>
	<svelte:fragment slot="lead">
		<p class="text-green-600 font-semibold">{data.user.app_name}</p>
	</svelte:fragment>

	<svelte:fragment slot="body">
		<User user={data.user} />
		<slot />
	</svelte:fragment>
</AppShell>
