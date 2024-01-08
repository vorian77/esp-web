import { State } from '$comps/nav/types.app'
import type { DrawerSettings } from '@skeletonlabs/skeleton'
import type { FieldCustomAction } from '$comps/form/fieldCustom'
import type { DataObjRecord, ResponseBody } from '$comps/types'
import { encrypt, userSet } from '$comps/types'
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
			openDrawer(value)
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
						alert('The security code you entered is not correct. Please try again.')
						return
					}
					state.messageToast.trigger({ message: 'Your account has been updated!' })
					await processAuthCredentials(verifyFrom, verifyData)
					break

				case 'data_obj_auth_reset_password_account':
				case 'data_obj_auth_reset_password_login':
					verifyFrom = value
					verifyData = data
					await sendCode(getDataValue(data, 'userName'))
					openDrawer('data_obj_auth_verify_phone_mobile')
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
			const password = await encrypt(getDataValue(data, 'password'))
			data['password'] = new FieldValue(password, password, [])
		}

		console.log('processAuthCredentials', { dataObjName, data })

		// process
		let result: ResponseBody = await apiFetch(
			ApiFunction.dbEdgeProcessQuery,
			new TokenApiQuery(
				TokenApiQueryType.expression,
				new TokenApiDbDataObj({ dataObjName }),
				new TokenApiQueryData({ parms: data })
			)
		)

		if (result.success && Object.hasOwn(result.data, 'userId')) {
			const userId = result.data['userId']
			result = await apiFetch(ApiFunction.getUser, new TokenApiUser(userId))
			if (result.success) {
				userSet(result.data)
				state.messageDrawer.close()
				if (['data_obj_auth_login', 'data_obj_auth_reset_password_login'].includes(dataObjName)) {
					// set cookie
					await fetch('/auth', {
						method: 'POST',
						body: JSON.stringify({
							action: 'set_cookie',
							userId
						})
					})
					goto('/home')
				}
			} else {
				error(500, {
					file: FILENAME,
					function: 'processAuthCredentials',
					message: `Unable to retrieve user id: ${userId}`
				})
			}
		} else {
			alert(msgFail)
			return
		}
	}
	function openDrawer(dataObjName: string) {
		const settings: DrawerSettings = {
			id: 'auth',
			position: 'bottom',
			height: 'h-[30%]',
			meta: { dataObjName }
		}
		state.messageDrawer.open(settings)
	}
}

async function sendCode(phoneMobile: string) {
	const min = 100000
	const max = 999999
	authSecurityCode = Math.floor(Math.random() * (max - min + 1)) + min
	authSecurityCodePhone = phoneMobile
	console.log('authSecurityCode:', authSecurityCode)
	await apiFetch(
		ApiFunction.sendText,
		new TokenApiSendText(phoneMobile, `Mobile phone number verification code: ${authSecurityCode}`)
	)
}

function getDataValue(data: DataObjRecord, key: string) {
	return data[key].data
}
