<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	onMount(async () => {
		goto('/welcome')
	})
</script>

<div class="esp-card-space-y text-lg">
	<h1 class="h1">Root Menu</h1>
	<ul>
		<li>
			<a class="anchor" href="/apps/cm">Case Manager</a>
		</li>
		<li>
			<a class="anchor" href="/dev/demo">Native API Demo</a>
		</li>
		<li>
			<a class="anchor" href="/admin">Administration</a>
		</li>
	</ul>
</div>

<style>
	li {
		margin-bottom: 10px;
	}
</style>
