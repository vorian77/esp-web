<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	export let data
	// $: data = []

	const formDefn = data.formDefn
	const form = new FormDefn(formDefn)
</script>

{#if { data }}
	<h3>Form Data</h3>
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/if}
<Form {form} bind:responseData={data} />

Form Definition:
<pre>{JSON.stringify(formDefn, null, 2)}</pre>

Form Object:
<pre>{JSON.stringify(form, null, 2)}</pre>
