<script lang="ts">
	import NavTreeItem from '$comps/nav/NavTreeItem.svelte'
	import { navNodesTree } from '$comps/nav/navStore'

	const FILENAME = '/$comps/nav/NavTree.svelte'
</script>

<div class="mx-2 mb-2">
	<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>

	<div>
		{#each $navNodesTree as node, i}
			{@const indent = `ml-${node.indent * 4}`}
			<NavTreeItem on:nodeProcessed {node} {indent} />

			<!-- {#if node.indent === 0}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-0'} />
			{:else if node.indent === 1}
				<NavTreeItem on:nodeProcessed {node} {indent} />
			{:else if node.indent === 2}
				<NavTreeItem on:nodeProcessed {node} {indent} />
			{:else if node.indent === 3}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-12'} />
			{:else if node.indent === 4}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-16'} />
			{:else if node.indent === 5}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-20'} />
			{/if} -->
		{/each}
	</div>
</div>
