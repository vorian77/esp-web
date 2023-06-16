import { API_NINJAS_SECRET } from '$env/static/private'
import { valueOrDefault, getResponseObj } from '$utils/utils'
const CATEGORIES = ['inspirational', 'courage']
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

export async function fetchQuote() {
	const productionMode = true
	let quotes = []

	const categoryIdx = Math.floor(Math.random() * (CATEGORIES.length + 1))
	const api = 'https://api.api-ninjas.com/v1/quotes?limit=1&category=' + CATEGORIES[categoryIdx]
	const demoQuote = {
		quote:
			'If you accept the expectations of others, especially negative ones, then you never will change the outcome.',
		author: 'Michael Jordon',
		category: 'inspirational'
	}

	async function getQuote() {
		const quotesRes = await fetch(api, {
			method: 'GET',
			headers: {
				'X-API-KEY': API_NINJAS_SECRET,
				contentType: 'application/json'
			}
		})
		quotes = await quotesRes.json()
		const quote = quotes.length > 0 ? quotes[0] : demoQuote
		// quotes = [...quotes, demoQuote]
		return quote
	}

	const quote = await getQuote()
	const color = { color: COLORS[Math.floor(Math.random() * COLORS.length)] }

	return { ...quote, ...color }
}
