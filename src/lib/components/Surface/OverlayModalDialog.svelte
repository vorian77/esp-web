<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import { AppRowActionType } from '$comps/nav/types.app'
	import {
		StateObjDialog,
		StatePacket,
		StatePacketComponent,
		stateUpdateDataObj
	} from '$comps/nav/types.appState'
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

	state.setUpdate(stateUpdateDataObj, onClickObjAction)
	console.log('OverlayModalDialog.state:', state)

	async function onClickObjAction(obj: any) {
		console.log('OverlayModalDialog.onClickObjAction.packet:', obj)
		state.packet = obj.packet
		return

		// switch (packet.component) {
		// 	case StatePacketComponent.appDataObj:
		// 		break

		// 	case StatePacketComponent.appRow:
		// 		if (packet.token instanceof TokenAppRow) {
		// 			switch (packet.token.rowAction) {
		// 				case AppRowActionType.first:
		// 					state.parentIdCurrent = state.parentIdList[0]
		// 					break

		// 				case AppRowActionType.left:
		// 					if (state.parentIdCurrent) {
		// 						state.parentIdCurrent =
		// 							state.parentIdList[state.parentIdList.indexOf(state.parentIdCurrent) - 1]
		// 					}
		// 					break

		// 				case AppRowActionType.right:
		// 					if (state.parentIdCurrent) {
		// 						state.parentIdCurrent =
		// 							state.parentIdList[state.parentIdList.indexOf(state.parentIdCurrent) + 1]
		// 					}
		// 					break

		// 				case AppRowActionType.last:
		// 					state.parentIdCurrent = state.parentIdList[state.parentIdList.length - 1]
		// 					break

		// 				default:
		// 					error(500, {
		// 						file: FILENAME,
		// 						function: 'OverlayModalDialog.onClickObjAction',
		// 						message: `No case defined for packet.token.rowAction: ${packet.token.rowAction} `
		// 					})
		// 			}
		// 		}
		// 		break

		// 	default:
		// 		error(500, {
		// 			file: FILENAME,
		// 			function: 'OverlayModalDialog.onClickObjAction',
		// 			message: `No case defined for state.component: ${packet.component} `
		// 		})
		// }
	}
	async function onBtnComplete() {
		// switch (state.queryType) {
		// 	case TokenApiQueryType.retrieve:
		// 		// await updateState(TokenAppDoAction.detailSaveUpdate)
		// 		break
		// 	case TokenApiQueryType.new:
		// 		// await onBtnCompleteExpression()
		// 		break
		// 	default:
		// 		throw new Error(`OverlayModalItems.onBtnComplete: unknown queryType: ${state.queryType}`)
		// }
		// TokenApiQueryType.retrieve

		// 			constructor(action: TokenAppDoAction, dataObj: DataObj, confirm?: ) {
		// 	super(action, dataObj)
		// 	this.confirm = confirm
		// }

		// async function objActionSave(rowStatus: DataObjRecordStatus) {
		//     if ([DataObjRecordStatus.retrieved, DataObjRecordStatus.updated].includes(rowStatus)) {
		//         await objAction(TokenAppDoAction.detailSaveUpdate, false);
		//     } else if (rowStatus === DataObjRecordStatus.created) {
		//         await objAction(TokenAppDoAction.detailSaveInsert, false);
		//     }
		// }

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
					function: 'onClick',
					message: `No case defined for TokenApiDbActionType: ${action.dbAction} `
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
