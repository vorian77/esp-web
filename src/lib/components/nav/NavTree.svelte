<script lang="ts">
	import {
		NavState,
		NavStateComponent,
		NavStateTokenAppTree,
		NavTree,
		type NodeNav
	} from '$comps/types'
	import type { RawNode } from '$comps/types'
	import { apiFunctionsDBEdge, getNodes } from '$utils/db.utils'
	import { NodeType } from '$comps/types'
	import { createEventDispatcher, onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'
	import Messenger from '$comps/Messenger.svelte'
	import DataViewer from '$comps/DataViewer.svelte'
	import type init from '$server/dbEdge/init/dbEdgeInitSysAuth'

	const dispatch = createEventDispatcher()

	const FILENAME = '/$comps/nav/NavTree.svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let rawBranch: Array<RawNode> = []

	let navTree: NavTree
	let listTree: NodeNav[] | undefined
	let messenger: Messenger

	let stateCurr: NavState
	let initialized = false

	$: if (stateGlobal?.component === NavStateComponent.page) {
		// console.log('init tree...')
		stateCurr = stateGlobal
		rawBranch = stateCurr?.user?.resource_programs ? stateCurr?.user?.resource_programs : []
		;(async () => await initTree(rawBranch))()
		initialized = true
	}

	$: {
		listTree = navTree ? navTree.listTree : undefined
		// console.log('listTree set')
	}
	async function initTree(rawBranch: Array<RawNode>) {
		if (!rawBranch) return

		// <temp> filter to single program for dev
		// rawBranch = rawBranch.filter((p: any) => {
		// 	return p.name === 'node_pgm_cm_training_staff_provider'
		// })

		// if user has access to only 1 program,
		// filter down to first group of navNodes
		// it's not necessary to display program/header node
		while (rawBranch && rawBranch.length === 1) {
			rawBranch = await getNodes(apiFunctionsDBEdge.getNodesBranch, rawBranch[0].id)
		}

		navTree = new NavTree(rawBranch)
	}

	export async function onChange(node: NodeNav) {
		if (navTree.isCurrentNode(node)) return

		switch (node.type) {
			case NodeType.navHeader:
			case NodeType.navProgram:
				if (!node.isRetrieved)
					navTree.addBranch(await getNodes(apiFunctionsDBEdge.getNodesBranch, node.id), node)
				navTree.node = node
				break

			case NodeType.navObject:
				let callbacks: Array<Function> = []
				stateAdd(
					new NavState({
						component: NavStateComponent.tree,
						token: new NavStateTokenAppTree(node)
					})
				)
				break

			case NodeType.navPage:
				if (node.hasOwnProperty('page')) goto(node.page)
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'onChangeTree',
					message: `No case defined for NodeObjType: ${node.type}`
				})
		}
	}

	// if (pageCurrent !== pageApp) callbacks.push(() => goto(pageApp))
</script>

<Messenger bind:this={messenger} />

<div class="mx-2 mb-2">
	<div class="bg-slate-300 rounded-lg p-1 mb-1">Features:</div>
	<div>
		{#if listTree}
			{#each listTree as node}
				{#if node.isOpen}
					<div
						class="p-1 mb-.5 hover:bg-blue-400 rounded-lg {node.isCurrent
							? 'bg-blue-300 text-white'
							: ''}"
						role="button"
						tabindex="0"
						on:click={async () => await onChange(node)}
						on:keyup={async () => await onChange(node)}
					>
						{@html '&nbsp;'.repeat(node.indent * 3)}
						{node.header}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>
