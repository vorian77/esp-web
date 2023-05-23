import { fetchESP } from '$server/formFetch.js'
import { fetchQuote } from '$server/quotes'

export async function load({ fetch, cookies }) {
	async function fetchApplicant() {
		const applicantId = cookies.get('user_id')

		const url = 'ws_cm_ssr_applicant'
		const method = 'GET'
		const data = { applicantId }
		const response = await fetchESP(url, method, data)
		return response
	}

	return {
		quote: await fetchQuote(),
		user: await fetchApplicant()
	}
	// throw error(404', 'Not found');
}
