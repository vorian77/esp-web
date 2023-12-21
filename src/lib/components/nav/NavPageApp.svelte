<script lang="ts">
	import { AppBar, AppShell } from '@skeletonlabs/skeleton'
	import { TabGroup, Tab } from '@skeletonlabs/skeleton'
	import FormListApp from '$comps/form/FormListApp.svelte'
	import FormDetailApp from '$comps/form/FormDetailApp.svelte'
	import { DataObj, DataObjStatus, SurfaceType } from '$comps/types'
	import type {
		AppLevel,
		AppLevelCrumb,
		AppLevelParent,
		AppLevelRowStatus
	} from '$comps/nav/types.app'
	import { type DataObjData, DataRowStatus, QueryParmDataRow } from '$comps/dataObj/types.query'
	import {
		App,
		AppLevelTab,
		AppObjActionType,
		NavState,
		NavStateComponent,
		TokenAppTab,
		TokenAppObjAction
	} from '$comps/nav/types.app'
	import { appObjStatusStore, resetAppState } from '$comps/nav/app'
	import NavCrumbs from '$comps/nav/NavCrumbs.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavPageApp.svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined

	const comps: Record<string, any> = {
		FormList: FormListApp,
		FormDetail: FormDetailApp
	}

	let app: App
	let currLevel: AppLevel
	let currLevelParent: AppLevelParent
	let currTab: AppLevelTab
	let currComponent: any
	let crumbsList: Array<AppLevelCrumb> = []
	let rowStatus: AppLevelRowStatus | undefined

	let data: DataObjData
	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let dataObjUpdate: DataObjUpdate | undefined
	let rowNbr: number

	const components = [
		NavStateComponent.crumbs,
		NavStateComponent.objAction,
		NavStateComponent.row,
		NavStateComponent.tab,
		NavStateComponent.tree
	]

	$: if (stateGlobal && components.includes(stateGlobal.component)) {
		;(async () => await processState(stateGlobal))()
	}

	let appObjStatus: DataObjStatus
	let isEditing = false
	$: {
		appObjStatus = Object.assign(new DataObjStatus(), $appObjStatusStore)
		isEditing = appObjStatus.objHasChanged
	}

	async function processState(state: any) {
		console.log('NavPageApp.processState:', state)
		switch (state.component) {
			case NavStateComponent.crumbs:
				await app.changeCrumbs(state.token)
				dataObjUpdate = new DataObjUpdate(true, true, true)
				break

			case NavStateComponent.objAction:
				switch (state.token.actionType) {
					case AppObjActionType.back:
						if (app.levels.length === 1) {
							stateAdd(
								new NavState({
									component: NavStateComponent.page,
									page: 'home'
								})
							)
						} else {
							await app.back(1)
							dataObjUpdate = new DataObjUpdate(true, true, true)
						}
						break

					case AppObjActionType.detailDelete:
						currLevel = app.getCurrLevel()
						if (currLevel.parentList) {
							currLevelParent = currLevel.parentList
							await currLevelParent.retrieve()
						}
						app.popLevel()
						dataObjUpdate = new DataObjUpdate(true, true, true)
						break

					case AppObjActionType.detailNew:
						currLevel = app.getCurrLevel()
						currTab = currLevel.getCurrTab()
						await AppLevelTab.retrieve(currTab, true, app.getPresetParms())
						if (currLevel.parentList) currLevel.parentList.reset()
						dataObjUpdate = new DataObjUpdate(false, false, true)
						break

					case AppObjActionType.detailSaveInsert:
						await detailSave(state.token)
						currLevel = app.getCurrLevel()
						if (currLevel.parentList) currLevel.resetTabs(true, currLevel.parentList.getData())
						break

					case AppObjActionType.detailSaveUpdate:
						await detailSave(state.token)
						break

					case AppObjActionType.listEdit:
						if (!state.token.dataObjData) return
						data = state.token.dataObjData
						rowNbr = data.findIndex((row: QueryParmDataRow) => {
							return row.status === DataRowStatus.selected
						})
						if (rowNbr < 0) return
						if (!(await app.addLevel(rowNbr))) return
						dataObjUpdate = new DataObjUpdate(true, true, true)
						break

					case AppObjActionType.listNew:
						if (!(await app.addLevel())) return
						dataObjUpdate = new DataObjUpdate(true, true, true)
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'processState.objAction',
							message: `No case defined for NavStateTokenActionObjType: ${state.token.dataActionType} `
						})
				}
				break

			case NavStateComponent.row:
				currLevel = app.getCurrLevel()
				if (currLevel.parentList) {
					currLevelParent = currLevel.parentList
					currLevelParent.setRowAction(state.token.rowAction)
					currLevel.resetTabs(false, currLevelParent.getData())

					await AppLevelTab.retrieve(currLevel.getCurrTab(), false)
					dataObjUpdate = new DataObjUpdate(false, false, true)
				}
				break

			case NavStateComponent.tab:
				currLevel = app.getCurrLevel()
				currLevel.setTabIdx(state.token.tabIdx)
				await AppLevelTab.retrieve(currLevel.getCurrTab(), false)
				dataObjUpdate = new DataObjUpdate(true, true, true)
				break

			case NavStateComponent.tree:
				const newApp = await App.init(state.token)
				if (!newApp) return
				app = newApp
				dataObjUpdate = new DataObjUpdate(true, true, true)
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'processAction',
					message: `No case defined for NavActionComponent: ${state.component}`
				})
		}
		resetAppState()
		setNavApp()
	}

	function setNavApp() {
		if (app) {
			currLevel = app.getCurrLevel()
			crumbsList = app.getCrumbsList()
			currTab = currLevel.getCurrTab()
			rowStatus = currLevel.getRowStatus()

			console.log('setNavApp:', { currLevel, currTab, rowStatus })
			if (currTab && currTab.dataObj) {
				if (dataObjUpdate?.updateComponent) currComponent = comps[currTab.dataObj.component]
				if (dataObjUpdate?.updateObj) dataObj = currTab.dataObj
				if (dataObjUpdate?.updateObjData) dataObjData = currTab.dataObjData
			}
		}
	}
	async function onClickTab(event: any) {
		stateAdd(
			new NavState({
				component: NavStateComponent.tab,
				token: new TokenAppTab(event.target.value)
			})
		)
	}

	async function detailSave(token: TokenAppObjAction) {
		currLevel = app.getCurrLevel()
		currTab = currLevel.getCurrTab()
		await currTab.update(token.dataObjData)

		if (currLevel.parentList) {
			currLevelParent = currLevel.parentList
			await currLevelParent.retrieve()
			if (token.dataObjData) currLevelParent.setRowId(token.dataObjData[0].record.id.data)
			dataObjUpdate = new DataObjUpdate(false, false, true)
		}
	}

	class DataObjUpdate {
		updateComponent: boolean
		updateObj: boolean
		updateObjData: boolean
		constructor(updateComponent: boolean, updateObj: boolean, updateObjData: boolean) {
			this.updateComponent = updateComponent
			this.updateObjData = updateObjData
			this.updateObj = updateObj
		}
	}
