import { State, StateLayout, StateObj } from '$comps/nav/types.appState'
import { SurfaceType } from '$comps/types.master'
import type { DrawerSettings } from '@skeletonlabs/skeleton'
import type { FieldCustomAction } from '$comps/form/fieldCustom'
import type { DataObjRecord, ResponseBody } from '$comps/types'
import { encrypt, userInit } from '$comps/types'
import { apiDbQuery, apiFetch, ApiFunction } from '$lib/api'
import {
	TokenApiDbDataObj,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiQueryType,
	TokenApiSendText
} from '$comps/types.token'
import { goto } from '$app/navigation'
import { error } from '@sveltejs/kit'

const FILENAME = '/$enhance/actions/actionAuth.ts'

let verifyFrom = ''
let verifyData: DataObjRecord = {}
let authSecurityCodePhone = ''
let authSecurityCode = 0

export default async function action(state: State, field: FieldCustomAction, data: any) {
	const type = field.type
	const value = field.value

	switch (type) {
		case 'page':
			openDrawer(value, state.drawerStore, state.toastStore)
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
					const securityCode = data['authSecurityCode']
					if (securityCode !== authSecurityCode.toString()) {
						alert('The security code you entered is not correct. Please try again.')
						return
					}
					state.toastStore.trigger({ message: 'Your account has been updated!' })
					await processAuthCredentials(verifyFrom, verifyData)
					break

				case 'data_obj_auth_reset_password_account':
				case 'data_obj_auth_reset_password_login':
					verifyFrom = value
					verifyData = data
					await sendCode(data['userName'])
					openDrawer('data_obj_auth_verify_phone_mobile', state.drawerStore, state.toastStore)
					break

				default:
					error(500, {
						file: FILENAME,
						function: 'action-submit',
						message: `No case defined for submit value: ${value}`
					})
			}
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'action',
				message: `No case defined for type: ${type}`
			})
	}

	async function processAuthCredentials(dataObjName: string, data: any) {
		const msgFail = 'Something is wrong with the credentials you entered. Please try again.'

		// encrypt password
		if (Object.hasOwn(data, 'password')) {
			const password = await encrypt(data['password'])
			data['password'] = password
		}

		// process
		let result: ResponseBody = await apiDbQuery(
			TokenApiQueryType.expression,
			{ dataObjName },
			new TokenApiQueryData({ parms: data })
		)

		if (!result.success || !Object.hasOwn(result.data, 'userId')) {
			alert(msgFail)
			return
		}

		const userId = result.data['userId']
		const user = await userInit(userId)
		if (user && Object.hasOwn(user, 'id')) {
			state.drawerStore.close()
			if (['data_obj_auth_login', 'data_obj_auth_reset_password_login'].includes(dataObjName)) {
				goto('/home')
			}
		}
	}

	function openDrawer(dataObjName: string, drawerStore: any, toastStore: any) {
		const settings: DrawerSettings = {
			id: 'auth',
			position: 'bottom',
			height: 'h-[50%]',
			meta: {
				state: new StateObj({
					dataObjName,
					drawerStore,
					layout: StateLayout.LayoutObj,
					page: '/',
					queryType: TokenApiQueryType.new,
					surface: SurfaceType.overlay,
					toastStore
				})
			}
		}
		drawerStore.open(settings)
	}
}

async function sendCode(phoneMobile: string) {
	const min = 100000
	const max = 999999
	authSecurityCode = Math.floor(Math.random() * (max - min + 1)) + min
	authSecurityCodePhone = phoneMobile
	await apiFetch(
		ApiFunction.sendText,
		new TokenApiSendText(phoneMobile, `Mobile phone number verification code: ${authSecurityCode}`)
	)
}
