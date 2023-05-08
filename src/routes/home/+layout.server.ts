import { fetchQuote } from '$server/quotes';

export async function load({ fetch }) {
	return {
		quote: await fetchQuote(),
		user: 'Jason Jones',
		title: 'My CaseManager'
	};
	// throw error(404', 'Not found');
}
