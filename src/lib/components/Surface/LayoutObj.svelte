<script lang="ts">
	import { App } from '$comps/nav/types.app'
	import { StateSurfaceType, type State, StateSurfaceStyle } from '$comps/nav/types.appState'
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

	let currComponent: any
	let border: string = ''
	let headerDialog: string = ''
	let headerObj: string = ''
	let headerObjSub: string = ''
	let isHeaderObjX: boolean = false
	let classContent = ''

	$: currComponent = comps[dataObj.component]

	$: {
		switch (state.layout.surfaceStyle) {
			case StateSurfaceStyle.dialog:
				// border = 'border-2'
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				break

			case StateSurfaceStyle.dialogSelect:
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				break

			case StateSurfaceStyle.dialogWizard:
				border = 'border-2'
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				break

			case StateSurfaceStyle.drawer:
				headerObj = dataObj.header
				headerObjSub = dataObj.subHeader
				isHeaderObjX = true
				break

			case StateSurfaceStyle.embedded:
				break
		}
		classContent =
			dataObj.actionsField.length > 0 || headerDialog || headerObj || headerObjSub
				? 'border-2 p-4'
				: ''
	}

	function cancel(event: MouseEvent) {
		dispatch('formCancelled')
	}
</script>

<!-- <DataViewer header="width" data={{ surfaceWidth, surfaceHeight }} /> -->

{#if dataObj}
	<div class={classContent}>
		<div>
			{#if state.layout}
				{#if headerDialog}
					<div class="flex justify-between items-start mb-4">
						<h1 class="h1">{headerDialog}</h1>
					</div>
				{/if}
			{/if}
			<div class={border}>
				{#if headerObj}
					<div class="mb-4">
						<div class="flex justify-between items-start">
							<h2 class="h2">{headerObj}</h2>
							{#if isHeaderObjX}
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

			<div class="flex flex-row">
				<div class="grow border-2">
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
