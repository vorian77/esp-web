<script lang="ts">
	import type { FieldListConfig } from '$comps/form/fieldListConfig'
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
	import {
		State,
		StateLayout,
		StateLayoutType,
		StateObj,
		StateObjModal,
		StateSurfaceType
	} from '$comps/nav/types.appState'
	import {
		TokenApiQueryType,
		TokenAppModalReturn,
		TokenAppModalReturnType
	} from '$comps/types.token'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import { type DataObjData } from '$comps/types'
	import { setContext } from 'svelte'
	import { createEventDispatcher } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/form/FormElListConfig.svelte'

	const modalStore = getModalStore()
	const dispatch = createEventDispatcher()
	setContext('onRowClick', onRowClick)

	export let state: State
	export let field: FieldListConfig
	export let dataObjData: DataObjData

	let stateDisplay: State

	$: setStateDisplay(field.valueCurrent)

	function setStateDisplay(ids: string[]) {
		console.log('FormElListConfig.setStateDisplay.ids:', ids)
		stateDisplay = new StateObj({
			dataObjData: setData(ids),
			dataObjName: field.dataObjNameDisplay,
			layout: new StateLayout({
				layoutType: StateLayoutType.LayoutObj,
				surfaceType: StateSurfaceType.embedded
			}),
			modalStore,
			queryType: TokenApiQueryType.retrieve
		})
	}

	function overlay(queryType: TokenApiQueryType, id: string | undefined = undefined) {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'overlayModalDialog',
				meta: {
					state: new StateObjModal({
						btnLabelComplete: field.btnLabelComplete,
						dataObjData: id ? setData([id]) : setData([]),
						dataObjName: field.dataObjNameConfig,
						isBtnDelete: true,
						isMultiSelect: field.isMultiSelect,
						layout: new StateLayout({
							layoutType: StateLayoutType.LayoutObj,
							surfaceType: StateSurfaceType.overlay
						}),
						modalStore,
						page: '/',
						queryType,
						selectedIds: field.valueCurrent
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
						id = modalReturn.records[0].id
						if (!field.valueCurrent.includes(id)) {
							field.valueCurrent.push(id)
						}
						break

					case TokenAppModalReturnType.delete:
						id = modalReturn.records[0].id
						field.valueCurrent = field.valueCurrent.filter((v: string) => v !== id)
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
	function setData(ids: string[]) {
		const data = dataObjData.copy()
		data.parmsUpsert({ filterInIds: ids, programId: state.programId })
		return data
	}
	function setValue(value: string[]) {
		setStateDisplay(value)
		dispatch('changeItem', { fieldName: field.name, value })
	}
	async function onRowClick(rows: any, record: any) {
		overlay(TokenApiQueryType.retrieve, record.id)
	}
</script>

<div class="flex mt-6">
	<label for={field.name}>{field.label}</label>
	<button
		type="button"
		class="btn-icon btn-icon-sm variant-ghost-primary ml-2 -mt-1"
		on:click={() => overlay(TokenApiQueryType.new)}>+</button
	>
</div>
<div id="form">
	{#if stateDisplay && field.valueCurrent.length > 0}
		<object title="embedded column" class="mb-10">
			<DataObj state={stateDisplay} />
		</object>
	{/if}
</div>

<!-- <DataViewer header="state" data={state} /> -->
