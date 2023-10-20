<script lang="ts">
	import { NavTree, NavTreeNode, type DataObj } from '$comps/types'
	import { navTree } from '$comps/nav/navStore'
	import { DataObjCardinality, DataObjRowChange } from '$comps/types'
	import NavRowAction from '$comps/nav/NavRowAction.svelte'

	let navTreeLocal: NavTree
	let node: NavTreeNode
	let dataObj: DataObj | null
	let rowsCurrent: number | undefined
	let rowsTotal: number | undefined
	let showRow = false
	let status = ''

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		node = navTreeLocal.currentNode
		dataObj = node.nodeObj.dataObj

		if (dataObj && dataObj.listRows > 0) {
			rowsCurrent = dataObj.listRowsCurrent + 1
			rowsTotal = dataObj.listRows
			status = '[' + rowsCurrent + ' of ' + rowsTotal + ']'
			showRow = dataObj.cardinality === DataObjCardinality.detail
		} else {
			status = ''
			showRow = false
		}
	}
</script>

{#if showRow}
	<span style:cursor="pointer">
		<div class="flex">
			<div class={rowsCurrent === 1 ? 'invisible' : ''}>
				<NavRowAction {node} action={DataObjRowChange.first} icon={'double-arrow-left'} />
			</div>
			<div class={rowsCurrent === 1 ? 'invisible' : ''}>
				<NavRowAction {node} action={DataObjRowChange.left} icon={'arrow-left'} />
			</div>
			<div class="ml-1">{status}</div>
			<div class={rowsCurrent === rowsTotal ? 'invisible' : ''}>
				<NavRowAction {node} action={DataObjRowChange.right} icon={'arrow-right'} />
			</div>
			<div class={rowsCurrent === rowsTotal ? 'invisible' : ''}>
				<NavRowAction {node} action={DataObjRowChange.last} icon={'double-arrow-right'} />
			</div>
		</div>
	</span>
{/if}

<!-- <pre>{JSON.stringify(status, null, 2)}</pre> -->
