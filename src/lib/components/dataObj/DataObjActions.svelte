<script lang="ts">
	import { DataObj, DataObjAction, DataObjRowStatus } from '$comps/types'
	import {
		State,
		StatePacket,
		StatePacketComponent,
		TokenAppDoDetail,
		TokenAppDoDetailConfirm,
		TokenAppDoAction
	} from '$comps/nav/types.app'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	export let state: State
	export let dataObj: DataObj
	export let justify = 'start'
	export let hiddenMode = false
	export let isHeader: boolean

	const footerOnly = ['noa_detail_cancel', 'noa_detail_save']
	let actions: Array<DataObjAction> = []
	dataObj.actions.forEach((a) => {
		if (isHeader) {
			if (!footerOnly.includes(a.name)) actions.push(a)
		} else {
			if (footerOnly.includes(a.name)) actions.push(a)
		}
	})

	async function onClick(actionName: string) {
		if (!dataObj.objData.dataObjRow)
			error(500, {
				file: FILENAME,
				function: 'onClick',
				message: `dataObj.objData is undefined`
			})

		const rowStatus = dataObj.objData.dataObjRow.status

		switch (actionName) {
			case 'noa_back':
				await objAction(TokenAppDoAction.back, true)
				break

			case 'noa_detail_cancel':
				await objAction(TokenAppDoAction.back, false)
				break

			case 'noa_detail_delete':
				if (rowStatus === DataObjRowStatus.created) {
					await objAction(TokenAppDoAction.back, true)
				} else {
					const confirm = new TokenAppDoDetailConfirm(
						'Confirm Delete',
						`Are you sure you want to delete this record (this action cannot be reversed)?`,
						'Delete Record'
					)
					await objAction(TokenAppDoAction.detailDelete, true, confirm)
				}
				break

			case 'noa_detail_new':
				await objAction(TokenAppDoAction.detailNew, true)
				break

			case 'noa_detail_save':
				await objActionSave(rowStatus)
				break

			case 'noa_detail_save_as':
				// await objActionSave(rowStatus)
				await objAction(TokenAppDoAction.detailSaveAs, false)
				break

			case 'noa_list_new':
				await objAction(TokenAppDoAction.listNew, false)
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'onClick',
					message: `No case defined for action: ${actionName}`
				})
		}
	}

	async function objAction(
		action: TokenAppDoAction,
		checkObjChanged: boolean,
		confirm: TokenAppDoDetailConfirm | undefined = undefined
	) {
		state.update({
			packet: new StatePacket({
				checkObjChanged,
				component: StatePacketComponent.appDataObj,
				token: new TokenAppDoDetail(action, dataObj, confirm)
			})
		})
	}

	async function objActionSave(rowStatus: DataObjRowStatus) {
		if ([DataObjRowStatus.retrieved, DataObjRowStatus.updated].includes(rowStatus)) {
			await objAction(TokenAppDoAction.detailSaveUpdate, false)
		} else if (rowStatus === DataObjRowStatus.created) {
			await objAction(TokenAppDoAction.detailSaveInsert, false)
		}
	}
</script>

<!-- <DataViewer header="formObj" data={formObj} /> -->

{#if !hiddenMode}
	<div class="flex justify-{justify}">
		{#each actions as action}
			{@const hidden = action.name === 'noa_detail_save' && !state.objHasChanged ? 'hidden' : ''}
			{@const disabled = action.name === 'noa_detail_save' && !state.objValidToSave ? true : false}
			<button
				{disabled}
				class="btn {hidden} {action.color} {justify === 'start' ? 'mr-1' : 'ml-1'}"
				on:click={() => onClick(action.name)}
			>
				{action.header}
			</button>
		{/each}
	</div>
{/if}
