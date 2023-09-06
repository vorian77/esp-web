<script lang="ts">
	import { navNodesCrumbs, processNodeCrumb } from '$comps/nav/navStore'
</script>

<ol class="breadcrumb text-sm">
	{#each $navNodesCrumbs as node, i}
		{#if i < $navNodesCrumbs.length - 1}
			<li class="crumb">
				<button
					class="anchor"
					role="link"
					tabindex="0"
					on:click={() => processNodeCrumb(i)}
					on:keyup={() => processNodeCrumb(i)}
				>
					{node.label}
				</button>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		{:else}
			<li class="crumb">{node.label}</li>
		{/if}
	{/each}
</ol>
