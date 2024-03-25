<script lang="ts">
	import { State, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { TokenAppTreeNode, TokenAppTreeReset } from '$comps/types.token'
	import { appStoreUser, Node, NodeType, RawNode, User } from '$comps/types'
	import Icon from '$comps/Icon.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/NavFooter.svelte'

	export let state: State

	let footer: Array<Node> = []
	let loaded = false
	let currNodeName = ''

	$: if (!loaded && $appStoreUser) {
		const user = Object.keys($appStoreUser).length > 0 ? new User($appStoreUser) : undefined
		if (user) {
			user.resource_footer.forEach((n: any) => {
				footer.push(new Node(new RawNode(n)))
			})
			currNodeName = footer.length > 0 ? footer[0].name : ''
			loaded = true
		}
	}

	const navColor = '#3b79e1'
	const itemColors = ['#f5f5f5', '#dedede']

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

	function onChange(node: Node) {
		currNodeName = node.name!
		let packet: StatePacket | undefined

		switch (node.type) {
			case NodeType.home:
				packet = new StatePacket({
					component: StatePacketComponent.navReset,
					token: new TokenAppTreeReset()
				})
				break

			case NodeType.object:
			case NodeType.programObject:
				packet = new StatePacket({
					component: StatePacketComponent.appTree,
					token: new TokenAppTreeNode(node)
				})
				break

			default:
				packet = undefined
		}
		state.update({
			page: node.page ? node.page : '/home',
			nodeType: node.type,
			packet
		})
	}
</script>

<div style={styleContainer}>
	{#each footer as node}
		<div
			role="button"
			tabindex="0"
			style={currNodeName === node.name && state?.nodeType === node.type
				? styleItemActive
				: styleItem}
			on:click={() => onChange(node)}
			on:keyup={() => onChange(node)}
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

<!-- <DataViewer header="footer" data={footer} /> -->
