<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		goto('/welcome');
	});
</script>

<h1>Root</h1>

<ul>
	<li>
		<a href="/welcome">Welcome</a>
	</li>
	<li>
		<a href="/home">Home</a>
	</li>
	<li>
		<a href="/dev/demo">Dev - Native API Demo</a>
	</li>
	<li>
		<a type="button" href="/auth?type=signup">Auth-Sign up</a>
	</li>
	<li>
		<a type="button" href="/auth?type=login">Auth-Log in</a>
	</li>
</ul>
