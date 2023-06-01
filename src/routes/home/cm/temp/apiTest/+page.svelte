<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	export let data
	$: responseData = {}

	const formDefn = data.formDefn
	const form = new FormDefn(formDefn)
</script>

<Form {form} bind:responseData />

{#if { responseData }}
	<h3>Response Data</h3>
	<pre>{JSON.stringify(responseData, null, 2)}</pre>
{/if}

Form Object:
<pre>{JSON.stringify(form, null, 2)}</pre>

Form Definition:
<pre>{JSON.stringify(formDefn, null, 2)}</pre>