</script>

<AppShell slotSidebarLeft="w-0 md:w-52">
	{#if currLevel}
		<!-- <DataViewer header="level.tabIdx" data={currLevel.currTabIdx} />
		<DataViewer header="currTab.data.length" data={currTab.dataObjData?.length} /> -->
	{/if}

	<svelte:fragment slot="header">
		{@const hidden = crumbsList.length < 2 ? 'hidden' : ''}
		<AppBar background="bg-neutral-200 {hidden}" padding="p-3">
			<svelte:fragment slot="lead">
				<div class="flex">
					<div>
						<NavCrumbs {stateAdd} {stateGlobal} {crumbsList} />
					</div>
				</div>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<NavRow {stateAdd} {stateGlobal} {rowStatus} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	{#if currLevel}
		<TabGroup>
			{#each currLevel.tabs as tab, idx}
				{@const name = 'tab' + idx}
				{@const hidden = isEditing && idx > 0}
				<div {hidden}>
					<Tab bind:group={currLevel.tabSet} {name} value={idx} {hidden} on:click={onClickTab}>
						{tab.label}
					</Tab>
				</div>
			{/each}

			<svelte:fragment slot="panel">
				{#if currTab}
					<svelte:component
						this={currComponent}
						{stateAdd}
						{stateGlobal}
						{dataObj}
						{dataObjData}
						surface={SurfaceType.tab}
					/>
				{/if}
			</svelte:fragment>
		</TabGroup>
	{/if}
</AppShell>
