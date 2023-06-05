<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	export let data
	$: responseData = {}

	const formDefn = data.formDefn
	const form = new FormDefn(formDefn)
</script>

<Form {form} bind:responseData />

FORM DEFN:
<pre>{JSON.stringify(formDefn, null, 2)}</pre>

FORM:
<pre>{JSON.stringify(form, null, 2)}</pre>

<!-- PAGE DATA:
<pre>{JSON.stringify(form.pageData, null, 2)}</pre>

VALUES:
<pre>{JSON.stringify(form.values, null, 2)}</pre> -->

RESPONSE DATA:
<pre>{JSON.stringify(responseData, null, 2)}</pre>
