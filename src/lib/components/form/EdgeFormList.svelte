<script lang="ts">
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
	import data0 from '$routes/data0.json'
	import data1 from '$routes/data1.json'

	export let user = {}
	export let node = {}

	let formDefn = {}
	let formData = {}

	const ROW_PER_PAGE = 10

	const handler = new DataHandler([], { rowsPerPage: ROW_PER_PAGE })
	const rows = handler.getRows()

	$: {
		formDefn = node.form.formDefn
		formData = node.form.formData

		handler.setRows(formData)
		handler.setPage(1)
		handler.clearSearch()
		handler.clearSort()
		handler.clearFilters()
	}

	function recordEdit(row: {}) {
		alert(`Edit record: ${JSON.stringify(row)}`)
	}
	function recordInsert() {
		alert('New record...')
	}
</script>

<div class="flex justify-between">
	<div>
		<h1 class="h1 {formDefn.subHeader ? '' : 'mb-5'}">{formDefn.header}</h1>
	</div>
	<div>
		<button class="btn variant-filled-secondary mt-1" on:click={recordInsert}>+</button>
	</div>
</div>

{#if formDefn.subHeader}
	<div class="mb-5">
		<h4 class="h4 text-gray-500">
			{formDefn.subHeader}
		</h4>
	</div>
{/if}

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				{#each formDefn.fields as field, i}
					{#if field.access !== 'hidden'}
						<Th {handler} orderBy={field.name}>{field.label}</Th>
					{/if}
				{/each}
			</tr>
			<tr>
				{#each formDefn.fields as field, i}
					{#if field.access !== 'hidden'}
						<ThFilter {handler} filterBy={field.name} />
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr on:click={() => recordEdit(row)} on:keyup={() => recordEdit(row)}>
					{#each formDefn.fields as field, i}
						{#if field.access !== 'hidden'}
							<td>{row[field.name]}</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</Datatable>

<pre>{JSON.stringify(formDefn, null, 2)}</pre>

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
