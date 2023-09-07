<script lang="ts">
	import { processNodeTree } from '$comps/nav/navStore'
	import type { NavNode } from '$comps/types'
	import { createEventDispatcher } from 'svelte'

	const FILENAME = '/$comps/nav/NavTreeItem.svelte'

	export let node: NavNode
	export let indent: string = 'ml-0'

	const dispatch = createEventDispatcher()

	function processNode(node: NavNode) {
		dispatch('nodeProcessed')
		processNodeTree(node)
	}
</script>

<div
	class="{indent} p-1 mb-1 hover:bg-blue-400 rounded-lg
	{node.selected ? 'bg-blue-300 text-white' : ''}"
	role="button"
	tabindex="0"
	on:click={() => processNode(node)}
	on:keyup={() => processNode(node)}
>
	{node.label}
</div>
