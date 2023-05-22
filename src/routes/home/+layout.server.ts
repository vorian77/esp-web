import { fetchQuote } from '$server/quotes'

export async function load({ fetch }) {
	return {
		quote: await fetchQuote()
	}
	// throw error(404', 'Not found');
}
