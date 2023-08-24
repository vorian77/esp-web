<script lang="ts">
	import { User as UserObj } from '$comps/types'
	import SysUser from '$comps/User.svelte'
	import CMUser from '$comps/UserCM.svelte'
	import CMQuotes from '$comps/Quotes.svelte'
	import Navigation from '$comps/Navigation-App.svelte'

	const FILENAME = '/routes/apps/+layout.server.ts'

	export let data

	const user = new UserObj(data.user.edge_temp)
	const showSysUser = user.hasResourceWidget('hsw_sys_user')
	const showCMUser = user.hasResourceWidget('hsw_cm_user')
	const showCMQuotes = user.hasResourceWidget('hsw_cm_quotes')
</script>

{#if showSysUser}
	<SysUser user={data.user} />
{/if}

{#if showCMUser}
	<CMUser user={data.user} />
{/if}

{#if showCMQuotes}
	<CMQuotes quote={data.otherData.quote} />
{/if}

<Navigation user={data.user} mode="page" />
