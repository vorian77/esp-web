<script lang="ts">
	import type { Form } from '$comps/form/form'
	import type { DataObj, NavTreeNode } from '$comps/types'
	import FormDetail from '$comps/form/FormDetail.svelte'
	import { navParms, setNavParms, setNavParmsDataObj } from '$comps/nav/navStore'

	export let formObj: Form

	$: if (formObj) setNavParms(formObj.data, formObj.cardinality, formObj.isInsertMode!)
</script>

{#if formObj}
	<div class="esp-card-space-y">
		<FormDetail {formObj} on:formCancelled on:customFieldAction />
	</div>
{/if}
