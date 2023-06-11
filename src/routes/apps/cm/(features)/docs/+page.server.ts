import { dbESPAPI } from '$server/dbESP'
import type { FormSourceResponseType } from '$comps/esp/form/types'
import { getEnvVar } from '$server/env'

export async function load({ locals }) {
	async function fetchDocsStatuses() {
		const responsePromise = await dbESPAPI('GET', 'ws_cm_ssr_elg_list', {
			referralId: locals.user.referral_id,
			orgId: getEnvVar('ESP_ORG_ID')
		})
		const response: FormSourceResponseType = await responsePromise.json()
		return response.data
	}

	return {
		docsStatus: await fetchDocsStatuses()
	}
}
