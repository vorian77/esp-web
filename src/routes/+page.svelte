<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		goto('/welcome');
	});
</script>

<h1>Home</h1>

<a href="/demo">Demo</a>
<a href="/welcome">Welcome</a>
<a href="/app">App</a>
