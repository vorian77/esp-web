<script lang="ts">
	import { onMount } from 'svelte'
	import { AppBar, AppShell, Avatar, Drawer, getDrawerStore, popup } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, PopupSettings } from '@skeletonlabs/skeleton'
	import Home from '$comps/home/Home.svelte'
	import NavFooter from '$comps/nav/NavFooter.svelte'
	import NavTree from '$comps/nav/NavTree.svelte'
	import { NavMode, NavNode } from '$comps/types'
	import {
		navNodesTree,
		navNodesTraversal,
		navNodeSelected,
		initTree,
		selectNode
	} from '$comps/nav/navStore'
	import NavPage from '$comps/nav/NavPage.svelte'

	import Icon from '$comps/Icon.svelte'
	import { goto } from '$app/navigation'

	const drawerStore = getDrawerStore()

	const NAV_COLOR = '#3b79e1'
	const ROOT_LINK = '/apps'
	const FOOTER_LINKS = [ROOT_LINK, '/apps/cm/contactUs', '/apps/account']

	export let data: any
	const user = data.user
	const routeId = data.routeId

	// components
	let menuSidebar: NavTree
	let menuDrawer: NavTree

	onMount(() => {
		initTree(user.edge_temp.resource_programs)
		menuSidebar.loadBranch(-1, $navNodesTree)
		// menuDrawer.loadBranch(-1, $navNodesTree)
	})

	$: onFooterLink = FOOTER_LINKS.includes(routeId)

	function onMenuSidebarNodeSelected(event: CustomEvent) {
		const node = event.detail
		// alert(`menuSideNodeSelected: ${node.label}`)
	}

	function onMenuDrawerNodeSelected(event: CustomEvent) {
		const node = event.detail
		// alert(`menuDrawerNodeSelected: ${node.label}`)
	}

	function menuHamburger(): void {
		const settings: DrawerSettings = {
			id: 'navSide',
			position: 'left',
			width: 'w-[50%]',
			meta: {
				menu: menuSidebar,
				nodeSelected: onMenuDrawerNodeSelected,
				nodes: $navNodesTree
			}
		}
		drawerStore.open(settings)
	}
	function goBack() {
		history.back()
	}
	function goHome() {
		goto(ROOT_LINK)
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
				<!-- class="md:hidden mr-2"	 -->
				<div
					role="button"
					tabindex="0"
					class="mr-2"
					on:click={menuHamburger}
					on:keyup={menuHamburger}
				>
					<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
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
										fill={NAV_COLOR}
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
			<NavTree bind:this={menuSidebar} on:onNodeSelected={onMenuSidebarNodeSelected} />
		</div>
	</svelte:fragment>

	<div class="container mx-auto p-4">
		<!-- <slot name="body" /> -->
		<Home {user} />
		<NavPage />
		<slot />
		<div>
			navNodeSelected: <pre>{JSON.stringify($navNodeSelected, null, 2)}</pre>
		</div>
		navNodesTree: {$navNodesTree.length}
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
