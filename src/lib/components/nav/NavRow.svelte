<script lang="ts">
	import { navNodeCurrent } from '$comps/nav/navStore'
	import { NavNodeObjCardinality } from '$comps/types'
</script>

{#if $navNodeCurrent.obj?.cardinality === NavNodeObjCardinality.detail}
	<div>(row manager)</div>
{/if}
