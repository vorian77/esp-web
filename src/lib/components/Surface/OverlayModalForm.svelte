<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import Form from '$comps/form/Form.svelte'
	import { StateObjModal, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import {
		TokenApiQueryType,
		TokenAppDoAction,
		TokenAppDoDetail,
		TokenAppModalReturn,
		TokenAppModalReturnType
	} from '$comps/types.token'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { apiDbQuery } from '$lib/api'
	import { ResponseBody } from '$comps/types'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/overlay/OverlayModalItems.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let parent: SvelteComponent

	let state: StateObjModal = $modalStore[0].meta.state

	let btnLabelComplete = state.btnLabelComplete || 'Complete'

	async function onBtnComplete() {
		console.log('OverlayModalForm.onBtnComplete.state:', { state })
		switch (state.queryType) {
			case TokenApiQueryType.retrieve:
				await updateState(TokenAppDoAction.detailSaveUpdate)
				break
			case TokenApiQueryType.new:
				// await onBtnCompleteExpression()
				break
			default:
				throw new Error(`OverlayModalItems.onBtnComplete: unknown queryType: ${state.queryType}`)
		}
		// TokenApiQueryType.retrieve

		// 			constructor(action: TokenAppDoAction, dataObj: DataObj, confirm?: TokenAppDoDetailConfirm) {
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

		if ($modalStore[0].response)
			$modalStore[0].response(
				new TokenAppModalReturn(TokenAppModalReturnType.complete, state.records)
			)
		modalStore.close()
	}
	async function onBtnDelete() {
		if ($modalStore[0].response)
			$modalStore[0].response(
				new TokenAppModalReturn(TokenAppModalReturnType.delete, state.records)
			)
		modalStore.close()
	}

	async function updateState(action: TokenAppDoAction) {
		state.update({
			packet: new StatePacket({
				checkObjChanged: false,
				component: StatePacketComponent.appDataObj,
				token: new TokenAppDoDetail(action, dataObj)
			})
		})
	}

	async function query() {
		// let result: ResponseBody = await apiDbQuery(
		// 	TokenApiQueryType.expression,
		// 	{ dataObjName },
		// 	new TokenApiQueryData({ parms: data })
		// )
	}
</script>

{#if state}
	<div class="esp-card-space-y w-modal-wide">
		<Form bind:state on:formCancelled={parent.onClose} />

		<!-- prettier-ignore -->
		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			{#if state && state.isBtnDelete}
				<button class="btn variant-filled-error" on:click={async () => onBtnDelete()}>Delete</button>
			{/if}
			<button class="btn {parent.buttonPositive}" on:click={async () => await onBtnComplete()}>{btnLabelComplete}</button>
		</footer>
		<DataViewer
			header="state"
			data={{ hasChanged: state.objHasChanged, validToSave: state.objValidToSave }}
		/>
	</div>
{/if}

<!-- {@const disabled = action.name === 'noa_detail_save' && !state.objValidToSave ? true : false} -->
