<script lang="ts">
	import { DataObj, DataObjAction, DataObjRecordStatus, DataObjSaveMode } from '$comps/types'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { TokenAppDoDetail, TokenAppDoAction } from '$comps/types.token'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	export let state: State
	export let dataObj: DataObj

	let actions: Array<DataObjAction>
	let saveMode: DataObjSaveMode
	let isEditing: boolean = false

	$: {
		saveMode = dataObj.saveMode
		actions = dataObj.actionsField
			.filter((a: DataObjAction) => show(a, saveMode, state.objHasChanged))
			.map((a: DataObjAction) => {
				a.isDisabled = disable(a, state.objValidToSave)
				return a
			})
		isEditing = dataObj.actionsField.some(
			(a: DataObjAction) =>
				(a.dbAction === TokenAppDoAction.detailSaveUpdate ||
					a.dbAction === TokenAppDoAction.detailSaveInsert) &&
				state.objHasChanged
		)
	}

	let show = function (action: DataObjAction, saveMode: DataObjSaveMode, objHasChanged: boolean) {
		return (
			action.renderShowSaveMode === DataObjSaveMode.any ||
			(!action.isRenderShowRequiresObjHasChanged && action.renderShowSaveMode === saveMode) ||
			(action.isRenderShowRequiresObjHasChanged &&
				action.renderShowSaveMode === saveMode &&
				objHasChanged)
		)
	}
	let disable = function (action: DataObjAction, objValidToSave: boolean) {
		return action.isRenderDisableOnInvalidToSave && !objValidToSave
	}

	async function onClick(action: DataObjAction) {
		state.update({
			packet: new StatePacket({
				checkObjChanged: action.checkObjChanged,
				component: StatePacketComponent.appDataObj,
				token: new TokenAppDoDetail(action.dbAction, dataObj.objData, action.confirm)
			})
		})
	}
</script>

<!-- <DataViewer header="formObj" data={formObj} /> -->

<div class="flex flex-col">
	{#if isEditing}
		<div class="mr-4"><p class="text-lg text-blue-600 mb-4">Editing...</p></div>
	{/if}
	{#each actions as action}
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
