<script lang="ts">
	import type { FieldListSelect } from '$comps/form/fieldListSelect'
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
	import {
		State,
		StateObjDataObj,
		StateObjDialog,
		StateLayout,
		StateSurfaceStyle,
		StateSurfaceType
	} from '$comps/nav/types.appState'
	import { TokenApiQueryType } from '$comps/types.token'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import { type DataObjData } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElListSelect.svelte'
	const dispatch = createEventDispatcher()
	const modalStore = getModalStore()

	export let state: State
	export let field: FieldListSelect
	export let dataObjData: DataObjData

	let stateLocal: State

	$: setStateDisplay(field.valueCurrent)

	function overlay() {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'overlayModalDialog',
				meta: {
					state: new StateObjDialog({
						actionsFieldDialog: field.actionsFieldDialog,
						btnLabelComplete: field.btnLabelComplete,
						dataObjData,

						dataObjName: field.dataObjNameSelect,
						layout: new StateLayout({
							surfaceStyle: StateSurfaceStyle.dialogSelect,
							surfaceType: StateSurfaceType.DataObjLayout
						}),
						isMultiSelect: field.isMultiSelect,
						modalStore,
						onRowClick: (rows: any, record: any) => {},
						page: '/',
						queryType: TokenApiQueryType.retrieve,
						embedRecordIdList: field.valueCurrent
					})
				},
				response: (r: any) => {
					resolve(r)
				}
			}
			modalStore.trigger(modal)
		}).then((response) => {
			if (response !== false) {
				console.log('FormElListSelect.response:', response)
				// field.valueCurrent = response.map((v: any) => v.id)
				// setValue(field.valueCurrent)
			}
		})
	}

	function setStateDisplay(ids: string[]) {
		const data = dataObjData.copy()
		data.parmsUpsert({ filterInIds: ids })
		stateLocal = new StateObjDataObj({
			dataObjData: data,
			dataObjName: field.dataObjNameDisplay,
			layout: new StateLayout({
				isEmbedHeight: true,
				surfaceStyle: StateSurfaceStyle.embedded,
				surfaceType: StateSurfaceType.DataObjLayout
			}),
			modalStore,
			onRowClick: (rows: any, record: any) => overlay(),
			queryType: TokenApiQueryType.retrieve,
			updateFunction: () => overlay()
		})
	}

	function setValue(value: string[]) {
		setStateDisplay(value)
		dispatch('changeItem', { fieldName: field.name, value })
	}
</script>

<div class="flex mt-6">
	<label for={field.name}>{field.label}</label>
	<button class="ml-1" on:click={() => overlay()}>
		<Icon name={'select'} width="28" height="28" fill={'#3b79e1'} />
	</button>
</div>

<div>
	{#if stateLocal}
		<object title="embedded column" class="mb-4">
			<DataObj state={stateLocal} />
		</object>
	{/if}
</div>

<!-- <DataViewer header="field" data={field} /> -->
