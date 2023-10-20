<script lang="ts">
	import { navInit, navInitReset, navTree, navUser } from '$comps/nav/navStore'
	import type { DataObj, NodeObj, NavTree, NavTreeNode } from '$comps/types'
	import type { Snapshot } from './$types'
	import NodeFormList from '$comps/nav/NodeFormList.svelte'
	import NodeFormDetail from '$comps/nav/NodeFormDetail.svelte'

	const DEFAULT_COMPONENT = 'Home'

	const comps = {
		FormList: NodeFormList,
		FormDetail: NodeFormDetail
	}

	let navTreeNode: NavTreeNode | undefined
	let nodeObj: NodeObj | undefined
	let dataObj: DataObj | undefined
	let compName = ''
	let compCurrent: any
	let nodeType = ''
	let isRootNavTreeNode: boolean | undefined
	let scrollContainer: any

	export const snapshot: Snapshot<string> = {
		capture: () => '',
		restore: () => {
			navInitReset()
			navInit($navUser)
		}
	}

	$: {
		navTreeNode = $navTree.hasOwnProperty('currentNode') ? $navTree.currentNode : undefined
		nodeObj = navTreeNode?.nodeObj ? navTreeNode.nodeObj : undefined
		dataObj = nodeObj?.dataObj ? nodeObj.dataObj : undefined
		compName = dataObj ? dataObj.component : ''
		compCurrent = comps[compName]

		isRootNavTreeNode = !compName && navTreeNode?.key.toLowerCase().includes('root')
		nodeType = nodeObj ? nodeObj.type : 'unknown'
		nodeType = nodeType.charAt(0).toUpperCase() + nodeType.slice(1)
	}

	function scrollToTop() {
		scrollContainer.scrollIntoView()
	}
</script>

<div bind:this={scrollContainer}>
	{#if compName}
		<svelte:component this={compCurrent} treeNode={navTreeNode} {scrollToTop} />
	{:else if !isRootNavTreeNode && nodeObj?.header}
		<h1 class="h1">{nodeType}: {nodeObj.header}</h1>
	{/if}
</div>

<!-- <pre>{JSON.stringify($navTree, null, 2)}</pre> -->
