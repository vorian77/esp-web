<script lang="ts">
	import Icon from '$comps/Icon.svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	const FILENAME = '/$comps/NavFooter.svelte'

	const navColor = '#3b79e1'
	const itemColors = ['#f5f5f5', '#dedede']

	const nodesFooter = [
		['Home', 'home', '/apps'],
		['Contact Us', 'contact-us', '/apps/cm/contactUs'],
		['Account', 'profile', '/apps/account']
	]

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
	const marginTopLabel = 'mt-1'

	async function navigate(link: string) {
		goto(link)
	}
</script>

<div id="container" style={styleContainer}>
	{#each nodesFooter as node, i}
		<div
			style={node[2] == $page.url.pathname ? styleItemActive : styleItem}
			on:click={() => navigate(node[2])}
			on:keyup={() => navigate(node[2])}
		>
			<div class="mt-2">
				<Icon name={node[1]} width="1.0rem" height="1.0rem" fill={navColor} />
			</div>
			<div class={marginTopLabel}>
				{node[0]}
			</div>
		</div>
	{/each}
</div>
