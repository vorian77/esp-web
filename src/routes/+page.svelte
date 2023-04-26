<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		// goto('/welcome');
	});
</script>

<h1>Home</h1>

<ul>
	<li>
		<a href="/dev/modal">Dev - Modal</a>
	</li>
	<li>
		<a href="/welcome">Welcome</a>
	</li>
	<li>
		<a href="/app">App</a>
	</li>
	<li>
		<a href="/dev/demo">Native API Demo</a>
	</li>
</ul>
