import { strOptional, strRequired, valueOrDefault } from '$utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = '/lib/components/nav/types.nav.ts'

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
	expanded: boolean
	selected: boolean

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
		this.obj_id = strOptional(obj_id, 'NavNode', '')
		this.obj_link = this.getLink(obj_link)
		this.expanded = false
		this.selected = false
	}
	getLink(link: string) {
		const ROOT_LINK = '/apps'
		switch (this.type) {
			case NavNodeType.form:
				link = '/apps/form'
				break

			case NavNodeType.header:
				link = ROOT_LINK
				break

			case NavNodeType.page:
				link = valueOrDefault(link, '')
				break

			case NavNodeType.program:
				link = ROOT_LINK
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'getLink',
					message: `No case defined for node type: ${this.type}.`
				})
		}
		return link
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
