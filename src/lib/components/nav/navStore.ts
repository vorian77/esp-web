import { get } from 'svelte/store'
import { localStorageStore } from '@skeletonlabs/skeleton'
import {
	DataObjProcessType,
	type DataObj,
	DataObjStatus,
	DataObjCardinality,
	DataObjRowChange,
	DbData,
	getArray,
	NavParms,
	NavParmsDB,
	NavParmsRestore,
	NavTree,
	NavTreeNode,
	type NodeObjRaw,
	NodeObjType,
	NodeObj,
	processByDataObjName,
	processDataObjByNode,
	type ResponseBody,
	User,
	valueOrDefault,
	isInstanceOf
} from '$comps/types'
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
	return user && Object.keys(user).length > 0 ? new User(user) : undefined
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
	setNavNode(localNavTree.rootNode, false)
	goto(linkNode.nodeObj.page)
}

export async function nodeProcessRowManager(node: NavTreeNode, processType: DataObjRowChange) {
	const parentNode = localNavTree.getNodeParent(node.key)
	const objData = getNewRowData(node, parentNode, processType)

	localNavTree.setNodeCurrentData(objData)

	const newRowDataObj: DataObj = await processDataObjByNode(
		node,
		DataObjProcessType.select,
		getData(node, objData)
	)
	setNavParmsDataObj(newRowDataObj, false)

	function getNewRowData(
		node: NavTreeNode,
		parentNode: NavTreeNode,
		processType: DataObjRowChange
	): any {
		const navStatus = getNavStatus()
		const listRows = navStatus.listRowsTotal
		let listRowsCurrent = navStatus.listRowsCurrent

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
	if (isCurrentNode(node)) return

	if (node.nodeObj.dataObj) {
		if (node.nodeObj.dataObj.cardinality === 'detail') {
			const parentNode = localNavTree.getNodeParent(node.key)
			const currentId = node.nodeObj.dataObj.data.id
			const currentRow = parentNode.nodeObj.dataObj.data.findIndex((d: any) => {
				return d.id === currentId
			})
			if (currentRow > -1) setNavStatusListRows(currentRow, parentNode.nodeObj.dataObj.data.length)
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
				switch (node.nodeObj.dataObj.cardinality) {
					case DataObjCardinality.list:
						localNavTree.collapseBranchSiblings(node)
						node.nodeObj.dataObj = await processDataObjByNode(
							node,
							DataObjProcessType.select,
							getData(node)
						)
						break

					case DataObjCardinality.detail:
						const nodeParent = localNavTree.getNodeParent(node.key)
						node = treeGetFirstChild(nodeParent)

						const navStatus = getNavStatus()
						const currentRow = navStatus.listRowsCurrent
						const currentData = nodeParent.nodeObj.dataObj.data[currentRow]

						node.nodeObj.dataObj = await processDataObjByNode(
							node,
							DataObjProcessType.select,
							getData(node, currentData)
						)
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'nodeProcess',
							message: `No case defined for data object cardinality: ${node.nodeObj.dataObj.cardinality}`
						})
				}
			} else {
				node.nodeObj.dataObj = await processDataObjByNode(
					node,
					DataObjProcessType.select,
					getData(node)
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

	setNavNode(node, false)
	if (fromPage !== node.nodeObj.page) {
		goto(node.nodeObj.page)
	}
}

export function treeCollapseBranchSibling(node: NavTreeNode) {
	localNavTree.collapseBranchSiblings(node)
}
export function treeCollapseNodes(node: NavTreeNode) {
	const nodeParent = treeGetNodeParent(node)
	localNavTree.collapseNodes(node, nodeParent)
}

export function treeGetFirstChild(nodeParent: NavTreeNode) {
	// <temp> 230911 - what about no first-child as form-detail?
	if (nodeParent.children[0]) {
		return nodeParent.children[0]
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'treeGetFirstChild',
			message: `No child nodes defined for parent: ${nodeParent.nodeObj.name}`
		})
	}
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

export function getData(node: NavTreeNode, initData: any = undefined) {
	// tree data
	let tree: Record<string, any> = {}
	localNavTree.listCrumbs.forEach((node: NavTreeNode) => {
		addTreeDataNode(node, node.nodeObj?.dataObj?.data)
	})
	addTreeDataNode(node, initData)

	return new DbData({ user: get(navUser), tree })

	function addTreeDataNode(node: NavTreeNode, initData: any) {
		if (node.nodeObj.dataObj?.table) {
			const key = node.nodeObj.dataObj?.table.module + '::' + node.nodeObj.dataObj?.table.name
			tree[key] = initData instanceof NavParms ? initData.data[0] : initData
		}
	}
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

export function setNavNode(node: NavTreeNode, isInsertMode: boolean) {
	if (node.nodeObj.dataObj) node.nodeObj.dataObj.isInsertMode = isInsertMode
	localNavTree.setNodeCurrent(node)
	navTree.set(localNavTree)
}
export function setNavParms(data: any, cardinality: DataObjCardinality, isInsertMode: boolean) {
	setNavStatusInsertMode(isInsertMode)
	navParms.set(new NavParmsDB(data, cardinality, isInsertMode))
}
export function setNavParmsDataObj(dataObj: DataObj, isInsertMode: boolean) {
	setNavParms(dataObj.data, dataObj.cardinality, isInsertMode)
}
export function setNavStatus(newStatus: DataObjStatus) {
	navStatus.set(newStatus)
}
function setNavStatusInsertMode(isInsertMode: boolean) {
	const currentStatus = getNavStatus()
	currentStatus.setInsertMode(isInsertMode)
	navStatus.set(currentStatus)
}
export function setNavStatusListRows(newCurrent: number, newTotal: number) {
	const currentStatus = getNavStatus()
	currentStatus.setList(newCurrent, newTotal)
	navStatus.set(currentStatus)
}
export function setNavStatusObjChanged(newStatus: boolean) {
	const currentStatus = getNavStatus()
	currentStatus.setObjChanged(newStatus)
	navStatus.set(currentStatus)
}
export function setNavStatusObjValid(newStatus: boolean) {
	const currentStatus = getNavStatus()
	currentStatus.setObjValid(newStatus)
	navStatus.set(currentStatus)
}
export function setNavStatusReset() {
	const currentStatus = getNavStatus()
	currentStatus.reset()
	navStatus.set(currentStatus)
}
