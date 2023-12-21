<script lang="ts">
	import type { NavTree, Node } from '$comps/types'
	import { DataObjStatus } from '$comps/types'
	import { appObjStatusStore } from '$comps/nav/app'
	import Messenger from '$comps/Messenger.svelte'
	import { page } from '$app/stores'
	import Icon from '$comps/Icon.svelte'

	const NAV_COLOR = '#3b79e1'

	let navTreeLocal: NavTree
	let treeCrumbs: Node[]
	let messenger: Messenger

	$: {
		// navTreeLocal = Object.assign(new NavTree([]), $navTreeOld)
		// treeCrumbs = navTreeLocal.listCrumbs
	}
	$: appStatusLocal = Object.assign(new DataObjStatus(), $appObjStatusStore)

	async function onGoBack() {
		// messenger.askB4Transition(appStatusLocal, true, goBack)
	}

	function goBack() {
		// nodeProcessCrumb($page.url.pathname, treeCrumbs.length - 2)
	}
</script>

<Messenger bind:this={messenger} />

<!-- <div
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
</div> -->
