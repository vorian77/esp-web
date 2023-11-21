<script lang="ts">
	import { navStatus, nodeProcessCrumb } from '$comps/nav/navStore'
	import { DataObjStatus, NavTree, type NavTreeNode } from '$comps/types'
	import { navTree } from '$comps/nav/navStore'
	import { page } from '$app/stores'
	import Messenger from '$comps/Messenger.svelte'

	let navTreeLocal: NavTree
	let treeCrumbs: NavTreeNode[]
	let messenger: Messenger
	let currentIdx = 0

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		treeCrumbs = navTreeLocal.listCrumbs
	}
	$: dataObjStatusLocal = Object.assign(new DataObjStatus(), $navStatus)

	async function onProcessNode(idx: number) {
		currentIdx = idx
		messenger.askB4Transition(dataObjStatusLocal, true, processNode)
	}

	function processNode() {
		nodeProcessCrumb($page.url.pathname, currentIdx)
	}
</script>

<Messenger bind:this={messenger} />

<ol class="breadcrumb">
	{#each treeCrumbs as node, i}
		{@const header = node?.nodeObj?.header}
		{#if i < treeCrumbs.length - 1}
			<li class="crumb">
				<button
					class="anchor mt-0.5"
					role="link"
					tabindex="0"
					on:click={() => onProcessNode(i)}
					on:keyup={() => onProcessNode(i)}
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
