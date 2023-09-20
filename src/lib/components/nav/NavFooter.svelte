<script lang="ts">
	import { nodeProcessLink } from '$comps/nav/navStore'
	import { NavNode, NavNodeType } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import { page } from '$app/stores'

	const FILENAME = '/$comps/NavFooter.svelte'

	const navColor = '#3b79e1'
	const itemColors = ['#f5f5f5', '#dedede']

	let nodesFooter: Array<NavNode> = []
	const nodesConfig = [
		['Home', 'home', '/apps'],
		['Contact Us', 'contact-us', '/apps/cm/contactUs'],
		['Account', 'profile', '/apps/account']
	]
	const UNSPECIFIED = ''
	nodesConfig.forEach((n: any) => {
		const header = n[0]
		const icon = n[1]
		const page = n[2]

		nodesFooter.push(
			new NavNode(
				header,
				undefined,
				NavNodeType.page,
				header,
				header,
				icon,
				page,
				UNSPECIFIED,
				UNSPECIFIED,
				{}
			)
		)
	})

	// styling
	const styleContainer = `
				display: flex; 
				flex-wrap: wrap; 
				gap: 5px;
				justify-content: space-around; 
			`
	const styleItem = `
				display: flex;
				align-items: top;		
				font-size: 10px;
				color: ${navColor};
				flex-direction: row;
				justify-content: center;
				gap: 2px;
				width: 80px;
				height: 40px;`
	const styleItemHover =
		styleItem +
		`
				background-color: ${itemColors[0]};`
	const styleItemActive =
		styleItem +
		`
				border-top: 1px solid ${navColor};`
	const marginTopheader = 'mt-1'

	function processNode(node: NavNode) {
		nodeProcessLink($page.url.pathname, node, true)
	}
</script>

<div id="container" style={styleContainer}>
	{#each nodesFooter as node, i}
		<div
			role="button"
			tabindex="0"
			style={node.page == $page.url.pathname ? styleItemActive : styleItem}
			on:click={() => processNode(node)}
			on:keyup={() => processNode(node)}
		>
			<div class="mt-2">
				<Icon name={node.icon} width="1.0rem" height="1.0rem" fill={navColor} />
			</div>
			<div class={marginTopheader}>
				{node.header}
			</div>
		</div>
	{/each}
</div>
