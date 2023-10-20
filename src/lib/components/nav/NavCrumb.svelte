<script lang="ts">
	import { nodeProcessCrumb } from '$comps/nav/navStore'
	import { NavTree, type NavTreeNode } from '$comps/types'
	import { navTree } from '$comps/nav/navStore'
	import { page } from '$app/stores'

	let navTreeLocal: NavTree
	let treeCrumbs: NavTreeNode[]

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		treeCrumbs = navTreeLocal.listCrumbs
	}

	function nodeProcess(idx: number) {
		nodeProcessCrumb($page.url.pathname, idx)
	}
</script>

<ol class="breadcrumb">
	{#each treeCrumbs as node, i}
		{@const header = node?.nodeObj?.header}
		{#if i < treeCrumbs.length - 1}
			<li class="crumb">
				<button
					class="anchor mt-0.5"
					role="link"
					tabindex="0"
					on:click={() => nodeProcess(i)}
					on:keyup={() => nodeProcess(i)}
				>
					{header}
				</button>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		{:else}
			<li class="crumb">{header}</li>
		{/if}
	{/each}
</ol>

<!-- <pre>{JSON.stringify(treeCrumbs, null, 2)}</pre> -->
