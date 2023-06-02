import { fetchQuote } from '$server/quotes'

const FILENAME = '/routes/apps/cm/+layout.server.ts'

export async function load({ locals }) {
	return {
		quote: await fetchQuote(),
		user: locals.user
	}
}
