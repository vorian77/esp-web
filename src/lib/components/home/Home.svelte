<script lang="ts">
	import { User } from '$comps/types'
	import SysUser from '$comps/home/User.svelte'
	import CMUser from '$comps/home/UserCM.svelte'
	import Quote from '$comps/home/Quote.svelte'
	import NavHome from '$comps/nav/NavHome.svelte'

	const FILENAME = '/components/home/Home.svelte'

	export let user: any
	export let node: any

	const userObj = new User(user)

	const showSysUser = userObj.hasResourceWidget('hsw_sys_user')
	const showCMUser = userObj.hasResourceWidget('hsw_cm_user')
	const showCMQuote = userObj.hasResourceWidget('hsw_cm_quotes')
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
