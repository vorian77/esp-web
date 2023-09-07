<script lang="ts">
	import NavTreeItem from '$comps/nav/NavTreeItem.svelte'
	import { navNodesTree } from '$comps/nav/navStore'

	const FILENAME = '/$comps/nav/NavTree.svelte'
</script>

<div class="mx-2 mb-2">
	<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>

	<div>
		{#each $navNodesTree as node, i}
			{#if node.indent === 0}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-0'} />
			{:else if node.indent === 1}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-3'} />
			{:else if node.indent === 2}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-6'} />
			{:else if node.indent === 3}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-9'} />
			{:else if node.indent === 4}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-12'} />
			{:else if node.indent === 5}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-15'} />
			{:else if node.indent === 6}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-18'} />
			{:else if node.indent === 7}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-21'} />
			{:else if node.indent === 8}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-24'} />
			{:else if node.indent === 9}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-27'} />
			{:else if node.indent === 10}
				<NavTreeItem on:nodeProcessed {node} indent={'ml-30'} />
			{/if}
		{/each}
	</div>
</div>
