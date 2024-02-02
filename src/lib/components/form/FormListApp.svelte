<script lang="ts">
	import type { State } from '$comps/nav/types.appState'
	import type { DataObj, DataObjData } from '$comps/types'
	import FormList from '$comps/form/FormList.svelte'
	import { getContext } from 'svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	const scrollToTop: any = getContext('scrollToTop')

	// $: if (scrollToTop) scrollToTop()
</script>

<!-- <DataViewer header="state" data={state} /> -->

<FormList {state} {dataObj} {dataObjData} on:formCancelled />
