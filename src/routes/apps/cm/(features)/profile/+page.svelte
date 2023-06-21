<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	export let data

	let formObj = new FormClass(data.formDefn)
</script>

<Form bind:formObj />

<h3>formObj.submitResponse</h3>
<pre>{JSON.stringify(formObj.submitResponse, null, 2)}</pre>
