<script lang="ts">
	import AuthPage from '$routes/auth/AuthPage.svelte'
	import logo from '$assets/YO-Baltimore-logo.png'

	const FILENAME = 'routes/+page.svelte'

	export let data
	let pageCurrent = ''
</script>

<AuthPage bind:data bind:pageCurrent />

<div id="full-screen" class="container">
	<div class="content">
		<img class="mx-auto" src={logo} width="260" alt="Organization logo" />

		<div class="flex-box">
			<button
				type="button"
				class="btn variant-filled-primary w-full mt-10"
				on:click={() => (pageCurrent = 'auth_signup')}
			>
				Get Started!
			</button>
			<button
				type="button"
				class="btn variant-ringed-primary w-full mt-1"
				on:click={() => (pageCurrent = 'auth_login')}
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
