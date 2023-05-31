<script>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'

	export let data

	const user = data.user.per_name_full

	function goBack() {
		history.back()
	}
</script>

<AppShell>
	<AppBar>
		<div on:click={goBack}>Welcome, {user}</div>
	</AppBar>
	<slot />
</AppShell>
