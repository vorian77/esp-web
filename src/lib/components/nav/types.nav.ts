import { memberOfEnum, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import { Field, FieldValue } from '$comps/form/field'
import { type DataObj, DataObjCardinality, FieldElement } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.nav.ts'

export class NavTree {
	rootNode: NavTreeNode
	currentNode: NavTreeNode
	listBranch: Array<NavTreeNode> = []
	listCrumbs: Array<NavTreeNode> = []
	listTree: Array<NavTreeNode> = []

	constructor(rawNodes: Array<NodeObjRaw>) {
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

	addBranch(node: NavTreeNode, rawNodes: Array<NodeObjRaw>) {
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

export class NavParms {
	data: Array<Record<string, FieldValue>> = []
	cardinality: DataObjCardinality = DataObjCardinality.detail
	isInsertMode: boolean = false

	addItem(key: string, valData: any, valDisplay: any) {
		const row = this.data.length - 1
		this.data[row][key] = new FieldValue(valData, valDisplay)
	}
	addRow() {
		this.data.push({})
	}

	getValue(key: string, row: number = 0) {
		if (!this.data) return undefined
		return this.data[row][key]
	}

	hasProperty(key: string, row: number = 0) {
		if (!this.data) return false
		return this.data[row].hasOwnProperty(key)
	}
}

export class NavParmsDB extends NavParms {
	constructor(dataObj: DataObj | undefined, isInsertMode: boolean) {
		super()
		this.isInsertMode = isInsertMode
		if (dataObj?.data) {
			this.cardinality = dataObj.cardinality

			if (this.cardinality === DataObjCardinality.detail) {
				this.parseRow(dataObj.data)
			} else {
				dataObj.data.forEach((dataRow: any) => this.parseRow(dataRow))
			}
		}
		console.log('NavParmsDB.data:', this.data)
	}
	parseRow(data: any) {
		if (!data) return
		this.addRow()

		for (const key in data) {
			const value: any = data[key]
			let valDisplay: any
			let valData: any
			if (
				value &&
				Object.entries(value).length > 0 &&
				!Array.isArray(value) &&
				value.hasOwnProperty('data') &&
				value.hasOwnProperty('display')
			) {
				valData = value.data
				valDisplay = value.display
			} else {
				valData = value
				valDisplay = value
			}
			this.addItem(key, valData, valDisplay)
		}
	}
}

export class NavParmsObjDetail extends NavParms {
	constructor(objFields: Array<Field>) {
		super()
		this.cardinality = DataObjCardinality.detail
		this.addRow()
		objFields.forEach((f) => {
			if (f.element !== FieldElement.label) this.addItem(f.name, f.value?.data, f.value?.display)
		})
		console.log('NavParmsObjDetail.data:', this.data)
	}
}

export class NavParmsRestore extends NavParms {
	constructor(rawNavParms: any) {
		super()
		if (rawNavParms.hasOwnProperty('data')) {
			// restoring from navParms
			this.cardinality = rawNavParms.cardinality
			this.isInsertMode = rawNavParms.isInsertMode
			rawNavParms.data.forEach((dataRow: any) => this.parseRow(dataRow))
		} else {
			// restoring from object
			this.parseRow(rawNavParms)
		}
		console.log('NavParmsRestore.data:', this.data)
	}
	parseRow(dataRow: any) {
		if (!dataRow) return
		this.addRow()
		for (const key in dataRow) {
			if (dataRow[key].hasOwnProperty('data') && dataRow[key].hasOwnProperty('display')) {
				this.addItem(key, dataRow[key].data, dataRow[key].display)
			} else {
				this.addItem(key, dataRow[key], dataRow[key])
			}
		}
	}
}

export type NodeObjRaw = {
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
	dataObj: DataObj | undefined

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

export enum NodeObjType {
	header = 'header',
	object = 'object',
	page = 'page',
	program = 'program',
	root = 'root'
}
