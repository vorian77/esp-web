<script lang="ts">
	import type { NodeObj, NavTreeNode } from '$comps/types'
	import FormDetail from '$comps/form/FormDetail.svelte'

	export let treeNode: NavTreeNode
	export let scrollToTop = undefined

	let navNode: NodeObj
	$: navNode = treeNode.nodeObj
</script>

<FormDetail dataObj={navNode.dataObj} />
