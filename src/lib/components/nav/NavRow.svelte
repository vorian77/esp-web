<script lang="ts">
	import {
		type AppLevelRowStatus,
		NavState,
		NavStateComponent,
		NavStateTokenAppRow
	} from '$comps/types'
	import { NavRowActionType } from '$comps/types'
	import NavRowAction from '$comps/nav/NavRowAction.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	export let rowStatus: AppLevelRowStatus | undefined
	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined

	async function onChange(rowAction: NavRowActionType) {
		stateAdd(
			new NavState({
				component: NavStateComponent.row,
				token: new NavStateTokenAppRow(rowAction)
			})
		)
	}
</script>

<!-- <DataViewer header="rowStatus" data={rowStatus} /> -->

{#if rowStatus && rowStatus.show}
	<span style:cursor="pointer">
		<div class="flex">
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={NavRowActionType.first} icon={'double-arrow-left'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={NavRowActionType.left} icon={'arrow-left'} {onChange} />
			</div>
			<div class="ml-1">{rowStatus.status}</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={NavRowActionType.right} icon={'arrow-right'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={NavRowActionType.last} icon={'double-arrow-right'} {onChange} />
			</div>
		</div>
	</span>
{/if}
