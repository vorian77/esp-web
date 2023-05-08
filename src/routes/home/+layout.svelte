<script>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	export let data;

	function goBack() {
		history.back();
	}
</script>

<AppShell>
	<AppBar>
		<div on:click={goBack}>Welcome, {data.user}</div></AppBar
	>

	<slot />
</AppShell>
