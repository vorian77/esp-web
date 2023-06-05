import { fetchESPAPI } from '$server/esp'
import { getArray } from '$utils/utils'
import { getEnvVar } from '$server/env'

export async function load({ locals }) {
	async function fetchDocsStatuses() {
		const response = await fetchESPAPI('GET', 'ws_cm_ssr_elg_list', {
			referralId: locals.user.referral_id,
			orgId: getEnvVar('ESP_ORG_ID')
		})
		return getArray(await response.json())
	}

	return {
		docsStatus: await fetchDocsStatuses()
	}
}
