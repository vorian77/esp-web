<script lang="ts">
	import { NavTree, type NavTreeNode } from '$comps/types'
	import { navTree } from '$comps/nav/navStore'
	import { nodeProcessCrumb } from '$comps/nav/navStore'
	import { page } from '$app/stores'
	import Icon from '$comps/Icon.svelte'

	const NAV_COLOR = '#3b79e1'

	let navTreeLocal: NavTree
	let treeCrumbs: NavTreeNode[]

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		treeCrumbs = navTreeLocal.listCrumbs
	}

	function goBack() {
		nodeProcessCrumb($page.url.pathname, treeCrumbs.length - 2)
	}
</script>

<div
	role="button"
	tabindex="0"
	class:hidden={treeCrumbs.length < 2}
	class="flex mr-2"
	on:click={goBack}
	on:keyup={goBack}
>
	<span style:cursor="pointer">
		<Icon class="mt-0.5" name="arrow-left" width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
	</span>
</div>
