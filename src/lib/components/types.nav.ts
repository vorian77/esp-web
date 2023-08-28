import { getArray, strOptional, strRequired, valueOrDefault } from '$utils/utils'

export class Nav {
	nodes: Array<NavNode> = []
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
		type: string,
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

export class NavDB extends Nav {
	constructor(nodes: any) {
		super()
		nodes = getArray(nodes)
		nodes.forEach((n) => {
			this.nodes.push(new NavNode(n.type, n.id, n.name, n.label, n.icon, n.obj_id, n.obj_link))
		})
	}
}

export class NavPage extends Nav {
	constructor(nodes: any) {
		super()
		nodes = getArray(nodes)
		const NODE_TYPE = 'page'
		nodes.forEach((n) => {
			this.nodes.push(new NavNode(NODE_TYPE, '', '', n[0], n[1], '', n[2]))
		})
	}
}
