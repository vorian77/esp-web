<script lang="ts">
	import { appStoreUser, initNavTree, NodeType, valueOrDefault } from '$comps/types'
	import { User } from '$comps/types'
	import { State, StateLayout, StatePacket, StatePacketComponent } from '$comps/nav/types.appState'
	import { TokenAppDoDetail, TokenAppDoDetailConfirm, TokenAppTreeReset } from '$comps/types.token'
	import {
		AppBar,
		AppShell,
		Avatar,
		getDrawerStore,
		getModalStore,
		getToastStore,
		type DrawerSettings,
		type ModalSettings,
		type ToastSettings
	} from '@skeletonlabs/skeleton'
	import SurfacePageForm from '$comps/Surface/SurfacePageForm.svelte'
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
			layout: StateLayout.LayoutObjTab,
			modalStore,
			toastStore,
			updateFunction: stateUpdate,
			user
		})
		launchApp = false
	}
	$: {
		if (user && user.avatar && user.avatar.storageKey) {
			;(async () => {
				userAvatarSrc = await getURLDownload(user.avatar.storageKey)
			})()
		}
	}

	async function stateUpdate(obj: any) {
		obj = valueOrDefault(obj, {})

		const checkObjChanged = obj?.packet?.checkObjChanged || false

		let confirm: TokenAppDoDetailConfirm | undefined = undefined

		if (obj?.packet?.token instanceof TokenAppDoDetail && obj?.packet?.token.confirm) {
			confirm = obj.packet.token.confirm
			delete obj.packet.token.confirm
		}

		if ((checkObjChanged && state?.objHasChanged) || confirm) {
			confirm = confirm
				? confirm
				: new TokenAppDoDetailConfirm(
						'Discard Changes',
						'Are you sure you want to discard your changes?',
						'Discard Changes'
					)
			await askB4Transition(obj, confirm)
		} else {
			state = state.updateProperties(obj)
			if (obj.packet) await statePacketAdd(obj.packet)
			if (state.page !== $page.route.id) goto(state.page)
		}
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
	function goHome() {
		stateUpdate({
			page: '/home',
			nodeType: NodeType.home,
			packet: new StatePacket({
				component: StatePacketComponent.navTree,
				token: new TokenAppTreeReset()
			})
		})
	}
	async function askB4Transition(obj: any, confirm: TokenAppDoDetailConfirm) {
		const modal: ModalSettings = {
			type: 'confirm',
			title: confirm.title,
			body: confirm.msg,
			buttonTextCancel: 'Keep Editing',
			buttonTextConfirm: confirm.buttonConfirmLabel,
			response: async (r: boolean) => {
				if (r) {
					state.statusReset()
					stateUpdate(obj)
				}
			}
		}
		return modalStore.trigger(modal)
	}
</script>

<AppShell slotSidebarLeft="w-{SIDEBAR_LEFT_WIDTH} ">
	<svelte:fragment slot="header">
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
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div class="hidden md:block mt-2">
			{#if user && state?.nodeType === NodeType.home}
				<NavTree {state} on:treeChanged />
			{/if}
		</div>
	</svelte:fragment>

	<div class="mx-3 mt-2">
		{#if $page.route.id === '/home'}
			{#if state?.nodeType === NodeType.home}
				<NavHome />
			{:else}
				<SurfacePageForm {state} />
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
