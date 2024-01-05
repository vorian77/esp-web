import { memberOfEnum, nbrRequired, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import type { DataObj } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.node.ts'

export type RawNode = {
	dataObjId: string | undefined
	header: string
	icon: string | undefined
	id: string
	indent: number | undefined
	name: string
	page: string | undefined
	type: string
}

export class Node {
	dataObjId?: string
	header: string
	id: string
	name?: string
	type: NodeType
	constructor(obj: any) {
		const clazz = 'Node'
		obj = valueOrDefault(obj, {})
		this.dataObjId = strOptional(obj.dataObjId, clazz, 'dataObjId')
		this.header = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
		this.name = strOptional(obj.name, clazz, 'name')
		this.type = memberOfEnum(obj.type, clazz, 'type', 'NodeType', NodeType)
	}
	static dbNodeToRaw(dbNode: any) {
		dbNode = valueOrDefault(dbNode, {})
		return {
			dataObjId: dbNode.dataObjId,
			header: dbNode.header,
			icon: dbNode._codeIcon,
			id: dbNode.id,
			name: dbNode.name,
			page: dbNode.page,
			type: dbNode._codeType
		}
	}
}
export class NodeApp {
	dataObjId: string
	label: string
	id: string
	private constructor(clazz: string, obj: any) {
		obj = valueOrDefault(obj, {})
		this.dataObjId = strRequired(obj.dataObjId, clazz, 'dataObjId')
		this.label = strRequired(obj.header, clazz, 'header')
		this.id = strRequired(obj.id, clazz, 'id')
	}
	static initDb(dbNode: any) {
		return new NodeApp('NodeApp-Db', Node.dbNodeToRaw(dbNode))
	}
	static initTree(node: NodeNav) {
		return new NodeApp('NodeApp-Tree', node)
	}
}
export class NodeNav extends Node {
	icon: string
	indent: number
	isCrumb: boolean = false
	isCurrent: boolean = false
	isOpen: boolean = false
	isRetrieved: boolean = false
	page?: string
	parentId: string
	private constructor(obj: any) {
		const clazz = 'NodeNav'
		const DEFAULT_ICON = 'hamburger-menu'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.icon = valueOrDefault(strOptional(obj.icon, clazz, 'icon'), DEFAULT_ICON)
		this.indent = nbrRequired(obj.indent, clazz + '-indent')
		this.page = strOptional(obj.page, clazz, 'page')
		this.parentId = strRequired(obj.parentId, clazz, 'parentId')
	}
	static initBranch(dbNode: any, parentId: string, indent: number) {
		return new NodeNav({ ...Node.dbNodeToRaw(dbNode), parentId, indent })
	}
	static initRoot() {
		return new NodeNav({
			header: 'root',
			id: '+ROOT+',
			indent: -1,
			name: 'root',
			parentId: 'root',
			type: NodeType.treeRoot
		})
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
