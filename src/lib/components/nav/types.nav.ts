import { memberOfEnum, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import type { DataActionSaveMode } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.nav.ts'

export class NavTree {
	rootNode: NavTreeNode
	currentNode: NavTreeNode
	listBranch: Array<NavTreeNode> = []
	listCrumbs: Array<NavTreeNode> = []
	listTree: Array<NavTreeNode> = []

	constructor(rawNodes: Array<rawNodeObj>) {
		const ROOT_NAME = '+ROOT+'
		const ROOT_PARM = 'root'
		this.rootNode = new NavTreeNode(
			ROOT_NAME,
			-2,
			new NodeObj(ROOT_NAME, ROOT_PARM, ROOT_NAME, ROOT_NAME, ROOT_PARM, ROOT_PARM, ROOT_PARM)
		)
		this.currentNode = this.rootNode
		this.addBranch(this.rootNode, rawNodes)
		this.setNodeLists('')
	}

	addBranch(node: NavTreeNode, rawNodes: Array<rawNodeObj>) {
		rawNodes.forEach((n) => {
			const navNode = new NodeObj(
				n.id,
				n._codeType,
				n.name,
				n.header,
				n._codeIcon,
				n.page,
				n.dataObjId
			)
			const treeNode = new NavTreeNode(n.id, node.indent, navNode)
			node.children.push(treeNode)
		})
	}

	collapseBranchGrandChildren(node: NavTreeNode) {
		this.collapseNodes(node, node)
	}

	collapseBranchSiblings(node: NavTreeNode) {
		this.collapseNodes(node, this.getNodeParent(node.key))
	}

	collapseReset() {
		this.collapseNodes(this.rootNode, this.rootNode)
	}

	collapseNodes(node: NavTreeNode, parentNode: NavTreeNode) {
		traverse(parentNode)
		function traverse(searchNode: NavTreeNode) {
			for (let i = searchNode.children.length - 1; i > -1; i--) {
				traverse(searchNode.children[i])

				if ([node.key, parentNode.key].includes(searchNode.children[i].key)) {
					searchNode.children[i].isExpanded = false
				} else {
					if (searchNode.children[i].indent > parentNode.indent + 1) {
						searchNode.children.pop()
					} else {
						searchNode.children[i].isExpanded = false
					}
				}
			}
		}
	}

	getNodeParent(key: string) {
		return traverse(key, this.rootNode)
		function traverse(key: string, node: NavTreeNode) {
			if (
				node.children.find((c) => {
					return c.key === key
				})
			) {
				return node
			} else {
				for (let i = 0; i < node.children.length; i++) {
					const parent: any = traverse(key, node.children[i])
					if (parent) {
						return parent
					}
				}
			}
		}
	}

	setNodeCurrent(node: NavTreeNode) {
		this.currentNode = node
		this.setNodeLists(this.currentNode.key)
	}

	setNodeLists(currentNodeKey: string) {
		this.listBranch = setListBranch(this.currentNode)
		this.listCrumbs = setListCrumbs(this.rootNode, this.currentNode)
		this.listTree = setListTree(this.rootNode)

		function setListBranch(currentNode: NavTreeNode) {
			let nodeList: Array<NavTreeNode> = []
			currentNode.children.forEach((n) => {
				nodeList.push(n)
			})
			return nodeList
		}

		function setListCrumbs(rootNode: NavTreeNode, targetNode: NavTreeNode) {
			let nodeList: Array<NavTreeNode> = []
			let found = false
			traverse(rootNode)

			function traverse(node: NavTreeNode) {
				if (node.key !== rootNode.key) {
					nodeList.push(node)
				}
				if (node.key === targetNode.key) {
					found = true
				}
				for (let i = 0; i < node.children.length; i++) {
					if (found) {
						break
					}
					traverse(node.children[i])
				}
				if (!found) {
					nodeList.pop()
				}
			}
			return nodeList
		}

		function setListTree(rootNode: NavTreeNode) {
			let nodeList: Array<NavTreeNode> = []
			traverse(rootNode)

			function traverse(node: NavTreeNode) {
				node.isSelected = node.key === currentNodeKey
				if (node.key !== rootNode.key) {
					nodeList.push(node)
				}
				node.children?.forEach((n) => {
					traverse(n)
				})
			}
			return nodeList
		}
	}
}

export class NavTreeNode {
	key: string
	indent: number
	nodeObj: NodeObj
	children: Array<NavTreeNode> = []
	isExpanded: boolean = false
	isSelected: boolean = false

	constructor(key: string, parentIndent: number, nodeObj: NodeObj) {
		this.key = key
		this.indent = parentIndent + 1
		this.nodeObj = nodeObj
	}
}

export type rawNodeObj = {
	id: string
	_codeType: string
	name: string
	header: string
	_codeIcon: string
	page: string
	dataObjId: string | null
}

export class NodeObj {
	id: string
	type: NodeObjType
	name: string
	header: string
	icon: string
	page: string
	dataObjId: string | null
	dataObj: DataObj | null = null
	data: any = {}

	constructor(
		id: string,
		type: string,
		name: string,
		header: string,
		icon: string,
		page: string,
		dataObjId: string | null
	) {
		const DEFAULT_ICON = 'hamburger-menu'
		this.id = valueOrDefault(strOptional(id, 'NodeObj', 'id'), '')
		this.type = memberOfEnum(type, 'NodeObj', 'type', 'NodeObjType', NodeObjType)
		this.name = strRequired(name, 'NodeObj', 'name')
		this.header = strRequired(header, 'NodeObj', 'header')
		this.icon = valueOrDefault(strOptional(icon, 'NodeObj', 'icon'), DEFAULT_ICON)
		this.page = strRequired(page, 'NodeObj', 'page')
		this.dataObjId = valueOrDefault(dataObjId, null)
	}
}

export class DataObj {
	cardinality: DataObjCardinality
	component: DataObjComponent
	data: any
	defn: any
	listRows: number
	listRowsCurrent: number
	saveMode: DataActionSaveMode | undefined

	constructor(defnRaw: any) {
		this.cardinality = memberOfEnum(
			defnRaw._codeCardinality,
			'DataObj',
			'cardinality',
			'DataObjCardinality',
			DataObjCardinality
		)
		this.component = memberOfEnum(
			defnRaw._codeComponent,
			'DataObj',
			'component',
			'DataObjComponent',
			DataObjComponent
		)
		this.defn = defnRaw
		this.listRows = valueOrDefault(defnRaw.listRows, -1)
		this.listRowsCurrent = valueOrDefault(defnRaw.listRowsCurrent, -1)
	}
}

export enum DataActionProcessType {
	delete = 'delete',
	preset = 'preset',
	save = 'save',
	select = 'select'
}
export enum DataObjCardinality {
	list = 'list',
	detail = 'detail'
}
export enum DataObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail'
}
export enum DataObjRowChange {
	first = 'first',
	left = 'left',
	right = 'right',
	last = 'last'
}
export enum NodeObjType {
	header = 'header',
	object = 'object',
	page = 'page',
	program = 'program',
	root = 'root'
}
