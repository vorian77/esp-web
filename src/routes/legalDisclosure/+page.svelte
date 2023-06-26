<script lang="ts">
	import LegalDisclosure from '$routes/legalDisclosure/LegalDisclosure.svelte'
	export let data
</script>

<LegalDisclosure user={data.user} />
