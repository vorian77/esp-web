<script lang="ts">
	import type { FieldListSelect } from '$comps/form/fieldListSelect'
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
	import { StateOverlayModal } from '$comps/nav/types.appState'
	import { TokenApiQueryType } from '$comps/types.token'
	import Form from '$comps/form/Form.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const modalStore = getModalStore()

	export let field: FieldListSelect

	let selectedIds: string[] = []
	// let selectedValues: FieldListChipValues = []

	$: {
		selectedIds = field.valueCurrent
	}

	function add() {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'overlayModalForm',
				meta: {
					state: new StateOverlayModal({
						btnLabelComplete: field.btnLabelComplete,
						dataObjName: field.dataObjName,
						isMultiSelect: field.isMultiSelect,
						modalStore,
						queryType: TokenApiQueryType.retrieve,
						selectedIds
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
<div>
	<!-- <Form {state} /> -->
</div>
