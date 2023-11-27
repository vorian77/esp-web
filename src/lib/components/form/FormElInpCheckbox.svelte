<script lang="ts">
	import type { FieldCheckbox } from '$comps/form/fieldCheckbox'
	import type { FieldValue } from '$comps/form/field'
	import { BinarySelect } from '$comps/types'
	export let field: FieldCheckbox
	let isSelected: boolean

	$: {
		if (field.isMultiSelect) {
			let vals: any = []
			if (field.value.data) vals = field.value.data.split(',')
			field.items.forEach((i) => (i.selected = vals.includes(i.data)))
		} else {
			const binarySelect = new BinarySelect(field.dataType)
			if (!field.value.data) field.value.data = binarySelect.getDefault()
			isSelected = binarySelect.isSelected(field.value.data)
		}
	}
</script>

{#if field.isMultiSelect}
	<fieldset>
		<legend>{field.label}</legend>
		{#each field.items as { data: id, display: label, selected }, i (id)}
			{@const itemName = field.name + '.' + id}
			<div class="mt-1">
				<label for={field.name} class="flex items-center space-x-2">
					<input
						type="checkbox"
						id={field.name}
						name={itemName}
						class="rounded-sm"
						value={id}
						bind:checked={selected}
						on:click
					/>
					<p>{label}</p>
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
