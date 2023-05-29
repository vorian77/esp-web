import { SubmitActionTarget } from '$comps/esp/form/form'
import { fetchESP } from '$server/esp'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/formFetch.+server.ts'

export async function POST({ request }) {
	const { submitAction, data } = await request.json()

	switch (submitAction.target) {
		case SubmitActionTarget.esp_api:
			return await fetchESP(submitAction, data)
			break

		case SubmitActionTarget.esp_sql:
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for SubmitAction.target: ${target}`
			})
	}
}
