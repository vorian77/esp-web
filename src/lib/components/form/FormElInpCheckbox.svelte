<script lang="ts">
	import type { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import type { FieldValue } from '$comps/form/field'
	import { BinarySelect, FieldAccess } from '$comps/types'
	export let field: FieldCheckbox
	let isSelected: boolean

	$: {
		if (field.isMultiSelect) {
			let vals: any = []
			if (field.valueCurrent.data) vals = field.valueCurrent.data.split(',')
			field.valueCurrent.items.forEach((i) => (i.selected = vals.includes(i.data)))
		} else {
			const binarySelect = new BinarySelect(field.dataType)
			console.log('FormElInpCheckbox.binarySelect:', { field, binarySelect })
			if (!field.valueCurrent.data) field.valueCurrent.data = binarySelect.getDefault()
			isSelected = binarySelect.isSelected(field.valueCurrent.data)
		}
	}
</script>

{#if field.isMultiSelect}
	<legend>{field.label}</legend>
	<fieldset class={field.access === FieldAccess.required ? 'fieldsetRequired' : 'fieldsetOptional'}>
		{#each field.valueCurrent.items as { data: id, display: label, selected }, i (id)}
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
						on:click
					/>
					<p class={i === 0 ? 'mt-2' : ''}>{label}</p>
				</label>
			</div>
		{/each}
	</fieldset>
{:else}
	<div class="flex">
		<label for={field.name}></label>
		<input
			type="checkbox"
			id={field.name}
			name={field.name}
			class="mt-1 rounded-sm"
			bind:checked={isSelected}
			on:click
		/>
		<div class="ml-2">{field.label}</div>
	</div>
{/if}
