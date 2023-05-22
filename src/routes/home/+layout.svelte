<script>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'
	import DATABUS from '$lib/utils/databus.utils'

	const nameFirst = DATABUS.getItemFieldValue('cookie', 'user', 'nameFirst')
	const nameLast = DATABUS.getItemFieldValue('cookie', 'user', 'nameLast')
	const user = nameFirst

	export let data

	function goBack() {
		history.back()
	}
</script>

<AppShell>
	<AppBar>
		<div on:click={goBack}>Welcome, {user}</div></AppBar
	>

	<slot />
</AppShell>
