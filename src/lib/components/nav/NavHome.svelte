<script lang="ts">
	import { navNodesBranch, nodeProcessTree } from '$comps/nav/navStore'
	import Icon from '$comps/Icon.svelte'
	import { page } from '$app/stores'

	const FILENAME = '/$comps/nav/NavHome.svelte'

	const NAV_COLOR = '#3b79e1'
	const ITEM_COLORS = ['#f5f5f5', '#dedede']

	// styling
	const styleContainer = `
				display: flex; 
				flex-wrap: wrap; 
				gap: 5px;
				justify-content: space-between; 
			`
	const styleItem = `
				display: flex;
				align-items: center;		
				font-size: 10px;
				color: ${NAV_COLOR};
				flex-direction: column;
				justify-content: center;
				gap: 0px;
				background-color: whitesmoke;
				border-radius: 5px;
				width: 85px;
				height: 55px;`
	const styleItemHover =
		styleItem +
		`
			background-color: ${ITEM_COLORS[1]};`
	const styleItemActive =
		styleItem +
		`
				background-color: ${ITEM_COLORS[1]};`
	const marginTopheader = '-mt-1'

	function processNode(node: NavNode) {
		nodeProcessTree($page.url.pathname, node)
	}
</script>

<div id="container" style={styleContainer}>
	{#each $navNodesBranch as node, i}
		<div
			role="button"
			tabindex="0"
			style={node.link == $page.url.pathname ? styleItemActive : styleItem}
			on:click={() => processNode(node)}
			on:keyup={() => processNode(node)}
		>
			<div class="mt-2">
				<Icon name={node.icon} width="1.0rem" height="1.0rem" fill={NAV_COLOR} />
			</div>
			<div class={marginTopheader}>
				{node.header}
			</div>
		</div>
	{/each}
</div>
