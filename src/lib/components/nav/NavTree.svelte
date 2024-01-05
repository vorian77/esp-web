<script lang="ts">
	import { appStoreNavTree, NavTree, NodeNav } from '$comps/types'
	import type { State } from '$comps/nav/types.app'
	import {
		StatePacketComponent,
		TokenAppTreeReset,
		TokenAppTreeSetParent
	} from '$comps/nav/types.app'
	import { createEventDispatcher } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const dispatch = createEventDispatcher()

	const FILENAME = '/$comps/nav/NavTree.svelte'

	export let state: State
	let navTree: NavTree

	$: if ($appStoreNavTree) navTree = new NavTree($appStoreNavTree)

	$: if (state && state.packet) {
		const packet = state.consume(StatePacketComponent.navTree)
		if (packet?.token instanceof TokenAppTreeReset) {
			;(async () => {
				await changeNode(navTree.listTree[0])
			})()
		}
		if (packet?.token instanceof TokenAppTreeSetParent) {
			console.log('NavTree.token:', packet.token)
			;(async () => {
				await navTree.setCurrentParent()
			})()
		}
	}

	async function changeNode(node: NodeNav) {
		await navTree.changeNode(node, state, dispatch)
	}
</script>

<div class="mx-2 mb-2">
	<div class="bg-slate-200 rounded-lg p-1 mb-1">Features:</div>
	<div>
		{#if navTree && navTree.listTree && navTree.listTree.length > 0}
			{#each navTree.listTree as node, i}
				{#if i > 0 && node.isOpen}
					<div
						class="p-1 mb-.5 hover:bg-blue-100 rounded-lg {node.isCurrent
							? 'bg-blue-300 text-white'
							: ''}"
						role="button"
						tabindex="0"
						on:click={async () => await changeNode(node)}
						on:keyup={async () => await changeNode(node)}
					>
						{@html '&nbsp;'.repeat(node.indent * 3)}
						{node.header}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<!-- <DataViewer header="navTree" data={navTree} /> -->
