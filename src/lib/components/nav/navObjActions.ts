import { getNavStatus, setNavParms, setNavStatusListRows } from '$comps/nav/navStore'
import {
	getParms,
	processDataObj,
	setNavNode,
	setNavStatus,
	treeCollapseBranchSibling,
	treeGetNodeParent,
	treeRetrieveBranch
} from '$comps/nav/navStore'
import {
	DataObjProcessType,
	type DataObj,
	DataObjStatus,
	DataObjCardinality,
	NavTreeNode,
	NavParms
} from '$comps/types'
import type { FieldValue } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/NavObjActions.ts'

export async function objActionListEdit(
	nodeParent: NavTreeNode,
	data: Record<string, FieldValue>,
	row: number
) {
	if (nodeParent.nodeObj.dataObj) {
		await treeRetrieveBranch(nodeParent, false)
		const nodeChild: NavTreeNode = getNodeFirstChild(nodeParent)

		nodeChild.nodeObj.dataObj = await processDataObj(
			nodeChild,
			DataObjProcessType.select,
			getParms(data)
		)

		if (nodeChild.nodeObj.dataObj) {
			const newStatus = new DataObjStatus()

			if (nodeChild.nodeObj.dataObj.cardinality === DataObjCardinality.detail) {
				newStatus.setList(row, nodeParent.nodeObj.dataObj.data.length)
			}
			newStatus.setInsertMode(false)
			setNavStatus(newStatus)

			await treeRetrieveBranch(nodeChild, false)
			setNavNode(false, nodeChild)
		}
	}
}

export async function objActionListNew(nodeParent: NavTreeNode) {
	await treeRetrieveBranch(nodeParent, true)
	const node: NavTreeNode = getNodeFirstChild(nodeParent)
	node.nodeObj.dataObj = await processDataObj(node, DataObjProcessType.preset, getParms())
	setNavNode(true, node)
}

export async function objActionDetailDelete(node: NavTreeNode, parms: NavParms) {
	// delete current node-detail
	if (parms.getValue('id')) {
		node.nodeObj.dataObj = await processDataObj(node, DataObjProcessType.delete, getParms(parms))
	}

	// return to parent list, without deleted record
	const parentNode = await getNodeParent(node)
	treeCollapseBranchSibling(parentNode)
	setNavNode(false, parentNode)
}

export async function objActionDetailNew(node: NavTreeNode) {
	const dataObj: DataObj = await processDataObj(node, DataObjProcessType.preset, getParms())
	console.log('objActionDetailNew.dataObj:', dataObj)
	setNavParms(dataObj, true)

	// node.nodeObj.dataObj = await processDataObj(node, DataObjProcessType.preset, getParms())
	// setNavNode(true, node)
}

export async function objActionDetailSaveInsert(node: NavTreeNode, parms: NavParms) {
	const newRecordDataObj: DataObj = await processDataObj(
		node,
		DataObjProcessType.saveInsert,
		getParms(parms)
	)

	if (newRecordDataObj.data.hasOwnProperty('id')) {
		// successful insert - retrieve parent list, find new node in list, set row navigator
		const parentNode = await getNodeParent(node)
		const parentNodeData = parentNode.nodeObj.dataObj.data
		const newRecordIdx = parentNodeData.findIndex((d: any) => {
			return d.id === newRecordDataObj.data.id
		})
		if (newRecordIdx >= 0) setNavStatusListRows(newRecordIdx, parentNodeData.length)
	}
	setNavParms(newRecordDataObj, false)
}

export async function objActionDetailSaveUpdate(node: NavTreeNode, parms: NavParms) {
	const newDataObj: DataObj = await processDataObj(
		node,
		DataObjProcessType.saveUpdate,
		getParms(parms)
	)
	setNavParms(newDataObj, false)
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

async function getNodeParent(node: NavTreeNode) {
	const parentNode = treeGetNodeParent(node)
	if (!parentNode)
		throw error(500, {
			file: FILENAME,
			function: 'getNodeParent',
			message: `Unable to get parent node of node: ${node.nodeObj.name}`
		})

	parentNode.nodeObj.dataObj = await processDataObj(
		parentNode,
		DataObjProcessType.select,
		getParms()
	)
	return parentNode
}
