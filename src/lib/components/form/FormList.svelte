<script lang="ts">
	import type { Form } from '$comps/form/form'
	import type { DataObj } from '$comps/types'
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
	import { Form as FormClass } from '$comps/form/form'
	import { navParms, setNavParmsDataObj } from '$comps/nav/navStore'
	import DataObjActions from '$comps/DataObjActions.svelte'
	import data0 from '$routes/data0.json'
	import data1 from '$routes/data1.json'
	import DataViewer from '$comps/DataViewer.svelte'
	import { getArray } from '$utils/array.utils'

	export let dataObj: DataObj | undefined
	export let onListRowClick = (data: any) => {}
	let scrollToTop = () => {}
	let formObj: Form

	const ROW_PER_PAGE = 20
	const handler = new DataHandler([], { rowsPerPage: ROW_PER_PAGE })
	const rows = handler.getRows()
	let sort: any

	$: {
		if (dataObj) {
			formObj = new FormClass(dataObj)
			const sortItems = formObj.defn._fieldsDbOrder
			handler.clearSort()
			if (sortItems) {
				for (let i = sortItems.length - 1; i >= 0; i--) {
					handler.applySort({
						orderBy: sortItems[i]._name,
						direction: sortItems[i]._codeDbListDir ? sortItems[i]._codeDbListDir : 'asc'
					})
				}
			}
			setNavParmsDataObj(dataObj, false)
		}
	}

	$: {
		handler.setRows($navParms.data)
		handler.setPage(1)
		handler.clearFilters()
		handler.clearSearch()
		sort = handler.getSort()
	}
</script>

<!-- <DataViewer header="sort" data={JSON.stringify(sort, null, 2)} /> -->

<div class="flex justify-between">
	<div>
		<h1 class="h1 {formObj.subHeader ? '' : 'mb-5'}">{formObj.header}</h1>
	</div>
	<div>
		<slot name="actions" />
		<DataObjActions {formObj} />
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
						{#if field.isDisplayable && field.isDisplay}
							<Th {handler} orderBy={field.name}>{field.label}</Th>
						{/if}
					{/each}
				{/if}
			</tr>
			<tr>
				{#if formObj.fields}
					{#each formObj.fields as field, i}
						{#if field.isDisplayable && field.isDisplay}
							<ThFilter {handler} filterBy={field.name} />
						{/if}
					{/each}
				{/if}
			</tr>
		</thead>
		<tbody>
			{#if $navParms.data}
				{#each $rows as row, i (row.id)}
					<tr
						on:click={() => onListRowClick({ index: i, row })}
						on:keyup={() => onListRowClick({ index: i, row })}
					>
						{#each formObj.fields as field, i}
							{#if field.isDisplayable && field.isDisplay}
								<td>{row[field.name].display}</td>
							{/if}
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</Datatable>

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
