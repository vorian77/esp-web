import { strOptional, strRequired, valueOrDefault } from '$utils/utils'
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
	component?: string
	obj_id?: string
	indent: number
	data: any
	expanded: boolean
	selected: boolean

	constructor(
		id: string,
		parent: NavNode | undefined,
		type: NavNodeType,
		name: string,
		header: string,
		icon: string,
		page: string,
		component: string,
		obj_id: string,
		data: {}
	) {
		const DEFAULT_ICON = 'hamburger-menu'
		this.id = valueOrDefault(strOptional(id, 'NavNode', 'id'), '')
		this.parent = parent ? parent : undefined
		this.type = strRequired(type, 'NavNode', 'type')
		this.name = strRequired(name, 'NavNode', 'name')
		this.header = strRequired(header, 'NavNode', 'header')
		this.icon = valueOrDefault(strOptional(icon, 'NavNode', 'icon'), DEFAULT_ICON)
		this.page = strRequired(page, 'NavNode', 'page')
		this.component = strOptional(component, 'NavNode', '')
		this.obj_id = strOptional(obj_id, 'NavNode', '')
		this.indent = parent ? parent.indent + 1 : 0
		this.data = valueOrDefault(data, {})
		this.expanded = false
		this.selected = false
	}
}

export enum NavMode {
	page = 'page',
	footer = 'footer',
	sidebar = 'sidebar',
	popup = 'popup'
}

export enum NavNodeSource {
	DB = 'DB',
	custom = 'custom'
}

export enum NavNodeType {
	form = 'form',
	header = 'header',
	page = 'page',
	program = 'program'
}
