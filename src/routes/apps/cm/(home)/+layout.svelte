<script lang="ts">
	import AppShell from '$comps/AppShell.svelte'
	import User from '$routes/apps/cm/(home)/User.svelte'

	export let data

	const user = data.user.per_name_full
	const appName = data.user.app_name
</script>

<AppShell slotSpanLead="4" slotSpanDefault="1">
	<svelte:fragment slot="lead">
		<p class="text-green-600 font-semibold">{appName}</p>
	</svelte:fragment>

	<svelte:fragment slot="body">
		<User user={data.user} />
		<slot />
	</svelte:fragment>
</AppShell>
