<script lang="ts">
	import type { FieldSelect } from '$comps/form/fieldSelect'
	import { FieldAccess } from '$comps/form/field'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const dispatch = createEventDispatcher()

	export let field: FieldSelect
	const dispatchType = 'changeItem'
	const fieldId = 'field' + field.index

	$: if (field.items.length === 1 && !field.valueCurrent && field.access === FieldAccess.required) {
		field.valueCurrent = field.items[0].data
		dispatch(dispatchType, { fieldName: field.name, value: field.items[0].data })
	}

	function onChange(event: Event) {
		const target = event.currentTarget as HTMLSelectElement
		const newValue = target.value
		dispatch(dispatchType, { fieldName: field.name, value: newValue })
	}
</script>

<!-- <DataViewer header="value" data={field.value} /> -->

<label for={fieldId} class="label">
	<span>{field.label}</span>
	<select
		class="select rounded-lg {field.colorBackground}"
		name={field.name}
		id={fieldId}
		disabled={field.access == FieldAccess.readonly}
		bind:value={field.valueCurrent}
		on:change={onChange}
	>
		<option value={null}>Select an option...</option>
		{#each field.items as { data: id, display: label }, index (id)}
			<option value={id} selected={id === field.valueCurrent}>
				{label}
			</option>
		{/each}
	</select>
</label>

<DataViewer header="value" data={field.valueCurrent} />
<DataViewer header="items" data={field.items} />

<style>
	/* select {
		@apply {field.colorBackground} rounded-lg;
	} */

	select option {
		background: white;
		color: black;
	}
</style>
