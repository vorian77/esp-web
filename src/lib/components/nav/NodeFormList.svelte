<script lang="ts">
	import type { NodeObj, NavTreeNode } from '$comps/types'
	import { Form as FormClass } from '$comps/form/form'
	import FormList from '$comps/form/FormList.svelte'
	import { objActionListEdit } from '$comps/nav/navObjActions'

	export let treeNode: NavTreeNode
	export let scrollToTop = () => {}

	let navNode: NodeObj
	let formClass: FormClass

	$: {
		navNode = treeNode.nodeObj
		formClass = new FormClass(navNode.dataObj?.defn)
	}

	function onListRowClick(data: any) {
		objActionListEdit(treeNode, data.row, data.index)
		scrollToTop()
	}
</script>

<FormList formObj={formClass} formData={navNode.dataObj?.data} {onListRowClick} />
