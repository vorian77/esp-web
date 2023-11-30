import { setNavParmsDataObj, setNavStatusListRows } from '$comps/nav/navStore'
import {
	getData,
	setNavNode,
	setNavStatus,
	treeCollapseBranchSibling,
	treeCollapseNodes,
	treeGetFirstChild,
	treeGetNodeParent,
	treeRetrieveBranch
} from '$comps/nav/navStore'
import {
	DataObjProcessType,
	type DataObj,
	DataObjStatus,
	DataObjCardinality,
	NavTreeNode,
	NavParms,
	processDataObjByNode
} from '$comps/types'
import type { FieldValue } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = '/$comps/nav/NavObjActions.ts'

export async function objActionListEdit(
	nodeParent: NavTreeNode,
	rowData: Record<string, FieldValue>,
	row: number
) {
	if (nodeParent.nodeObj.dataObj) {
		await treeRetrieveBranch(nodeParent, false)
		const nodeChild: NavTreeNode = treeGetFirstChild(nodeParent)

		nodeChild.nodeObj.dataObj = await processDataObjByNode(
			nodeChild,
			DataObjProcessType.select,
			getData(nodeParent, rowData)
		)

		if (nodeChild.nodeObj.dataObj) {
			const newStatus = new DataObjStatus()

			if (nodeChild.nodeObj.dataObj.cardinality === DataObjCardinality.detail) {
				newStatus.setList(row, nodeParent.nodeObj.dataObj.data.length)
			}
			newStatus.setInsertMode(false)
			setNavStatus(newStatus)

			await treeRetrieveBranch(nodeChild, false)
			setNavNode(nodeChild, false)
		}
	}
}

export async function objActionListNew(nodeParent: NavTreeNode) {
	await treeRetrieveBranch(nodeParent, true)
	const node: NavTreeNode = treeGetFirstChild(nodeParent)
	node.nodeObj.dataObj = await processDataObjByNode(node, DataObjProcessType.preset, getData(node))
	setNavNode(node, true)
}

export async function objActionDetailDelete(node: NavTreeNode, objData: NavParms) {
	node.nodeObj.dataObj = await processDataObjByNode(
		node,
		DataObjProcessType.delete,
		getData(node, objData)
	)

	// return to parent list, without deleted record
	const parentNode = await getNodeParent(node)
	treeCollapseBranchSibling(parentNode)
	setNavNode(parentNode, false)
}

export async function objActionDetailNew(node: NavTreeNode) {
	treeCollapseNodes(node)
	node.nodeObj.dataObj = await processDataObjByNode(node, DataObjProcessType.preset, getData(node))
	setNavNode(node, true)
}

export async function objActionDetailSaveInsert(node: NavTreeNode, objData: NavParms) {
	node.nodeObj.dataObj = await processDataObjByNode(
		node,
		DataObjProcessType.saveInsert,
		getData(node, objData)
	)

	if (node.nodeObj.dataObj?.data.hasOwnProperty('id')) {
		// successful insert - retrieve parent list, find new node in list, set row navigator
		const parentNode = await getNodeParent(node)
		const parentNodeData = parentNode.nodeObj.dataObj.data
		const newRecordIdx = parentNodeData.findIndex((d: any) => {
			return d.id === node.nodeObj.dataObj?.data.id
		})
		if (newRecordIdx >= 0) setNavStatusListRows(newRecordIdx, parentNodeData.length)

		await treeRetrieveBranch(node, false)
		setNavNode(node, false)
	}
}

export async function objActionDetailSaveUpdate(node: NavTreeNode, objData: NavParms) {
	const newDataObj: DataObj = await processDataObjByNode(
		node,
		DataObjProcessType.saveUpdate,
		getData(node, objData)
	)
	setNavParmsDataObj(newDataObj, false)
}

async function getNodeParent(node: NavTreeNode) {
	const parentNode = treeGetNodeParent(node)
	if (!parentNode)
		throw error(500, {
			file: FILENAME,
			function: 'getNodeParent',
			message: `Unable to get parent node of node: ${node.nodeObj.name}`
		})

	parentNode.nodeObj.dataObj = await processDataObjByNode(
		parentNode,
		DataObjProcessType.select,
		getData(parentNode)
	)
	return parentNode
}
