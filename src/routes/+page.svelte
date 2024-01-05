<script lang="ts">
	import AuthPage from '$routes/auth/AuthPage.svelte'
	// import logo from '$assets/YO-Baltimore-logo.png'
	import logo from '$assets/clientLogo-AtlanticImpact.png'
	import { setUser } from '$comps/types'
	import { goto } from '$app/navigation'

	const FILENAME = 'routes/+page.svelte'

	export let data

	const DEV_MODE = data.system.server_mode === 'development'

	let pageCurrent = ''

	async function expressLogin() {
		// <temp> 231026 express login

		const responsePromise: Response = await fetch('/auth', {
			method: 'POST',
			body: JSON.stringify({
				action: 'express_login'
			})
		})
		const resp = await responsePromise.json()
		if (resp) {
			const user = resp.data
			setUser(user)
			goto('/home')
		}
	}
</script>

<AuthPage bind:pageCurrent />

<div id="full-screen">
	<div class="content">
		<img class="mx-auto" src={logo} width="230" alt="Organization logo" />

		<div class="flex-box">
			<button
				type="button"
				class="btn variant-filled-primary w-full mt-10"
				on:click={() => (pageCurrent = 'data_obj_auth_login')}
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
