<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'
	export let data

	const form = new FormDefn(data.formDefn)
</script>

<Form {form} />
