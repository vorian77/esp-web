<script lang="ts">
	import { App, AppLevel, AppLevelCrumb, AppLevelRowStatus } from '$comps/nav/types.app'
	import type { State } from '$comps/nav/types.appState'
	import { StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { TokenAppBack, TokenAppTab } from '$comps/types.token'
	import type { DataObj, DataObjData } from '$comps/types'
	import { AppBar, AppShell } from '@skeletonlabs/skeleton'
	import { TabGroup, Tab } from '@skeletonlabs/skeleton'
	import NavCrumbs from '$comps/nav/NavCrumbs.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import Icon from '$comps/Icon.svelte'
	import LayoutObj from '../Surface/LayoutObj.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutObjTab.svelte'

	export let app: App
	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let currLevel: AppLevel
	let crumbsList: Array<AppLevelCrumb> = []
	let rowStatus: AppLevelRowStatus | undefined
	let isEditing = false

	$: currLevel = app.getCurrLevel()
	$: crumbsList = app.getCrumbsList()
	$: rowStatus = app.getRowStatus()
	$: isEditing = state?.objHasChanged

	async function onClickTab(event: any) {
		state.update({
			packet: new StatePacket({
				component: StatePacketComponent.appTab,
				token: new TokenAppTab(parseInt(event.target.value))
			})
		})
	}

	function back() {
		state.update({
			packet: new StatePacket({
				checkObjChanged: true,
				component: StatePacketComponent.navApp,
				token: new TokenAppBack()
			})
		})
	}
</script>

<!-- <DataViewer header="LayoutObjTab.levels" data={{ levels: app.levels.length }} /> -->

<AppShell slotSidebarLeft="w-0 md:w-52">
	<svelte:fragment slot="header">
		{@const hidden = crumbsList.length < 2 ? 'hidden' : ''}
		<AppBar background="bg-neutral-200 {hidden}" padding="p-3">
			<svelte:fragment slot="lead">
				<div class="grid items-end">
					<div class="flex">
						<button class="mr-4" on:click={back}>
							<Icon class="mt-0.5" name={'back'} width="1.5rem" height="1.5rem" fill={'#3b79e1'} />
						</button>

						<div>
							<NavCrumbs {state} {crumbsList} />
						</div>
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
					{#if dataObj && dataObjData}
						<LayoutObj {app} bind:state {dataObj} {dataObjData} on:formCancelled />
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
	{/if}
</AppShell>
