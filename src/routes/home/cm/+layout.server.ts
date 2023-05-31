import { fetchQuote } from '$server/quotes'

const FILENAME = '/routes/home/cm/+layout.server.ts'

export async function load({ cookies, locals }) {
	return {
		quote: await fetchQuote(),
		user: locals.user
	}
}
