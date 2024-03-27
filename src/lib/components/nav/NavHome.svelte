<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton'
	import { appStoreUser, User } from '$comps/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = '$comps/nav/NavPageHome.svelte'

	let user: User | undefined
	let showSysUser: boolean
	let showCMUser: boolean
	let showCMQuote: boolean

	$: {
		const rawUser = $appStoreUser
		user = rawUser && Object.keys(rawUser).length > 0 ? new User(rawUser) : undefined
		if (user) {
			showSysUser = user.hasResourceWidget('widget_sys_user')
			showCMUser = user.hasResourceWidget('widget_cm_user')
			showCMQuote = user.hasResourceWidget('widget_cm_quotes')
		}
	}
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
