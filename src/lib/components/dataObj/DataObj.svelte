<script lang="ts">
	import { App, AppLevel, AppLevelTab } from '$comps/nav/types.app'
	import { query } from '$comps/nav/types.appQuery'
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import {
		TokenApiQuery,
		TokenApiQueryType,
		TokenAppBack,
		TokenAppCrumbs,
		TokenAppDo,
		TokenAppDoAction,
		TokenAppDoDetail,
		TokenAppDoList,
		TokenAppRow,
		TokenAppTab,
		TokenAppTreeNode,
		TokenAppTreeSetParent
	} from '$comps/types.token'
	import type { DataObj, DataObjData } from '$comps/types'
	import { NodeType } from '$comps/types'
	import LayoutObj from '../Surface/LayoutObj.svelte'
	import LayoutObjTab from '../Surface/LayoutObjTab.svelte'
	import LayoutObjDialogDetail from '../Surface/LayoutObjDialogDetail.svelte'
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
		LayoutObj: LayoutObj,
		LayoutObjTab: LayoutObjTab,
		LayoutObjDialogDetail: LayoutObjDialogDetail
	}

	$: if (state && state.packet) {
		const packet = state.consume(components)
		console.log('DataObj.packet:', packet)
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
									app.popLevel()
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
								app.getCurrTab().listInit(token)
								app = await app.addLevel(state, TokenApiQueryType.retrieve)
								dataObjUpdate = new DataObjUpdate(true, true, true)
							}
							break

						case TokenAppDoAction.listNew:
							await app.addLevel(state, TokenApiQueryType.new)
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
				if (token instanceof TokenAppTreeNode) {
					app = await App.initNode(state, token)
					dataObjUpdate = new DataObjUpdate(true, true, true)
				}
				if (token instanceof TokenAppBack) {
					if (app.levels.length === 1) {
						returnHome()
					} else {
						app = await app.back(1)
						dataObjUpdate = new DataObjUpdate(true, true, true)
					}
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

	if (state?.nodeType === NodeType.programObject) {
		state.updateProperties({
			onRowClick: async function onRowClick(rows: any, record: any) {
				if (dataObj) {
					state.update({
						packet: new StatePacket({
							checkObjChanged: false,
							component: StatePacketComponent.appDataObj,
							token: new TokenAppDoList(
								TokenAppDoAction.listEdit,
								dataObj.objData,
								rows.map((r: any) => r.id),
								record.id
							)
						})
					})
				}
			}
		})
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
