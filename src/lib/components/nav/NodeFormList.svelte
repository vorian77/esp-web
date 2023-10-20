<script lang="ts">
	import type { NodeObj, NavTreeNode } from '$comps/types'
	import { Form as FormClass } from '$comps/esp/form/form'
	import FormList from '$comps/form/FormList.svelte'
	import { objActionListEdit, objActionListNew } from '$comps/nav/navStore'

	export let treeNode: NavTreeNode
	export let scrollToTop = () => {}

	let navNode: NodeObj
	let formClass: FormClass

	$: {
		navNode = treeNode.nodeObj
		formClass = new FormClass(navNode.dataObj?.defn)
	}

	function onListRowClick(data: any) {
		const d = { listRows: navNode.dataObj!.data.length, listRowsCurrent: data.i, ...data.row }
		objActionListEdit(treeNode, d)
		scrollToTop()
	}

	function listActionEdit() {
		// objActionListEdit(node, rowId)
	}

	function listActionSave() {}

	const functions = {
		noa_list_new: () => objActionListNew(treeNode)
	}
</script>

<FormList formObj={formClass} formData={navNode.dataObj?.data} {onListRowClick}>
	<svelte:fragment slot="actions">
		{#each formClass.objActions as action}
			<button class="btn variant-filled-primary mt-1 ml-1" on:click={functions[action.name]}
				>{action.header}
			</button>
		{/each}
	</svelte:fragment>
</FormList>
