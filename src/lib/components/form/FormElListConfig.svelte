<script lang="ts">
	import type { FieldListConfig } from '$comps/form/fieldListConfig'
	import { type ModalSettings, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import {
		State,
		StateObjDataObj,
		StateObjDialog,
		StateLayout,
		StatePacketComponent,
		StateSurfaceType,
		StateSurfaceStyle
	} from '$comps/nav/types.appState'
	import {
		TokenApiQueryType,
		TokenAppDoDetail,
		TokenAppModalReturn,
		TokenAppModalReturnType
	} from '$comps/types.token'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import { DataObjCardinality, DataObjData } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import { createEventDispatcher } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElListConfig.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()

	const dispatch = createEventDispatcher()

	export let state: State
	export let field: FieldListConfig
	export let dataObjData: DataObjData

	let stateDisplay: State

	$: setStateDisplay(field.valueCurrent)

	function setStateDisplay(ids: string[]) {
		stateDisplay = new StateObjDataObj({
			cardinality: DataObjCardinality.list,
			data: dataObjData,
			dataObjName: field.dataObjNameDisplay,
			layout: new StateLayout({
				isEmbedHeight: true,
				surfaceStyle: StateSurfaceStyle.embedded,
				surfaceType: StateSurfaceType.DataObjLayout
			}),
			modalStore,
			onRowClick: (rows: any, record: any) => overlay(TokenApiQueryType.retrieve, record.id),
			embedRecordIdCurrent: undefined,
			embedRecordIdList: field.valueCurrent,
			parentRecordId: dataObjData.getRecordValue('id'),
			programId: state.programId,
			queryType: TokenApiQueryType.retrieve,
			updateCallback: stateUpdateCallback
		})
	}

	async function stateUpdateCallback(obj: any) {
		console.log('FormElListConfig.stateUpdateCallback:', obj)
		const packet = obj.packet
		const token = packet.token
		switch (packet.component) {
			case StatePacketComponent.appDataObj:
				if (token instanceof TokenAppDoDetail) {
					overlay(TokenApiQueryType.new)
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'stateUpdateCallback',
					message: `No case defined for packet component: ${packet.component}`
				})
		}
	}

	function overlay(queryType: TokenApiQueryType, id: string | undefined = undefined) {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'overlayModalDialog',
				meta: {
					state: new StateObjDialog({
						actionsFieldDialog: field.actionsFieldDialog,
						cardinality: DataObjCardinality.detail,
						data: dataObjData,
						dataObjIdDialog: field.dataObjIdConfig,
						dataObjIdDisplay: field.dataObjIdDisplay,
						drawerStore,
						isBtnDelete: true,
						isMultiSelect: field.isMultiSelect,
						layout: new StateLayout({
							surfaceStyle: StateSurfaceStyle.dialogDetail,
							surfaceType: StateSurfaceType.DataObjLayoutDialogDetail
						}),
						modalStore,
						page: '/',
						embedRecordIdCurrent: id,
						embedRecordIdList: field.valueCurrent,
						parentRecordId: dataObjData.getRecordValue('id'),
						programId: state.programId,
						queryType
					})
				},
				response: (r: any) => {
					resolve(r)
				}
			}
			modalStore.trigger(modal)
		}).then((response) => {
			if (response !== false) {
				let id: string
				const modalReturn = response as TokenAppModalReturn
				console.log('FormElListConfig.modalReturn:', modalReturn)
				switch (modalReturn.type) {
					case TokenAppModalReturnType.complete:
						// id = modalReturn.records[0].id
						// if (!field.valueCurrent.includes(id)) {
						// 	field.valueCurrent.push(id)
						// }
						break

					case TokenAppModalReturnType.delete:
						// id = modalReturn.records[0].id
						// field.valueCurrent = field.valueCurrent.filter((v: string) => v !== id)
						break

					default:
						error(500, {
							file: FILENAME,
							function: 'overlay',
							message: `No case defined for modal return type: ${modalReturn.type} for field: ${field.name}`
						})
				}
				setValue(field.valueCurrent)
			}
		})
	}

	function setValue(value: string[]) {
		setStateDisplay(value)
		dispatch('changeItem', { fieldName: field.name, value })
	}
</script>

<div class="flex mt-6">
	<label for={field.name}>{field.label}</label>
</div>
<div>
	{#if stateDisplay}
		<object title="embedded column" class="-mt-4 mb-4">
			<DataObj state={stateDisplay} />
		</object>
	{/if}
</div>

<!-- <DataViewer header="state" data={state} /> -->
