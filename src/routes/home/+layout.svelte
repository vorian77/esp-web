<script lang="ts">
	import {
		AppBar,
		AppShell,
		Avatar,
		type DrawerSettings,
		getDrawerStore
	} from '@skeletonlabs/skeleton'
	import type { PopupSettings } from '@skeletonlabs/skeleton'
	import type { User } from '$comps/types'
	import {
		NavStateTokenAppObjActionConfirm,
		DbData,
		DataObj,
		DataObjProcessType,
		NavState,
		NavStateComponent,
		NavStateToken,
		NavStateTokenAppObjAction,
		processByDataObj,
		processQuery,
		QueryParm,
		QueryParmAction,
		QueryParmData,
		ResponseBody
	} from '$comps/types'
	import { getAppStatus, resetAppStatus } from '$comps/nav/app'
	import { getUser } from '$comps/types'
	import NavPage from '$comps/nav/NavPage.svelte'
	import NavFooter from '$comps/nav/NavFooter.svelte'
	import Icon from '$comps/Icon.svelte'
	import { goto } from '$app/navigation'
	import DataViewer from '$comps/DataViewer.svelte'
	import Messenger from '$comps/Messenger.svelte'
	import {
		getModalStore,
		type ModalSettings,
		getToastStore,
		type ToastSettings
	} from '@skeletonlabs/skeleton'
	import type { ToastType } from '$comps/types'
	const modalStore = getModalStore()
	const toastStore = getToastStore()

	const drawerStore = getDrawerStore()
	const NAV_COLOR = '#3b79e1'
	const ROOT_LINK = '/home'
	const DEFAULT_APP_NAME = 'The App Factory'

	let messenger: Messenger
	let stateStack: Array<NavState> = []
	let stateGlobal: NavState | undefined

	const user: User | undefined = getUser()

	let launchApp = true
	$: if (launchApp && user) launchApp = false

	resetAppStatus()
	stateAdd(
		new NavState({
			component: NavStateComponent.page,
			page: 'home'
		})
	)

	async function stateAdd(state: NavState) {
		stateStack = [...stateStack, state]
		console.log('stateAdd:', stateStack)
		await triggerState()
	}
	async function triggerState() {
		while (stateStack.length > 0) {
			const state = statePop()
			console.log('triggerState:', { state, appStatus: getAppStatus() })
			const confirm = state.token instanceof NavStateTokenAppObjAction && state.token.confirm
			if ((state.checkObjChanged && getAppStatus().objHasChanged) || confirm) {
				await askB4Transition(state)
			} else {
				if (
					state.component === NavStateComponent.objAction &&
					state.token instanceof NavStateTokenAppObjAction &&
					state.token.dbProcess
				) {
					// process obj
					console.log('processObj.token:', state.token)
					const queryParm = new QueryParm(
						{ dataObjId: undefined, dataObjRaw: state.token.dataObjRaw },
						QueryParmAction.processAction,
						state.token.actionType,
						new QueryParmData({ object: state.token.dataObjData })
					)
					const result: ResponseBody = await processQuery(queryParm)
					if (result.success) {
						state.token.dataObjData = result.data.dataObjData
						console.log('processObj.success.result:', { result })
					} else {
						// process query failure?
					}
				}
				resetAppStatus()
				stateGlobal = state
			}
		}
	}
	function statePop() {
		const state = stateStack[stateStack.length - 1]
		stateStack = [...stateStack.slice(0, -1)]
		// console.log('statePop:', state)
		return state
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
	async function askB4Transition(state: NavState) {
		const confirm =
			state.token instanceof NavStateTokenAppObjAction && state.token.confirm
				? state.token.confirm
				: new NavStateTokenAppObjActionConfirm(
						'Discard Changes',
						'Are you sure you want to discard your changes?',
						'Discard Changes'
				  )
		const modal: ModalSettings = {
			type: 'confirm',
			title: confirm.title,
			body: confirm.msg,
			buttonTextCancel: 'Keep Editing',
			buttonTextConfirm: confirm.buttonConfirmLabel,
			response: async (r: boolean) => {
				if (r) {
					if (state.token instanceof NavStateTokenAppObjAction && state.token.confirm)
						delete state.token.confirm
					resetAppStatus()
					stateAdd(state)
				}
			}
		}
		return modalStore.trigger(modal)
	}
</script>

<Messenger bind:this={messenger} />

<!-- <DataViewer header="stateStatus" data={stateGlobal} /> -->
<!-- <DataViewer header="stateStack" data={stateStack} /> -->

<AppShell slotSidebarLeft="w-0 md:w-52">
	<svelte:fragment slot="header">
		<AppBar background="bg-neutral-200" padding="p-3">
			<svelte:fragment slot="lead">
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
					{#if user?.org?.appName}
						{user.org.appName}
					{:else}
						{DEFAULT_APP_NAME}
					{/if}
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div role="button" tabindex="0" class="mr-2" on:click={navRight} on:keyup={navRight}>
					<!-- <div role="button" tabindex="0" class="mr-2" use:popup={popupClick}> -->
					<!-- <button class="btn variant-filled" use:popup={popupClick}>Click</button> -->
					<Avatar
						initials={user ? user.initials : undefined}
						width="w-9"
						background="bg-primary-400"
					/>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft"></svelte:fragment>

	<div class="mx-3 mt-2">
		<slot />
		<NavPage {stateAdd} {stateGlobal} />
	</div>

	<svelte:fragment slot="footer">
		<div style="border-top: 1px solid #f5f5f5;">
			<!-- <NavFooter /> -->
		</div>
	</svelte:fragment>
</AppShell>

<div class="card p-4 variant-filled-primary z-10" data-popup="popupClick">
	<a href="/logout">Logout</a>
	<div class="arrow variant-filled-primary" />
</div>
