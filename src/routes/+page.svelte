<script lang="ts">
	// import logo from '$assets/YO-Baltimore-logo.png'
	import logo from '$assets/clientLogo-AtlanticImpact.png'
	import { getDrawerStore, type DrawerSettings, getToastStore } from '@skeletonlabs/skeleton'
	import { userInit } from '$comps/types'
	import { apiFetch, ApiFunction } from '$lib/api'
	import { TokenApiQueryType, TokenApiUserName } from '$comps/types.token'
	import { StateSurfaceType, StateObj, StateSurfaceStyle } from '$comps/nav/types.appState'
	import { goto } from '$app/navigation'

	const FILENAME = 'routes/+page.svelte'
	const drawerStore = getDrawerStore()
	const toastStore = getToastStore()

	export let data

	const DEV_MODE = data.system.server_mode === 'development'

	let pageCurrent = ''

	async function expressLogin() {
		// const userName = '2487985578'
		const userName = 'user_sys'
		const result = await apiFetch(ApiFunction.dbEdgeGetUserId, new TokenApiUserName(userName))
		if (result.success) {
			await userInit(result.data.userId)
			goto('/home')
		}
	}

	function openDrawer(dataObjName: string) {
		const settings: DrawerSettings = {
			id: 'auth',
			position: 'bottom',
			height: 'h-[50%]',
			meta: {
				state: new StateObj({
					dataObjName,
					drawerStore,
					layout: {
						surfaceStyle: StateSurfaceStyle.drawer,
						surfaceType: StateSurfaceType.LayoutObj,
						headerCancelX: true
					},
					page: '/',
					queryType: TokenApiQueryType.new,
					toastStore
				})
			}
		}
		drawerStore.open(settings)
	}
</script>

<div id="full-screen">
	<div class="content">
		<img class="mx-auto" src={logo} width="230" alt="Organization logo" />

		<div class="flex-box">
			<button
				type="button"
				class="btn variant-filled-primary w-full mt-10"
				on:click={() => openDrawer('data_obj_auth_login')}
			>
				Log in
			</button>

			{#if DEV_MODE}
				<button
					type="button"
					class="btn variant-filled-secondary w-full mt-2"
					on:click={expressLogin}
				>
					Express Login
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	#full-screen {
		height: 100vh;
		overflow: hidden; /* Hide scrollbars */
		background-color: whitesmoke;
		background-image: url('$assets/moed2.jpg');
		background-size: cover;
	}

	.content {
		position: fixed;
		top: 80%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
</style>
