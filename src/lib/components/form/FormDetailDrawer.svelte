<script lang="ts">
	import { DataObj, SurfaceType } from '$comps/types'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { setNavParms } from '$comps/nav/app'

	export let dataObjDefn: any
	let dataObj = new DataObj(dataObjDefn)

	// $: if (formObj) setNavParms(formObj.data, formObj.cardinality, formObj.isInsertMode!)
</script>

{#if dataObj}
	<div class="esp-card-space-y">
		<FormDetail surface={SurfaceType.overlay} on:formCancelled on:customFieldAction />
	</div>
{/if}
