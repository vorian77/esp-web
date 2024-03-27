<script lang="ts">
	import type { SvelteComponent } from 'svelte'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import { StateObjDialog } from '$comps/nav/types.appState'
	import {
		TokenAppDoAction,
		TokenAppModalReturn,
		TokenAppModalReturnType
	} from '$comps/types.token'
	import { getDrawerStore, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
	import { DataObjAction } from '$comps/types'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/overlay/OverlayModalItems.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	export let parent: SvelteComponent

	let state: StateObjDialog = $modalStore[0].meta.state

	state.setUpdateCallback((obj: any) => {
		state.packet = obj.packet
	})

	$: {
		const idCurrent = state.metaData.valueGetId()
		const idList = state.metaData.valueGetIdList()

		if (idCurrent && idList.length === 0) {
			// auto close after deleting only record
			if ($modalStore[0].response)
				$modalStore[0].response(new TokenAppModalReturn(TokenAppModalReturnType.complete, idList))
			modalStore.close()
		}
	}

	async function onClickActionDialog(action: DataObjAction) {
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
					function: 'onClickActionDialog',
					message: `No case defined for DataObjAction: ${action.dbAction} `
				})
		}
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

<!-- <DataViewer
	header="state.metaData"
	data={{ recordIdCurrent: state.metaData.valueGetId(), idList: state.metaData.valueGetIdList() }}
/> -->
