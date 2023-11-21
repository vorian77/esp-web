import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import {
	DataObjProcessType,
	type DataObj,
	DataObjStatus,
	DataObjCardinality,
	DataObjRowChange,
	type ResponseBody,
	getArray,
	NavParms,
	NavParmsDB,
	NavTree,
	NavTreeNode,
	type NodeObjRaw,
	NodeObjType,
	valueOrDefault,
	NodeObj
} from '$comps/types'
import { User } from '$comps/types'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/nav.ts'

export let navParms = localStorageStore('navParms', {})
export let navUser = localStorageStore('navUser', {})
export let navTree = localStorageStore('navTree', {})
export let navStatus = localStorageStore('navStatus', new DataObjStatus())

let localNavTree: NavTree

export function initUser(newUser: any) {
	navUser.set(newUser)
}

export function getUser() {
	const user = get(navUser)
	return user ? new User(user) : undefined
}

export async function initNav(user: any) {
	let rawBranch: Array<NodeObjRaw> = user.resource_programs

	// <temp> filter to single program for dev
	rawBranch = user.resource_programs.filter((p: any) => {
		return p.name === 'pgm_cm_training_staff_provider'
	})

	// if user has access to only 1 program,
	// filter down to first group of navNodes
	// it's not necessary to display program/header node
	while (rawBranch && rawBranch.length === 1) {
		rawBranch = await treeRetrieveNodes(rawBranch[0].id)
	}

	localNavTree = new NavTree(rawBranch)
	navTree.set(localNavTree)

	setNavStatusReset()
}

export async function nodeProcessCrumb(fromPage: string, idx: number) {
	const node = localNavTree.listCrumbs[idx]
	localNavTree.collapseBranchGrandChildren(node)
	nodeProcess(fromPage, node)
}

export async function nodeProcessLink(fromPage: string, linkNode: NavTreeNode) {
	if (isCurrentNode(linkNode)) {
		return
	}
	localNavTree.collapseReset()
	setNavNode(false, localNavTree.rootNode)
	goto(linkNode.nodeObj.page)
}

export async function nodeProcessRowManager(node: NavTreeNode, processType: DataObjRowChange) {
	const parentNode = localNavTree.getNodeParent(node.key)
	const data = getNewRowData(node, parentNode, processType)
	const newRowDataObj: DataObj = await processDataObj(
		node,
		DataObjProcessType.select,
		getParms(data)
	)
	setNavParms(newRowDataObj, false)

	function getNewRowData(
		node: NavTreeNode,
		parentNode: NavTreeNode,
		processType: DataObjRowChange
	): any {
		const dataObjStatusLocal = get(navStatus)
		const listRows = dataObjStatusLocal.listRowsTotal
		let listRowsCurrent = dataObjStatusLocal.listRowsCurrent

		if (node.nodeObj.dataObj && parentNode.nodeObj.dataObj) {
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
						function: 'nodeProcessRowManager.getNodeData',
						message: `No case defined for DataObjectRowChange: ${processType}`
					})
			}
			setNavStatusListRows(listRowsCurrent, listRows)
			return { id: parentNode.nodeObj.dataObj.data[listRowsCurrent].id }
		}
	}
}

export async function nodeProcessTree(fromPage: string, node: NavTreeNode) {
	if (isCurrentNode(node)) {
		return
	}

	if (node.nodeObj.dataObj) {
		if (node.nodeObj.dataObj.cardinality === 'detail') {
			localNavTree.collapseBranchGrandChildren(node)
		} else {
			localNavTree.collapseBranchSiblings(node)
		}
	} else {
		localNavTree.collapseBranchSiblings(node)
	}

	if ([NodeObjType.program, NodeObjType.header].includes(node.nodeObj.type)) {
		if (!node.isExpanded) {
			await treeRetrieveBranch(node, false)
			node.isExpanded = true
		}
	}
	nodeProcess(fromPage, node)
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
				const dataObj: DataObj = node.nodeObj.dataObj
				switch (dataObj.cardinality) {
					case DataObjCardinality.list:
						localNavTree.collapseBranchSiblings(node)
						node.nodeObj.dataObj = await processDataObj(node, DataObjProcessType.select, getParms())
						break

					case DataObjCardinality.detail:
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'nodeProcess',
							message: `No case defined for data object cardinality: ${dataObj.cardinality}`
						})
				}
			} else {
				node.nodeObj.dataObj = await processDataObj(node, DataObjProcessType.select, getParms())
			}
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'nodeProcess',
				message: `No case defined for node.type: ${node.nodeObj.type}`
			})
	}

	setNavNode(false, node)
	if (fromPage !== node.nodeObj.page) {
		goto(node.nodeObj.page)
	}
}

