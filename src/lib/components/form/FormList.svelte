<script lang="ts">
	import { DataObj, SurfaceType } from '$comps/types'
	import {
		NavState,
		NavStateComponent,
		TokenAppObjAction,
		AppObjActionType
	} from '$comps/nav/types.app'
	import { QueryParmDataRow, setSelectedRecords } from '$comps/dataObj/types.query'
	import type { DataObjData } from '$comps/dataObj/types.query'
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
	import DataObjActionsHeader from '$comps/dataObj/DataObjActionsHeader.svelte'
	import { navParmsStore, setNavParmsDataObj } from '$comps/nav/app'
	import data0 from '$routes/data0.json'
	import data1 from '$routes/data1.json'
	import DataViewer from '$comps/DataViewer.svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let surface: SurfaceType = SurfaceType.page
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let scrollToTop = () => {}

	const ROW_PER_PAGE = 20

	const handler = new DataHandler([], { rowsPerPage: ROW_PER_PAGE })
	const rows = handler.getRows()

	type DataRow = Record<string, any>

	$: {
		const dataFormatted: any = dataObjData.map((row: QueryParmDataRow) => {
			let newRow: DataRow = {}
			for (let key in row.record) {
				newRow[key] = row.record[key].display
			}
			return newRow
		})
		handler.setRows(dataFormatted)
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

	async function onClick(row: DataRow) {
		stateAdd(
			new NavState({
				checkObjChanged: false,
				component: NavStateComponent.objAction,
				token: new TokenAppObjAction({
					actionType: AppObjActionType.listEdit,
					dataObjData: setSelectedRecords(dataObjData, [row.id]),
					dataObjRaw: dataObj.dataObjRaw,
					dbProcess: false
				})
			})
		)
	}
</script>

<DataObjActionsHeader {stateAdd} {stateGlobal} {dataObj} {surface} />

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
					<tr on:click={() => onClick(row)} on:keyup={async () => await onClick(row)}>
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
<!-- <DataViewer header="dataObjData" data={dataObjData} /> -->

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
