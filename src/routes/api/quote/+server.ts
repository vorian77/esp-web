import { API_NINJAS_SECRET } from '$env/static/private'
import { processForm } from '$server/dbForm'
import { getServerResponse } from '$comps/types'

const CATEGORIES = ['inspirational', 'courage']
// const CATEGORIES = [
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

const COLORS = [
	'#edb879',
	'#1979a9',
	'#e07b39',
	'#042f66',
	'#3b79e1',
	'#4F46E5',
	'#0EA5E9',
	'#84cc16',
	'#EAB308',
	'#D41976',
	'#495a8f'
]

export async function GET({ request }) {
	let quotes = []

	const COLOR = { color: COLORS[Math.floor(Math.random() * COLORS.length)] }
	const CATEGORY_IDX = Math.floor(Math.random() * (CATEGORIES.length + 1))
	const API = 'https://api.api-ninjas.com/v1/quotes?limit=1&category=' + CATEGORIES[CATEGORY_IDX]
	const DEMO_QUOTE = {
		quote:
			'If you accept the expectations of others, especially negative ones, then you never will change the outcome.',
		author: 'Michael Jordon',
		category: 'inspirational'
	}

	async function getQuote() {
		const quotesRes: Response = await fetch(API, {
			method: 'GET',
			headers: {
				'X-API-KEY': API_NINJAS_SECRET,
				contentType: 'application/json'
			}
		})
		quotes = await quotesRes.json()
		const quote = quotes.length > 0 ? quotes[0] : DEMO_QUOTE
		return quote
		// return DEMO_QUOTE
	}

	const quote = await getQuote()
	return getServerResponse({ ...quote, ...COLOR })
}
