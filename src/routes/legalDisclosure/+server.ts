import { HTMLMETHOD } from '$comps/types'
import { dbESPAPI } from '$server/dbESP'
import { asUpsert, asGet } from '$lib/utils/utils'

export async function POST({ request }) {
	// reset user object in locals to force re-retrieval
	asUpsert('user', undefined)

	// update user's disclosure flag
	const method = HTMLMETHOD.POST
	const procedure = 'ws_cm_ssr_disclosure'

	const { applicantId } = await request.json()
	const data = {
		applicantId,
		disclosure: 1
	}

	return await dbESPAPI(method, procedure, data)
}
