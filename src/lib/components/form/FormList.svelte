<script lang="ts">
	import {
		State,
		StatePacket,
		StatePacketComponent,
		TokenAppDoAction,
		TokenAppDoList
	} from '$comps/nav/types.app'
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

	type DataRow = Record<string, any>

	$: {
		dataObj.objData = dataObjData
		handler.setRows(dataObj.dataListRecord)
		handler.setPage(1)
		handler.clearFilters()
		sortList()
	}

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

	async function onClick(rowNbr: number) {
		state.update({
			packet: new StatePacket({
				checkObjChanged: false,
				component: StatePacketComponent.appDataObj,
				token: new TokenAppDoList(TokenAppDoAction.listEdit, dataObj, rowNbr)
			})
		})
	}
</script>

<DataObjActionsHeader {state} {dataObj} />

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				{#if dataObj.fields}
					{#each dataObj.fields as field}
						{#if field.isDisplayable && field.isDisplay}
							<Th {handler} orderBy={field.name}>{field.label}</Th>
						{/if}
					{/each}
				{/if}
			</tr>
			<tr>
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
					<tr on:click={() => onClick(i)} on:keyup={async () => await onClick(i)}>
						{#each dataObj.fields as field}
							{#if field.isDisplayable && field.isDisplay}
								{@const value = row[field.name].display}
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
		background-color: #84f08f;
	}
</style>
