<script lang="ts">
	import { onMount } from 'svelte'
	import { AppBar, AppShell, Avatar, Drawer, getDrawerStore, popup } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, PopupSettings } from '@skeletonlabs/skeleton'
	import NavFooter from '$comps/nav/NavFooter.svelte'
	import NavTree from '$comps/nav/NavTree.svelte'
	import { NavMode, NavNode } from '$comps/types'
	import { navNodesTree, navNodesTraversal, initTree, selectNode } from '$comps/nav/navStore'
	import Icon from '$comps/Icon.svelte'
	import { goto } from '$app/navigation'

	export let user = {}
	export let routeId = '/'
	let navTree: NavTree

	const drawerStore = getDrawerStore()
	const rootLink = '/apps'
	const footerLinks = [rootLink, '/apps/cm/contactUs', '/apps/account']

	onMount(() => {
		// setBranchByDBNodes(user.edge_temp.resource_programs)
		// const nodes = $navNodesBranch
		// navTree.loadBranch(-1, $navNodesBranch)
	})

	$: onFooterLink = footerLinks.includes(routeId)

	const navColor = '#3b79e1'

	function onTreeNodeSelected(event: CustomEvent) {
		const node = event.detail
		alert(`nodeSelected: ${node.label}`)
	}

	function menuHamburger(): void {
		const settings: DrawerSettings = {
			id: 'navSide',
			position: 'left',
			width: 'w-[50%]'
		}
		drawerStore.open(settings)
	}
	function goBack() {
		history.back()
	}
	function goHome() {
		goto(rootLink)
	}
	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	}
	function userPopup(): void {}
</script>

<div class="card p-4" data-popup="popupClick">
	<a href="/logout">Logout</a>
</div>

<AppShell slotSidebarLeft="w-0 md:w-52">
	<svelte:fragment slot="header">
		<AppBar background="bg-neutral-200">
			<svelte:fragment slot="lead">
				<div
					role="button"
					tabindex="0"
					class="md:hidden mr-2"
					on:click={menuHamburger}
					on:keyup={menuHamburger}
				>
					<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill={navColor} />
				</div>

				<div>
					<div>
						{#if !onFooterLink}
							<div
								role="button"
								tabindex="0"
								class="back-arrow -ml-2"
								on:click={goBack}
								on:keyup={goBack}
							>
								<span style:cursor="pointer">
									<Icon
										name="arrow-left"
										marginRight="-7"
										width="1.5rem"
										height="1.5rem"
										fill={navColor}
									/>
									Back
								</span>
							</div>
						{:else}
							<div
								role="button"
								tabindex="0"
								class="text-black"
								on:click={goHome}
								on:keyup={goHome}
							>
								{user.app_name}
							</div>
						{/if}
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div
					role="button"
					tabindex="0"
					on:click={userPopup}
					on:keyup={userPopup}
					use:popup={popupClick}
				>
					<Avatar initials={user.initials} width="w-9" background="bg-primary-400" />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div class="p-2 bg-white">
			<NavTree bind:this={navTree} on:onNodeSelected={onTreeNodeSelected} />
		</div>
	</svelte:fragment>

	<div class="container mx-auto p-4">
		<slot name="body" />
		<pre>{JSON.stringify($navNodesTree, null, 2)}</pre>
	</div>

	<svelte:fragment slot="footer">
		<div style="border-top: 1px solid #f5f5f5;">
			<NavFooter />
		</div>
	</svelte:fragment>
</AppShell>

<style>
	.back-arrow {
		color: #3b79e1;
	}
</style>
