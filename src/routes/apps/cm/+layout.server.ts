import { fetchQuote } from '$server/apiQuotes'

const FILENAME = '/routes/apps/cm/+layout.server.ts'

export async function load({ locals }) {
	return {
		quote: await fetchQuote(),
		user: locals.user
	}
}
