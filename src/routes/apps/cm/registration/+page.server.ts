import { getForm } from '$server/dbForm'
import { dbESPAPI } from '$server/dbESP'
import { HTMLMETHOD } from '$comps/types'
import { getEnvVar } from '$server/env'

export async function load({ locals, params }) {
	return {
		formDefns: [
			await getForm('moed_yo_reg_step_1', { ...locals.user, ...params }),
			await getForm('moed_yo_reg_step_2', { ...locals.user, ...params }),
			await getForm('moed_yo_reg_step_3', { ...locals.user, ...params })
		],
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
