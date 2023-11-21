import sgMail from '@sendgrid/mail'
import { strOptional, strRequired, valueOrDefault } from '$utils/utils'
import { getServerResponse } from '$comps/types'

const FILENAME = '$server/sendGrid.ts'

import { SENDGRID_API_KEY } from '$env/static/private'

sgMail.setApiKey(SENDGRID_API_KEY)

export async function sendEmail(emailData: EmailData) {
	const msg = {
		to: emailData.to,
		from: 'alerts@TheAppFactory.com',
		subject: emailData.subject,
		text: emailData.body,
		html: emailData.body
	}
	const output = await sgMail.send(msg)
	if (Array.isArray(output) && output[0].statusCode == 202) {
		// success
		return { success: true, data: output[0] }
	} else {
		// error
		return { success: false, data: output }
	}
}

export class EmailData {
	to: string
	subject: string
	body: string

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		this.to = strRequired(obj.to, 'EmailData', 'to')
		this.subject = strRequired(obj.subject, 'EmailData', 'subject')
		this.body = strRequired(obj.body, 'EmailData', 'body')
	}
}

export class EmailAlert {
	alert: EmailData

	constructor(obj: any) {
		obj = valueOrDefault(obj, {})
		const to = strRequired(obj.to, 'EmailData', 'to')
		const applicant = strRequired(obj.applicant, 'EmailAlert', 'applicant')
		const type = strRequired(obj.type, 'EmailAlert', 'type')
		const content = strOptional(obj.content, 'EmailAlert', 'content')
		const siteCurrent = strRequired(obj.site_current, 'EmailAlert', 'siteCurrent')
		const sitePrevious = strRequired(obj.site_previous, 'EmailAlert', 'sitePrevious')

		const subject = 'KidSmart - New Self-Service App File Update - ' + type + ' (' + applicant + ')'
		let body =
			'<h3>Please check CaseManager for a file modification initiated by the applicant: </h3>' +
			'<p><b>Applicant:</b> ' +
			applicant +
			'</p>' +
			'<p><b>Upload Type:</b> ' +
			type +
			'</p>' +
			'<p><b>Current Site:</b> ' +
			siteCurrent +
			'</p>' +
			'<p><b>Previous Site:</b> ' +
			sitePrevious +
			'</p>'

		if (content) {
			body += '<p></p><p><b>Message Content: </b>' + content + '</p>'
		}
		body = '<!DOCTYPE html> <html> <body>' + body + '</body> </html>'

		this.alert = new EmailData({ to, subject, body })
	}
}
