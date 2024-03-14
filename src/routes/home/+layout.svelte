<script lang="ts">
	import { appStoreUser, initNavTree, NodeType } from '$comps/types'
	import { User } from '$comps/types'
	import {
		State,
		StateLayout,
		StateSurfaceType,
		StatePacket,
		StatePacketComponent,
		StateSurfaceStyle,
		stateUpdateDataObj
	} from '$comps/nav/types.appState'
	import { TokenAppDoAction, TokenAppDoList, TokenAppTreeReset } from '$comps/types.token'
	import {
		AppBar,
		AppShell,
		Avatar,
		getDrawerStore,
		getModalStore,
		getToastStore,
		type DrawerSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton'
	import DataObj from '$comps/dataObj/DataObj.svelte'
	import NavHome from '$comps/nav/NavHome.svelte'
	import NavFooter from '$comps/nav/NavFooter.svelte'
	import NavTree from '$comps/nav/NavTree.svelte'
	import Icon from '$comps/Icon.svelte'
	import { getURLDownload } from '$utils/utils.aws'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import type { ToastType } from '$comps/types'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '/$routes/home/+layout.svelte'

	const drawerStore = getDrawerStore()
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	const DEFAULT_APP_NAME = 'The App Factory'
	const NAV_COLOR = '#3b79e1'
	const SIDEBAR_LEFT_WIDTH = '80'

	let launchApp = true
	let state: State
	let statePackets: Array<StatePacket> = []
	let user: User | undefined
	let userAvatarSrc = ''

	$: {
		const rawUser = $appStoreUser
		user = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
	}
	$: if (launchApp && user) {
		;(async () => {
			await initNavTree(user)
		})()
		state = new State({
			drawerStore,
			layout: new StateLayout({
				surfaceStyle: StateSurfaceStyle.embedded,
				surfaceType: StateSurfaceType.LayoutObjTab
			}),
			modalStore,
			onRowClick: (rows: any, record: any) =>
				state.update({
					packet: new StatePacket({
						checkObjChanged: false,
						component: StatePacketComponent.appDataObj,
						token: new TokenAppDoList(
							TokenAppDoAction.listEdit,
							rows.map((r: any) => r.id),
							record.id
						)
					})
				}),
			toastStore,
			user
		})
		state.setUpdate(stateUpdateDataObj, stateUpdateProcess)
		launchApp = false
	}
	$: {
		if (user && user.avatar && user.avatar.storageKey) {
			;(async () => {
				userAvatarSrc = await getURLDownload(user.avatar.storageKey)
			})()
		}
	}

	async function stateUpdateProcess(obj: any) {
		state = state.updateProperties(obj)
		if (obj.packet) await statePacketAdd(obj.packet)
		if (state.page !== $page.route.id) goto(state.page)
	}

	async function statePacketAdd(packet: StatePacket) {
		statePackets = [...statePackets, packet]
		await statePacketTrigger()
	}
	async function statePacketTrigger() {
		if (state.packet) console.log('statePacketTrigger.state w packet:', { packet: state.packet })
		while (statePackets.length > 0 && !state.packet) {
			const packet = statePacketPop()

			// set packet in global state
			state.packet = packet
		}
	}
	function statePacketPop() {
		const packet = statePackets[statePackets.length - 1]
		statePackets = [...statePackets.slice(0, -1)]
		return packet
	}

	function goHome() {
		state.update({
			page: '/home',
			nodeType: NodeType.home,
			packet: new StatePacket({
				component: StatePacketComponent.navTree,
				token: new TokenAppTreeReset()
			})
		})
	}
	function navLeft(): void {
		const settings: DrawerSettings = {
			id: 'navLeft',
			position: 'left',
			width: 'w-[50%]',
			meta: { state }
		}
		drawerStore.open(settings)
	}

	function navRight(): void {
		const isSysAdmin = user ? ['user_sys', '2487985578'].includes(user.userName) : false
		const settings: DrawerSettings = {
			id: 'navRight',
			position: 'right',
			width: 'w-[20%]',
			meta: { isSysAdmin, state }
		}
		drawerStore.open(settings)
	}
	export function toast(type: ToastType, message: string) {
		const background = {
			success: 'variant-filled-secondary',
			warning: 'variant-filled-warning',
			error: 'variant-filled-error'
		}
		const t: ToastSettings = {
			background: background[type],
			message
		}
		toastStore.trigger(t)
	}
</script>

<AppShell slotSidebarLeft="w-{SIDEBAR_LEFT_WIDTH}">
	<svelte:fragment slot="header">
		<div>
			<AppBar background="bg-neutral-200" padding="p-3">
				<svelte:fragment slot="lead">
					<div
						class="md:hidden mr-2"
						role="button"
						tabindex="0"
						on:click={navLeft}
						on:keyup={navLeft}
					>
						<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill={NAV_COLOR} />
					</div>

					<div role="button" tabindex="0" class="text-black" on:click={goHome} on:keyup={goHome}>
						{#if user?.org?.header}
							{user.org.header}
						{:else}
							{DEFAULT_APP_NAME}
						{/if}
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<div role="button" tabindex="0" class="mr-2" on:click={navRight} on:keyup={navRight}>
						<!-- <div role="button" tabindex="0" class="mr-2" use:popup={popupClick}> -->
						<!-- <button class="btn variant-filled" use:popup={popupClick}>Click</button> -->
						<!-- src={avatarSrc} -->
						<!-- src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop" -->
						<Avatar
							initials={user ? user.initials : undefined}
							background="bg-primary-400"
							rounded="rounded-full"
							src={userAvatarSrc}
							width="w-9"
						/>
					</div>
				</svelte:fragment>
			</AppBar>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div class="hidden md:block">
			{#if user && state?.nodeType === NodeType.home}
				<div class="my-4">
					<NavTree {state} on:treeChanged />
				</div>
			{/if}
		</div>
	</svelte:fragment>

	<div>
		{#if $page.route.id === '/home'}
			{#if state?.nodeType === NodeType.home}
				<div class="m-4">
					<NavHome />
				</div>
			{:else}
				<DataObj {state} />
			{/if}
		{:else}
			<slot />
		{/if}
	</div>

	<svelte:fragment slot="footer">
		<div style="border-top: 1px solid #f5f5f5;">
			<NavFooter {state} />
		</div>
	</svelte:fragment>
</AppShell>

<div class="card p-4 variant-filled-primary z-10" data-popup="popupClick">
	<a href="/logout">Logout</a>
	<div class="arrow variant-filled-primary" />
</div>
