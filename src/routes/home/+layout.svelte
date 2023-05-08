<script>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	export let data;
</script>

<AppShell>
	<AppBar>Welcome, {data.user}</AppBar>

	<slot />
</AppShell>
