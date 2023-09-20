import { HTMLMETHOD } from '$comps/types'
import { dbESPAPI } from '$server/dbESP'

export async function POST({ request }) {
	const method = HTMLMETHOD.POST
	const procedure = 'ws_cm_ssr_disclosure'

	const { applicantId } = await request.json()
	const data = {
		applicantId,
		disclosure: 1
	}

	return await dbESPAPI(method, procedure, data)
}
