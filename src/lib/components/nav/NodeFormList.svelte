<script lang="ts">
	import type { DataObj, NavTreeNode } from '$comps/types'
	import FormList from '$comps/form/FormList.svelte'
	import { objActionListEdit } from '$comps/nav/navObjActions'

	export let treeNode: NavTreeNode
	export let scrollToTop = () => {}
	let dataObj: DataObj | undefined

	$: dataObj = treeNode.nodeObj.dataObj

	function onListRowClick(data: any) {
		objActionListEdit(treeNode, data.row, data.index)
		scrollToTop()
	}
</script>

<FormList {dataObj} {onListRowClick} />
