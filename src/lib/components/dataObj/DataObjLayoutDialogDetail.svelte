<script lang="ts">
	import { App } from '$comps/nav/types.app'
	import type { State } from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import DataObjLayout from '$comps/dataObj/DataObjLayout.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/Surface/DataObjLayoutWizard.svelte'

	export let app: App
	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData
</script>

<!-- <DataViewer header="DataObjLayoutTab.levels" data={{ levels: app.levels.length }} /> -->

{#if dataObj && dataObjData}
	<DataObjLayout {app} bind:state {dataObj} {dataObjData} on:formCancelled />
{/if}
