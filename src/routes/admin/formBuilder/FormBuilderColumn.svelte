<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/Form.svelte'

	export let data

	let formCol = new FormDefn(data.defnFormCol)
</script>

<Form bind:formObj={formCol} />
