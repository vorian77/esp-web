<script lang="ts">
	import type { FieldSelect } from '$comps/form/fieldSelect'
	import DataViewer from '$comps/DataViewer.svelte'
	export let field: FieldSelect
	export let onChange = (fieldName: string, valueData: any, valueDisplay: any) => {}

	const fieldId = 'field' + field.index

	$: if (field.valueCurrent.items.length === 1 && !field.valueCurrent.data)
		field.valueCurrent.data = field.valueCurrent.items[0].data

	function onChangeSelect(event: Event) {
		const newValData = event.currentTarget?.value
		let newValDisplay = null
		if (newValData) {
			const idx = field.valueCurrent.items.findIndex((f) => {
				return f.data === newValData
			})
			newValDisplay = idx > -1 ? field.valueCurrent.items[idx].display : null
		}
		onChange(field.name, newValData, newValDisplay)
	}
</script>

<!-- <DataViewer header="value" data={field.value} /> -->
<!-- <DataViewer header="items" data={field.items} /> -->

<label for={fieldId} class="label">
	<span>{field.label}</span>
	<select
		class="select rounded-lg {field.colorBackground}"
		name={field.name}
		id={fieldId}
		bind:value={field.valueCurrent.data}
		on:change={onChangeSelect}
	>
		<option value={null}>Select an option...</option>
		{#each field.valueCurrent.items as { data: id, display: label }, index (id)}
			<option value={id} selected={id === field.valueCurrent.data}>
				{label}
			</option>
		{/each}
	</select>
</label>

<style>
	/* select {
		@apply {field.colorBackground} rounded-lg;
	} */

	select option {
		background: white;
		color: black;
	}
</style>
