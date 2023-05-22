<script lang="ts">
	import { goto } from '$app/navigation'
	import logo from '$assets/YO-Baltimore-logo.png'
	import { Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import Form from '$comps/esp/form/Form.svelte'
	import DATABUS from '$lib/utils/databus.utils'

	export let data
	$: pageCurrent = 'auth_signup'
	$: securityCode = 0

	function goBack() {
		history.back()
	}

	function openPage(page: string) {
		pageCurrent = page
		const s: DrawerSettings = {
			id: 'demo',
			position: 'bottom',
			meta: 'Meta Data Received'
		}
		drawerStore.open(s)
	}

	function formSubmitted(event) {
		const formId = event.detail
		let formData

		switch (formId) {
			case 'auth_signup':
				sendCode()
				openPage('auth_verify_phone_mobile')
				break

			case 'auth_verify_phone_mobile':
				formData = DATABUS.get('form', formId)
				const userSecurityCode = DATABUS.getItemFieldValue('form', formId, 'securityCode')
				if (securityCode.toString() != userSecurityCode) {
					alert('You did not enter the correct security code. Please try again.')
					break
				}
				register()
				break

			case 'auth_login':
				formData = DATABUS.get('form', formId)
				const pwLogin = DATABUS.getItemFieldValue('form', 'auth_login', 'password')
				const pwSignup = DATABUS.getItemFieldValue('form', 'auth_signup', 'password')
				if (pwLogin != pwSignup) {
					alert(
						'We could not log you in. Please check your mobile phone number and password and try again.'
					)
					break
				}
				register()
				break
		}
	}

	function register() {
		pageCurrent = ''
		drawerStore.close()
		const user = DATABUS.get('form', 'auth_signup')
		DATABUS.upsert('cookie', 'user', user)
		goto('/home')
	}

	function formLink(event) {
		// switch page
		if (event.detail.startsWith('auth_')) {
			sendCode()
			openPage(event.detail)
			return
		}

		// other functions
		switch (event.detail) {
			case 'resend_security_code':
				sendCode()
				break
		}
	}

	function sendCode() {
		const min = 100000
		const max = 999999
		securityCode = Math.floor(Math.random() * (max - min + 1)) + min
	}
</script>

<Drawer>
	{#if pageCurrent == 'auth_signup'}
		<Form formInit={data.auth_signup} on:form-submitted={formSubmitted} on:form-link={formLink} />
	{:else if pageCurrent == 'auth_login'}
		<Form formInit={data.auth_login} on:form-submitted={formSubmitted} on:form-link={formLink} />
	{:else if pageCurrent == 'auth_verify_phone_mobile'}
		Security Code: {securityCode}
		<Form
			formInit={data.auth_verify_phone_mobile}
			on:form-submitted={formSubmitted}
			on:form-link={formLink}
		/>
	{:else if pageCurrent == 'auth_reset_password'}
		<Form
			formInit={data.auth_reset_password}
			on:form-submitted={formSubmitted}
			on:form-link={formLink}
		/>
	{/if}
</Drawer>

<div id="full-screen" class="container">
	<div class="content">
		<img class="mx-auto" src={logo} width="260" alt="YO logo" on:click={goBack} />

		<!-- button group -->
		<div class="flex-box">
			<button
				type="button"
				class="btn variant-filled-primary w-full mt-10"
				on:click={() => openPage('auth_signup')}
			>
				Sign up
			</button>
			<button
				type="button"
				class="btn variant-ringed-primary w-full mt-1"
				on:click={() => openPage('auth_login')}
			>
				Login
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
