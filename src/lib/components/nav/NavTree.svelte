<script lang="ts">
	import { navNodesBranch, setBranchChildren } from '$comps/nav/navStore'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/nav/NavTree.svelte'
</script>

NavTree:
<div id="container">
	{#each $navNodesBranch as node, i}
		<div>
			{i} id:{node.id}
			{node.label}
		</div>
	{/each}
</div>
