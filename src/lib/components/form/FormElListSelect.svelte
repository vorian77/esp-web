<script lang="ts">
	import type { FieldListSelect } from '$comps/form/fieldListSelect'
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
	import {
		State,
		StateLayout,
		StateLayoutType,
		StateObj,
		StateObjModal,
		StateSurfaceType
	} from '$comps/nav/types.appState'
	import { TokenApiQueryType } from '$comps/types.token'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import { type DataObjData } from '$comps/types'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const dispatch = createEventDispatcher()
	const modalStore = getModalStore()
	const FILENAME = '$comps/form/FormElListSelect.svelte'

	export let state: State
	export let field: FieldListSelect
	export let dataObjData: DataObjData

	let stateLocal: State

	$: {
		console.log('FormElListSelect.field:', field)
		setFormState(field.valueCurrent)
	}

	function add() {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'overlayModalDialog',
				meta: {
					state: new StateObjModal({
						btnLabelComplete: field.btnLabelComplete,
						dataObjData,
						dataObjName: field.dataObjName,
						layout: new StateLayout({
							layoutType: StateLayoutType.LayoutObj,
							surfaceType: StateSurfaceType.overlay
						}),
						isMultiSelect: field.isMultiSelect,
						modalStore,
						page: '/',
						queryType: TokenApiQueryType.retrieve,
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
				console.log('FormElListSelect.response:', response)
				field.valueCurrent = response.map((v: any) => v.id)
				setValue(field.valueCurrent)
			}
		})
	}

	function setFormState(ids: string[]) {
		const data = dataObjData.copy()
		data.parmsUpsert({ filterInIds: ids, programId: state.programId })
		stateLocal = new StateObj({
			dataObjData: data,
			dataObjName: field.dataObjName,
			layout: new StateLayout({
				layoutType: StateLayoutType.LayoutObj,
				surfaceType: StateSurfaceType.embedded
			}),
			modalStore,
			queryType: TokenApiQueryType.retrieve
		})
	}

	function setValue(value: string[]) {
		setFormState(value)
		dispatch('changeItem', { fieldName: field.name, value })
	}
</script>

<div class="flex mt-6">
	<label for={field.name}>{field.label}</label>
	<button
		type="button"
		class="btn-icon btn-icon-sm variant-ghost-primary ml-2 -mt-1"
		on:click={() => add()}>&#177;</button
	>
</div>
<div id="form">
	{#if stateLocal && field.valueCurrent.length > 0}
		<object title="embedded column" class="mb-10">
			<DataObj state={stateLocal} />
		</object>
	{/if}
</div>

<DataViewer header="field" data={field} />
