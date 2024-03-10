<script lang="ts">
	import { App } from '$comps/nav/types.app'
	import { StateLayoutType, type State, StateSurfaceType } from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import FormListApp from '$comps/form/FormListApp.svelte'
	import FormDetailApp from '$comps/form/FormDetailApp.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import { createEventDispatcher } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutObj.svelte'
	const dispatch = createEventDispatcher()

	const comps: Record<string, any> = {
		FormList: FormListApp,
		FormDetail: FormDetailApp
	}

	export let app: App
	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	console.log('LayoutObj.layout:', { layout: state.layout })

	let currComponent: any
	let border: string = ''
	let isHeaderDialog: boolean = false
	let isHeaderObj: boolean = false
	let isHeaderXDialog: boolean = false
	let isHeaderXObj: boolean = false

	$: currComponent = comps[dataObj.component]
	$: {
		isHeaderObj =
			state.layout.surfaceType === StateSurfaceType.overlay &&
			(state.layout.layoutType === StateLayoutType.LayoutObj ||
				state.layout.layoutType === StateLayoutType.LayoutObjWizard)
		border =
			state.layout.surfaceType === StateSurfaceType.overlay &&
			state.layout.layoutType === StateLayoutType.LayoutObjWizard
				? 'border-2'
				: ''
		isHeaderDialog = state.layout.headerDialog !== undefined
		isHeaderXDialog = state.layout.surfaceType === StateSurfaceType.overlay && isHeaderDialog
		isHeaderXObj = state.layout.surfaceType === StateSurfaceType.overlay && !isHeaderXDialog
	}

	function cancel(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

<!-- <DataViewer header="header" data={{ isHeaderXDialog, isHeaderXObj }} /> -->

{#if dataObj}
	{#if state.layout}
		{#if isHeaderDialog}
			<div class="flex justify-between items-start mb-2">
				<h1 class="h1">{state.layout.headerDialog}</h1>
				{#if isHeaderXDialog}
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled-error ml-2"
						on:click={cancel}>X</button
					>
				{/if}
			</div>
		{/if}
	{/if}
	<div class="{border} p-4">
		{#if isHeaderObj}
			<div class="mb-4">
				<div class="flex justify-between items-start">
					<h2 class="h2">{dataObj.header}</h2>
					{#if isHeaderXObj}
						<button
							type="button"
							class="btn-icon btn-icon-sm variant-filled-error mr-4"
							on:click={cancel}>X</button
						>
					{/if}
				</div>
				{#if dataObj.subHeader}
					<h4 class="h4 text-gray-500">{dataObj.subHeader}</h4>
				{/if}
			</div>
		{/if}

		<div class="flex flex-row">
			<div class="grow border-2 p-4">
				<svelte:component
					this={currComponent}
					bind:state
					{dataObj}
					{dataObjData}
					on:formCancelled
				/>
			</div>
			<div class="pl-4">
				<DataObjActionsObj {state} {dataObj} on:formCancelled />
			</div>
		</div>
	</div>
{/if}
