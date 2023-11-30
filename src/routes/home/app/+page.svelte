<script lang="ts">
	import { navTree, navUser } from '$comps/nav/navStore'
	import { type DataObj, type NodeObj, NavTree, type NavTreeNode } from '$comps/types'
	import { capitalizeFirstLetter } from '$comps/types'
	import FormListNode from '$comps/form/FormListNode.svelte'
	import FormDetailNode from '$comps/form/FormDetailNode.svelte'
	import { setContext } from 'svelte'

	const DEFAULT_COMPONENT = 'Home'

	const comps = {
		FormList: FormListNode,
		FormDetail: FormDetailNode
	}

	let navTreeLocal: NavTree
	let navTreeNode: NavTreeNode | undefined
	let nodeObj: NodeObj | undefined
	let dataObj: DataObj | undefined
	let compName = ''
	let compCurrent: any
	let nodeType = ''
	let isRootNavTreeNode: boolean | undefined
	let scrollContainer: any

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		navTreeNode = navTreeLocal.currentNode
		nodeObj = navTreeNode.nodeObj
		dataObj = nodeObj.dataObj
		compName = dataObj && dataObj.component ? dataObj.component : ''
		compCurrent = comps[compName]
		isRootNavTreeNode = !compName && navTreeNode?.key.toLowerCase().includes('root')
		nodeType = capitalizeFirstLetter(nodeObj ? nodeObj.type : 'unknown')
	}

	setContext('scrollToTop', () => scrollContainer.scrollIntoView())
</script>

<div bind:this={scrollContainer}>
	{#if compName}
		<svelte:component this={compCurrent} treeNode={navTreeNode} />
	{:else if !isRootNavTreeNode && nodeObj?.header}
		<h1 class="h1">{nodeType}: {nodeObj.header}</h1>
	{/if}
</div>

<!-- <pre>{JSON.stringify($navTree, null, 2)}</pre> -->
