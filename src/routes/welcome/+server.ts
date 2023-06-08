import { sendText } from '$server/twilio'
import { processForm } from '$server/dbForm'
import { error } from '@sveltejs/kit'
import {
	FormSourceDBAction,
	FormSourceResponse,
	type FormSourceResponseType
} from '$comps/esp/form/types'

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
			const { formId, source, data } = requestData

			switch (formId) {
				case 'auth_login':
				case 'auth_reset_password':
				case 'auth_signup':
					console.log('/ROUTES/WELCOME/+server.ts...')
					console.log('formId:', formId)
					const responsePromise = await processForm(
						source.actions[FormSourceDBAction.update],
						FormSourceDBAction.update,
						data
					)
					const response: FormSourceResponseType = await responsePromise.json()
					console.log('response.data:', response.data)

					const userId = response.data.applicantId
					if (!userId) {
						throw error(500, {
							file: FILENAME,
							function: `POST.form_submit: ${formId}`,
							message: `Invalid userId returned. Parms: ${JSON.stringify(data)}`
						})
					}

					cookies.set('session_id', userId, {
						path: '/',
						httpOnly: true,
						sameSite: 'strict',
						secure: true,
						maxAge: 60 * 60 * 24 * 7 // one week
					})
					rtnData = response.data
					break

				case 'auth_verify_phone_mobile':
					rtnData = data
					break
				default:
					throw error(500, {
						file: FILENAME,
						function: 'POST',
						message: `No case defined for formId: ${formId}`
					})
			}
			break
	}
	return FormSourceResponse(rtnData)
}
