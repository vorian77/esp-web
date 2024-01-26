import type { DataObj } from '../components/dataObj/types.dataObj'
import {
	type DataObjRecord,
	type DataObjRecordRowList,
	type DataObjRaw,
	getArray
} from '$comps/types'

export class Tree {
	root: TreeNode
	constructor(evaluator: Function, rootKey: string, rootPayload: any = undefined) {
		this.root = new TreeNode(undefined, rootKey, 0, rootPayload)
	}
	load(rawNodes: Array<TreeNodeRaw>) {}

	traverse(traverseType: TreeTraverseType, reverse: boolean = false) {
		const node = new TreeNode(this.root, 'default::SysPerson', 0)
		node.ancestors = [this.root]
		return [node]
	}
}

export class TreeNode {
	ancestors: TreeNode[] = []
	chlildren: TreeNode[] = []
	parent?: TreeNode
	sibling?: TreeNode
	valKey: string
	valPayload: any
	valRank: number
	constructor(
		parent: TreeNode | undefined = undefined,
		key: string,
		rank: number,
		payload: any = undefined
	) {
		this.parent = parent
		this.valKey = key
		this.valPayload = payload
		this.valRank = rank
	}
	setAncestors() {
		let ancestors = []
		let node = this.parent
		while (node) {
			ancestors.push(node)
			node = node.parent
		}
		this.ancestors = ancestors
	}
}
export class TreeNodeRaw {
	key: string
	payload: any
	constructor(key: string, payload: any = undefined) {
		this.key = key
		this.payload = payload
	}
}
export enum TreeTraverseType {
	depthFirst = 'depthFirst',
	breadthFirst = 'breadthFirst'
}
