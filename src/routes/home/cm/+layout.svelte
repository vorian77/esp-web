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
		<div class="text-xs" on:click={goBack}>Welcome, {user}</div>
	</AppBar>
	<div id="body">
		<slot />
	</div>
</AppShell>

<style>
	#body {
		padding: 15px 15px 15px 15px;
	}
</style>
