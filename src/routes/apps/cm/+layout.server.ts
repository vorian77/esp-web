import { fetchQuote } from '$server/apiQuotes'

const FILENAME = '/routes/apps/cm/+layout.server.ts'

export async function load({ parent }) {
	const dataParent = await parent()
	return {
		...dataParent,
		quote: await fetchQuote()
	}
}
