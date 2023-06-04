import { fetchESPAPI } from '$server/esp'
import { getArray } from '$utils/utils'
import { getEnvVar } from '$server/env'

export async function load({ locals }) {
	async function fetchDocsStatuses() {
		console.log('docs...')
		const referralId = locals.user.referrals[0]['id']
		console.log('refId:', referralId)

		const response = await fetchESPAPI('GET', 'ws_cm_ssr_elg_list', {
			referralId,
			orgId: getEnvVar('ESP_ORG_ID')
		})
		return getArray(await response.json())
	}

	return {
		docsStatus: await fetchDocsStatuses()
	}
}
