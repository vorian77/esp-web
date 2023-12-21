<script lang="ts">
	import { DataObj, DataObjAction, DataObjStatus, ToastType } from '$comps/types'
	import {
		NavState,
		NavStateComponent,
		AppObjActionType,
		TokenAppObjAction,
		ObjActionConfirm
	} from '$comps/nav/types.app'
	import { type DataObjData, DataRowStatus, QueryParmDataRow } from '$comps/dataObj/types.query'

	import { appObjStatusStore } from '$comps/nav/app'
	import Messenger from '$comps/Messenger.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/dataObj/DataObjActions.svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let dataObj: DataObj
	export let justify = 'start'
	export let hiddenMode = false
	export let isHeader: boolean
	let messenger: Messenger

	let appStatus: DataObjStatus
	$: appStatus = Object.assign(new DataObjStatus(), $appObjStatusStore)

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
		const dataRow: QueryParmDataRow = dataObj.objData[0]

		switch (actionName) {
			case 'noa_back':
				objActionWithoutData(AppObjActionType.back, true, false)
				break

			case 'noa_detail_cancel':
				objActionWithoutData(AppObjActionType.back, false, false)
				break

			case 'noa_detail_delete':
				if (dataRow.status === DataRowStatus.created) {
					objActionWithoutData(AppObjActionType.back, true, false)
				} else {
					const confirm = new ObjActionConfirm(
						'Confirm Delete',
						`Are you sure you want to delete this record (this action cannot be reversed)?`,
						'Delete Record'
					)
					objActionWithData(AppObjActionType.detailDelete, true, true, dataRow, confirm)
				}
				break

			case 'noa_detail_new':
				objActionWithoutData(AppObjActionType.detailNew, true, false)
				break

			case 'noa_detail_save':
				if (dataRow.status) {
					messenger.toast(ToastType.warning, `Saving...`)
					if ([DataRowStatus.retrieved, DataRowStatus.updated].includes(dataRow.status)) {
						objActionWithData(AppObjActionType.detailSaveUpdate, false, true, dataRow)
					} else if (dataRow.status === DataRowStatus.created) {
						objActionWithData(AppObjActionType.detailSaveInsert, false, true, dataRow)
					} else {
						throw error(500, {
							file: FILENAME,
							function: 'onClick',
							message: `No case defined for status: ${dataRow.status}`
						})
					}
				}

				// <temp> 231204 - bug?? - either data was saved or an error was thrown when the query was processed
				// messenger.toast(ToastType.success, `${capitalizeFirstLetter(parms.objType)} saved!`)

				// save callbacks
				// await parms.obj.saveCallbackExecute()
				// obj.saveCallbackReset()

				return true
				break

			case 'noa_list_new':
				objActionWithoutData(AppObjActionType.listNew, false, false)
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'onClick',
					message: `No case defined for action: ${actionName}`
				})
		}
	}
	async function objActionWithData(
		actionType: AppObjActionType,
		checkObjChanged: boolean,
		dbProcess: boolean,
		dataRow: QueryParmDataRow,
		confirm: ObjActionConfirm | undefined = undefined
	) {
		objAction(actionType, checkObjChanged, dbProcess, [dataRow], confirm)
	}
	async function objActionWithoutData(
		actionType: AppObjActionType,
		checkObjChanged: boolean,
		dbProcess: boolean,
		confirm: ObjActionConfirm | undefined = undefined
	) {
		objAction(actionType, checkObjChanged, dbProcess, undefined, confirm)
	}
	async function objAction(
		actionType: AppObjActionType,
		checkObjChanged: boolean,
		dbProcess: boolean,
		dataObjData: DataObjData | undefined,
		confirm: ObjActionConfirm | undefined = undefined
	) {
		stateAdd(
			new NavState({
				checkObjChanged,
				component: NavStateComponent.objAction,
				token: new TokenAppObjAction({
					actionType,
					confirm,
					dataObjData,
					dataObjRaw: dataObj.dataObjRaw,
					dbProcess
				})
			})
		)
	}
</script>

<Messenger bind:this={messenger} />

<!-- <DataViewer header="formObj" data={formObj} /> -->

{#if !hiddenMode}
	<div class="flex justify-{justify}">
		{#each actions as action}
			{@const hidden =
				action.name === 'noa_detail_save' && !appStatus.objHasChanged ? 'hidden' : ''}
			{@const disabled =
				action.name === 'noa_detail_save' && !appStatus.objValidToSave ? true : false}
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
