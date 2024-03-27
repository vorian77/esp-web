<script lang="ts">
	export let header = ''
	export let data: any
</script>

<div>
	{#if typeof data === 'object' && data !== null && data != undefined}
		{header}:
		<pre>{JSON.stringify(data, null, 2)}</pre>
	{:else}
		<pre>{header}: {JSON.stringify(data, null, 2)}</pre>
	{/if}
</div>
