<script lang="ts">
	import type { DataObjData, NavState } from '$comps/types'
	import { DataObj, SurfaceType } from '$comps/types'
	import FormList from '$comps/form/FormList.svelte'
	import { getContext } from 'svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let surface: SurfaceType = SurfaceType.page
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	const scrollToTop: any = getContext('scrollToTop')

	// $: if (scrollToTop) scrollToTop()
</script>

<FormList {stateAdd} {stateGlobal} {surface} {dataObj} {dataObjData} />
