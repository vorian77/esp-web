<script lang="ts">
	import { navNodesBranch, selectNode } from '$comps/nav/navStore'
	import { NavNode, NavNodeType } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { asUpsert, asGet } from '$lib/utils/utils'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/nav/NavPage.svelte'

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
	const marginTopLabel = '-mt-1'

	async function navigate(node: NavNode) {
		switch (node.type) {
			case NavNodeType.form:
				asUpsert('formId', node.obj_id)
				goto('/apps/form')
				break

			case NavNodeType.header:
				alert(`header: ${node.label}`)
				break

			case NavNodeType.page:
				goto(node.obj_link)
				break

			case NavNodeType.program:
				selectNode(node)
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'navigate',
					message: `No case defined for node type: ${node.type}.`
				})
		}
	}
</script>

<div id="container" style={styleContainer}>
	{#each $navNodesBranch as node, i}
		<div
			role="button"
			tabindex="0"
			style={node.link == $page.url.pathname ? styleItemActive : styleItem}
			on:click={() => navigate(node)}
			on:keyup={() => navigate(node)}
		>
			<div class="mt-2">
				<Icon name={node.icon} width="1.0rem" height="1.0rem" fill={NAV_COLOR} />
			</div>
			<div class={marginTopLabel}>
				{node.label}
			</div>
		</div>
	{/each}
</div>
