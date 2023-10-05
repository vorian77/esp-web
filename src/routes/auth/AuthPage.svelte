<script lang="ts">
	import { Form as FormClass } from '$comps/esp/form/form'
	import { goto } from '$app/navigation'
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { navInitReset, navStorageReset, navUser } from '$comps/nav/navStore'
	import type { FormSourceResponseType } from '$comps/types'
	import { error } from '@sveltejs/kit'

	const FILENAME = 'routes/authPage.svelte'

	export let data = {}
	export let pageCurrent = ''

	let verifyFrom = ''
	let securityCodePhone = ''
	let securityCode = 0
	const drawerStore = getDrawerStore()
	const toastStore = getToastStore()

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

	async function onFormSubmitted(event: CustomEvent) {
		const { formName, applicantId } = event.detail

		switch (formName) {
			case 'auth_login':
			case 'auth_verify_phone_mobile':
				drawerStore.close()
				if (verifyFrom === 'auth_account') {
					const t: ToastSettings = {
						message: 'Your account has been updated!'
					}
					toastStore.trigger(t)
				} else {
					navStorageReset()
					navInitReset()
					navUser.set(await getUser(applicantId))
					goto('/apps')
				}
				break

			case 'auth_signup':
			case 'auth_reset_password':
				await submitForm(formName, forms[formName], forms[formName].values)
				break
		}
	}

	export async function getUser(userId: string) {
		const responsePromise = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ userId })
		})
		const response: FormSourceResponseType = await responsePromise.json()
		return response.data
	}

	export async function submitForm(formName: string, verifyFormObj: FormClass) {
		verifyFrom = formName
		pageCurrent = 'auth_verify_phone_mobile'
		forms[pageCurrent].source = verifyFormObj.source

		// add data from source form to supplemental data auth_verify_phone_mobile form
		forms[pageCurrent].pageData = { ...verifyFormObj.pageData, ...verifyFormObj.values }
		sendCode(verifyFormObj.values.phoneMobile)
	}

	async function sendCode(phoneMobile: string) {
		const min = 100000
		const max = 999999
		securityCode = Math.floor(Math.random() * (max - min + 1)) + min
		securityCodePhone = phoneMobile

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
				phoneMobile: securityCodePhone,
				message: `Mobile phone number verification code: ${securityCode}`
			})
		})
	}

	async function onFormLink(event: CustomEvent) {
		// switch page
		if (Object.keys(forms).some((key) => key === event.detail)) {
			pageCurrent = event.detail
			return
		}

		// other functions
		switch (event.detail) {
			case 'resend_security_code':
				await sendCode(securityCodePhone)
				break
		}
	}
</script>
