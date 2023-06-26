<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton'
	import { UserType } from '$comps/types'

	export let user = {}

	function drawerClose(): void {
		drawerStore.close()
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/account" on:click={drawerClose}>My Account</a></li>
		<li><a href="/legalDisclosure" on:click={drawerClose}>Legal Disclosure</a></li>
		<div hidden={user.user_type != UserType.admin}>
			<hr />
			<li><a href="/admin" on:click={drawerClose}>Administration</a></li>
			<li><a href="/apps/cm/apiTest" on:click={drawerClose}>ESP API Test</a></li>
			<li><a href="/dev/demo" on:click={drawerClose}>Native API Demo</a></li>
		</div>
		<hr />
		<li><a href="/logout" on:click={drawerClose}>Logout</a></li>
	</ul>
</nav>
