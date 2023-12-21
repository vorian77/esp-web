<script lang="ts">
	import type { NavState } from '$comps/types'
	import NavPageHome from '$comps/nav/NavPageHome.svelte'
	import NavPageApp from '$comps/nav/NavPageApp.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
</script>

<!-- <button class="btn variant-filled-secondary" on:click={newState}>Add</button> -->
<!-- <DataViewer header="token" data={token} /> -->

{#if stateGlobal}
	{#if stateGlobal.page === 'home'}
		<NavPageHome {stateAdd} {stateGlobal} />
	{:else if stateGlobal.page === 'app'}
		<NavPageApp {stateAdd} {stateGlobal} />
	{/if}
{/if}
