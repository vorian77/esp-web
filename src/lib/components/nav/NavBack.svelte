<script lang="ts">
	import { DataObjStatus, NavTree, type NavTreeNode } from '$comps/types'
	import { navStatus, navTree, nodeProcessCrumb } from '$comps/nav/navStore'
	import Messenger from '$comps/Messenger.svelte'
	import { page } from '$app/stores'
	import Icon from '$comps/Icon.svelte'

	const NAV_COLOR = '#3b79e1'

	let navTreeLocal: NavTree
	let treeCrumbs: NavTreeNode[]
	let messenger: Messenger

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		treeCrumbs = navTreeLocal.listCrumbs
	}
	$: dataObjStatusLocal = Object.assign(new DataObjStatus(), $navStatus)

	async function onGoBack() {
		messenger.askB4Transition(dataObjStatusLocal, true, goBack)
	}

	function goBack() {
		nodeProcessCrumb($page.url.pathname, treeCrumbs.length - 2)
	}
</script>

<Messenger bind:this={messenger} />

<div
	role="button"
	tabindex="0"
	class:hidden={treeCrumbs.length < 2}
	class="flex mr-2"
	on:click={onGoBack}
	on:keyup={onGoBack}
>
	<span style:cursor="pointer">
		<Icon class="mt-0.5" name="arrow-left" width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
	</span>
</div>
