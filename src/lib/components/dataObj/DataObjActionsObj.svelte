<script lang="ts">
	import { DataObj, DataObjAction, DataObjRecordStatus, DataObjSaveMode } from '$comps/types'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { TokenAppDoDetail, TokenAppDoDetailConfirm, TokenAppDoAction } from '$comps/types.token'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	export let state: State
	export let dataObj: DataObj

	let saveMode: DataObjSaveMode
	let actions: Array<DataObjAction>

	let show: Record<string, (saveMode: DataObjSaveMode, objHasChanged: boolean) => boolean> = {
		noa_detail_save_insert: (saveMode: DataObjSaveMode, objHasChanged: boolean) =>
			saveMode === DataObjSaveMode.insert && objHasChanged,
		noa_detail_save_update: (saveMode: DataObjSaveMode, objHasChanged: boolean) =>
			saveMode === DataObjSaveMode.update && objHasChanged,
		noa_detail_delete: (saveMode: DataObjSaveMode, objHasChanged: boolean) =>
			saveMode === DataObjSaveMode.update
	}

	let disabled: Record<string, (objValidToSave: boolean) => boolean> = {
		noa_detail_save_insert: (objValidToSave: boolean) => !objValidToSave,
		noa_detail_save_update: (objValidToSave: boolean) => !objValidToSave
	}

	$: {
		saveMode = dataObj.saveMode
		actions = dataObj.actionsField
			.filter((a) =>
				Object.hasOwn(show, a.name) ? show[a.name](saveMode, state.objHasChanged) : true
			)
			.map((a) => {
				a.isDisabled = Object.hasOwn(disabled, a.name)
					? disabled[a.name](state.objValidToSave)
					: false
				return a
			})
	}

	async function onClick(action: DataObjAction) {
		let confirm: TokenAppDoDetailConfirm | undefined
		if (action.confirmButtonLabel && action.confirmMsg && action.confirmTitle)
			confirm = new TokenAppDoDetailConfirm(
				action.confirmTitle,
				action.confirmMsg,
				action.confirmButtonLabel
			)
		state.update({
			packet: new StatePacket({
				checkObjChanged: action.checkObjChanged,
				component: StatePacketComponent.appDataObj,
				token: new TokenAppDoDetail(action.dbAction, dataObj.objData, confirm)
			})
		})
	}
</script>

<!-- <DataViewer header="formObj" data={formObj} /> -->

<div class="flex flex-col">
	{#each actions as action}
		{@const disabled = action.name === 'noa_detail_save' && !state.objValidToSave ? true : false}
		<div class="pb-4">
			<button
				disabled={action.isDisabled}
				class="btn {action.color} w-full"
				on:click={() => onClick(action)}
			>
				{action.header}
			</button>
		</div>
	{/each}
</div>
