<script lang="ts">
	import type { Form } from '$comps/esp/form/form'
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
	import data0 from '$routes/data0.json'
	import data1 from '$routes/data1.json'

	export let formObj: Form
	export let formData: Array<{}>
	export let onListRowClick = (row: {}) => {}

	const ROW_PER_PAGE = 10

	const handler = new DataHandler([], { rowsPerPage: ROW_PER_PAGE })
	const rows = handler.getRows()

	$: {
		handler.setRows(formData)
		handler.setPage(1)
		handler.clearFilters()
		handler.clearSearch()
		handler.clearSort()
	}
</script>

<div class="flex justify-between">
	<div>
		<h1 class="h1 {formObj.subHeader ? '' : 'mb-5'}">{formObj.header}</h1>
	</div>
	<div>
		<slot name="actions" />
	</div>
</div>

{#if formObj.subHeader}
	<div class="mb-5">
		<h4 class="h4 text-gray-500">
			{formObj.subHeader}
		</h4>
	</div>
{/if}

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				{#if formObj.fields}
					{#each formObj.fields as field, i}
						{#if field.access !== 'hidden'}
							<Th {handler} orderBy={field.name}>{field.label}</Th>
						{/if}
					{/each}
				{/if}
			</tr>
			<tr>
				{#if formObj.fields}
					{#each formObj.fields as field, i}
						{#if field.access !== 'hidden'}
							<ThFilter {handler} filterBy={field.name} />
						{/if}
					{/each}
				{/if}
			</tr>
		</thead>
		<tbody>
			{#if formData}
				{#each $rows as row}
					<tr on:click={() => onListRowClick(row)} on:keyup={() => onListRowClick(row)}>
						{#each formObj.fields as field, i}
							{#if field.access !== 'hidden'}
								<td>{row[field.name]}</td>
							{/if}
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</Datatable>

<!-- formDefn:
<pre>{JSON.stringify(formObj, null, 2)}</pre>

formData:
<pre>{JSON.stringify(formData, null, 2)}</pre> -->

<style>
	thead {
		background: #fff;
	}
	tbody td {
		border: 1px solid #f5f5f5;
		padding: 4px 20px;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tbody tr:hover {
		background: #f5f5f5;
	}
	tr:nth-child(even) {
		background-color: Lightgreen;
	}
</style>
