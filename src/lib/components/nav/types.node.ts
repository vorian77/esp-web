import { memberOfEnum, strRequired, valueOrDefault } from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.node.ts'

const DEFAULT_ICON = 'hamburger-menu'

export type DbNode = {
	_codeIcon?: string
	_codeType: string
	dataObjId?: string
	header: string
	id: string
	name: string
	order: number
	page?: string
}

export class RawNode {
	dataObjId?: string
	header: string
	icon: string
	id: string
	name: string
	page: string
	type: string
	constructor(dbNode: DbNode) {
		const clazz = 'RawNode'
		this.dataObjId = dbNode.dataObjId
		this.header = dbNode.header
		this.icon = valueOrDefault(dbNode._codeIcon, DEFAULT_ICON)
		this.id = dbNode.id
		this.name = dbNode.name
		this.page = valueOrDefault(dbNode.page, '/home')
		this.type = dbNode._codeType
	}
}

export class Node {
	dataObjId?: string
	header: string
	icon: string
	id: string
	name: string
	page: string
	type: NodeType
	constructor(rawNode: RawNode) {
		const clazz = 'Node'
		this.dataObjId = rawNode.dataObjId
		this.header = rawNode.header
		this.icon = rawNode.icon
		this.id = rawNode.id
		this.name = rawNode.name
		this.page = rawNode.page
		this.type = memberOfEnum(rawNode.type, clazz, 'type', 'NodeType', NodeType)
	}
}
export class NodeApp {
	dataObjId: string
	label: string
	id: string
	constructor(obj: any) {
		const clazz = 'NodeApp'
		obj = valueOrDefault(obj, {})
		this.dataObjId = strRequired(obj.dataObjId, clazz, 'dataObjId')
		this.label = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
	}
}
export class NodeNav extends Node {
	indent: number
	isCrumb: boolean = false
	isCurrent: boolean = false
	isOpen: boolean = false
	isRetrieved: boolean = false
	parentId: string
	constructor(dbNode: DbNode, parentId: string, indent: number) {
		super(new RawNode(dbNode))
		this.indent = indent
		this.parentId = parentId
	}
}
export enum NodeType {
	header = 'header',
	home = 'home',
	object = 'object',
	page = 'page',
	program = 'program',
	programObject = 'programObject',
	treeRoot = 'treeRoot'
}
