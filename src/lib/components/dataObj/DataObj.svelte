<script lang="ts">
	import { App, AppLevel, AppLevelTab } from '$comps/nav/types.app'
	import { query } from '$comps/nav/types.appQuery'
	import {
		State,
		StateObjDataObj,
		StateObjDialog,
		StatePacket,
		StatePacketComponent
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
		StatePacketComponent.navBack,
		StatePacketComponent.navCrumbs,
		StatePacketComponent.dataObj,
		StatePacketComponent.navRow,
		StatePacketComponent.navTab,
		StatePacketComponent.navTree,
		StatePacketComponent.dialog,
		StatePacketComponent.dataObjFieldEmbedded
	]
	const layoutComponents: Record<string, any> = {
		DataObjLayout: DataObjLayout,
		DataObjLayoutTab: DataObjLayoutTab
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
			case StatePacketComponent.dataObj:
				if (token instanceof TokenAppDo) {
					switch (token.action) {
						case TokenAppDoAction.detailDelete:
							if (token instanceof TokenAppDoDetail) {
								app = await app.detailUpdate(state, token, TokenApiQueryType.delete)
								dataObjUpdate = new DataObjUpdate(true, true, true)
							}
							break

						case TokenAppDoAction.detailNew:
							app.getCurrTabParent().list.idSet('')
							await query(state, app.getCurrTab(), TokenApiQueryType.new, app)
							app = app
							dataObjUpdate = new DataObjUpdate(false, true, true)
							break

						case TokenAppDoAction.detailSaveAs:
							if (token instanceof TokenAppDoDetail) {
								app = await app.tabDuplicate(state, token)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.detailSaveInsert:
							if (token instanceof TokenAppDoDetail) {
								app = await app.detailUpdate(state, token, TokenApiQueryType.saveInsert)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.detailSaveUpdate:
							if (token instanceof TokenAppDoDetail) {
								app = await app.detailUpdate(state, token, TokenApiQueryType.saveUpdate)
								dataObjUpdate = new DataObjUpdate(false, false, true)
							}
							break

						case TokenAppDoAction.listEdit:
							if (token instanceof TokenAppDoList) {
								app = await app.addLevelNode(state, TokenApiQueryType.retrieve)
								dataObjUpdate = new DataObjUpdate(true, true, true)
							}
							break

						case TokenAppDoAction.listNew:
							await app.addLevelNode(state, TokenApiQueryType.new)
							app.getCurrTabParent().list.idSet('')
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

			case StatePacketComponent.dataObjFieldEmbedded:
				if (state instanceof StateObjDataObj && token instanceof TokenApiQuery) {
					app = await App.initEmbeddedField(state, token)
					dataObjUpdate = new DataObjUpdate(true, true, true)
				}
				break

			case StatePacketComponent.dialog:
				if (state instanceof StateObjDialog && token instanceof TokenAppDialog) {
					app = await App.initDialog(state, token)

					// retrieve dialog
					switch (state.cardinality) {
						case DataObjCardinality.list:
							break

						case DataObjCardinality.detail:
							await app.addLevelDialog(state, token)
							if (token.queryType === TokenApiQueryType.new) {
								app.getCurrTabParent().list.idSet('')
							}
							app = app
							break

						default:
							error(500, {
								file: FILENAME,
								function: 'App.initDialog',
								message: `No case defined for state.cardinality: ${state.cardinality}`
							})
					}
					dataObjUpdate = new DataObjUpdate(true, true, true)
				}
				break

			case StatePacketComponent.navBack:
				if (token instanceof TokenAppBack) {
					if (app.levels.length === 1) {
						returnHome()
					} else {
						app = await app.back(1)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
				}
				break

			case StatePacketComponent.navCrumbs:
				if (token instanceof TokenAppCrumbs) {
					if (token.crumbIdx === 0) {
						returnHome()
					} else {
						app = await app.changeCrumbs(token)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
				}
				break

			case StatePacketComponent.navRow:
				if (token instanceof TokenAppRow) {
					app = await app.rowUpdate(state, token.rowAction)
					dataObjUpdate = new DataObjUpdate(false, true, true)
				}
				break

			case StatePacketComponent.navTab:
				if (token instanceof TokenAppTab) {
					currLevel = app.getCurrLevel()
					currLevel.setTabIdx(token.tabIdx)
					currTab = currLevel.getCurrTab()
					if (!currTab.isRetrieved) {
						await query(state, currTab, TokenApiQueryType.retrieve, app)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
				}
				app = app
				break

			case StatePacketComponent.navTree:
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
					state.metaData.dataUpdate(app.getParms())
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
				component: StatePacketComponent.navHome,
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
			this={layoutComponents[state.layout.layoutComponent]}
			bind:app
			bind:state
			{dataObj}
			{dataObjData}
			on:formCancelled
		/>
	</div>
{/if}
