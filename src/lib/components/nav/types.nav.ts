import { getArray, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class Nav {
	nodes: Array<NavNode> = []

	constructor(type: NavNodeSource, nodes: any) {
		switch (type) {
			case NavNodeSource.DB:
				nodes = getArray(nodes)
				nodes.forEach((n) => {
					this.nodes.push(new NavNode(n.type, n.id, n.name, n.label, n.icon, n.obj_id, n.obj_link))
				})
				break

			case NavNodeSource.custom:
				nodes = getArray(nodes)
				const NODE_TYPE = 'page'
				nodes.forEach((n) => {
					this.nodes.push(new NavNode(NODE_TYPE, '', '', n[0], n[1], '', n[2]))
				})
				break
		}
	}
}

export class NavNode {
	type: 'form' | 'header' | 'page' | 'program'
	id?: string
	name?: string
	label: string
	icon: string
	obj_id?: string
	obj_link?: string

	constructor(
		type: NaveNodeType,
		id: string,
		name: string,
		label: string,
		icon: string,
		obj_id: string,
		obj_link: string
	) {
		const DEFAULT_ICON = 'hamburger-menu'
		this.type = strRequired(type, 'NavNode', 'type')
		this.id = valueOrDefault(strOptional(id, 'NavNode', 'id'), '')
		this.name = strOptional(name, 'NavNode', 'name')
		this.label = strRequired(label, 'NavNode', 'label')
		this.icon = valueOrDefault(strOptional(icon, 'NavNode', 'icon'), DEFAULT_ICON)
		this.obj_id = strOptional(obj_id, 'NavNode', 'obj_id')
		this.obj_link = strOptional(obj_link, 'NavNode', 'obj_link')
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

export enum NaveNodeType {
	form = 'form',
	header = 'header',
	page = 'page',
	program = 'program'
}
