import { API_NINJAS_SECRET } from '$env/static/private'
const categories = ['inspirational', 'courage']
// const categories = [
// 	'amazing',
// 	'art',
// 	'beauty',
// 	'best',
// 	'change',
// 	'courage',
// 	'dreams',
// 	'education',
// 	'equality',
// 	'experience',
// 	'failure',
// 	'faith',
// 	'family',
// 	'fear',
// 	'forgiveness',
// 	'friendship',
// 	'funny',
// 	'future',
// 	'great',
// 	'happiness',
// 	'history',
// 	'hope',
// 	'imagination',
// 	'inspirational',
// 	'intelligence',
// 	'knowledge',
// 	'leadership',
// 	'learning',
// 	'life',
// 	'success'
// ];

const demoQuote = {
	quote:
		"If you accept the expectations of others, especially negative ones, then you never will change the outcome.'",
	author: 'Michael Jordon',
	category: 'inspirational'
}

export async function fetchQuote() {
	const categoryIdx = Math.floor(Math.random() * (categories.length + 1))
	const api = 'https://api.api-ninjas.com/v1/quotes?limit=1&category=' + categories[categoryIdx]

	const quotesRes = await fetch(api, {
		method: 'GET',
		headers: {
			'X-API-KEY': API_NINJAS_SECRET,
			contentType: 'application/json'
		}
	})
	let quotesData = await quotesRes.json()
	// console.log('quotes', quotesData)
	if (quotesData.length == 0) {
		quotesData = [demoQuote]
	}
	return quotesData[0]
}

// throw error(404', 'Not found');
