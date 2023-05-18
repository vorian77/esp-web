<script>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton'
	import TabsNav from '$comps/navTabs/TabsNav.svelte'
	import ChevronLeft from '$lib/assets/icons/ChevronLeft.svelte'
	import Form from '$comps/esp/form/Form.svelte'

	export let data
	let currentTab = data.authType

	let tabList = [
		{ id: 'signup', label: 'Sign up' },
		{ id: 'login', label: 'Log in' },
		{ id: 'profile', label: 'Profile' }
	]

	const forms = {
		signup: data.formDefnSignup,
		login: data.formDefnLogin,
		profile: data.formDefnProfile
	}

	function goBack() {
		history.back()
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div>
					<button on:click={goBack}>
						<ChevronLeft />
					</button>
				</div>
			</svelte:fragment>

			<div style=" width:275px">
				<TabsNav {tabList} bind:currentTab />
			</div>
		</AppBar>
	</svelte:fragment>

	<Form formInit={forms[currentTab]} />
</AppShell>
