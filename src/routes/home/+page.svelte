<script lang="ts">
	import { navUser } from '$comps/nav/navStore'
	import { User } from '$comps/types'
	import SysUser from '$routes/home/User.svelte'
	import CMUser from '$routes/home/UserCM.svelte'
	import Quote from '$routes/home/Quote.svelte'
	import NavHome from '$comps/nav/NavHome.svelte'

	const FILENAME = '$routes/home/+page.svelte'

	let user: any
	let userObj: any
	let showSysUser: boolean
	let showCMUser: boolean
	let showCMQuote: boolean

	$: {
		user = $navUser
		userObj = new User(user)

		showSysUser = userObj.hasResourceWidget('widget_sys_user')
		showCMUser = userObj.hasResourceWidget('widget_cm_user')
		showCMQuote = userObj.hasResourceWidget('widget_cm_quotes')
	}
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
<!-- <pre>{JSON.stringify(user.resource_widgets, null, 2)}</pre> -->
