import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import {
	DataActionProcessType,
	type DataObj,
	DataObjCardinality,
	DataObjRowChange,
	NavTree,
	NavTreeNode,
	NodeObjType
} from '$comps/types'
import type { FormSourceResponseType } from '$comps/types'
import { getArray } from '$utils/utils'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/NavStore.ts'

let localNavTree: NavTree

export let navInitiated = localStorageStore('navInit', false)
export let navTree = localStorageStore('navTree', {})
export let navUser = localStorageStore('navUser', {})

export function navStorageReset() {
	navInitiated.set(false)
	navTree.set({})
	navUser.set({})
}

export function navInitReset() {
	navInitiated.set(false)
}

export async function navInit(user: any) {
	const initiated = get(navInitiated)

	if (!initiated) {
		const programs = getArray(user.resource_programs)
		localNavTree = new NavTree(programs)
		navTree.set(localNavTree)
		navInitiated.set(true)
	}
}

export async function objActionListEdit(nodeParent: NavTreeNode, data: any) {
	await treeBranchRetrieve(nodeParent, false)
	const nodeChild: NavTreeNode = getNodeFirstChild(nodeParent)
	nodeChild.nodeObj.dataObj = await getNodeObjForm(
		nodeChild,
		DataActionProcessType.select,
		getParms(data)
	)
	await treeBranchRetrieve(nodeChild, false)
	setDataObjRow(nodeChild.nodeObj.dataObj, data)
	setNodeCurrent(nodeChild)
}

export async function objActionListNew(nodeParent: NavTreeNode) {
	await treeBranchRetrieve(nodeParent, true)
	const node: NavTreeNode = getNodeFirstChild(nodeParent)
	node.nodeObj.dataObj = await getNodeObjForm(node, DataActionProcessType.preset)
	setNodeCurrent(node)
}

export async function objActionDetailDelete(node: NavTreeNode, data: any) {
	// delete current node-detail
	node.nodeObj.dataObj = await getNodeObjForm(node, DataActionProcessType.delete, getParms(data))

	// retrieve parent-list without deleted record
	const parentNode = localNavTree.getNodeParent(node.key)
	if (!parentNode) {
		return true
	}
	node = parentNode

	node.nodeObj.dataObj = await getNodeObjForm(
		node,
		DataActionProcessType.select,
		getParms(getTraversalData())
	)
	setNodeCurrent(node)
	return true
}

export async function objActionDetailNew(node: NavTreeNode) {
	node.nodeObj.dataObj = await getNodeObjForm(
		node,
		DataActionProcessType.preset,
		getParms(getTraversalData())
	)
	setNodeCurrent(node)
	return true
}

export async function objActionDetailSave(node: NavTreeNode, data: any) {
	const dataObj: DataObj = await getNodeObjForm(node, DataActionProcessType.save, getParms(data))
	if (dataObj && dataObj.data.hasOwnProperty('id')) {
		node.nodeObj.dataObj = dataObj
		return true
	}
	return false
}

async function nodeProcess(fromPage: string, node: NavTreeNode) {
	switch (node.nodeObj.type) {
		case NodeObjType.header:
		case NodeObjType.page:
		case NodeObjType.program:
			break

		case NodeObjType.object:
			if (!node.nodeObj.dataObjId) {
				alert(`Feature: "${node.nodeObj.header}" has not yet been configured.`)
				break
			}

			if (node.nodeObj.dataObj) {
				const obj: DataObj = node.nodeObj.dataObj
				switch (obj.cardinality) {
					case DataObjCardinality.list:
						localNavTree.collapseBranchSiblings(node)
						node.nodeObj.dataObj = await getNodeObjForm(
							node,
							DataActionProcessType.select,
							getParms(getTraversalData())
						)
						break

					case DataObjCardinality.detail:
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'nodeProcess',
							message: `No case defined for node object cardinality: ${obj.cardinality}`
						})
				}
			} else {
				node.nodeObj.dataObj = await getNodeObjForm(
					node,
					DataActionProcessType.select,
					getParms(getTraversalData())
				)
			}
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'nodeProcess',
				message: `No case defined for node.type: ${node.nodeObj.type}`
			})
	}
	setNodeCurrent(node)
	if (fromPage !== node.nodeObj.page) {
		goto(node.nodeObj.page)
	}
}

