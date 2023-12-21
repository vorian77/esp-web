<script lang="ts">
	import { AppLevelCrumb, NavState, NavStateComponent, NavStateTokenAppCrumbs } from '$comps/types'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$comps/nav/NavCrumbs.svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined
	export let crumbsList: Array<AppLevelCrumb> = []

	async function onClick(crumbIdx: number) {
		stateAdd(
			new NavState({
				component: NavStateComponent.crumbs,
				token: new NavStateTokenAppCrumbs(crumbIdx)
			})
		)
	}
</script>

<ol class="breadcrumb">
	{#each crumbsList as item, i}
		{@const label = item.label}
		{#if i < crumbsList.length - 1}
			<li class="crumb">
				<button
					class="anchor"
					role="link"
					tabindex="0"
					on:click={() => onClick(i)}
					on:keyup={() => onClick(i)}
				>
					{label}
				</button>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		{:else}
			<li class="crumb">{label}</li>
		{/if}
	{/each}
</ol>
