export class Nav {
	links: Array<NavLink>

	constructor() {
		this.links = []
	}
	addLink(id: string, name: string, label: string, link: string) {
		// this.filter.push({ name, dataType, val })
	}
}

export class NavNode {
	id: string
	name: string
	label: string
	link: string
	icon: string

	constructor(id: string, name: string, label: string, link: string, icon = '') {
		this.id = id
		this.name = name
		this.label = label
		this.link = link
		this.icon = icon
	}
}

export class NavLink {
	label: string
	link: string
	icon: string

	constructor(label: string, link: string, icon = '') {
		this.label = label
		this.link = link
		this.icon = icon
	}
}
