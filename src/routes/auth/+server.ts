import { sendText } from '$server/apiTwilio'
import { processForm } from '$server/dbForm'
import { error } from '@sveltejs/kit'
import {
	FormSource,
	FormSourceDBAction,
	FormSourceResponse,
	type FormSourceResponseType
} from '$comps/types'

const FILENAME = '/routes/welcome/+server.ts'

let rtnData = {}

export async function POST({ request, cookies }) {
	const requestData = await request.json()
	const { action } = requestData

	switch (action) {
		case 'sms_send':
			const { phoneMobile, message } = requestData
			return sendText(phoneMobile, message)
			break

		case 'form_submit':
			const { formName, source, data } = requestData

			switch (formName) {
				case 'auth_login':
				case 'auth_verify_phone_mobile':
					rtnData = await processAuth(formName, source, data)
					if (rtnData.hasOwnProperty('applicantId')) {
						cookies.set('session_id', rtnData.applicantId, {
							path: '/',
							httpOnly: true,
							sameSite: 'strict',
							secure: true,
							maxAge: 60 * 60 * 24 * 7 // one week
						})
					}
					break

				case 'auth_account':
				case 'auth_reset_password':
				case 'auth_signup':
					rtnData = data
					break
				default:
					throw error(500, {
						file: FILENAME,
						function: 'POST',
						message: `No case defined for formName: ${formName}`
					})
			}
			break
	}
	return FormSourceResponse(rtnData)

	async function processAuth(formName: string, source: FormSource, data: {}) {
		const responsePromise = await processForm(formName, source, FormSourceDBAction.upsert, data)
		if (responsePromise) {
			const response: FormSourceResponseType = await responsePromise.json()
			if (!response.success) {
				throw error(400, {
					file: FILENAME,
					function: `processAuth: ${formName}`,
					message: response.message
				})
			}
			return response.data
		}
	}
}
