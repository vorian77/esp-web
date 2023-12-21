<script lang="ts">
	import { DataObj, type DataObjData, NavState, SurfaceType } from '$comps/types'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { getContext } from 'svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let surface: SurfaceType = SurfaceType.page
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	const scrollToTop: any = getContext('scrollToTop')

	// $: if (scrollToTop) scrollToTop()
</script>

{#if dataObj}
	<FormDetail {stateAdd} {stateGlobal} {surface} {dataObj} {dataObjData} />
{/if}
