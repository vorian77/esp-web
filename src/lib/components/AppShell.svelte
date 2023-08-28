<script lang="ts">
	import { AppShell, Drawer, drawerStore, popup } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, PopupSettings } from '@skeletonlabs/skeleton'
	import Navigation from '$comps/Navigation.svelte'
	import Icon from '$comps/Icon.svelte'
	import { goto } from '$app/navigation'

	export let user = {}
	export let routeId = '/'

	const rootLink = '/apps'
	const footerLinks = [rootLink, '/apps/cm/contactUs', '/apps/account']
	const navMode = 'footer'
	const nodes = [
		['Home', 'home', footerLinks[0]],
		['Contact Us', 'contact-us', footerLinks[1]],
		['Account', 'profile', footerLinks[2]]
	]

	$: onFooterLink = footerLinks.includes(routeId)

	const navColor = '#3b79e1'

	function menuHamburger(): void {
		const settings: DrawerSettings = {
			id: 'navSide',
			position: 'left',
			width: 'w-[50%]'
		}
		drawerStore.open(settings)
	}
	function goBack() {
		history.back()
	}
	function goHome() {
		goto(rootLink)
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="bg-neutral-50 p-4 w-full flex flex-row justify-between">
			<div>
				{#if !onFooterLink}
					<div class="back-arrow -ml-2" on:click={goBack} on:keyup={goBack}>
						<span style:cursor="pointer">
							<Icon
								name="arrow-left"
								marginRight="-7"
								width="1.5rem"
								height="1.5rem"
								fill={navColor}
							/>
							Back
						</span>
					</div>
				{:else}
					<div class="text-black" on:click={goHome} on:keyup={goHome}>
						{user.app_name}
					</div>
				{/if}
			</div>

			<div on:click={menuHamburger} on:keyup={menuHamburger}>
				<Icon name="hamburger-menu" width="1.5rem" height="1.5rem" fill={navColor} />
			</div>
		</div>
	</svelte:fragment>

	<div class="container mx-auto p-4">
		<slot name="body" />
	</div>

	<svelte:fragment slot="footer">
		<div style="border-top: 1px solid #f5f5f5;">
			<Navigation mode={navMode} {nodes} />
		</div>
	</svelte:fragment>
</AppShell>

<style>
	.back-arrow {
		color: #3b79e1;
	}
</style>
