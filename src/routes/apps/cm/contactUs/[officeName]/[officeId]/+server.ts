import {
	FormSource,
	FormSourceDBAction,
	FormSourceResponse,
	type FormSourceResponseType
} from '$comps/types'
import { processForm } from '$server/dbForm'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/apps/cm/contactUs/[officeName]/[officeId]+server.ts'

export async function POST({ request, cookies }) {
	const requestData = await request.json()
	const { formName, source, data } = requestData

	const respMsg = await addMsg(formName, source, data)
	const respAlert = await sendAlert(data)
	if (!respAlert.hasOwnProperty('server')) {
		return FormSourceResponse({ success: false })
	}
	return FormSourceResponse(respMsg)

	async function addMsg(formName: string, source: FormSource, data: {}) {
		const responsePromise = await processForm(formName, source, FormSourceDBAction.upsert, data)
		if (responsePromise) {
			const response: FormSourceResponseType = await responsePromise.json()
			if (!response.success) {
				throw error(400, {
					file: FILENAME,
					function: `POST form: ${formName}`,
					message: response.message
				})
			}
			return response
		}
	}

	async function sendAlert(data: {}) {
		const url = 'https://moed-yo-api.theappfactory.com/msg/send_email_alert_esp'
		const body = {
			applicantId: data.user_id,
			alertType: 'Message',
			content: data.msgContent
		}
		const responsePromise = await fetch(url, {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(body)
		})
		const response: FormSourceResponseType = await responsePromise.json()
		return response
	}
}
