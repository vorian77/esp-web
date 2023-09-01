import { writable } from 'svelte/store'
import { NavNode } from '$comps/types'
import { getArray } from '$utils/utils'
import type { FormSourceResponseType } from '$comps/types'

export let navNodesBranch = writable([])
export let navNodesTree = writable([])
export let navNodesTraversal = writable([])
export let navNodeSelected = writable()

export function initTree(dbNodes: any) {
	dbNodes = getArray(dbNodes)
	let navNodes: Array<NavNode> = []
	const PARENT = undefined
	dbNodes.forEach((n: any) => {
		navNodes.push(new NavNode(n.type, PARENT, n.id, n.name, n.label, n.icon, n.obj_id, n.obj_link))
	})
	navNodesBranch.set(navNodes)
	navNodesTree.set(navNodes)
}

export async function selectNode(selectedNode: NavNode) {
	navNodeSelected.set(selectedNode)

	// set selected node
	navNodesTree.update((value) =>
		value.map((n: NavNode) => {
			n.selected = n.id === selectedNode.id
			return n
		})
	)

	if (!selectedNode.expanded) {
		// 1: retrieve nodes
		const responsePromise = await fetch('/api/dbEdge', {
			method: 'POST',
			body: JSON.stringify({ action: 'getNodesOfProgram', programId: selectedNode.id })
		})
		const response: FormSourceResponseType = await responsePromise.json()
		const newNodes = response.data

		// 2: create new branch
		let newBranch: Array<NavNode> = []
		newNodes.forEach((n: any) => {
			newBranch.push(
				new NavNode(n.type, selectedNode, n.id, n.name, n.label, n.icon, n.obj_id, n.obj_link)
			)
		})

		// 3: insert branch
		// 3.1: get selected node
		let idx = getNodeIdx(selectedNode.id)
		let updatedNode = getNode(idx)
		updatedNode.expanded = true

		// 3.2: insert new branch after parent node
		if (idx >= 0) {
			navNodesTree.update((value) => [
				...value.slice(0, idx),
				updatedNode,
				...newBranch,
				...value.slice(idx + 1)
			])
		}
	}

	// set current branch as new/selected branch
	let newBranch: Array<NavNode> = []
	let idx = getNodeIdx(selectedNode.id)
	navNodesTree.subscribe((value) => {
		if (value) {
			for (let i = idx + 1; i < value.length; i++) {
				if (value[i]?.parent?.id === selectedNode.id) {
					newBranch.push(value[i])
				}
			}
		}
	})
	navNodesBranch.set(newBranch)
}

function getNodeIdx(nodeId: string): number {
	let idx = -1
	navNodesTree.subscribe((value) => {
		if (value) {
			idx = value.findIndex((n: NavNode) => n.id === nodeId)
		}
	})
	return idx
}

function getNode(nodeIdx: number): NavNode {
	let node: NavNode
	navNodesTree.subscribe((value) => {
		if (value) {
			node = value[nodeIdx]
		}
	})
	return node
}
