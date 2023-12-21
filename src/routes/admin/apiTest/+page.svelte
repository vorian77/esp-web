<script lang="ts">
	import { Form as FormClass } from '$comps/dataObj/dataObjOld.js'
	import { DataObj } from '$comps/types'
	import FormDetail from '$comps/form/FormDetail.svelte'

	export let data

	const formDefn = data.formDefn
	let formObj = new FormClass(formDefn)
</script>

<FormDetail bind:formObj />

<h3>formObj.submitResponse</h3>
<pre>{JSON.stringify(formObj.submitResponse, null, 2)}</pre>

Form Object:
<pre>{JSON.stringify(formObj, null, 2)}</pre>

Form Definition:
<pre>{JSON.stringify(formDefn, null, 2)}</pre>
