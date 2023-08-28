<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import Form from '$comps/esp/form/FormDetail.svelte'

	export let data

	let formCol = new FormClass(data.defnFormCol)
</script>

<Form bind:formObj={formCol} />
