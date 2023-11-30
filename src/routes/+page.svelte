<script lang="ts">
	import AuthPage from '$routes/auth/AuthPage.svelte'
	import logo from '$assets/YO-Baltimore-logo.png'

	import { initUser } from '$comps/nav/navStore'
	import { goto } from '$app/navigation'

	const FILENAME = 'routes/+page.svelte'

	export let data
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
			initUser(user)
			goto('/home')
		}
	}
</script>

<AuthPage {data} bind:pageCurrent />

<div id="full-screen" class="container">
	<div class="content">
		<img class="mx-auto" src={logo} width="260" alt="Organization logo" />

		<div class="flex-box">
			<button
				type="button"
				class="btn variant-filled-secondary w-full mt-1"
				on:click={expressLogin}
			>
				Express Login
			</button>

			<button
				type="button"
				class="btn variant-filled-primary w-full mt-10"
				on:click={() => (pageCurrent = 'form_auth_signup')}
			>
				Get Started!
			</button>
			<button
				type="button"
				class="btn variant-ringed-primary w-full mt-1"
				on:click={() => (pageCurrent = 'form_auth_login')}
			>
				Log in
			</button>
		</div>
	</div>
</div>

<style>
	#full-screen {
		height: 100vh;
		overflow: hidden; /* Hide scrollbars */
		background-image: url('$assets/moed2.jpg');
		background-size: cover;
	}
	img {
		height: 100%;
	}
	.container {
		position: relative;
		text-align: center;
		color: whitesmoke;
	}

	.content {
		position: fixed;
		top: 72%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
	}
</style>
