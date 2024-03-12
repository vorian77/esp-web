<script lang="ts">
	import { App } from '$comps/nav/types.app'
	import type { State } from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import LayoutObj from './LayoutObj.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutObjWizard.svelte'

	export let app: App
	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData
</script>

<!-- <DataViewer header="LayoutObjTab.levels" data={{ levels: app.levels.length }} /> -->

{#if dataObj && dataObjData}
	<LayoutObj {app} bind:state {dataObj} {dataObjData} on:formCancelled />
{/if}
