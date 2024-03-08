<script lang="ts">
	import {
		App,
		AppLevel,
		AppLevelCrumb,
		AppLevelRowStatus,
		AppLevelTab
	} from '$comps/nav/types.app'
	import type { State } from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import FormListApp from '$comps/form/FormListApp.svelte'
	import FormDetailApp from '$comps/form/FormDetailApp.svelte'
	import DataObjActionsObj from '$comps/dataObj/DataObjActionsObj.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutObj.svelte'

	const comps: Record<string, any> = {
		FormList: FormListApp,
		FormDetail: FormDetailApp
	}

	export let app: App
	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	let currComponent: any

	$: currComponent = comps[dataObj.component]
</script>

<!-- <DataViewer header="component" data={{ component: dataObj.component }} /> -->

{#if dataObj}
	<div class="flex flex-row border-2 p-4">
		<div class="grow border-2 p-4">
			<svelte:component this={currComponent} bind:state {dataObj} {dataObjData} on:formCancelled />
		</div>
		<div class="pl-4">
			<DataObjActionsObj {state} {dataObj} on:formCancelled />
		</div>
	</div>
{/if}
