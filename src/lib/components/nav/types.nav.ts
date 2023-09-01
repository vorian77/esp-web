import { getArray, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class NavNode {
	type: NavNodeType
	parent: NavNode | undefined
	indent: number
	id: string
	name: string
	label: string
	icon: string
	obj_id?: string
	obj_link?: string
	selected: boolean
	expanded: boolean

	constructor(
		type: NavNodeType,
		parent: NavNode | undefined,
		id: string,
		name: string,
		label: string,
		icon: string,
		obj_id: string,
		obj_link: string
	) {
		const DEFAULT_ICON = 'hamburger-menu'
		this.type = strRequired(type, 'NavNode', 'type')
		this.parent = parent ? parent : undefined
		this.indent = parent ? parent.indent + 1 : 0
		this.id = valueOrDefault(strOptional(id, 'NavNode', 'id'), '')
		this.name = strRequired(name, 'NavNode', 'name')
		this.label = strRequired(label, 'NavNode', 'label')
		this.icon = valueOrDefault(strOptional(icon, 'NavNode', 'icon'), DEFAULT_ICON)
		this.obj_id = strOptional(obj_id, 'NavNode', 'obj_id')
		this.obj_link = strOptional(obj_link, 'NavNode', 'obj_link')
		this.selected = false
		this.expanded = false
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
