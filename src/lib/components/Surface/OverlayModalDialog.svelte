<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import { AppRowActionType } from '$comps/nav/types.app'
	import { StateObjDialog, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import {
		TokenApiQueryType,
		TokenAppDoAction,
		TokenAppDoDetail,
		TokenAppModalReturn,
		TokenAppModalReturnType,
		TokenAppRow
	} from '$comps/types.token'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { apiDbQuery } from '$lib/api'
	import { DataObjAction, ResponseBody } from '$comps/types'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/overlay/OverlayModalItems.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let parent: SvelteComponent

	let state: StateObjDialog = $modalStore[0].meta.state

	state.setUpdateCallback(onClickActionObj)

	$: {
		const idList = state.metaData.valueGetIdList()
		const idCurrent = state.metaData.valueGetId()

		if (idList.length === 0 && idCurrent) {
			console.log('OverlayModalItems.closing...')
			if ($modalStore[0].response)
				$modalStore[0].response(new TokenAppModalReturn(TokenAppModalReturnType.complete, idList))
			modalStore.close()
		}
	}

	async function onClickActionObj(obj: any) {
		state.packet = obj.packet
	}
	async function onBtnComplete() {
		// async function objActionSave(rowStatus: DataObjRecordStatus) {
		// 	if ([DataObjRecordStatus.retrieved, DataObjRecordStatus.updated].includes(rowStatus)) {
		// 		await objAction(TokenAppDoAction.detailSaveUpdate, false)
		// 	} else if (rowStatus === DataObjRecordStatus.created) {
		// 		await objAction(TokenAppDoAction.detailSaveInsert, false)
		// 	}
		// }
		// console.log('OverlayModalItems.onBtnComplete.state:', state)

		// if ($modalStore[0].response)
		// 	$modalStore[0].response(
		// 		new TokenAppModalReturn(TokenAppModalReturnType.complete, state.records)
		// 	)
		modalStore.close()
	}
	async function onBtnDelete() {
		// if ($modalStore[0].response)
		// 	$modalStore[0].response(
		// 		new TokenAppModalReturn(TokenAppModalReturnType.delete, state.records)
		// 	)
		modalStore.close()
	}

	// async function updateState(action: TokenAppDoAction) {
	// 	state.update({
	// 		packet: new StatePacket({
	// 			checkObjChanged: false,
	// 			component: StatePacketComponent.appDataObj,
	// 			token: new TokenAppDoDetail(action, dataObj.objData)
	// 		})
	// 	})
	// }

	// let result: ResponseBody = await apiDbQuery(
	// 	TokenApiQueryType.expression,
	// 	{ dataObjName },
	// 	new TokenApiQueryData({ parms: data })
	// )

	async function onClickActionDialog(action: DataObjAction) {
		console.log('OverlayModalItems.onClickDialog.action:', action)
		switch (action.dbAction) {
			case TokenAppDoAction.dialogCancel:
				if ($modalStore[0].response)
					$modalStore[0].response(
						new TokenAppModalReturn(TokenAppModalReturnType.cancel, undefined)
					)
				modalStore.close()
				break

			case TokenAppDoAction.dialogDone:
				if ($modalStore[0].response)
					$modalStore[0].response(
						new TokenAppModalReturn(
							TokenAppModalReturnType.complete,
							state.metaData.valueGetIdList()
						)
					)
				modalStore.close()
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'onClickDialog',
					message: `No case defined for DataObjAction: ${action.dbAction} `
				})
		}
		// onBtnDelete()
	}
</script>

{#if state}
	<div class="esp-card-space-y w-modal-wide">
		<DataObj bind:state on:formCancelled={parent.onClose} />

		<div class="mr-4">
			<footer class={parent.regionFooter}>
				{#each state.actionsFieldDialog as action}
					<div class="pb-4">
						<button
							disabled={action.isDisabled}
							class="btn {action.color}"
							on:click={async () => await onClickActionDialog(action)}
						>
							{action.header}
						</button>
					</div>
				{/each}
			</footer>
		</div>
	</div>
{/if}

<DataViewer
	header="state.metaData"
	data={{ recordIdCurrent: state.metaData.valueGetId(), idList: state.metaData.valueGetIdList() }}
/>
