import { sendText } from '$server/apiTwilio'
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
			// return sendText(phoneMobile, message)
			break

		case 'form_submit':
			const { formName, source, data } = requestData

			switch (formName) {
				case 'auth_login':
				case 'auth_reset_password':
				case 'auth_signup':
					const responsePromise = await processForm(
						formName,
						source,
						FormSourceDBAction.upsert,
						data
					)
					const response: FormSourceResponseType = await responsePromise.json()
					if (!response.success) {
						throw error(400, response.message)
						break
					}

					const userId = response.data.applicantId
					if (!userId) {
						throw error(500, {
							file: FILENAME,
							function: `POST.form_submit: ${formName}`,
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
						message: `No case defined for formName: ${formName}`
					})
			}
			break
	}
	return FormSourceResponse(rtnData)
}
