<script lang="ts">
	import { navNodesCrumbs, nodeProcessCrumb } from '$comps/nav/navStore'
	import { page } from '$app/stores'

	function nodeProcess(idx: number) {
		nodeProcessCrumb($page.url.pathname, idx)
	}
</script>

<ol class="breadcrumb text-sm">
	{#each $navNodesCrumbs as node, i}
		{#if i < $navNodesCrumbs.length - 1}
			<li class="crumb">
				<button
					class="anchor"
					role="link"
					tabindex="0"
					on:click={() => nodeProcess(i)}
					on:keyup={() => nodeProcess(i)}
				>
					{node.header}
				</button>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		{:else}
			<li class="crumb">{node.header}</li>
		{/if}
	{/each}
</ol>
