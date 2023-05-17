<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	onMount(async () => {
		// goto('/welcome');
	})
</script>

<div class="esp-card">
	<h2>Menu</h2>

	<ul>
		<li>
			<a href="/welcome">Welcome</a>
		</li>
		<li>
			<a href="/auth?type=signup">Auth-Signup</a>
		</li>
		<li>
			<a href="/auth?type=login">Auth-Login</a>
		</li>
		<li>
			<a href="/auth?type=profile">Profile</a>
		</li>
		<li>
			<a href="/home/cm">Case Manager (Placeholders)</a>
		</li>
		<li>
			<a href="/dev/demo">Native API Demo</a>
		</li>
	</ul>
</div>
