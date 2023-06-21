<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	import type { FormSourceResponseType } from '$comps/esp/form/types'

	export let data

	const formDefn = data.formDefn
	let formObj = new FormClass(formDefn)
</script>

<Form bind:formObj />

formObj.data
<pre>{JSON.stringify(formObj.data, null, 2)}</pre>

<h3>formObj.submitResponse</h3>
<pre>{JSON.stringify(formObj.submitResponse, null, 2)}</pre>

Form Object:
<pre>{JSON.stringify(formObj, null, 2)}</pre>

Form Definition:
<pre>{JSON.stringify(formDefn, null, 2)}</pre>
