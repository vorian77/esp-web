<script lang="ts">
	import { NavLink, UserType } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import { page } from '$app/stores'
	import { error } from '@sveltejs/kit'
	import { drawerStore } from '@skeletonlabs/skeleton'

	export let mode: 'page' | 'footer' | 'sidebar' | 'popup'
	export let user = {}

	const FILENAME = '/$comps/Navigation.svelte'
	const navColor = '#3b79e1'
	const itemColors = ['#f5f5f5', '#dedede']

	// links
	let links: Array<NavLink> = []
	const linksStudentRegPending = [new NavLink('Application', '/apps/cm/application', 'application')]
	const linksStudentRegSubmitted = [
		new NavLink('Application', '/apps/cm/application', 'application'),

		new NavLink('Goals', '/apps/cm/goals', 'goals'),
		new NavLink('Messages', '/apps/cm/messages', 'message'),
		new NavLink('Activities', '/apps/cm/activities', 'activities'),
		new NavLink('Quotes', '/apps/cm/quotes', 'quote-enclosed')
	]
	const linksStaff = [new NavLink('Messages', '/apps/cm/messages', 'message')]
	const linksAdmin = [new NavLink('Admin', '/admin', 'admin'), new NavLink('CM', '/apps/cm')]
	const linksFooter = [
		new NavLink('Home', user.root, 'home'),
		new NavLink('Contact Us', '/apps/cm/contactUs', 'contact-us'),
		new NavLink('Account', '/apps/account', 'profile')
	]
	const linksPopup = [new NavLink('Logout', '/logout', 'logout')]

	let styleContainer = ''
	let styleItem = ''
	let styleItemHover = ''
	let styleItemActive = ''
	let marginTopLabel = ''

	switch (mode) {
		case 'page':
			// links
			user.user_types.forEach((ut: string) => {
				if (ut === UserType.student) {
					links = addLinks(links, linksStudentRegPending)
					links = addLinks(links, linksStudentRegSubmitted)
					// user.status == 'Pending'
					// 	? (links = addLinks(links, linksStudentRegPending))
					// 	: (links = addLinks(links, linksStudentRegSubmitted))
				} else if (ut == UserType.staff) {
					links = addLinks(links, linksStaff)
				} else if (ut === UserType.admin) {
					links = addLinks(links, [
						...linksStudentRegPending,
						...linksStudentRegSubmitted,
						...linksStaff,
						...linksAdmin
					])
				} else {
					throw error(500, {
						file: FILENAME,
						function: 'constructor',
						message: `No case defined for user_type: ${ut}.`
					})
				}
			})

			// styling
			styleContainer += `
				display: flex; 
				flex-wrap: wrap; 
				gap: 5px;
				justify-content: space-between; 
			`
			styleItem += `
				display: flex;
				align-items: center;		
				font-size: 10px;
				color: ${navColor};
				flex-direction: column;
				justify-content: center;
				gap: 0px;
				background-color: whitesmoke;
				border-radius: 5px;
				width: 65px;
				height: 45px;`
			styleItemHover =
				styleItem +
				`
			background-color: ${itemColors[1]};`
			styleItemActive =
				styleItem +
				`
				background-color: ${itemColors[1]};`
			marginTopLabel = '-mt-3'
			break

		case 'footer':
			// links
			links = linksFooter

			// styling
			styleContainer += `
				display: flex; 
				flex-wrap: wrap; 
				gap: 5px;
				justify-content: space-around; 
			`
			styleItem += `
				display: flex;
				align-items: top;		
				font-size: 10px;
				color: ${navColor};
				flex-direction: row;
				justify-content: center;
				gap: 2px;
				width: 80px;
				height: 40px;`
			styleItemHover =
				styleItem +
				`
				background-color: ${itemColors[0]};`
			styleItemActive =
				styleItem +
				`
				border-top: 1px solid ${navColor};`
			marginTopLabel = 'mt-1'
			break

		case 'popup':
		case 'sidebar':
			links = linksPopup
			styleItem += `
				display: flex;
				align-items: center;		
				font-size: 15px;
				color: ${navColor};
				flex-direction: row;
				gap: 5px;
				height: 30px;`
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'constructor',
				message: `No case defined for navigation mode: ${mode}.`
			})
	}

	function addLinks(linksList: Array<NavLink>, newLinks: Array<NavLink>): Array<NavLink> {
		newLinks.forEach((newLink) => {
			const idx = linksList.findIndex((link) => link.link == newLink.link)
			if (idx < 0) {
				linksList.push(newLink)
			}
		})
		return linksList
	}
	function drawerClose() {
		if (mode === 'sidebar') {
			drawerStore.close()
		}
	}
</script>

<div id="container" style={styleContainer}>
	{#each links as link, i}
		{@const icon = link.icon ? link.icon : 'hamburger-menu'}
		<a id="link-{i}" href={link.link} on:click={drawerClose}>
			<div style={link.link == $page.url.pathname ? styleItemActive : styleItem}>
				<div class="mt-2">
					<Icon name={icon} width="1.0rem" height="1.0rem" fill={navColor} />
				</div>
				<div class={marginTopLabel}>
					{link.label}
				</div>
			</div>
		</a>
	{/each}
</div>
