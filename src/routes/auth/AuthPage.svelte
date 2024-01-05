<script lang="ts">
	import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton'
	import type { DataObjRecord, ResponseBody } from '$comps/types'
	import { encrypt, setUser } from '$comps/types'
	import { FieldValue } from '$comps/form/field'
	import {
		apiFetch,
		ApiFunction,
		TokenApiDbDataObj,
		TokenApiQuery,
		TokenApiQueryData,
		TokenApiQueryType,
		TokenApiSendText,
		TokenApiUser
	} from '$lib/api'
	import { goto } from '$app/navigation'
	import { error } from '@sveltejs/kit'
	import DataViewer from '$comps/DataViewer.svelte'

	const drawerStore = getDrawerStore()
	const toastStore = getToastStore()

	const FILENAME = 'routes/authPage.svelte'

	export let pageCurrent = ''

	let forms = [
		'data_obj_auth_login',
		'data_obj_auth_reset_password',
		'data_obj_auth_verify_phone_mobile'
	]
	let verifyFrom = ''
	let verifyData: DataObjRecord = {}
	let authSecurityCodePhone = ''
	let authSecurityCode = 0

	$: if (pageCurrent) {
		const settings: DrawerSettings = {
			id: 'auth',
			position: 'bottom',
			height: 'h-[30%]',
			meta: {
				dataObjName: pageCurrent,
				onCustomFieldAction,
				onCloseDrawer: () => (pageCurrent = '')
			}
		}
		drawerStore.open(settings)
	}

	async function onCustomFieldAction(event: CustomEvent) {
		let { action, data } = event.detail
		const type = action.type.toLowerCase()
		const value = action.value.toLowerCase()

		switch (type) {
			case 'page':
				pageCurrent = value
				break

			case 'resend_code':
				sendCode(authSecurityCodePhone)
				break

			case 'submit':
				switch (value) {
					case 'data_obj_auth_login':
						await processAuthCredentials(value, data)
						break

					case 'data_obj_auth_verify_phone_mobile':
						const securityCode = getDataValue(data, 'authSecurityCode')
						if (securityCode !== authSecurityCode.toString()) {
							alert('The security code you entered is not correct. Please try again')
							return
						}
						await processAuthCredentials(verifyFrom, verifyData)
						break

					case 'data_obj_auth_reset_password':
						verifyFrom = value
						verifyData = data
						pageCurrent = 'data_obj_auth_verify_phone_mobile'
						await sendCode(getDataValue(data, 'userName'))
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'onCustomFieldAction-submit',
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

	async function processAuthCredentials(formName: string, data: any) {
		const msgFail = 'Something is wrong with the credentials you entered. Please try again.'

		// encrypt password
		if (data.hasOwnProperty('password')) {
			const password = await encrypt(getDataValue(data, 'password'))
			data['password'] = new FieldValue(password, password, [])
		}

		// process
		const result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessQuery,
			new TokenApiQuery(
				TokenApiQueryType.expression,
				new TokenApiDbDataObj({ dataObjName: formName }),
				new TokenApiQueryData({ parms: data })
			)
		)
		if (result.success && result.data.hasOwnProperty('userId')) {
			const userId = result.data['userId']
			if (verifyFrom === 'data_obj_auth_account') {
				const t: ToastSettings = {
					message: 'Your account has been updated!'
				}
				toastStore.trigger(t)
			} else {
				const result: ResponseBody = await apiFetch(ApiFunction.getUser, new TokenApiUser(userId))
				if (result.success) {
					setUser(result.data)

					// set cookie
					await fetch('/auth', {
						method: 'POST',
						body: JSON.stringify({
							action: 'set_cookie',
							userId
						})
					})
				}
			}
			drawerStore.close()
			pageCurrent = ''
			goto('/home')
		} else {
			alert(msgFail)
			return
		}
	}

	async function sendCode(phoneMobile: string) {
		const min = 100000
		const max = 999999
		authSecurityCode = Math.floor(Math.random() * (max - min + 1)) + min
		authSecurityCodePhone = phoneMobile
		await apiFetch(
			ApiFunction.sendText,
			new TokenApiSendText(
				phoneMobile,
				`Mobile phone number verification code: ${authSecurityCode}`
			)
		)
	}
	function getDataValue(data: DataObjRecord, key: string) {
		return data[key].data
	}
</script>

<!-- <DataViewer header="CurrentPage" data={pageCurrent} /> -->
<!-- <DataViewer header="Code" data={authSecurityCode} /> -->
