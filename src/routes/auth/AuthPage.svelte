<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'

	import { goto } from '$app/navigation'
	import { drawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import { error } from '@sveltejs/kit'

	const FILENAME = 'routes/authPage.svelte'

	export let data = {}
	export let pageCurrent = ''

	let verifyFrom = ''
	let securityCode = 0

	const authForms = ['auth_login', 'auth_signup', 'auth_verify_phone_mobile', 'auth_reset_password']
	let forms = initForms(authForms)

	function initForms(formList: Array<string>) {
		let forms = {}
		for (let i = 0; i < formList.length; i++) {
			if (data.hasOwnProperty(formList[i])) {
				forms[formList[i]] = new FormClass(data[formList[i]])
			}
		}
		return forms
	}

	$: {
		if (pageCurrent) {
			const settings: DrawerSettings = {
				id: 'auth',
				position: 'bottom',
				height: 'h-[75%]',
				meta: {
					formObj: forms[pageCurrent],
					onFormSubmitted,
					onFormLink,
					onCloseDrawer: () => {
						pageCurrent = ''
					}
				}
			}
			drawerStore.open(settings)
		}
	}

	async function onFormSubmitted(event) {
		const { formName } = event.detail

		switch (formName) {
			case 'auth_login':
			case 'auth_verify_phone_mobile':
				drawerStore.close()
				if (verifyFrom != 'auth_account') {
					// if (authForms.includes(verifyFrom)) {
					// launch only from auth forms. eg. not form auth_account
					goto('/apps')
				}
				break

			case 'auth_account':
			case 'auth_signup':
			case 'auth_reset_password':
				await submitForm(formName, forms[formName])
				break
		}
	}

	export async function submitForm(formName: string, verifyFormObj: FormClass) {
		verifyFrom = formName
		pageCurrent = 'auth_verify_phone_mobile'
		forms[pageCurrent].source = verifyFormObj.source
		forms[pageCurrent].pageData = { ...verifyFormObj.pageData, ...verifyFormObj.values }
		sendCode()
	}

	async function sendCode() {
		const min = 100000
		const max = 999999
		securityCode = Math.floor(Math.random() * (max - min + 1)) + min

		// set match value
		const idx = forms[pageCurrent].fields.findIndex((f) => f.name === 'securityCodeVerify')
		if (idx === -1) {
			throw error(400, {
				file: FILENAME,
				function: 'sendCode',
				message: `Cannot find column 'securityCodeVerify' in form: 'auth_verify_phone_mobile'`
			})
		}
		forms[pageCurrent].fields[idx].value = securityCode

		await fetch('/auth', {
			method: 'POST',
			body: JSON.stringify({
				action: 'sms_send',
				phoneMobile: forms[verifyFrom].values.phoneMobile,
				message: `Mobile phone number verification code: ${securityCode}`
			})
		})
	}

	async function onFormLink(event) {
		// switch page
		if (Object.keys(forms).some((key) => key === event.detail)) {
			pageCurrent = event.detail
			return
		}

		// other functions
		switch (event.detail) {
			case 'resend_security_code':
				await sendCode()
				break
		}
	}
</script>
