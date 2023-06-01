<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import { goto } from '$app/navigation'
	import logo from '$assets/YO-Baltimore-logo.png'
	import { Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import Form from '$comps/esp/form/Form.svelte'

	const FILENAME = 'routes/welcome/+page.svelte'

	export let data

	$: pageCurrent = ''
	$: securityCode = 0
	$: verifyFrom = ''
	const forms = initForms()

	function initForms() {
		let forms = []
		for (const [key, value] of Object.entries(data)) {
			forms[key] = new FormDefn(value)
		}
		return forms
	}
	function openPage(page: string) {
		pageCurrent = page
		const s: DrawerSettings = {
			id: 'demo',
			position: 'bottom',
			height: 'h-[75%]',
			meta: 'Meta Data Received'
		}
		drawerStore.open(s)
	}
	async function onFormSubmitted(event) {
		const formId = event.detail

		switch (formId) {
			case 'auth_login':
				launch()
				break

			case 'auth_verify_phone_mobile':
				// verify security code
				const userSecurityCode = forms[formId].data.securityCode
				if (userSecurityCode != securityCode) {
					alert(
						'The security code you entered does not match the security we sent. Please try again.'
					)
					return
				}

				// process verify-from form
				const response = await fetch('', {
					method: 'POST',
					body: JSON.stringify({
						action: 'form_submit',
						formId: forms[verifyFrom].id,
						submitAction: forms[verifyFrom].submitAction,
						data: forms[verifyFrom].data
					})
				})
				const responseData = await response.json()
				if (!responseData.success) {
					alert(forms[verifyFrom].submitAction.messageFailure)
					return
				}
				launch()
				break

			case 'auth_signup':
			case 'auth_reset_password':
				verifyFrom = formId
				sendCode()
				openPage('auth_verify_phone_mobile')
				break
		}

		function launch() {
			pageCurrent = ''
			drawerStore.close()
			goto('/home/cm')
		}
	}

	async function onFormLink(event) {
		// switch page
		if (Object.keys(forms).some((key) => key === event.detail)) {
			openPage(event.detail)
			return
		}

		// other functions
		switch (event.detail) {
			case 'resend_security_code':
				await sendCode()
				break
		}
	}

	async function sendCode() {
		const min = 100000
		const max = 999999
		securityCode = Math.floor(Math.random() * (max - min + 1)) + min
		await fetch('', {
			method: 'POST',
			body: JSON.stringify({
				action: 'sms_send',
				phoneMobile: forms[verifyFrom].data.phoneMobile,
				message: `Mobile phone number verification code: ${securityCode}`
			})
		})
	}
</script>

<Drawer>
	{#each Object.entries(forms) as [key, value], index}
		{@const form = value}
		{#if pageCurrent == form.id}
			<Form
				{form}
				surface="esp-card-space-y"
				on:formSubmitted={onFormSubmitted}
				on:form-link={onFormLink}
			/>
		{/if}
	{/each}
</Drawer>

<div id="full-screen" class="container">
	<div class="content">
		<img class="mx-auto" src={logo} width="260" alt="YO logo" />

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
