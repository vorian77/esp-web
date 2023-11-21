<script lang="ts">
	import {
		AppBar,
		AppShell,
		Avatar,
		type DrawerSettings,
		getDrawerStore
	} from '@skeletonlabs/skeleton'
	import { popup } from '@skeletonlabs/skeleton'
	import type { PopupSettings } from '@skeletonlabs/skeleton'
	import { getUser, initNav, navStatus, navTree } from '$comps/nav/navStore'
	import { type NavTreeNode, NavTree } from '$comps/types'
	import type { User } from '$comps/types'
	import NavBar from '$comps/nav/NavBar.svelte'
	import NavFooter from '$comps/nav/NavFooter.svelte'
	import NavTreeComp from '$comps/nav/NavTree.svelte'
	import Icon from '$comps/Icon.svelte'
	import { goto } from '$app/navigation'
	import DataViewer from '$comps/DataViewer.svelte'

	const drawerStore = getDrawerStore()
	const NAV_COLOR = '#3b79e1'
	const ROOT_LINK = '/home'

	const user: User = getUser()

	let saveStore = false
	let navTreeLocal: NavTree
	let treeCrumbs: NavTreeNode[] = []

	$: if (!saveStore && user) {
		initNav(user)
		saveStore = true
	}

	$: {
		navTreeLocal = Object.assign(new NavTree([]), $navTree)
		treeCrumbs = navTreeLocal.listCrumbs
	}

	function navLeft(): void {
		const settings: DrawerSettings = {
			id: 'navLeft',
			position: 'left',
			width: 'w-[50%]'
		}
		drawerStore.open(settings)
	}
	function navRight(): void {
		const settings: DrawerSettings = {
			id: 'navRight',
			position: 'right',
			width: 'w-[20%]'
		}
		drawerStore.open(settings)
	}
	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	}

	function goHome() {
		goto(ROOT_LINK)
	}
</script>

<AppShell slotSidebarLeft="w-0 md:w-52">
	<svelte:fragment slot="header">
		<AppBar background="bg-neutral-200" padding="p-3">
			<svelte:fragment slot="lead">
				<!-- class="md:hidden mr-2"	 -->
				<div
					role="button"
					tabindex="0"
					class="md:hidden mr-2"
					on:click={navLeft}
					on:keyup={navLeft}
				>
					<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
				</div>

				<div role="button" tabindex="0" class="text-black" on:click={goHome} on:keyup={goHome}>
					{#if user.app_name}
						{user.app_name}
					{/if}
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div role="button" tabindex="0" class="mr-2" on:click={navRight} on:keyup={navRight}>
					<!-- <div role="button" tabindex="0" class="mr-2" use:popup={popupClick}> -->
					<!-- <button class="btn variant-filled" use:popup={popupClick}>Click</button> -->
					<Avatar initials={user.initials} width="w-9" background="bg-primary-400" />
				</div>
			</svelte:fragment>
		</AppBar>
		<div class="z-0" class:hidden={treeCrumbs.length < 2}>
			<NavBar />
		</div>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div class="bg-white mt-2">
			<NavTreeComp />
		</div>
	</svelte:fragment>

	<div class="mx-3 mt-2">
		<DataViewer header="navStatus" data={$navStatus} />
		<slot />
	</div>

	<svelte:fragment slot="footer">
		<div style="border-top: 1px solid #f5f5f5;">
			<NavFooter />
		</div>
	</svelte:fragment>
</AppShell>

<div class="card p-4 variant-filled-primary z-10" data-popup="popupClick">
	<a href="/logout">Logout</a>
	<div class="arrow variant-filled-primary" />
</div>
