<script lang="ts">
	import type { FieldChips } from '$comps/form/fieldChips'
	import { type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const modalStore = getModalStore()

	export let field: FieldChips

	$: {
		field.overlayFieldChips.itemsSelected = field.valueCurrent
		field.overlayFieldChips.itemsList = field.items
	}

	function add() {
		new Promise<any>((resolve) => {
			const modal: ModalSettings = {
				type: 'component',
				component: 'overlayModalItems',
				meta: { overlayNodeFieldItems: field.overlayFieldChips },
				response: (r: any) => {
					resolve(r)
				}
			}
			modalStore.trigger(modal)
		}).then((response) => {
			if (response !== false) {
				field.overlayFieldChips.itemsSelected = response
				setValue(field.overlayFieldChips.itemsSelected)
			}
		})
	}

	function remove(dataValue: string) {
		const idx = field.overlayFieldChips.itemsSelected.findIndex((item) => item === dataValue)
		if (idx > -1) {
			field.overlayFieldChips.itemsSelected.splice(idx, 1)
			setValue(field.overlayFieldChips.itemsSelected)
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
		{#each field.overlayFieldChips.getItemsDisplay() as item}
			<button class="chip variant-filled-primary text-base" on:click={() => remove(item.data)}>
				<span>{item.display}</span>
				<span>x</span>
			</button>
		{/each}
	</div>
</div>
