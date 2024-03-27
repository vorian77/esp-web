<script lang="ts">
	import { App, AppLevelRowStatus } from '$comps/nav/types.app'
	import { State, StateLayoutStyle } from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import FormListApp from '$comps/form/FormListApp.svelte'
	import FormDetailApp from '$comps/form/FormDetailApp.svelte'
	import NavRow from '$comps/nav/NavRow.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/Surface/DataObjLayout.svelte'
	const dispatch = createEventDispatcher()

	const comps: Record<string, any> = { FormList: FormListApp, FormDetail: FormDetailApp }

	export let app: App
	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let classContent = ''
	let currComponent: any
	let dataHeightPadding = '300' //  <todo> 240314 - calc specific padding
	let dataHeight = `max-height: calc(100vh - ${dataHeightPadding}px);`
	let headerDialog: string = ''
	let headerObj: string = ''
	let headerObjSub: string = ''
	let isHeaderClose: boolean = false
	let rowStatus: AppLevelRowStatus | undefined

	$: currComponent = comps[dataObj.component]

	$: {
		headerDialog = ''
		headerObj = ''
		headerObjSub = ''
		rowStatus = undefined

		switch (state.layout.layoutStyle) {
			case StateLayoutStyle.overlayDrawerDetail:
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				isHeaderClose = true
				break

			case StateLayoutStyle.overlayModalDetail:
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				rowStatus = app.getRowStatus()
				break

			case StateLayoutStyle.overlayModalSelect:
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				break

			case StateLayoutStyle.overlayModalWizard:
				headerDialog = ''
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				break

			case StateLayoutStyle.embeddedField:
				break
		}
		classContent =
			dataObj.actionsField.length > 0 || headerDialog || headerObj || headerObjSub || rowStatus
				? 'border-2 p-4'
				: ''
	}

	function cancel(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

{#if dataObj}
	{#if headerDialog}
		<div class="mb-4">
			<h1 class="h1">{headerDialog}</h1>
		</div>
	{/if}
	<div class={classContent}>
		<div>
			<div>
				{#if headerObj}
					<div class="mb-4">
						<div class="flex justify-between items-start">
							<h2 class="h2">{headerObj}</h2>
							<div class="mr-0">
								<NavRow {state} {rowStatus} />
							</div>
							{#if isHeaderClose}
								<button
									type="button"
									class="btn-icon btn-icon-sm variant-filled-error"
									on:click={cancel}>X</button
								>
							{/if}
						</div>
						{#if headerObjSub}
							<h4 class="mt-1 h4 text-gray-500">{headerObjSub}</h4>
						{/if}
					</div>
				{/if}
			</div>

			<div class="flex flex-row gap-4">
				<div class="grow overflow-y-scroll border-2 p-4" style={dataHeight}>
					<svelte:component
						this={currComponent}
						bind:state
						{dataObj}
						{dataObjData}
						on:formCancelled
					/>
				</div>
				<div>
					<DataObjActionsObj {state} {dataObj} on:formCancelled />
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- <DataViewer header="headerDialog" data={{ headerDialog, headerObj }} /> -->
