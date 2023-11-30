<script lang="ts">
	import { Form } from '$comps/form/form'
	import type { DataObj, NavTreeNode } from '$comps/types'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { navParms, setNavParms, setNavParmsDataObj } from '$comps/nav/navStore'
	import { getContext } from 'svelte'

	export let treeNode: NavTreeNode

	let dataObj: DataObj | undefined
	let formObj: Form

	const scrollToTop: any = getContext('scrollToTop')

	$: {
		dataObj = treeNode.nodeObj.dataObj
		if (dataObj) formObj = new Form(dataObj)
		setNavParms(formObj.data, formObj.cardinality, formObj.isInsertMode!)
	}

	// $: if ($navParms && scrollToTop) scrollToTop()
</script>

{#if formObj}
	<FormDetail {formObj} />
{/if}
