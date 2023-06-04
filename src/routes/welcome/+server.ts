import { sendText } from '$server/twilio'
import { getResponseObj } from '$utils/utils'
import { formFetch } from '$server/formFetch'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/welcome/+server.ts'

export async function POST({ request, cookies, locals }) {
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
					const response = await formFetch(source, data)
					const responseData = getResponseObj(await response.json(), {})

					const userId = responseData.applicantId
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
					return new Response(JSON.stringify({ success: true, data: responseData }))
					break

				case 'auth_verify_phone_mobile':
					return new Response(JSON.stringify({ success: true, data }))
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
}
