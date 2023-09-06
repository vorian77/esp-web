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

<div class="mx-2 mb-2 text-sm">
	<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>

	<div>
		{#each $navNodesTree as node, i}
			{@const rowIndent = [0, 4, 8, 12, 16][node.indent]}
			<div
				class="ml-{rowIndent} p-1 mb-1 hover:bg-blue-400 rounded-lg
				{node.selected ? 'bg-blue-300 text-white' : ''}"
				role="button"
				tabindex="0"
				on:click={() => processNode(node)}
				on:keyup={() => processNode(node)}
			>
				{node.label}
				{rowIndent}
			</div>
		{/each}
	</div>
</div>
