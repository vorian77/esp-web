<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton'
	import type { User } from '$comps/types'
	import { getUser } from '$comps/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavPageHome.svelte'

	const user: User | undefined = getUser()

	let showSysUser: boolean = user ? user.hasResourceWidget('widget_sys_user') : false
	let showCMUser: boolean = user ? user.hasResourceWidget('widget_cm_user') : false
	let showCMQuote: boolean = user ? user.hasResourceWidget('widget_cm_quotes') : false
</script>

<AppShell>
	{#if showSysUser}
		<SysUser {user} />
	{/if}

	{#if showCMUser}
		<CMUser {user} />
	{/if}

	{#if showCMQuote}
		<Quote />
	{/if}
</AppShell>
