<script lang="ts">
	import type { DataObj, NavTreeNode } from '$comps/types'
	import FormDetail from '$comps/form/FormDetail.svelte'

	export let treeNode: NavTreeNode
	export let scrollToTop = undefined

	let dataObj: DataObj | undefined

	$: dataObj = treeNode.nodeObj.dataObj
</script>

{#if dataObj}
	<FormDetail {dataObj} />
{/if}
