<script lang="ts">
	import { Nav, NavNode, NavMode, NavNodeSource, NaveNodeType } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import { page } from '$app/stores'
	import { drawerStore } from '@skeletonlabs/skeleton'
	import { goto } from '$app/navigation'
	import type { FormSourceResponseType } from '$comps/types'
	import { error } from '@sveltejs/kit'

	const FILENAME = '/$comps/Navigation.svelte'

	const navColor = '#3b79e1'
	const itemColors = ['#f5f5f5', '#dedede']

	export let mode: NavMode
	export let nodes = []

	// styling
	let nav: any
	let styleContainer = ''
	let styleItem = ''
	let styleItemHover = ''
	let styleItemActive = ''
	let marginTopLabel = ''

	switch (mode) {
		case NavMode.footer:
			nav = new Nav(NavNodeSource.custom, nodes)
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
			styleItemHover +=
				styleItem +
				`
				background-color: ${itemColors[0]};`
			styleItemActive +=
				styleItem +
				`
				border-top: 1px solid ${navColor};`
			marginTopLabel = 'mt-1'
			break

		case NavMode.page:
			nav = new Nav(NavNodeSource.DB, nodes)

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
				width: 85px;
				height: 55px;`
			styleItemHover +=
				styleItem +
				`
			background-color: ${itemColors[1]};`
			styleItemActive +=
				styleItem +
				`
				background-color: ${itemColors[1]};`
			marginTopLabel += '-mt-1'
			break

		case NavMode.popup:
			break

		case NavMode.sidebar:
			nav = new Nav(NavNodeSource.custom, nodes)
			styleItem += `
				display: flex;
				align-items: center;		
				font-size: 15px;
				color: ${navColor};
				flex-direction: row;
				gap: 5px;
				height: 30px;`
			break
	}
	async function navigate(node: NavNode) {
		switch (node.type) {
			case NaveNodeType.form:
				alert(`form: ${node.label}`)
				goto(node.obj_link)

				break

			case NaveNodeType.header:
				alert(`header: ${node.label}`)
				break

			case NaveNodeType.page:
				if ((mode = 'sidebar')) {
					drawerStore.close()
				}
				goto(node.obj_link)
				break

			case NaveNodeType.program:
				const responsePromise = await fetch('/api/dbEdge', {
					method: 'POST',
					body: JSON.stringify({ action: 'getNodesOfProgram', programId: node.id })
				})
				const response: FormSourceResponseType = await responsePromise.json()
				console.log('newNodes:', response.data)
				nav = new Nav(NavNodeSource.DB, response.data)
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
	{#each nav.nodes as node, i}
		<div
			style={node.link == $page.url.pathname ? styleItemActive : styleItem}
			on:click={() => navigate(node)}
			on:keyup={() => navigate(node)}
		>
			<div class="mt-2">
				<Icon name={node.icon} width="1.0rem" height="1.0rem" fill={navColor} />
			</div>
			<div class={marginTopLabel}>
				{node.label}
			</div>
		</div>
	{/each}
</div>
