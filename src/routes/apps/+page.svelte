<script lang="ts">
	import { navInitReset, navInit, navNodeCurrent, navUser } from '$comps/nav/navStore'
	import type { NavNode } from '$comps/types'
	import type { Snapshot } from './$types'
	import NodeHome from '$comps/home/NodeHome.svelte'
	import NodeFormList from '$comps/nav/NodeFormList.svelte'
	import NodeFormDetail from '$comps/nav/NodeFormDetail.svelte'
	import FormList from '$comps/form/FormList.svelte'

	const DEFAULT_COMPONENT = 'Home'

	const comps = {
		Home: NodeHome,
		FormList: NodeFormList,
		FormDetail: NodeFormDetail
	}

	let node: NavNode
	let compName = ''
	let compCurrent

	export const snapshot: Snapshot<string> = {
		capture: () => '',
		restore: () => {
			navInitReset()
			navInit($navUser)
		}
	}

	$: {
		node = $navNodeCurrent
		compName = node.obj?.component || DEFAULT_COMPONENT
		compCurrent = comps[compName]
	}
</script>

<!-- <div>node: {node.name}</div>
<div>node.obj.component: {node.obj?.component}</div> -->
<!-- <div>component: {compName}</div> -->
<svelte:component this={compCurrent} {node} />

<!-- nodeCurrent:
<pre>{JSON.stringify(node, null, 2)}</pre> -->
