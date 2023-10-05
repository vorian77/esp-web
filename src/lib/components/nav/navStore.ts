import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import { NavDataProcessType, NavNode, NavNodeType, type NavNodeObj } from '$comps/types'
import { Form } from '$comps/esp/form/form'
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

export function navStorageReset() {
	navInitiated.set(false)
	navNodesTree.set([])
	navNodesBranch.set([])
	navNodesCrumbs.set([])
	navNodeCurrent.set({})
	navUser.set({})
}

export function navInitReset() {
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
				new NavNode(n.id, PARENT, n['_codeType'], n.name, n.header, n['_codeIcon'], n.page, n.objId)
			)
		})
		navInitiated.set(true)
		navNodesTree.set(navNodes)
		navNodesBranch.set(navNodes)
		navNodesCrumbs.set([])
		navNodeCurrent.set({})
	}
}

// export async function objActionProcessOld(
// 	fromPage: string,
// 	node: NavNode,
// 	treeBranch: 'retrieve-branch' | 'retrieve-child' | 'remove' | undefined,
// 	newCurrentNode: 'self' | 'first-child' | undefined,
// 	nodeData: {} | undefined,
// 	dataActionType: DataActionType | undefined
// ) {
// 	switch (treeBranch) {
// 		case 'retrieve-branch':
// 			await treeBranchRetrieve(node, false)
// 			break

// 		case 'retrieve-child':
// 			await treeBranchRetrieve(node, true)
// 			break

// 		case 'remove':
// 			treeBranchRemove(node)
// 			break

// 		case undefined:
// 			break

// 		default:
// 			throw error(500, {
// 				file: FILENAME,
// 				function: 'navChange',
// 				message: `No case defined for treeBranch: ${treeBranch}`
// 			})
// 	}

// 	// set working node
// 	if (newCurrentNode === 'first-child') {
// 		// <temp> 230911 - what about no first-child as form-detail
// 		const treeNodes = get(navNodesTree)
// 		const idx = getNodeIdx(node.id)
// 		const childNode = treeNodes[idx + 1]
// 		if (childNode?.parent.id === node.id) {
// 			node = childNode
// 		}
// 	}

// 	// verify - form node has form definition
// 	if (node.type === NavNodeType.object && !node.objId) {
// 		alert(`No object defined for node: ${node.name}`)
// 	}

// 	if (typeof newCurrentNode !== 'undefined') {
// 		setNodeCurrent(node)
// 	}

// 	if (fromPage !== node.page) {
// 		goto(node.page)
// 	}
// }

export async function objActionListEdit(nodeParent: NavNode, recordId: string) {
	await treeBranchRetrieve(nodeParent, false)
	const node: NavNode = getNodeFirstChild(nodeParent)
	node.obj = await getNodeObjForm(node.objId, node.obj, NavDataProcessType.select, { recordId })
	setNodeCurrent(node)
}

export async function objActionListNew(nodeParent: NavNode) {
	console.log('List-New:', nodeParent)
	await treeBranchRetrieve(nodeParent, true)
	const node: NavNode = getNodeFirstChild(nodeParent)
	node.obj = await getNodeObjForm(node.objId, node.obj, NavDataProcessType.insert, {})
	setNodeCurrent(node)
}

export async function objActionDetailDelete(node: NavNode) {
	console.log('Detail-Delete:', node)
	return true
}

export async function objActionDetailNew(node: NavNode) {
	console.log('Detail-New:', node)
}

export async function objActionDetailSave(node: NavNode, formValues: {}) {
	// save data
	node.obj = await getNodeObjForm(node.objId, node.obj, NavDataProcessType.save, {
		formValues,
		user: get(navUser)
	})
	if (!node.obj!.data.id) {
		return false
	}

	// <temp> 230929 re-retrieve data - to update calculated values
	node.obj = await getNodeObjForm(node.objId, node.obj, NavDataProcessType.select, {
		recordId: node.obj!.data.id
	})

	setNodeCurrent(node)
	return true
}

async function nodeProcess(fromPage: string, node: NavNode) {
	switch (node.type) {
		case NavNodeType.header:
		case NavNodeType.page:
		case NavNodeType.program:
			node.data = getTraversalData()
			setNodeCurrent(node)
			if (fromPage !== node.page) {
				goto(node.page)
			}
			break

		case NavNodeType.object:
			const data = { user: get(navUser), traversal: getTraversalData() }
			node.obj = await getNodeObjForm(node.objId, node.obj, NavDataProcessType.select, data)
			treeBranchRemove(node)
			setNodeCurrent(node)
			if (fromPage !== node.page) {
				goto(node.page)
			}
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'nodeProcess',
				message: `No case defined for node.type: ${node.type}`
			})
	}
}

export async function nodeProcessTree(fromPage: string, node: NavNode) {
	if ([NavNodeType.program, NavNodeType.header].includes(node.type)) {
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
	if (node.isExpanded) {
		return
	}

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
			new NavNode(n.id, node, n['_codeType'], n.name, n.header, n['_codeIcon'], n.page, n.objId)
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
	node.isExpanded = true
}

function treeBranchRemove(parentNode: NavNode) {
	let newTree: Array<NavNode> = []
	const oldTree = get(navNodesTree)
	oldTree.forEach((n: NavNode) => {
		if (!onBranch(n)) {
			newTree.push(n)
		}
	})
	parentNode.isExpanded = false
	navNodesTree.set(newTree)

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
			n.isSelected = false
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

function getTraversalData() {
	let nodesData = []
	const nodesCrumb = get(navNodesCrumbs)
	nodesCrumb.forEach((n) => {
		if (n.data && Object.keys(n.data).length > 0) {
			nodesData.push(getTraversalDataNode(n.name, n.data))
		}
	})
	return nodesData
}

function getNodeFirstChild(nodeParent: NavNode) {
	// <temp> 230911 - what about no first-child as form-detail?
	const treeNodes = get(navNodesTree)
	const idx = getNodeIdx(nodeParent.id)
	const childNode = treeNodes[idx + 1]
	if (childNode?.parent.id === nodeParent.id) {
		return childNode
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'getNodeFirstChild',
			message: `No child nodes defined for parent: ${nodeParent.name}`
		})
	}
}

async function getNodeObjForm(
	objId: string,
	nodeObj: NavNodeObj | undefined,
	processType: NavDataProcessType,
	data: any
) {
	const responsePromise = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({
			function: 'getNodeObjForm',
			objId,
			nodeObj,
			processType,
			data
		})
	})
	const response: FormSourceResponseType = await responsePromise.json()
	return response.data
}

function getTraversalDataNode(key: string, data: any) {
	const newData: any = {}
	newData[key] = { ...data }
	return newData
}

function setNodeCurrent(node: NavNode) {
	// set selected node, make others not selected
	navNodesTree.update((value) =>
		value.map((n: NavNode) => {
			n.isSelected = n.id === node.id
			return n
		})
	)
	navNodeCurrent.set(node)
}
