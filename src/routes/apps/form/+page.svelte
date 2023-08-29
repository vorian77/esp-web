<script lang="ts">
	import { asUpsert, asGet } from '$lib/utils/utils'
	export let data

	let user = data.user
	// let formId = data.formId
	let formId = asGet('formId')
</script>

FormId: {JSON.stringify(formId)}
