<script lang="ts">
	import { type AppLevelRowStatus, AppRowActionType } from '$comps/nav/types.app'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { TokenAppRow } from '$comps/types.token'
	import NavRowAction from '$comps/nav/NavRowAction.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	export let state: State
	export let rowStatus: AppLevelRowStatus | undefined

	async function onChange(rowAction: AppRowActionType) {
		state.update({
			packet: new StatePacket({
				component: StatePacketComponent.navRow,
				token: new TokenAppRow(rowAction)
			})
		})
	}
</script>

<!-- <DataViewer header="rowStatus" data={rowStatus} /> -->

{#if rowStatus && rowStatus.show}
	<span style:cursor="pointer">
		<div class="flex">
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.first} icon={'double-arrow-left'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === 1 ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.left} icon={'arrow-left'} {onChange} />
			</div>
			<div class="ml-1">{rowStatus.status}</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.right} icon={'arrow-right'} {onChange} />
			</div>
			<div class={rowStatus.rowCurrentDisplay === rowStatus.rowCount ? 'invisible' : ''}>
				<NavRowAction action={AppRowActionType.last} icon={'double-arrow-right'} {onChange} />
			</div>
		</div>
	</span>
{/if}
