<script lang="ts">
	import { getUser } from '$comps/nav/navStore'
	import type { User } from '$comps/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import NavHome from '$comps/nav/NavHome.svelte'

	const FILENAME = '$routes/home/+page.svelte'

	const user: User = getUser()

	let showSysUser: boolean = user.hasResourceWidget('widget_sys_user')
	let showCMUser: boolean = user.hasResourceWidget('widget_cm_user')
	let showCMQuote: boolean = user.hasResourceWidget('widget_cm_quotes')
</script>

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
