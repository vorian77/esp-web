import { fetchESPAPI } from '$server/esp'
import { getArray } from '$utils/utils'
import { getEnvVar } from '$server/env'

export async function load({ locals }) {
	async function fetchDocsStatu() {
		console.log('docs...')
		console.log(locals.user)

		const response = await fetchESPAPI('GET', 'ws_cm_ssr_elg_list', {
			referralId: 321140,
			orgId: getEnvVar('ESP_ORG_ID')
		})
		return getArray(await response.json())
	}

	return {
		docsStatus: await fetchDocsStatu()
	}
}
