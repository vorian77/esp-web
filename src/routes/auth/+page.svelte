<script>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import TabsNav from '$comps/tabs/TabsNav.svelte';
	import Form from '$comps/esp/form/Form.svelte';
	import ChevronLeft from '$lib/assets/icons/ChevronLeft.svelte';

	export let data;

	let tabList = [
		{ id: 'signup', label: 'Sign up' },
		{ id: 'login', label: 'Log in' }
	];
	let currentTab = data.authType;

	const forms = {
		signup: { component: Form, defn: data.formDefnSignup },
		login: { component: Form, defn: data.formDefnLogin }
	};

	function goBack() {
		history.back();
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

			<div style=" width:200px">
				<TabsNav {tabList} bind:currentTab />
			</div>
		</AppBar>
	</svelte:fragment>

	<svelte:component this={forms[currentTab].component} {...{ formDefn: forms[currentTab].defn }} />
	<!-- <pre>{JSON.stringify(forms[currentTab], null, 2)}</pre> -->
</AppShell>
