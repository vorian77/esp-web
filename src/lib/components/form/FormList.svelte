<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketComponent,
		TokenAppDoAction,
		TokenAppDoList
	} from '$comps/nav/types.appState'
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

	const ROW_PER_PAGE = 20

	const handler = new DataHandler([], { rowsPerPage: ROW_PER_PAGE })
	const rows = handler.getRows()
	const selected = handler.getSelected()
	const isAllSelected = handler.isAllSelected()
	const isSelect = state.overlayNode !== undefined

	if (isSelect && state.overlayNode) {
		state.overlayNode.data.forEach((i) => handler.select(i.data))
	}

	type DataRow = Record<string, any>

	$: {
		dataObj.objData = dataObjData
		handler.setRows(dataObj.dataListRecord)
		handler.setPage(1)
		handler.clearFilters()
		sortList()
	}
	$: if (state.overlayNode) state.overlayNode.setSelected(dataObj.dataListRecord, $selected)

	function sortList() {
		// apply sort items backwards
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
				token: new TokenAppDoList(TokenAppDoAction.listEdit, dataObj, record.id)
			})
		})
	}
</script>

<DataObjActionsHeader {state} {dataObj} on:formCancelled />

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				{#if isSelect}
					<th class="selection">
						<input
							type="checkbox"
							on:click={() => handler.selectAll({ selectBy: 'id' })}
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
						class:active={$selected.includes(row.id)}
						on:click={() => onClick(row)}
						on:keyup={async () => await onClick(row)}
					>
						{#if isSelect}
							<td class="selection">
								<input
									type="checkbox"
									on:click={() => handler.select(row.id)}
									checked={$selected.includes(row.id)}
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

<!-- <DataViewer header="sort" data={sort} /> -->
<!-- <DataViewer header="dataListRecord" data={dataObj.dataListRecord} /> -->
<!-- <DataViewer header="$selected" data={state?.overlayNode?.selected} /> -->
<!-- <DataViewer header="isSelect" data={isSelect} /> -->

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
