import { fetchQuote } from '$server/quotes'
import { fetchESPAPI } from '$server/esp'

const FILENAME = '/routes/home/cm/+layout.server.ts'

export async function load({ fetch, cookies }) {
	async function fetchApplicant() {
		const response = await fetchESPAPI('GET', 'ws_cm_ssr_applicant', {
			applicantId: cookies.get('session_id')
		})
		// process response
		return await response.json()
	}

	return {
		quote: await fetchQuote(),
		user: await fetchApplicant()
	}
}
