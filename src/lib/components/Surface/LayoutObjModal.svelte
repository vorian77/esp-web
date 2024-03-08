<script lang="ts">
	import { App } from '$comps/nav/types.app'
	import type { State } from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import LayoutObj from '../Surface/LayoutObj.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/Surface/LayoutObjModal.svelte'

	export let app: App
	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData
</script>

{#if dataObj && dataObjData}
	<LayoutObj {app} bind:state {dataObj} {dataObjData} on:formCancelled />
{/if}
