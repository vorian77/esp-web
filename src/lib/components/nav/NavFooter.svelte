<script lang="ts">
	import { nodeProcessLink } from '$comps/nav/navStore'
	import { NavTree, NavTreeNode } from '$comps/types'
	import type { rawNodeObj } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import { page } from '$app/stores'

	const FILENAME = '/$comps/NavFooter.svelte'

	const navColor = '#3b79e1'
	const itemColors = ['#f5f5f5', '#dedede']

	const nodesConfig = [
		['Home', 'home', '/home'],
		['Contact Us', 'contact-us', '/home/cm/contactUs'],
		['Account', 'profile', '/home/account']
	]
	let rawNodes: Array<rawNodeObj> = []
	nodesConfig.forEach((n: any) => {
		const header = n[0]
		const icon = n[1]
		const page = n[2]

		rawNodes.push({
			id: header,
			_codeType: 'page',
			name: header,
			header: header,
			_codeIcon: icon,
			page,
			dataObjId: null
		})
	})
	const navTree: NavTree = new NavTree(rawNodes)
	const nodesFooter = navTree.listTree

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

	function processNode(node: NavTreeNode) {
		nodeProcessLink($page.url.pathname, node, true)
	}
</script>

<div id="container" style={styleContainer}>
	{#each nodesFooter as node, i}
		<div
			role="button"
			tabindex="0"
			style={node.nodeObj.page == $page.url.pathname ? styleItemActive : styleItem}
			on:click={() => processNode(node)}
			on:keyup={() => processNode(node)}
		>
			<div class="mt-2">
				<Icon name={node.nodeObj.icon} width="1.0rem" height="1.0rem" fill={navColor} />
			</div>
			<div class={marginTopheader}>
				{node.nodeObj.header}
			</div>
		</div>
	{/each}
</div>
