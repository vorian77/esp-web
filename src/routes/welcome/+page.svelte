<script lang="ts">
	import { Form as FormDefn } from '$comps/esp/form/form'
	import { goto } from '$app/navigation'
	import logo from '$assets/YO-Baltimore-logo.png'
	import { Drawer, drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import Form from '$comps/esp/form/Form.svelte'
	import type { FormSourceResponseType } from '$comps/esp/form/types'
	import { error } from '@sveltejs/kit'

	const FILENAME = 'routes/welcome/+page.svelte'

	export let data

	$: pageCurrent = ''
	$: securityCode = 0
	$: verifyFrom = ''
	const forms = initForms([
		'auth_login',
		'auth_signup',
		'auth_verify_phone_mobile',
		'auth_reset_password'
	])

	function initForms(formList: Array<string>) {
		let forms = []
		for (let i = 0; i < formList.length; i++) {
			if (data.hasOwnProperty(formList[i])) {
				forms[formList[i]] = new FormDefn(data[formList[i]])
			} else {
				throw error(500, {
					file: FILENAME,
					function: 'constructor',
					message: `PageData missing form: formList[i]`
				})
			}
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
		const { formName } = event.detail

		switch (formName) {
			case 'auth_login':
				launch()
				break

			case 'auth_verify_phone_mobile':
				// verify security code
				const userSecurityCode = forms[formName].data.securityCode
				if (userSecurityCode != securityCode) {
					alert(
						'The security code you entered does not match the security code we sent. Please try again.'
					)
					return
				}

				// process verify-from form
				const response = await fetch('', {
					method: 'POST',
					body: JSON.stringify({
						action: 'form_submit',
						formName: forms[verifyFrom].name,
						source: forms[verifyFrom].source,
						data: forms[verifyFrom].data
					})
				})
				const responseData: FormSourceResponseType = await response.json()
				if (!responseData.success) {
					alert(forms[verifyFrom].source.msgFailure)
					return
				}
				launch()
				break

			case 'auth_signup':
			case 'auth_reset_password':
				verifyFrom = formName
				sendCode()
				openPage('auth_verify_phone_mobile')
				break
		}

		function launch() {
			console.log('Launch...')
			pageCurrent = ''
			drawerStore.close()
			goto('/apps/cm')
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

{securityCode}
<Drawer>
	{#each Object.entries(forms) as [key, value], index}
		{#if pageCurrent == value.name}
			<Form
				bind:formObj={value}
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
				Get Started!
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
