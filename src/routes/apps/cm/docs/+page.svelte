<script lang="ts">
	import ElgDocsList from './ElgDocsList.svelte'

	export let data

	const docsStatus = data.docsStatus
</script>

<h1 class="h1 mb-2">Proofs of Eligibility</h1>

<ElgDocsList {docsStatus} />
