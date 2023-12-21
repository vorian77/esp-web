import { memberOfEnum, strOptional, strRequired, valueOrDefault } from '$utils/utils'
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
	header: string
	id: string
	name: string
	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.header = strRequired(obj.header, 'Node', 'header')
		this.id = strRequired(obj.id, 'Node', 'id')
		this.name = strRequired(obj.name, 'Node', 'name')
	}
	static dbNodeToRaw(
		dbNode: any,
		parentId: string | undefined = undefined,
		indent: number | undefined = undefined
	) {
		return {
			dataObjId: dbNode.dataObjId,
			header: dbNode.header,
			icon: dbNode._codeIcon,
			id: dbNode.id,
			indent,
			name: dbNode.name,
			page: dbNode.page,
			parentId,
			type: dbNode._codeType
		}
	}
	static dbNodeParseApp(dbNode: any) {
		const rawNode = this.dbNodeToRaw(dbNode)
		if (NodeType[rawNode.type as keyof typeof NodeType] === NodeType.app) {
			return new NodeApp(rawNode)
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'dbNodeParseApp',
				message: `No case defined for AppNodeTreeType: ${rawNode.type}`
			})
		}
	}
	static dbNodeParseNav(dbNode: any, parentId: string, indent: number | undefined = undefined) {
		const rawNode = this.dbNodeToRaw(dbNode, parentId, indent)
		switch (NodeType[rawNode.type as keyof typeof NodeType]) {
			case NodeType.navHeader:
			case NodeType.navProgram:
				return new NodeNav(rawNode)

			case NodeType.navObject:
				return new NodeNavObject(rawNode)

			case NodeType.navPage:
				return new NodeNavPage(rawNode)

			default:
				throw error(500, {
					file: FILENAME,
					function: 'dbNodeParseNav',
					message: `No case defined for AppNodeTreeType: ${rawNode.type}`
				})
		}
	}
}

export class NodeApp extends Node {
	dataObj: DataObj | undefined
	dataObjId: string
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dataObjId = strRequired(obj.dataObjId, 'NodeApp', 'dataObjId')
	}
}
export class NodeNav extends Node {
	icon: string
	indent: number
	isCrumb: boolean = false
	isCurrent: boolean = false
	isOpen: boolean = false
	isRetrieved: boolean = false
	isRoot: boolean
	parentId: string | undefined = undefined
	type: NodeType
	constructor(obj: any) {
		const DEFAULT_ICON = 'hamburger-menu'
		super(obj)
		obj = valueOrDefault(obj, {})
		this.icon = valueOrDefault(strOptional(obj.icon, 'NodeNav', 'icon'), DEFAULT_ICON)
		this.isRoot = obj.hasOwnProperty('isRoot') ? obj.isRoot : false
		this.indent = obj.indent
		this.parentId = obj.parentId
		this.type = memberOfEnum(obj.type, 'NodeNav', 'type', 'NodeObjType', NodeType)
	}
}
export class NodeNavObject extends NodeNav {
	dataObjId: string
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.dataObjId = strRequired(obj.dataObjId, 'NodeNavObject', 'dataObjId')
	}
}
export class NodeNavPage extends NodeNav {
	page: string
	constructor(obj: any) {
		super(obj)
		obj = valueOrDefault(obj, {})
		this.page = strRequired(obj.page, 'NodeNavPage', 'page')
	}
}

export enum NodeType {
	app = 'app',
	navHeader = 'navHeader',
	navObject = 'navObject',
	navPage = 'navPage',
	navProgram = 'navProgram',
	navTreeRoot = 'navTreeRoot'
}
