<script lang="ts">
	import { NavTree, NavTreeNode, ResponseBody } from '$comps/types'
	import { navStatus, navTree } from '$comps/nav/navStore'
	import { DataObjActionParmsNode, DataObjStatus } from '$comps/types'
	import { action } from '$comps/dataObjActions'
	import type { Form } from '$comps/form/form'
	import Messenger from '$comps/Messenger.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	export let formObj: Form
	export let hiddenMode = false
	let messenger: Messenger

	let navTreeLocal: NavTree
	let dataObjStatusLocal: DataObjStatus
	let navTreeNode: NavTreeNode

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		navTreeNode = navTreeLocal.currentNode
	}
	$: dataObjStatusLocal = Object.assign(new DataObjStatus(), $navStatus)

	export async function executeAction(actionName: string) {
		return await action(
			new DataObjActionParmsNode({
				action: actionName,
				objType: 'form',
				obj: formObj,
				status: dataObjStatusLocal,
				messenger,
				navNode: navTreeNode
			})
		)
	}
</script>

<Messenger bind:this={messenger} />

{#if !hiddenMode}
	{#each formObj.actions as action}
		{@const hidden =
			action.name === 'noa_detail_save' && !dataObjStatusLocal.objHasChanged ? 'hidden' : ''}
		{@const disabled =
			action.name === 'noa_detail_save' && !dataObjStatusLocal.objValidToSave ? true : false}
		<button
			{disabled}
			class="btn {hidden} {action.color}  mt-1 ml-1"
			on:click={() => executeAction(action.name)}
		>
			{action.header}
		</button>
	{/each}
{/if}
