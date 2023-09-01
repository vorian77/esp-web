<script lang="ts">
	import { focusTrap, TreeView, TreeViewItem, type TreeViewNode } from '@skeletonlabs/skeleton'
	import { navNodesTree, navNodeSelected, selectNode } from '$comps/nav/navStore'
	import type { NavNode } from '$comps/types'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/nav/NavTree.svelte'

	export let nodes: Array<NavNode> = []

	let isFocused: boolean = true

	export function loadBranch(index: number, newNodes: any) {
		nodes = newNodes
	}
	function onNodeSelected(node: NavNode) {
		selectNode(node)
	}
</script>

<div class="bg-slate-300 p-1 rounded-md">Features:</div>

<div id="container">
	{#each $navNodesTree as node, i}
		{@const cls = `indent-${node.indent * 3} ${node.selected ? 'bg-blue-300 text-white' : ''}`}
		<div
			role="button"
			tabindex="0"
			use:focusTrap={isFocused}
			class="{cls} mb-1 p-1 hover:bg-blue-400 rounded-md"
			on:click={() => onNodeSelected(node)}
			on:keyup={() => onNodeSelected(node)}
		>
			{node.label}
		</div>
	{/each}
</div>
