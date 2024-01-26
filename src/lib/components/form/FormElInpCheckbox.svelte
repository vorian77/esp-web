<script lang="ts">
	import type { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import { BinarySelect, FieldAccess } from '$comps/form/field'
	import { getArray } from '$comps/types'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let field: FieldCheckbox
	const dispatchType = 'changeItem'
	const binarySelect = new BinarySelect(field.dataType, field.valueCurrent)
	let binarySelectChecked = binarySelect.isChecked()

	$: {
		if (!binarySelect.isBinarySelect)
			if (field.isMultiSelect) {
				const vals = getArray(field.valueCurrent)
				field.items.forEach((i) => (i.selected = vals.includes(i.data)))
			} else {
				field.items.forEach((i) => (i.selected = i.data === field.valueCurrent))
			}
	}

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		const value = target.value

		if (binarySelect.isBinarySelect) {
			binarySelect.changeValue()
			binarySelectChecked = binarySelect.isChecked()
			dispatch(dispatchType, { fieldName: field.name, value: binarySelect.getValue() })
		} else if (field.isMultiSelect) {
			const idx = field.items.findIndex((i) => i.data === value)
			if (idx >= 0) {
				field.items[idx].selected = !field.items[idx].selected
				const newVal = field.items.map((i) => (i.selected ? i.data : null))
				dispatch(dispatchType, { fieldName: field.name, value: newVal })
			}
		} else {
			const idx = field.items.findIndex((i) => i.data === value)
			if (idx >= 0) {
				field.items[idx].selected = !field.items[idx].selected
				const newVal = field.items[idx].selected ? value : null
				dispatch(dispatchType, { fieldName: field.name, value: newVal })
			}
		}
	}
</script>

{#if binarySelect.isBinarySelect}
	<div class="flex">
		<label for={field.name}></label>
		<input
			type="checkbox"
			id={field.name}
			name={field.name}
			class="mt-1 rounded-sm"
			bind:checked={binarySelectChecked}
			on:change={onChange}
		/>
		<div class="ml-2">{field.label}</div>
	</div>
{:else}
	<legend>{field.label}</legend>
	<fieldset class={field.access === FieldAccess.required ? 'fieldsetRequired' : 'fieldsetOptional'}>
		{#each field.items as { data: id, display: label, selected }, i (id)}
			{@const itemName = field.name + '.' + id}
			<div class="mt-1">
				<label for={field.name} class="flex items-center space-x-2">
					<input
						type="checkbox"
						id={field.name}
						name={itemName}
						class="rounded-sm {i === 0 ? 'mt-2' : ''}"
						value={id}
						bind:checked={selected}
						on:change={onChange}
					/>
					<p class={i === 0 ? 'mt-2' : ''}>{label}</p>
				</label>
			</div>
		{/each}
	</fieldset>
{/if}
