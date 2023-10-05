import { memberOfEnum, strOptional, strRequired, valueOrDefault } from '$utils/utils'
import type { DataActionType } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.nav.ts'

export class NavNode {
	id: string
	parent: NavNode | undefined
	type: NavNodeType
	name: string
	header: string
	icon: string
	page: string
	objId: string
	indent: number
	isExpanded: boolean
	isSelected: boolean
	obj: NavNodeObj | undefined
	data: any

	constructor(
		id: string,
		parent: NavNode | undefined,
		type: NavNodeType,
		name: string,
		header: string,
		icon: string,
		page: string,
		objId: string
	) {
		const DEFAULT_ICON = 'hamburger-menu'
		this.id = valueOrDefault(strOptional(id, 'NavNode', 'id'), '')
		this.parent = parent ? parent : undefined
		this.type = memberOfEnum(type, 'NavNode', 'type', 'NavNodeType', NavNodeType)
		this.name = strRequired(name, 'NavNode', 'name')
		this.header = strRequired(header, 'NavNode', 'header')
		this.icon = valueOrDefault(strOptional(icon, 'NavNode', 'icon'), DEFAULT_ICON)
		this.page = strRequired(page, 'NavNode', 'page')
		this.objId = valueOrDefault(objId, '')
		this.indent = parent ? parent.indent + 1 : 0
		this.data = {}
		this.isExpanded = false
		this.isSelected = false
	}
}

export class NavNodeObj {
	cardinality: NavNodeObjCardinality
	component: NavNodeObjComponent
	currentRowIdx: number | undefined
	data: any
	defn: any
	hasMgmt: boolean
	saveMode: DataActionType | undefined

	constructor(defnRaw: any) {
		this.cardinality = memberOfEnum(
			defnRaw['_codeCardinality'],
			'NavNodeObj',
			'cardinality',
			'NavNodeObjCardinality',
			NavNodeObjCardinality
		)
		this.component = memberOfEnum(
			defnRaw['_codeComponent'],
			'NavNodeObj',
			'component',
			'NavNodeObjComponent',
			NavNodeObjComponent
		)
		this.hasMgmt = defnRaw.hasMgmt
		this.defn = defnRaw
	}
}

export enum NavDataProcessType {
	delete = 'delete',
	insert = 'insert',
	save = 'save',
	select = 'select'
}
export enum NavNodeObjCardinality {
	list = 'list',
	detail = 'detail'
}
export enum NavNodeObjComponent {
	Home = 'Home',
	FormList = 'FormList',
	FormDetail = 'FormDetail'
}
export enum NavNodeType {
	header = 'header',
	object = 'object',
	page = 'page',
	program = 'program'
}
