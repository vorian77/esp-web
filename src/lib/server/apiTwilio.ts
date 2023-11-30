import pkg from 'twilio'
const { Twilio } = pkg
import { error } from '@sveltejs/kit'

const FILENAME = '$server/twilio.ts'

import {
	TWILIO_ACCT_SID,
	TWILIO_AUTH_TOKEN,
	TWILIO_PHONE_NBR,
	TWILIO_MAXPRICE
} from '$env/static/private'

export async function sendText(phoneNbrTo: string, textBody: string) {
	const twilio = new Twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN)

	// parms
	const parms = {
		from: TWILIO_PHONE_NBR,
		to: phoneNbrTo,
		body: textBody,
		MaxPrice: TWILIO_MAXPRICE
	}

	try {
		const message = await twilio.messages.create(parms)
		return new Response(JSON.stringify({ success: true, data: { sid: message.sid, parms } }))
	} catch (err) {
		throw error(500, {
			file: FILENAME,
			function: 'sendText',
			message:
				`Attempt to send text failed...` +
				'\n' +
				'Error: ' +
				JSON.stringify(err) +
				'\n' +
				'Parms: ' +
				JSON.stringify(parms)
		})
	}
}
