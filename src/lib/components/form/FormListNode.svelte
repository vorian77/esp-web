<script lang="ts">
	import type { DataObj, NavTreeNode } from '$comps/types'
	import FormList from '$comps/form/FormList.svelte'
	import { objActionListEdit } from '$comps/nav/navObjActions'
	import { navParms } from '$comps/nav/navStore'
	import { getContext } from 'svelte'

	export let treeNode: NavTreeNode
	let dataObj: DataObj | undefined

	const scrollToTop: any = getContext('scrollToTop')

	$: dataObj = treeNode.nodeObj.dataObj
	// $: if ($navParms && scrollToTop) scrollToTop()

	function onListRowClick(data: any) {
		objActionListEdit(treeNode, data.row, data.index)
	}
</script>

<FormList {dataObj} {onListRowClick} />
