<script lang="ts">
	import { DataObjStatus, NavTree, type NavTreeNode } from '$comps/types'
	import { navStatus, navTree, nodeProcessTree } from '$comps/nav/navStore'
	import { createEventDispatcher } from 'svelte'
	import { page } from '$app/stores'
	import Messenger from '$comps/Messenger.svelte'

	const dispatch = createEventDispatcher()

	const FILENAME = '/$comps/nav/NavTree.svelte'

	let navTreeLocal: NavTree
	let treeList: NavTreeNode[]
	let messenger: Messenger
	let currentNode: NavTreeNode

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		treeList = navTreeLocal.listTree
	}
	$: dataObjStatusLocal = Object.assign(new DataObjStatus(), $navStatus)

	async function onProcessNode(node: NavTreeNode) {
		currentNode = node
		messenger.askB4Transition(dataObjStatusLocal, true, processNode)
	}

	const processNode = async function () {
		dispatch('processNode')
		await nodeProcessTree($page.url.pathname, currentNode)
	}
</script>

<Messenger bind:this={messenger} />

<div class="mx-2 mb-2">
	<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>
	<div>
		{#each treeList as node}
			<div
				class="p-1 mb-.5 hover:bg-blue-400 rounded-lg {node.isSelected
					? 'bg-blue-300 text-white'
					: ''}"
				role="button"
				tabindex="0"
				on:click={() => onProcessNode(node)}
				on:keyup={() => onProcessNode(node)}
			>
				{@html '&nbsp;'.repeat(node.indent * 3)}
				{node.nodeObj.header}
			</div>
		{/each}
	</div>
</div>
