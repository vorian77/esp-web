<script lang="ts">
	import { navUser } from '$comps/nav/navStore'
	import { User } from '$comps/types'
	import SysUser from '$comps/home/User.svelte'
	import CMUser from '$comps/home/UserCM.svelte'
	import Quote from '$comps/home/Quote.svelte'
	import NavHome from '$comps/nav/NavHome.svelte'

	const FILENAME = '/components/home/Home.svelte'

	export let node: any

	let user: any
	let userObj: any
	let showSysUser: boolean
	let showCMUser: boolean
	let showCMQuote: boolean

	$: {
		user = $navUser
		userObj = new User(user)

		showSysUser = userObj.hasResourceWidget('hsw_sys_user')
		showCMUser = userObj.hasResourceWidget('hsw_cm_user')
		showCMQuote = userObj.hasResourceWidget('hsw_cm_quotes')
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