export function treeCollapseBranchSibling(node: NavTreeNode) {
	localNavTree.collapseBranchSiblings(node)
}

export function treeGetNodeParent(node: NavTreeNode) {
	return localNavTree.getNodeParent(node.key)
}

export async function treeRetrieveBranch(node: NavTreeNode, firstChildOnly: boolean) {
	// 1: retrieve nodes
	const rawBranch: Array<NodeObjRaw> = await treeRetrieveNodes(node.nodeObj.id)

	// 2: create new branch
	if (firstChildOnly) {
		rawBranch.splice(0, rawBranch.length - 1)
	}
	localNavTree.addBranch(node, rawBranch)
}

async function treeRetrieveNodes(nodeObjKey: string) {
	const responsePromise: Response = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ function: 'getNodeObjsByParent', parentNodeId: nodeObjKey })
	})
	const response: ResponseBody = await responsePromise.json()
	return response.data
}

export function getParms(data: any = undefined) {
	let parms: any = { user: get(navUser) }
	if (data) parms.data = data
	return parms
}

export async function processDataObj(
	node: NavTreeNode,
	processType: DataObjProcessType,
	parms: any = {}
) {
	if (!node.nodeObj.dataObjId) {
		throw error(500, {
			file: FILENAME,
			function: 'processDataObj',
			message: `No dataObjId provided for nodeObj: ${node.nodeObj.name}`
		})
	}

	const responsePromise: Response = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({
			function: 'processDataObj',
			dataObj: node.nodeObj.dataObj,
			dataObjId: node.nodeObj.dataObjId,
			processType,
			parms
		})
	})

	const response: ResponseBody = await responsePromise.json()
	return response.data
}
export function getNavStatus() {
	return Object.assign(new DataObjStatus(), get(navStatus))
}
export function getNavTree() {
	return Object.assign(new NavTree([]), get(navTree))
}

function isCurrentNode(node: NavTreeNode) {
	return node.key === localNavTree.currentNode.key
}

export function setNavNode(insertMode: boolean, node: NavTreeNode) {
	localNavTree.setNodeCurrent(node)
	navTree.set(localNavTree)

	setNavParms(node.nodeObj.dataObj, insertMode)
}
export function setNavParms(dataObj: DataObj | undefined, isInsertMode: boolean) {
	setNavStatusInsertMode(isInsertMode)
	const np = new NavParmsDB(dataObj, isInsertMode)
	navParms.set(np)
}
export function setNavStatus(newStatus: DataObjStatus) {
	navStatus.set(newStatus)
}
function setNavStatusInsertMode(isInsertMode: boolean) {
	const currentStatus = Object.assign(new DataObjStatus(), get(navStatus))
	currentStatus.setInsertMode(isInsertMode)
	navStatus.set(currentStatus)
}
export function setNavStatusListRows(newCurrent: number, newTotal: number) {
	const currentStatus = Object.assign(new DataObjStatus(), get(navStatus))
	currentStatus.setList(newCurrent, newTotal)
	navStatus.set(currentStatus)
}
export function setNavStatusObjChanged(newStatus: boolean) {
	const currentStatus = Object.assign(new DataObjStatus(), get(navStatus))
	currentStatus.setObjChanged(newStatus)
	navStatus.set(currentStatus)
}
export function setNavStatusObjValid(newStatus: boolean) {
	const currentStatus = Object.assign(new DataObjStatus(), get(navStatus))
	currentStatus.setObjValid(newStatus)
	navStatus.set(currentStatus)
}
export function setNavStatusReset() {
	const currentStatus = Object.assign(new DataObjStatus(), get(navStatus))
	currentStatus.reset()
	navStatus.set(currentStatus)
}
