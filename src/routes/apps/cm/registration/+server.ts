import { dbESPAPI } from '$server/dbESP'
import { HTMLMETHOD } from '$comps/types'
import { sendEmail, EmailAlert } from '$server/apiSendGrid.js'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/apps/cm/registration/+server.ts'

export const POST = async ({ locals }) => {
	const responsePromise = await dbESPAPI(HTMLMETHOD.POST, 'ws_cm_ssr_status', {
		applicantId: locals.user.user_id,
		status: 'Submitted'
	})
	const respStatus = await responsePromise.json()
	const respEmail = await sendMsgToStaffEmail(respStatus.data)
	return new Response(JSON.stringify(respStatus.data))

	async function sendMsgToStaffEmail(data: {}) {
		const emailAlert = new EmailAlert({ type: 'New Application', to: data.emailAddresses, ...data })
		return sendEmail(emailAlert.alert)
	}
}
