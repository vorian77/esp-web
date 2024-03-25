<script lang="ts">
	import type { FieldListChips, FieldListChipValues } from './fieldListChips'
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
	import { StateObjDialog, StateSurfaceType } from '$comps/nav/types.appState'
	import { TokenApiDbDataObj, TokenApiQueryType } from '$comps/types.token'
	import { type DataObjData } from '$comps/types'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const modalStore = getModalStore()

	export let field: FieldListChips
	export let dataObjData: DataObjData

	let selectedIds: string[] = []
	let selectedValues: FieldListChipValues = []

	$: {
		selectedIds = field.valueCurrent
		selectedValues = field.valuesRaw
			.filter((item) => selectedIds.includes(item.id))
			.map((item) => ({ id: item.id, value: item[field.columnLabelDisplay] }))
	}

	function add() {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'formlDialog',
				meta: {
					state: new StateObjDialog({
						btnLabelComplete: field.btnLabelComplete,
						dataObjData,
						dataObjName: field.dataObjName,
						isMultiSelect: field.isMultiSelect,
						modalStore,
						page: '/',
						queryType: TokenApiQueryType.retrieve,
						selectedIds,
						surface: StateSurfaceType.DataObjLayout
					})
				},
				response: (r: any) => {
					resolve(r)
				}
			}
			modalStore.trigger(modal)
		}).then((response) => {
			if (response !== false) {
				field.setSelected(response)
				setValue(field.valueCurrent)
			}
		})
	}

	function remove(dataValue: string) {
		const idx = field.valueCurrent.findIndex((item: string) => item === dataValue)
		if (idx > -1) {
			field.valueCurrent.splice(idx, 1)
			setValue(field.valueCurrent)
		}
	}

	function setValue(value: string[]) {
		dispatch('changeItem', { fieldName: field.name, value })
	}
</script>

<div class="flex mt-6">
	<label for={field.name}>{field.label}</label>
	<button
		type="button"
		class="btn-icon btn-icon-sm variant-ghost-primary ml-2 -mt-1"
		on:click={() => add()}>+</button
	>
</div>

<div class="border-2 border-solid rounded-lg mt-2 p-2 min-h-11">
	<div class="flex flex-wrap items-center gap-2">
		{#each selectedValues as item}
			<button class="chip variant-filled-primary text-base" on:click={() => remove(item.id)}>
				<span>{item.value}</span>
				<span>x</span>
			</button>
		{/each}
	</div>
</div>
