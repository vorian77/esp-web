<script lang="ts">
	import {
		App,
		AppLevel,
		AppLevelCrumb,
		AppLevelRowStatus,
		AppLevelTab
	} from '$comps/nav/types.app'
	import { query } from '$comps/nav/types.appQuery'
	import {
		State,
		StatePacket,
		StatePacketComponent,
		TokenAppCrumbs,
		TokenAppDo,
		TokenAppDoAction,
		TokenAppDoDetail,
		TokenAppDoList,
		TokenAppRow,
		TokenAppTab,
		TokenAppTreeNode,
		TokenAppTreeSetParent
	} from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import { NodeType } from '$comps/types'
	import { TokenApiQuery, TokenApiQueryType } from '$lib/api'
	import { AppBar, AppShell } from '@skeletonlabs/skeleton'
	import { TabGroup, Tab } from '@skeletonlabs/skeleton'
	import FormListApp from '$comps/form/FormListApp.svelte'
	import FormDetailApp from '$comps/form/FormDetailApp.svelte'
	import NavCrumbs from '$comps/nav/NavCrumbs.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavApp.svelte'

	export let state: State

	const comps: Record<string, any> = {
		FormList: FormListApp,
		FormDetail: FormDetailApp
	}

	let app: App
	let currLevel: AppLevel
	let currTab: AppLevelTab
	let currComponent: any
	let crumbsList: Array<AppLevelCrumb> = []
	let rowStatus: AppLevelRowStatus | undefined

	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let dataObjUpdate: DataObjUpdate | undefined

	let isEditing = false
	$: isEditing = state?.objHasChanged

	const components = [
		StatePacketComponent.appCrumbs,
		StatePacketComponent.appDataObj,
		StatePacketComponent.appRow,
		StatePacketComponent.appTab,
		StatePacketComponent.navApp
	]

	$: if (state && state.packet) {
		const packet = state.consume(components)
		if (packet) {
			;(async () => await processState(packet))()
		}
	}

	async function processState(packet: StatePacket) {
		if (!packet.token)
			error(500, {
				file: FILENAME,
				function: 'processState',
				message: `No token supplied in State packet: ${JSON.stringify(packet, null, 2)}.`
			})

		const token = packet.token

		switch (packet.component) {
			case StatePacketComponent.appCrumbs:
				if (token instanceof TokenAppCrumbs) {
					if (token.crumbIdx === 0) {
						returnHome()
					} else {
						await app.changeCrumbs(token)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
				}
				break

			case StatePacketComponent.appDataObj:
				if (token instanceof TokenAppDo) {
					switch (token.action) {
						case TokenAppDoAction.back:
							if (app.levels.length === 1) {
								returnHome()
							} else {
								await app.back(1)
								dataObjUpdate = new DataObjUpdate(true, true, true)
							}
							break

						case TokenAppDoAction.detailDelete:
							if (token instanceof TokenAppDoDetail) {
								if (await app.tabUpdate(state, token, TokenApiQueryType.delete)) {
									app.popLevel()
									dataObjUpdate = new DataObjUpdate(true, true, true)
								}
							}
							break

						case TokenAppDoAction.detailNew:
							app.getCurrLevel().getCurrTab().setCurrRowByNum('')
							await query(state, app.getCurrTab(), TokenApiQueryType.new, app)
							dataObjUpdate = new DataObjUpdate(false, false, true)
							break

						case TokenAppDoAction.detailSaveAs:
							if (token instanceof TokenAppDoDetail) {
								await app.tabDuplicate(state, token)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.detailSaveInsert:
							if (token instanceof TokenAppDoDetail) {
								await app.tabUpdate(state, token, TokenApiQueryType.saveInsert)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.detailSaveUpdate:
							if (token instanceof TokenAppDoDetail) {
								await app.tabUpdate(state, token, TokenApiQueryType.saveUpdate)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.listEdit:
							if (token instanceof TokenAppDoList) {
								app.getCurrLevel().getCurrTab().setCurrRowByNum(token.recordId)
								await app.addLevel(state, TokenApiQueryType.retrieve)
								dataObjUpdate = new DataObjUpdate(true, true, true)
							}
							break

						case TokenAppDoAction.listNew:
							await app.addLevel(state, TokenApiQueryType.new)
							dataObjUpdate = new DataObjUpdate(true, true, true)
							break

						case TokenAppDoAction.refresh:
							await query(state, app.getCurrTab(), TokenApiQueryType.retrieve, app)
							dataObjUpdate = new DataObjUpdate(false, false, true)
							break

						default:
							error(500, {
								file: FILENAME,
								function: 'processState.objAction',
								message: `No case defined for TokenApiDbActionType: ${token.action} `
							})
					}
				}
				break

			case StatePacketComponent.appRow:
				if (token instanceof TokenAppRow) {
					await app.setRowAction(state, token.rowAction)
					dataObjUpdate = new DataObjUpdate(false, false, true)
				}
				break

			case StatePacketComponent.appTab:
				if (token instanceof TokenAppTab) {
					currLevel = app.getCurrLevel()
					currLevel.setTabIdx(token.tabIdx)
					currTab = currLevel.getCurrTab()
					if (!currTab.isRetrieved) {
						await query(state, currLevel.getCurrTab(), TokenApiQueryType.retrieve, app)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
				}
				break

			case StatePacketComponent.navApp:
				if (token instanceof TokenApiQuery) {
					app = await App.initDataObj(state, token)
					dataObjUpdate = new DataObjUpdate(true, true, true)
				}
				if (token instanceof TokenAppTreeNode) {
					app = await App.initNode(state, token.node)
					dataObjUpdate = new DataObjUpdate(true, true, true)
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: 'processAction',
					message: `No case defined for NavActionComponent: ${packet.component}`
				})
		}
		setNavApp()
	}

	async function onClickTab(event: any) {
		state.update({
			packet: new StatePacket({
				component: StatePacketComponent.appTab,
				token: new TokenAppTab(parseInt(event.target.value))
			})
		})
	}

	function setNavApp() {
		if (app) {
			currLevel = app.getCurrLevel()
			currTab = app.getCurrTab()
			crumbsList = app.getCrumbsList()
			rowStatus = app.getRowStatus()

			if (currTab && currTab.dataObj) {
				if (dataObjUpdate?.updateComponent) currComponent = comps[currTab.dataObj.component]
				if (dataObjUpdate?.updateObj) dataObj = currTab.dataObj
				if (dataObjUpdate?.updateObjData) {
					state.statusReset()
					dataObjData = currTab.data
				}
			}
		}
	}

	function returnHome() {
		state.update({
			page: '/home',
			nodeType: NodeType.home,
			packet: new StatePacket({
				component: StatePacketComponent.navTree,
				token: new TokenAppTreeSetParent()
			})
		})
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

{#if state?.nodeType === NodeType.programObject}
	<AppShell slotSidebarLeft="w-0 md:w-52">
		<svelte:fragment slot="header">
			{@const hidden = crumbsList.length < 2 ? 'hidden' : ''}
			<AppBar background="bg-neutral-200 {hidden}" padding="p-3">
				<svelte:fragment slot="lead">
					<div class="flex">
						<div>
							<NavCrumbs {state} {crumbsList} />
						</div>
					</div>
				</svelte:fragment>

				<svelte:fragment slot="trail">
					<NavRow {state} {rowStatus} />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>

		{#if currLevel}
			<div class="mt-2">
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
								{state}
								{dataObj}
								{dataObjData}
								on:formCancelled
							/>
						{/if}
					</svelte:fragment>
				</TabGroup>
			</div>
		{/if}
	</AppShell>
{:else if state?.nodeType === NodeType.object && currTab}
	<svelte:component this={currComponent} {state} {dataObj} {dataObjData} on:formCancelled />
{/if}
