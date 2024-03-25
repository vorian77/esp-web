<script lang="ts">
	import type { FieldListConfig } from '$comps/form/fieldListConfig'
	import { type ModalSettings, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import {
		State,
		StateObjDataObj,
		StateObjDialog,
		StateLayout,
		StatePacketComponent,
		StateLayoutComponent,
		StateLayoutStyle
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
	let listRecordIdParent: string

	$: listRecordIdParent = dataObjData.getRecordValue('id') || ''
	$: setStateDisplay(field.valueCurrent)

	function setStateDisplay(ids: string[]) {
		stateDisplay = new StateObjDataObj({
			cardinality: DataObjCardinality.list,
			dataObjName: field.dataObjNameDisplay,
			layout: new StateLayout({
				isEmbedHeight: true,
				layoutComponent: StateLayoutComponent.DataObjLayout,
				layoutStyle: StateLayoutStyle.embeddedField
			}),
			modalStore,
			onRowClick: (rows: any, record: any) => overlay(TokenApiQueryType.retrieve, record.id),
			parms: { listRecordIdParent },
			queryType: TokenApiQueryType.retrieve,
			updateCallback: stateUpdateCallback
		})
	}

	async function stateUpdateCallback(obj: any) {
		const packet = obj.packet
		const token = packet.token
		switch (packet.component) {
			case StatePacketComponent.dataObj:
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
				component: 'dataObjDialog',
				meta: {
					state: new StateObjDialog({
						actionsFieldDialog: field.actionsFieldDialog,
						cardinality: DataObjCardinality.detail,
						dataObjIdDialog: field.dataObjIdConfig,
						dataObjIdDisplay: field.dataObjIdDisplay,
						drawerStore,
						isBtnDelete: true,
						isMultiSelect: field.isMultiSelect,
						layout: new StateLayout({
							layoutComponent: StateLayoutComponent.DataObjLayout,
							layoutStyle: StateLayoutStyle.overlayModalDetail
						}),
						modalStore,
						page: '/',
						parms: {
							listRecordIdCurrent: id,
							listRecordIdList: field.valueCurrent,
							listRecordIdParent
						},
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
				const modalReturn = response as TokenAppModalReturn
				field.valueCurrent = modalReturn.data
				setValue(field.valueCurrent)
			}
		})
	}

	function setValue(value: string[]) {
		setStateDisplay(value)
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

<!-- <DataViewer header="listRecordIdParent" data={listRecordIdParent} />
<DataViewer header="value" data={field.valueCurrent} /> -->
