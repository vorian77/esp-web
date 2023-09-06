import { writable, get } from 'svelte/store'
import { NavNode, NavNodeType } from '$comps/types'
import { getArray } from '$utils/utils'
import type { FormSourceResponseType } from '$comps/types'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/NavStore.ts'
const ROOT_LINK = '/apps'

export let navNodesTree = writable([])
export let navNodesBranch = writable([])
export let navNodesCrumbs = writable([])
export let navNodeCurrent = writable()

export function initTree(dbNodes: any) {
	dbNodes = getArray(dbNodes)
	const PARENT = undefined
	let navNodes: Array<NavNode> = []
	dbNodes.forEach((n: any) => {
		navNodes.push(new NavNode(n.type, PARENT, n.id, n.name, n.label, n.icon, n.obj_id, n.obj_link))
	})
	navNodesBranch.set(navNodes)
	navNodesTree.set(navNodes)
}

export async function processNodeTree(node: NavNode) {
	// setCurrentNode(node)

	if ([NavNodeType.program, NavNodeType.header].includes(node.type) && !node.expanded) {
		// 1: retrieve nodes
		const responsePromise = await fetch('/api/dbEdge', {
			method: 'POST',
			body: JSON.stringify({ action: 'getNodesByParent', parentNodeId: node.id })
		})
		const response: FormSourceResponseType = await responsePromise.json()
		const newNodes = response.data

		// 2: create new branch
		let newBranch: Array<NavNode> = []
		newNodes.forEach((n: any) => {
			newBranch.push(new NavNode(n.type, node, n.id, n.name, n.label, n.icon, n.obj_id, n.obj_link))
		})

		// 3: insert branch
		// 3.1: get selected node
		let idx = getNodeIdx(node.id)
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

	// navNodesBranch
	setBranch(node)

	// navNodesCrumbs
	setTraversal(node)

	processNode(node)
}

function processNode(node: NavNode) {
	// set selected node, make others not selected
	navNodesTree.update((value) =>
		value.map((n: NavNode) => {
			n.selected = n.id === node.id
			return n
		})
	)
	node.expanded = true
	navNodeCurrent.set(node)

	switch (node.type) {
		case NavNodeType.form:
			goto('/apps/form')
			break

		case NavNodeType.header:
			goto(ROOT_LINK)
			break

		case NavNodeType.page:
			goto(node.obj_link)
			break

		case NavNodeType.program:
			goto(ROOT_LINK)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processNodeTree',
				message: `No case defined for node type: ${node.type}.`
			})
	}
}

export async function processNodeCrumb(idx: number) {
	const nodes = get(navNodesCrumbs)
	const nodeCurrent = nodes[idx]
	nodes.splice(idx + 1, nodes.length - idx - 1)
	navNodesCrumbs.set(nodes)

	processNode(nodeCurrent)
}

export async function processNodeLink(node: NavNode, root = false) {
	// reset crumbs
	let crumbNodes: Array<NavNode> = get(navNodesCrumbs)
	if (root || (crumbNodes.length > 0 && crumbNodes[0].type !== NavNodeType.page)) {
		crumbNodes = [node]
	} else {
		crumbNodes.push(node)
	}
	navNodesCrumbs.set(crumbNodes)

	// reset tree
	navNodesTree.update((value) =>
		value.map((n: NavNode) => {
			n.selected = false
			return n
		})
	)
	navNodeCurrent.set(undefined)

	// traverse to page
	goto(node.obj_link)
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
function getNodeIdx(nodeId: string): number {
	let idx = -1
	navNodesTree.subscribe((value) => {
		if (value) {
			idx = value.findIndex((n: NavNode) => n.id === nodeId)
		}
	})
	return idx
}

function setBranch(parentNode: NavNode) {
	let idx = getNodeIdx(parentNode.id)
	const currentTree = get(navNodesTree)
	let currentBranch: Array<NavNode> = []

	for (let i = idx + 1; i < currentTree.length; i++) {
		if (currentTree[i]?.parent?.id === parentNode.id) {
			currentBranch.push(currentTree[i])
		}
	}

	navNodesBranch.set(currentBranch)
}

function setTraversal(node: NavNode) {
	let newList: Array<NavNode> = []
	while (node) {
		newList.unshift(node)
		node = node.parent
	}
	navNodesCrumbs.set(newList)
}
