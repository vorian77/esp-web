<script lang="ts">
	import { App, AppLevel, AppLevelTab } from '$comps/nav/types.app'
	import { query } from '$comps/nav/types.appQuery'
	import {
		State,
		StatePacket,
		StatePacketComponent,
		StateSurfaceStyle
	} from '$comps/nav/types.appState'
	import {
		TokenApiQuery,
		TokenApiQueryType,
		TokenAppBack,
		TokenAppCrumbs,
		TokenAppDialog,
		TokenAppDo,
		TokenAppDoAction,
		TokenAppDoDetail,
		TokenAppDoList,
		TokenAppRow,
		TokenAppTab,
		TokenAppTreeNode,
		TokenAppTreeSetParent
	} from '$comps/types.token'
	import { DataObjData, type DataObj, DataObjCardinality } from '$comps/types'
	import { NodeType } from '$comps/types'
	import DataObjLayout from '$comps/dataObj/DataObjLayout.svelte'
	import DataObjLayoutTab from '$comps/dataObj/DataObjLayoutTab.svelte'
	import DataObjLayoutDialogDetail from '$comps/dataObj/DataObjLayoutDialogDetail.svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/form/Form.svelte'

	export let state: State

	let app: App
	let currLevel: AppLevel
	let currTab: AppLevelTab

	let dataObj: DataObj | undefined
	let dataObjData: DataObjData | undefined
	let dataObjUpdate: DataObjUpdate | undefined

	const components = [
		StatePacketComponent.appCrumbs,
		StatePacketComponent.appDataObj,
		StatePacketComponent.appRow,
		StatePacketComponent.appTab,
		StatePacketComponent.query,
		StatePacketComponent.navApp
	]
	const surfaceTypes: Record<string, any> = {
		DataObjLayout: DataObjLayout,
		DataObjLayoutTab: DataObjLayoutTab,
		DataObjLayoutDialogDetail: DataObjLayoutDialogDetail
	}

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
						app = await app.changeCrumbs(token)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
				}
				break

			case StatePacketComponent.appDataObj:
				if (token instanceof TokenAppDo) {
					switch (token.action) {
						case TokenAppDoAction.detailDelete:
							if (token instanceof TokenAppDoDetail) {
								if (await app.tabUpdate(state, token, TokenApiQueryType.delete)) {
									if (state.layout.surfaceStyle === StateSurfaceStyle.page) app.popLevel()
									app = app
									dataObjUpdate = new DataObjUpdate(true, true, true)
								}
							}
							break

						case TokenAppDoAction.detailNew:
							await query(state, app.getCurrTab(), TokenApiQueryType.new, app)
							app.getCurrTabParent().listSetId('')
							app = app
							dataObjUpdate = new DataObjUpdate(false, false, true)
							break

						case TokenAppDoAction.detailSaveAs:
							if (token instanceof TokenAppDoDetail) {
								app = await app.tabDuplicate(state, token)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.detailSaveInsert:
							if (token instanceof TokenAppDoDetail) {
								app = await app.tabUpdate(state, token, TokenApiQueryType.saveInsert)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.detailSaveUpdate:
							if (token instanceof TokenAppDoDetail) {
								app = await app.tabUpdate(state, token, TokenApiQueryType.saveUpdate)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.listEdit:
							if (token instanceof TokenAppDoList) {
								app.getCurrTab().listInitPage(token)
								app = await app.addLevelNode(state, TokenApiQueryType.retrieve)
								dataObjUpdate = new DataObjUpdate(true, true, true)
							}
							break

						case TokenAppDoAction.listNew:
							await app.addLevelNode(state, TokenApiQueryType.new)
							app.getCurrTabParent().listSetId('')
							app = app
							dataObjUpdate = new DataObjUpdate(true, true, true)
							break

						case TokenAppDoAction.refresh:
							await query(state, app.getCurrTab(), TokenApiQueryType.retrieve, app)
							app = app
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
					app = await app.setRowAction(state, token.rowAction)
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
				app = app
				break

			case StatePacketComponent.query:
				if (token instanceof TokenApiQuery) {
					app = await App.initDataObj(state, token)
					dataObjUpdate = new DataObjUpdate(true, true, true)
				}

			case StatePacketComponent.navApp:
				if (token instanceof TokenAppBack) {
					if (app.levels.length === 1) {
						returnHome()
					} else {
						app = await app.back(1)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
				}

				if (token instanceof TokenAppDialog) {
					app = await App.initDialog(state, token)

					// retrieve dialog
					switch (token.data?.cardinality) {
						case DataObjCardinality.list:
							break

						case DataObjCardinality.detail:
							app.getCurrTab().listInitDialog(token)
							await app.addLevelDialog(state, token)
							if (token.queryType === TokenApiQueryType.new) app.getCurrTabParent().listSetId('')
							app = app
							break

						default:
							error(500, {
								file: FILENAME,
								function: 'App.initDialog',
								message: `No case defined for token.cardinality: ${token.data?.cardinality}`
							})
					}
					dataObjUpdate = new DataObjUpdate(true, true, true)
				}

				if (token instanceof TokenAppTreeNode) {
					app = await App.initNode(state, token)
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

	function setNavApp() {
		if (app) {
			currTab = app.getCurrTab()
			if (currTab && currTab.dataObj) {
				if (dataObjUpdate?.updateObj) dataObj = currTab.dataObj
				if (dataObjUpdate?.updateObjData) {
					state.statusReset()
					state.programId = app.getProgramId()
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

{#if dataObj && dataObjData}
	<div class="p-4">
		<svelte:component
			this={surfaceTypes[state.layout.surfaceType]}
			bind:app
			bind:state
			{dataObj}
			{dataObjData}
			on:formCancelled
		/>
	</div>
{/if}
