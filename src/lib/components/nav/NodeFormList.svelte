<script lang="ts">
	import type { NavNode } from '$comps/types'
	import { Form as FormClass } from '$comps/esp/form/form'
	import FormList from '$comps/form/FormList.svelte'
	import { objActionListEdit, objActionListNew } from '$comps/nav/navStore'

	export let node: NavNode
	let formClass: FormClass

	$: {
		formClass = new FormClass(node.obj?.defn)
	}

	function onListRowClick(row: {}) {
		objActionListEdit(node, row.id)
	}

	function listActionEdit() {
		alert('listActionEdit...')
		// const rowId = ''
		// objActionListEdit(node, rowId)
	}

	function listActionSave() {}

	const functions = {
		noa_list_new: () => objActionListNew(node)
	}
</script>

<FormList formObj={formClass} formData={node.obj?.data} {onListRowClick}>
	<svelte:fragment slot="actions">
		{#each formClass.objActions as action}
			<button class="btn variant-filled-primary mt-1 ml-1" on:click={functions[action.name]}
				>{action.header}
			</button>
		{/each}
	</svelte:fragment>
</FormList>
