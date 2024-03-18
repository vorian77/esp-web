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

	state.setUpdateCallback(onClickObjAction)

	async function onClickObjAction(obj: any) {
		const func = 'OverlayModalDialog.onClickObjAction'
		const packet = obj.packet
		console.log('OverlayModalDialog.onClickObjAction:', { state, packet })

		switch (packet.token.component) {
			case StatePacketComponent.appDataObj:
				state.setDataParms(packet.token.data)
				break

			// 	case StatePacketComponent.appRow:
			// 		if (packet.token instanceof TokenAppRow) {
			// 			switch (packet.token.rowAction) {
			// 				case AppRowActionType.first:
			// 					state.embedRecordIdCurrent = state.embedRecordIdList[0]
			// 					break

			// 				case AppRowActionType.left:
			// 					if (state.embedRecordIdCurrent) {
			// 						state.embedRecordIdCurrent =
			// 							state.embedRecordIdList[
			// 								state.embedRecordIdList.indexOf(state.embedRecordIdCurrent) - 1
			// 							]
			// 					}
			// 					break

			// 				case AppRowActionType.right:
			// 					if (state.embedRecordIdCurrent) {
			// 						state.embedRecordIdCurrent =
			// 							state.embedRecordIdList[
			// 								state.embedRecordIdList.indexOf(state.embedRecordIdCurrent) + 1
			// 							]
			// 					}
			// 					break

			// 				case AppRowActionType.last:
			// 					state.embedRecordIdCurrent =
			// 						state.embedRecordIdList[state.embedRecordIdList.length - 1]
			// 					break

			// 				default:
			// 					error(500, {
			// 						file: FILENAME,
			// 						function: func,
			// 						message: `No case defined for packet.token.rowAction: ${packet.token.rowAction} `
			// 					})
			// 			}
			// 		}
			// 		break

			// 	default:
			// 		error(500, {
			// 			file: FILENAME,
			// 			function: func,
			// 			message: `No case defined for state.component: ${packet.token.component} `
			// 		})
		}
		state.packet = packet
	}
	async function onBtnComplete() {
		// async function objActionSave(rowStatus: DataObjRecordStatus) {
		// 	if ([DataObjRecordStatus.retrieved, DataObjRecordStatus.updated].includes(rowStatus)) {
		// 		await objAction(TokenAppDoAction.detailSaveUpdate, false)
		// 	} else if (rowStatus === DataObjRecordStatus.created) {
		// 		await objAction(TokenAppDoAction.detailSaveInsert, false)
		// 	}
		// }
		console.log('OverlayModalItems.onBtnComplete.state:', state)

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

	async function onClickDialog(action: DataObjAction) {
		console.log('OverlayModalItems.onClick.action:', action)
		switch (action.dbAction) {
			case TokenAppDoAction.dialogCancel:
				parent.onClose()
				break

			case TokenAppDoAction.dialogDone:
				onBtnComplete()
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
							on:click={async () => await onClickDialog(action)}
						>
							{action.header}
						</button>
					</div>
				{/each}
			</footer>
		</div>
	</div>
{/if}
