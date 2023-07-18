import { dbESPAPI } from '$server/dbESP'
import { HTMLMETHOD } from '$comps/types'
import { sendEmail, EmailAlert } from '$server/apiSendGrid.js'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/apps/cm/application/+server.ts'

export const POST = async ({ locals }) => {
	const responsePromise = await dbESPAPI(HTMLMETHOD.POST, 'ws_cm_ssr_registration', {
		applicantId: locals.user.user_id
	})
	const respReg = await responsePromise.json()
	console.log('respReg:', respReg)
	const respEmail = await sendMsgToStaffEmail(respReg.data)
	return new Response(JSON.stringify(respReg.data))

	async function sendMsgToStaffEmail(data: {}) {
		const emailAlert = new EmailAlert({ type: 'New Application', to: data.emailAddresses, ...data })
		return sendEmail(emailAlert.alert)
	}
}
