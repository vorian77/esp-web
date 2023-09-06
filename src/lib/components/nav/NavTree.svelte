<script lang="ts">
	import { navNodesTree, processNodeTree } from '$comps/nav/navStore'
	const FILENAME = '/$comps/nav/NavTree.svelte'
</script>

<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>

<div id="container">
	{#each $navNodesTree as node, i}
		<!-- {@const cls = `indent-${node.indent * 3} ${node.selected ? 'bg-blue-300 text-white' : ''}`} -->
		{@const cls = `
			ml-${[0, 4, 8, 12, 16][node.indent]} 
			${node.selected ? 'bg-blue-300 text-white' : ''}
		`}
		<div
			class="{cls} p-1 mb-1 hover:bg-blue-400 rounded-lg"
			role="button"
			tabindex="0"
			on:click={() => processNodeTree(node)}
			on:keyup={() => processNodeTree(node)}
		>
			{node.label}
			{node.indent}
		</div>
	{/each}
</div>
