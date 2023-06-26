import { dbESPAPI } from '$server/dbESP'
import { HTMLMETHOD } from '$comps/types'
import { getEnvVar } from '$server/env'

export async function load({ locals }) {
	return {
		docsStatus: await getDocsStatus()
	}

	async function getDocsStatus() {
		const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_elg_list', {
			referralId: locals.user.referral_id,
			orgId: getEnvVar('ESP_ORG_ID')
		})
		const response = await responsePromise.json()
		return response.data
	}
}
