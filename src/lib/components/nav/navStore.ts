import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { NavNode, NavNodeType } from '$comps/types'
import type { FormSourceResponseType } from '$comps/types'
import { getArray } from '$utils/utils'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/NavStore.ts'
const ROOT_LINK = '/apps'

export let navInitiated = localStorageStore('navInit', false)
export let navNodesTree = localStorageStore('navNodesTree', [])
export let navNodesBranch = localStorageStore('navNodesBranch', [])
export let navNodesCrumbs = localStorageStore('navNodesCrumbs', [])
export let navNodeCurrent = localStorageStore('navNodeCurrent', {})
export let navUser = localStorageStore('navUser', {})

export function navReset() {
	navInitiated.set(false)
}

export async function navInit(user: any) {
	const initiated = get(navInitiated)
	if (!initiated) {
		const PARENT = undefined
		const DATA = {}
		const dbNodes = getArray(user.resource_programs)
		let navNodes: Array<NavNode> = []
		dbNodes.forEach((n: any) => {
			navNodes.push(
				new NavNode(
					n.id,
					PARENT,
					n.type,
					n.name,
					n.header,
					n.icon,
					n.page,
					n.component,
					n.obj_id,
					DATA
				)
			)
		})

		navInitiated.set(true)
		navNodesTree.set(navNodes)
		navNodesBranch.set(navNodes)
		navNodesCrumbs.set([])
		navNodeCurrent.set({})
	}
}

export async function navChange(
	fromPage: string,
	node: NavNode,
	treeBranch: 'retrieve-branch' | 'retrieve-child' | 'remove' | undefined,
	currentNode: 'self' | 'first-child' | undefined,
	nodeData: {} | undefined,
	formActionType: 'insert' | 'select' | undefined
) {
	switch (treeBranch) {
		case 'retrieve-branch':
			treeBranchRetrieve(node, false)
			break

		case 'retrieve-child':
			treeBranchRetrieve(node, true)
			break

		case 'remove':
			treeBranchRemove(node)
			break

		case undefined:
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'navChange',
				message: `No case defined for treeBranch: ${treeBranch}.`
			})
	}

	// set working node
	if (currentNode === 'first-child') {
		// <temp> 230911 - what about no first-child as form-detail
		const treeNodes = get(navNodesTree)
		const idx = getNodeIdx(node.id)
		const childNode = treeNodes[idx + 1]
		if (childNode?.parent.id === node.id) {
			node = childNode
		}
	}

	if (typeof nodeData !== 'undefined') {
		node.data = nodeData
	}

	if (node.component && node.component.startsWith('form')) {
		// verify - form configured on node
		if (node.obj_id) {
			const data = getTraversalData()
			const responsePromise = await fetch('/api/dbEdge', {
				method: 'POST',
				body: JSON.stringify({
					function: 'getForm',
					formId: node.obj_id,
					formActionType,
					data
				})
			})
			const response: FormSourceResponseType = await responsePromise.json()
			node.form = response.data
		} else {
			alert(`No form defined for node: ${node.name}.`)
			node.component = 'home'
		}
	}

	if (typeof currentNode !== 'undefined') {
		setNodeCurrent(node)
	}

	if (fromPage !== node.page) {
		goto(node.page)
	}
}

async function nodeProcess(fromPage: string, node: NavNode) {
	switch (node.type) {
		case NavNodeType.header:
		case NavNodeType.program:
			navChange(fromPage, node, undefined, 'self', undefined, undefined)
			break

		case NavNodeType.form:
			navChange(fromPage, node, undefined, 'self', undefined, 'select')
			break

		case NavNodeType.page:
			navChange(fromPage, node, undefined, 'self', undefined, undefined)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processNode',
				message: `No case defined for node.type: ${node.type}.`
			})
	}
}

export async function nodeProcessTree(fromPage: string, node: NavNode) {
	if ([NavNodeType.program, NavNodeType.header].includes(node.type) && !node.expanded) {
		await treeBranchRetrieve(node, false)
	}
	setBranch(node)
	setCrumbs(node)
	nodeProcess(fromPage, node)

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

	function setCrumbs(node: NavNode) {
		let newList: Array<NavNode> = []
		while (node) {
			// add node beginning of array
			newList.unshift(node)
			node = node.parent
		}
		navNodesCrumbs.set(newList)
	}
}

async function treeBranchRetrieve(node: NavNode, firstChildOnly: boolean) {
	// 1: retrieve nodes
	const responsePromise = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ function: 'getNodesByParent', parentNodeId: node.id })
	})
	const response: FormSourceResponseType = await responsePromise.json()
	const newNodes = response.data

	// 2: create new branch
	let newBranch: Array<NavNode> = []
	if (firstChildOnly) {
		newNodes.splice(0, newNodes.length - 1)
	}
	newNodes.forEach((n: any) => {
		newBranch.push(
			new NavNode(n.id, node, n.type, n.name, n.header, n.icon, n.page, n.component, n.obj_id, {})
		)
	})

	// 3: insert branch
	// 3.1: get selected node
	let idx = getNodeIdx(node.id)

	// 3.2: insert new branch after parent node
	if (idx >= 0) {
		navNodesTree.update((value) => [
			...value.slice(0, idx),
			node,
			...newBranch,
			...value.slice(idx + 1)
		])
	}
	node.expanded = true
}

async function treeBranchRemove(parentNode: NavNode) {
	let newTree: Array<NavNode> = []
	const oldTree = get(navNodesTree)
	oldTree.forEach((n: NavNode) => {
		if (!onBranch(n)) {
			newTree.push(n)
		}
	})
	navNodesTree.set(node)

	function onBranch(node: NavNode) {
		while (node) {
			if (node.parent?.id === parentNode.id) {
				return true
			}
			node = node.parent
		}
		return false
	}
}

export async function nodeProcessCrumb(fromPage: string, idx: number) {
	const nodes = get(navNodesCrumbs)
	nodes.splice(idx + 1, nodes.length - idx - 1)
	navNodesCrumbs.set(nodes)
	nodeProcess(fromPage, nodes[idx])
}

export async function nodeProcessLink(fromPage: string, node: NavNode, root = false) {
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

	// traverse to page
	goto(node.page)
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

function setNodeCurrent(node: NavNode) {
	// set selected node, make others not selected
	navNodesTree.update((value) =>
		value.map((n: NavNode) => {
			n.selected = n.id === node.id
			return n
		})
	)
	navNodeCurrent.set(node)
}

function getTraversalData() {
	let nodesData = []
	const nodesCrumb = get(navNodesCrumbs)
	nodesCrumb.forEach((n) => {
		if (n.data && Object.keys(n.data).length > 0) {
			nodesData.push(n.data)
		}
	})
	return nodesData
}
