import { Node, NodeNav, NodeType } from '$comps/types'
import type { RawNode } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.nav.ts'

export class NavTree {
	currNode: NodeNav = new NodeNav({
		header: 'root',
		id: '+ROOT+',
		indent: -1,
		isRoot: true,
		name: 'root',
		type: NodeType.navTreeRoot
	})
	listTree: Array<NodeNav> = []
	constructor(rawNodes: Array<RawNode>) {
		this.addBranch(rawNodes, this.currNode)
		this.setNodeCurrent(this.currNode)
	}
	get node() {
		return this.currNode
	}
	set node(node: NodeNav) {
		// used to facilitate reactivity on component
		this.currNode = node
		this.setNodeCurrent(node)
	}

	addBranch(dbNodes: Array<RawNode>, node: NodeNav | undefined = undefined) {
		let nodeIdx = -1
		let nodeId = ''
		let nodeIndent = 0
		if (node) {
			nodeIdx = this.getNodeIdx(node)
			nodeId = node.id
			nodeIndent = node.indent + 1
			node.isRetrieved = true
		}
		dbNodes.forEach((n, i) => {
			this.listTree.splice(nodeIdx + i + 1, 0, Node.dbNodeParseNav(n, nodeId, nodeIndent))
		})
	}

	getNodeIdx(node: NodeNav) {
		for (let i = 0; i < this.listTree.length; i++) {
			if (this.listTree[i].id === node.id) return i
		}
		return -1
	}

	isCurrentNode(node: NodeNav) {
		return node.id === this.currNode.id
	}

	isRootLevel(node: NodeNav) {
		return node.indent === 0
	}

	setNodeCurrent(currNode: NodeNav) {
		// preset
		let crumbIndentIdx
		this.listTree.forEach((n, i) => {
			n.isCrumb = false
			n.isOpen = this.isRootLevel(n) ? true : false
			if (n.id === currNode.id) {
				crumbIndentIdx = n.indent - 1
				n.isCrumb = true
				n.isCurrent = true
			} else {
				n.isCurrent = false
			}
		})

		const nodeIdx = this.getNodeIdx(currNode)
		if (nodeIdx > -1) {
			// set open - current node - up & crumbs
			let status = true
			for (let i = nodeIdx; i > -1; i--) {
				// set crumb
				if (!this.listTree[i].isRoot && this.listTree[i].indent === crumbIndentIdx) {
					this.listTree[i].isCrumb = true
					crumbIndentIdx--
				}

				// set open
				if (this.isRootLevel(this.listTree[i])) {
					status = false
				} else {
					this.listTree[i].isOpen = status
				}
			}

			// set open - children - down
			status = true
			for (let i = nodeIdx + 1; i < this.listTree.length; i++) {
				if (this.isRootLevel(this.listTree[i])) {
					status = false
				} else {
					this.listTree[i].isOpen = status
				}
			}
		}
		return this.listTree
	}
}
