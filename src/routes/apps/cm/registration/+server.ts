import { dbESPAPI } from '$server/dbESP'
import { HTMLMETHOD } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/apps/cm/registration/+server.ts'

export const POST = async ({ locals }) => {
	const responsePromise = await dbESPAPI(HTMLMETHOD.POST, 'ws_cm_ssr_status', {
		applicantId: locals.user.user_id,
		status: 'Submitted'
	})
	const response = await responsePromise.json()
	return new Response(JSON.stringify(response.data))
}
