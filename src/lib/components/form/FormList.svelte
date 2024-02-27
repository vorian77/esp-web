<script lang="ts">
	import {
		State,
		StateOverlayModal,
		StatePacket,
		StatePacketComponent
	} from '$comps/nav/types.appState'
	import { TokenAppDoAction, TokenAppDoList } from '$comps/types.token'
	import type { DataObj, DataObjData } from '$comps/types'
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
	import DataObjActionsHeader from '$comps/dataObj/DataObjActionsHeader.svelte'
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

	if (state instanceof StateOverlayModal) {
		state.selectedIds.forEach((i) => handler.select(i))
	}

	$: {
		dataObj.objData = dataObjData
		handler.clearSearch()
		handler.clearFilters()
		handler.setRows(dataObj.dataListRecord)
		handler.setPage(1)
		sortList()
	}
	$: if (state instanceof StateOverlayModal) {
		state.setSelected($rows.filter((r: any) => $selected.includes(r.id)))
		console.log('FormList.select:', state.selectedRows)
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

	async function onClick(record: any) {
		state.update({
			packet: new StatePacket({
				checkObjChanged: false,
				component: StatePacketComponent.appDataObj,
				token: new TokenAppDoList(
					TokenAppDoAction.listEdit,
					dataObj,
					$rows.map((r: any) => r.id),
					record.id
				)
			})
		})
	}
</script>

<DataObjActionsHeader {state} {dataObj} on:formCancelled />

<div id="content">
	<Datatable {handler} pagination={false} rowsPerPage={false}>
		<table>
			<thead>
				<tr>
					{#if state instanceof StateOverlayModal}
						<th class="selection">
							<input
								type="checkbox"
								on:click={() => handler.selectAll({ selectBy: DATA_FIELD })}
								checked={$isAllSelected}
							/>
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
					{#if state instanceof StateOverlayModal}
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
							on:click={async () => await onClick(row)}
							on:keyup={async () => await onClick(row)}
						>
							{#if state instanceof StateOverlayModal}
								<td class="selection">
									<input
										type="checkbox"
										on:click={() => handler.select(row[DATA_FIELD])}
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

<!-- <DataViewer header="sort" data={sort} /> -->
<!-- <DataViewer header="dataListRecord" data={dataObj.dataListRecord} /> -->
<!-- <DataViewer header="isSelect" data={state instanceof StateOverlayModal} />
<DataViewer header="$selected" data={$selected} /> -->

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
	#content {
		height: 74vh;
		overflow-y: auto;
	}
</style>