export async function nodeProcessCrumb(fromPage: string, idx: number) {
	const node = localNavTree.listCrumbs[idx]
	localNavTree.collapseBranchGrandChildren(node)
	nodeProcess(fromPage, node)
}

export async function nodeProcessLink(fromPage: string, linkNode: NavTreeNode, root = false) {
	localNavTree.collapseReset()
	setNodeCurrent(localNavTree.rootNode)
	goto(linkNode.nodeObj.page)
}

export async function nodeProcessRowManager(node: NavTreeNode, processType: DataObjRowChange) {
	const parentNode = localNavTree.getNodeParent(node.key)
	const data = getNodeData(node, parentNode, processType)
	node.nodeObj.dataObj = await getNodeObjForm(node, DataActionProcessType.select, getParms(data))
	setDataObjRow(node.nodeObj.dataObj, data)
	setNodeCurrent(node)

	function getNodeData(node: NavTreeNode, parentNode: NavTreeNode, processType: DataObjRowChange) {
		if (node.nodeObj.dataObj && parentNode.nodeObj.dataObj) {
			const listRows = node.nodeObj.dataObj.listRows
			let listRowsCurrent = node.nodeObj.dataObj.listRowsCurrent

			switch (processType) {
				case DataObjRowChange.first:
					listRowsCurrent = 0
					break

				case DataObjRowChange.left:
					listRowsCurrent -= 1
					break

				case DataObjRowChange.right:
					listRowsCurrent += 1
					break

				case DataObjRowChange.last:
					listRowsCurrent = listRows - 1
					break

				default:
					throw error(500, {
						file: FILENAME,
						function: 'getNodeData',
						message: `No case defined for DataObjectRowChange: ${processType}`
					})
			}
			return { listRows, listRowsCurrent, id: parentNode.nodeObj.dataObj.data[listRowsCurrent].id }
		}
	}
}

export async function nodeProcessTree(fromPage: string, node: NavTreeNode) {
	if (node?.nodeObj?.dataObj?.cardinality === 'detail') {
		localNavTree.collapseBranchGrandChildren(node)
	} else {
		localNavTree.collapseBranchSiblings(node)
	}

	if ([NodeObjType.program, NodeObjType.header].includes(node.nodeObj.type)) {
		if (!node.isExpanded) {
			await treeBranchRetrieve(node, false)
			node.isExpanded = true
		}
	}
	nodeProcess(fromPage, node)
}

async function treeBranchRetrieve(node: NavTreeNode, firstChildOnly: boolean) {
	// 1: retrieve nodes
	const responsePromise = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ function: 'getNodesByParent', parentNodeId: node.nodeObj.id })
	})
	const response: FormSourceResponseType = await responsePromise.json()
	const rawBranch = response.data

	// 2: create new branch
	if (firstChildOnly) {
		rawBranch.splice(0, rawBranch.length - 1)
	}
	localNavTree.addBranch(node, rawBranch)
}

function getParms(data: any) {
	return { user: get(navUser), data }
}

function getTraversalData() {
	let nodesData: any = []
	return nodesData
}

function getNodeFirstChild(nodeParent: NavTreeNode) {
	// <temp> 230911 - what about no first-child as form-detail?
	if (nodeParent.children[0]) {
		return nodeParent.children[0]
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'getNodeFirstChild',
			message: `No child nodes defined for parent: ${nodeParent.nodeObj.name}`
		})
	}
}

async function getNodeObjForm(
	node: NavTreeNode,
	processType: DataActionProcessType,
	data: any = {}
) {
	if (!node.nodeObj.dataObjId) {
		throw error(500, {
			file: FILENAME,
			function: 'getNodeObjForm',
			message: `No dataObjId provided for nodeObj: ${node.nodeObj.name}`
		})
	}
	const responsePromise = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({
			function: 'getNodeObjForm',
			nodeObj: node.nodeObj.dataObj,
			dataObjId: node.nodeObj.dataObjId,
			processType,
			data
		})
	})
	const response: FormSourceResponseType = await responsePromise.json()
	return response.data
}

function setDataObjRow(dataObj: DataObj | null, data: any) {
	if (dataObj) {
		dataObj.listRows = data.listRows
		dataObj.listRowsCurrent = data.listRowsCurrent
	}
}

function setNodeCurrent(node: NavTreeNode) {
	localNavTree.setNodeCurrent(node)
	navTree.set(localNavTree)
}
