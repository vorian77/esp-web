<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton'
	import NavTree from '$comps/nav/NavTree.svelte'
	import type { User } from '$comps/types'
	import { getUser, NavState } from '$comps/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import NavHome from '$comps/nav/NavHome.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavPageHome.svelte'

	export let stateAdd = (token: NavState) => {}
	export let stateGlobal: NavState | undefined

	const user: User | undefined = getUser()

	let showSysUser: boolean = user ? user.hasResourceWidget('widget_sys_user') : false
	let showCMUser: boolean = user ? user.hasResourceWidget('widget_cm_user') : false
	let showCMQuote: boolean = user ? user.hasResourceWidget('widget_cm_quotes') : false
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div class="w-52">
			{#if user}
				<NavTree {stateAdd} {stateGlobal} />
			{/if}
		</div>
	</svelte:fragment>

	{#if showSysUser}
		<SysUser {user} />
	{/if}

	{#if showCMUser}
		<CMUser {user} />
	{/if}

	{#if showCMQuote}
		<Quote />
	{/if}

	<NavHome />
</AppShell>
