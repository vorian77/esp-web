<script lang="ts">
	import { navNodesTree, processNodeTree } from '$comps/nav/navStore'
	import type { NavNode } from '$comps/types'
	import { createEventDispatcher } from 'svelte'

	const FILENAME = '/$comps/nav/NavTree.svelte'

	const dispatch = createEventDispatcher()

	function processNode(node: NavNode) {
		dispatch('nodeProcessed')
		processNodeTree(node)
	}
</script>

<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>

<div id="container">
	{#each $navNodesTree as node, i}
		<!-- {@const cls = `indent-${node.indent * 3} ${node.selected ? 'bg-blue-300 text-white' : ''}`} -->
		{@const cls = `
			ml-${[0, 4, 8, 12, 16][node.indent]}
		`}
		<div
			class="{cls} p-1 mb-1 hover:bg-blue-400 rounded-lg"
			class:bg-blue-300={node.selected}
			class:text-white={node.selected}
			role="button"
			tabindex="0"
			on:click={() => processNode(node)}
			on:keyup={() => processNode(node)}
		>
			{node.label}
			{node.indent}
		</div>
	{/each}
</div>
