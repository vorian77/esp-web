<script lang="ts">
	import { navReset, navInit, navNodeCurrent, navUser } from '$comps/nav/navStore'
	import type { Snapshot } from './$types'
	import Home from '$comps/home/Home.svelte'
	import EdgeFormList from '$comps/form/EdgeFormList.svelte'

	const DEFAULT_COMPONENT = 'home'

	const components = {
		home: Home,
		'form-list': EdgeFormList
	}

	let node = {}
	let currentComponent = ''

	export const snapshot: Snapshot<string> = {
		capture: () => '',
		restore: () => {
			navReset()
			navInit($navUser)
		}
	}

	$: {
		node = $navNodeCurrent
		currentComponent = node.component || DEFAULT_COMPONENT
	}
</script>

<svelte:component this={components[currentComponent]} user={$navUser} {node} />
