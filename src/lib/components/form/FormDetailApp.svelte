<script lang="ts">
	import type { DataObj, DataObjData } from '$comps/types'
	import type { State } from '$comps/nav/types.app'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { getContext } from 'svelte'

	export let state: State
	export let dataObj: DataObj
	export let dataObjData: DataObjData

	const scrollToTop: any = getContext('scrollToTop')
	let counter = 0

	// $: if (scrollToTop) scrollToTop()
</script>

{#if dataObj}
	<FormDetail {state} {dataObj} {dataObjData} on:formCancelled />
{/if}
