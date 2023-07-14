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
