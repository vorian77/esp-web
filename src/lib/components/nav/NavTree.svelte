<script lang="ts">
	import { page } from '$app/stores'
	import { NavTree, type NavTreeNode } from '$comps/types'
	import { navTree } from '$comps/nav/navStore'
	import { nodeProcessTree } from '$comps/nav/navStore'
	import { createEventDispatcher } from 'svelte'

	const FILENAME = '/$comps/nav/NavTree.svelte'

	const dispatch = createEventDispatcher()

	let navTreeLocal: NavTree
	let treeList: NavTreeNode[]

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		treeList = navTreeLocal.listTree
	}

	function processNode(node: NavTreeNode) {
		dispatch('nodeProcessed')
		nodeProcessTree($page.url.pathname, node)
	}
</script>

<div class="mx-2 mb-2">
	<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>

	<div>
		{#each treeList as node, i}
			<div
				class="ml-{node.indent * 3}  p-1 mb-1 hover:bg-blue-400 rounded-lg
					{node.isSelected ? 'bg-blue-300 text-white' : ''}"
				role="button"
				tabindex="0"
				on:click={() => processNode(node)}
				on:keyup={() => processNode(node)}
			>
				{node.nodeObj.header}
			</div>
		{/each}
	</div>
</div>

<!-- <div>
	navTreeNodeRoot:
	<pre>{JSON.stringify($navTreeNodeRoot, null, 2)}</pre>
</div> -->

<!-- <div>
	treeList:
	<pre>{JSON.stringify(treeList, null, 2)}</pre>
</div> -->
