<script lang="ts">
	import Home from '$comps/home/Home.svelte'
	import NavPage from '$comps/nav/NavPage.svelte'
	import { navNodeCurrent, navNodesCrumbs, navNodesBranch, navNodesTree } from '$comps/nav/navStore'

	export let data: any
	const user = data.user
</script>

<Home {user} />
<NavPage />

<div>
	navNodeCurrent: <pre>{JSON.stringify($navNodeCurrent, null, 2)}</pre>
</div>

navNodesCrumbs: {$navNodesCrumbs.length}
<pre>{JSON.stringify($navNodesCrumbs, null, 2)}</pre>

navNodesTree: {$navNodesTree.length}
<pre>{JSON.stringify($navNodesTree, null, 2)}</pre>

navNodesBranch {$navNodesBranch.length}
<pre>{JSON.stringify($navNodesBranch, null, 2)}</pre>
