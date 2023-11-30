<script lang="ts">
	import { Form } from '$comps/form/form'
	import { FieldValue } from '$comps/form/field'
	import { get } from 'svelte/store'
	import { goto } from '$app/navigation'
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import { encrypt, type DataObj, type ResponseBody } from '$comps/types'
	import { DataObjProcessType, DbData, processByObject, processByDataObjName } from '$comps/types'
	import { initUser, navParms, navUser } from '$comps/nav/navStore'
	import { onMount } from 'svelte'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const FILENAME = 'routes/authPage.svelte'
	export let data: { system: any }
	export let pageCurrent = ''

	let forms: any = []
	let formProcess: Form

	onMount(() => {
		async function initForm(formName: string) {
			const dataObj: DataObj = await processByDataObjName(
				formName,
				DataObjProcessType.preset,
				new DbData({})
			)
			dataObj.isInsertMode = true
			forms[formName] = new Form(dataObj)
		}

		;[
			'form_auth_login',
			'form_auth_reset_password',
			'form_auth_signup',
			'form_auth_verify_phone_mobile'
		].forEach((formName) => initForm(formName))
	})

	let verifyFrom = ''
	let authSecurityCodePhone = ''
	let authSecurityCode = 0
	const drawerStore = getDrawerStore()
	const toastStore = getToastStore()

	$: {
		if (pageCurrent) {
			const settings: DrawerSettings = {
				id: 'auth',
				position: 'bottom',
				height: 'h-[75%]',
				meta: {
					formObj: forms[pageCurrent],
					onCustomFieldAction,
					onCloseDrawer: () => (pageCurrent = '')
				}
			}
			drawerStore.open(settings)
		}
	}

	async function onCustomFieldAction(event: CustomEvent) {
		const { type, value } = event.detail
		switch (type.toLowerCase()) {
			case 'page':
				pageCurrent = value
				break

			case 'resend_code':
				sendCode(authSecurityCodePhone)
				break

			case 'submit':
				switch (value.toLowerCase()) {
					case 'form_auth_login':
						await process(forms[value])
						break

					case 'form_auth_verify_phone_mobile':
						const securityCode: FieldValue = forms[value].getFieldValue('authSecurityCode')
						if (securityCode.display !== authSecurityCode.toString()) {
							alert('The security code you entered is not correct. Please try again')
							return
						}
						await process(formProcess)
						break

					case 'form_auth_signup':
					case 'form_auth_reset_password':
						formProcess = forms[value]
						verifyFrom = value
						pageCurrent = 'form_auth_verify_phone_mobile'
						const userName: FieldValue = forms[value].getFieldValue('userName')
						await sendCode(userName.display)
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'onCustomFieldAction',
							message: `No case defined for submit value: ${value}`
						})
				}
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'onCustomFieldAction',
					message: `No case defined for type: ${type}`
				})
		}
	}

	async function process(form: Form) {
		const msgFail = 'Something is wrong with the credentials you entered. Please try again.'
		drawerStore.close()
		pageCurrent = ''

		// encrypt password
		const fieldName = 'password'
		let password: FieldValue | undefined = form.getFieldValue(fieldName)
		if (password) {
			const encryptedPassword = await encrypt(password.data)
			// console.log('authPage.encryptedPassword:', encryptedPassword)
			form.setFieldValue(fieldName, new FieldValue(encryptedPassword, encryptedPassword))
		}

		// process
		const dataObj: DataObj = await processByObject(form, { system: data.system })
		if (!dataObj) {
			alert(msgFail)
			return
		}
		const rtn = Array.isArray(dataObj.data) ? dataObj.data[0] : dataObj.data

		if (!rtn || !rtn.hasOwnProperty('userId') || !rtn.userId) {
			alert(msgFail)
			return
		} else {
			if (verifyFrom === 'form_auth_account') {
				const t: ToastSettings = {
					message: 'Your account has been updated!'
				}
				toastStore.trigger(t)
			} else {
				const user = await getUser(rtn.userId)
				initUser(user)

				// set cookie
				await fetch('/auth', {
					method: 'POST',
					body: JSON.stringify({
						action: 'set_cookie',
						userId: rtn.userId
					})
				})

				goto('/home')
			}
		}
	}

	async function sendCode(phoneMobile: string) {
		const min = 100000
		const max = 999999
		authSecurityCode = Math.floor(Math.random() * (max - min + 1)) + min
		authSecurityCodePhone = phoneMobile

		await fetch('/auth', {
			method: 'POST',
			body: JSON.stringify({
				action: 'sms_send',
				phoneMobile: authSecurityCodePhone,
				message: `Mobile phone number verification code: ${authSecurityCode}`
			})
		})
	}
	export async function getUser(userId: string) {
		const responsePromise = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify({ userId })
		})
		const response: ResponseBody = await responsePromise.json()
		return response.data
	}
</script>

<!-- <DataViewer header="CurrentPage" data={pageCurrent} />
<DataViewer header="Code" data={authSecurityCode} /> -->
