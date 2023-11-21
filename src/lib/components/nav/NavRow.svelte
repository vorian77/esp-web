<script lang="ts">
	import { navStatus, navTree, nodeProcessRowManager } from '$comps/nav/navStore'
	import { DataObjStatus, NavTree, NavTreeNode, type DataObj } from '$comps/types'
	import { DataObjCardinality, DataObjRowChange } from '$comps/types'
	import NavRowAction from '$comps/nav/NavRowAction.svelte'
	import Messenger from '$comps/Messenger.svelte'

	let navTreeLocal: NavTree
	let node: NavTreeNode
	let dataObj: DataObj | undefined
	let messenger: Messenger

	let dataObjStatusLocal: DataObjStatus
	let rowsCurrent: number | undefined
	let rowsTotal: number | undefined

	let currentNode: NavTreeNode
	let currentAction: DataObjRowChange

	let status = ''
	let showRow = false

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		node = navTreeLocal.currentNode
		dataObj = node.nodeObj.dataObj
	}

	$: {
		dataObjStatusLocal = Object.assign(new DataObjStatus(), $navStatus)

		if (
			dataObjStatusLocal.listRowsCurrent != undefined &&
			dataObjStatusLocal.listRowsCurrent >= 0 &&
			dataObjStatusLocal.listRowsTotal
		) {
			rowsCurrent = dataObjStatusLocal.listRowsCurrent + 1
			rowsTotal = dataObjStatusLocal.listRowsTotal
			status = '[' + rowsCurrent + ' of ' + rowsTotal + ']'
		}
	}

	$: {
		if (dataObj && dataObjStatusLocal) {
			showRow =
				dataObj.cardinality === DataObjCardinality.detail && !dataObjStatusLocal.isInsertMode
		}
	}

	async function onProcessRow(node: NavTreeNode, action: DataObjRowChange) {
		currentNode = node
		currentAction = action
		messenger.askB4Transition(dataObjStatusLocal, false, procesRow)
	}

	async function procesRow() {
		await nodeProcessRowManager(currentNode, currentAction)
	}
</script>

<Messenger bind:this={messenger} />

{#if showRow}
	<span style:cursor="pointer">
		<div class="flex">
			<div class={rowsCurrent === 1 ? 'invisible' : ''}>
				<NavRowAction
					{node}
					action={DataObjRowChange.first}
					icon={'double-arrow-left'}
					{onProcessRow}
				/>
			</div>
			<div class={rowsCurrent === 1 ? 'invisible' : ''}>
				<NavRowAction {node} action={DataObjRowChange.left} icon={'arrow-left'} {onProcessRow} />
			</div>
			<div class="ml-1">{status}</div>
			<div class={rowsCurrent === rowsTotal ? 'invisible' : ''}>
				<NavRowAction {node} action={DataObjRowChange.right} icon={'arrow-right'} {onProcessRow} />
			</div>
			<div class={rowsCurrent === rowsTotal ? 'invisible' : ''}>
				<NavRowAction
					{node}
					action={DataObjRowChange.last}
					icon={'double-arrow-right'}
					{onProcessRow}
				/>
			</div>
		</div>
	</span>
{/if}

<!-- <pre>{JSON.stringify(status, null, 2)}</pre> -->
