<script>
	import TabsItem from './TabsItem.svelte'
	export let tabList = []
	export let currentTab = ''

	let tabs = tabList.map((tab) => ({
		...tab,
		selected: tab.id == currentTab
	}))

	function toggle(selectedId) {
		function getObj(tab) {
			if (selectedId == tab.id) {
				currentTab = selectedId
				return {
					...tab,
					selected: true
				}
			} else {
				return {
					...tab,
					selected: false
				}
			}
		}
		tabs = tabs.map((tab) => getObj(tab))
	}
</script>

<div>
	<nav aria-header="Tabs">
		{#each tabs as tab, i (tab.id)}
			<TabsItem header={tab.header} selected={tab.selected} on:click={toggle(tab.id)} />
		{/each}
	</nav>
</div>

<style>
	nav {
		display: flex;
		justify-content: center;
	}
</style>
