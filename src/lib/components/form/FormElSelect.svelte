<script lang="ts">
	import type { FieldSelect } from '$comps/form/fieldSelect'
	import DataViewer from '$comps/DataViewer.svelte'
	export let field: FieldSelect
	export let onChange = (fieldName: string, valueData: any, valueDisplay: any) => {}

	const fieldId = 'field' + field.index

	function onChangeSelect(event: Event) {
		const newValData = event.currentTarget?.value
		let newValDisplay = null
		if (newValData) {
			const idx = field.items.findIndex((f) => {
				return f.data === newValData
			})
			newValDisplay = idx > -1 ? field.items[idx].display : null
		}
		onChange(field.name, newValData, newValDisplay)
	}
</script>

<!-- <DataViewer header="value" data={field.value} /> -->
<!-- <DataViewer header="items" data={field.items} /> -->

<label for={fieldId} class="label">
	<span>{field.label}</span>
	<select
		class="select"
		name={field.name}
		id={fieldId}
		bind:value={field.value.data}
		on:change={onChangeSelect}
	>
		<option value={null}>Select an option...</option>
		{#each field.items as { data: id, display: label }, index (id)}
			<option value={id} selected={id === field.value}>
				{label}
			</option>
		{/each}
	</select>
</label>

<style>
	select {
		@apply bg-white rounded-lg;
	}

	select option {
		background: white;
		color: black;
	}
</style>
