<script lang="ts">
	import { State, StateObjDialog, StateSurfaceStyle } from '$comps/nav/types.appState'
	import { DataObj, DataObjData } from '$comps/types'
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
	import data0 from '$routes/data0.json'
	import data1 from '$routes/data1.json'
	import DataViewer from '$comps/DataViewer.svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let scrollToTop = () => {}

	const DATA_FIELD = 'id'

	const handler = new DataHandler([])
	const rows = handler.getRows()
	const selected = handler.getSelected()

	const isAllSelected = handler.isAllSelected()
	let isSelect =
		state instanceof StateObjDialog && state.layout.surfaceStyle === StateSurfaceStyle.dialogSelect
	let isSelectMulti = state instanceof StateObjDialog && state.isMultiSelect
	let isSurfaceEmbedded = state.layout.surfaceStyle === StateSurfaceStyle.embedded
	let listHeight = 'full'

	if (state instanceof StateObjDialog) {
		const data = state.data.parmsValueGet('listRecordIdList')
		data.forEach((id) => handler.select(id))
	}

	$: {
		dataObj.objData = dataObjData
		handler.clearSearch()
		handler.clearFilters()
		handler.setRows(dataObj.dataListRecord)
		handler.setPage(1)
		sortList()
	}

	$: if (state instanceof StateObjDialog) {
		const data = $rows.filter((r: any) => $selected.includes(r.id)).map((r: any) => r.id)
		state.data.parmsValueSet('listRecordIdList', data)
	}

	function sortList() {
		// apply sort items in reverse order
		handler.clearSort()
		for (let i = dataObj.orderItems.length - 1; i >= 0; i--) {
			handler.applySort({
				orderBy: dataObj.orderItems[i].name,
				direction: dataObj.orderItems[i].direction
			})
		}
	}

	function onSelect(id: string) {
		if (isSelectMulti) {
			handler.select(id)
		} else {
			$selected = [id]
		}
	}
</script>

<div id={listHeight} class="-mt-2">
	<Datatable {handler} pagination={false} rowsPerPage={false} search={!isSurfaceEmbedded}>
		<table>
			<thead>
				<tr>
					{#if isSelect}
						<th class="selection">
							{#if isSelectMulti}
								<input
									type="checkbox"
									on:click={() => handler.selectAll({ selectBy: DATA_FIELD })}
									checked={$isAllSelected}
								/>
							{/if}
						</th>
					{/if}

					{#if dataObj.fields}
						{#each dataObj.fields as field}
							{#if field.isDisplayable && field.isDisplay}
								<Th {handler} orderBy={field.name}>{field.label}</Th>
							{/if}
						{/each}
					{/if}
				</tr>
				<tr>
					{#if isSelect}
						<th class="selection" />
					{/if}
					{#if dataObj.fields}
						{#each dataObj.fields as field}
							{#if field.isDisplayable && field.isDisplay}
								<ThFilter {handler} filterBy={field.name} />
							{/if}
						{/each}
					{/if}
				</tr>
			</thead>
			<tbody>
				{#if dataObjData}
					{#each $rows as row, i}
						<tr
							class:active={$selected.includes(row[DATA_FIELD])}
							on:click={async () => await state.onRowClick($rows, row)}
							on:keyup={async () => await state.onRowClick($rows, row)}
						>
							{#if isSelect}
								<td class="selection">
									<input
										type="checkbox"
										on:click={() => onSelect(row[DATA_FIELD])}
										checked={$selected.includes(row[DATA_FIELD])}
									/>
								</td>
							{/if}
							{#each dataObj.fields as field}
								{#if field.isDisplayable && field.isDisplay}
									{@const value = row[field.name]}
									<td>{value}</td>
								{/if}
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</Datatable>
</div>

<!-- <DataViewer header="dataListRecord" data={dataObj.dataListRecord} /> -->
<!-- <DataViewer header="isSelect" data={state instanceof StateOverlayModal} /> -->
<!-- <DataViewer header="$selected" data={$selected} /> -->

<style>
	thead {
		background: #fff;
	}
	thead th.selection {
		width: 48px;
		padding-left: 8px;
		border-bottom: 1px solid #97ed9e;
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
	tbody tr.active:hover {
		background: var(--primary-lighten-2);
	}
	td :global(b) {
		font-weight: normal;
		color: #bdbdbd;
		font-family: JetBrains;
		font-size: 11px;
	}
	td.selection {
		padding-left: 24px;
	}
	tr:nth-child(even) {
		background-color: #97ed9e;
	}
</style>
