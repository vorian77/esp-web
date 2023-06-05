import axios from 'axios'
import { error } from '@sveltejs/kit'

const FILENAME = '/server/esp.ts'

export async function fetchESPAPI(method, url, data) {
	let options = { method, url: 'https://esp1.kssc.com:3000/esp/' + url }
	switch (method.toLowerCase()) {
		case 'get':
			options.params = data
			break
		default:
			options.data = data
	}

	try {
		// console.log('Axios.options:', options)
		const resp = await axios(options)
		// console.log('Axios.resp: ', resp.data)
		return new Response(JSON.stringify(resp.data))
	} catch (err: any) {
		throw error(500, {
			file: FILENAME,
			function: 'fetchESP',
			message: `Axios staus: ${err.response.status} stausText: ${err.response.statusText} message: ${err.message}`
		})
	}
}
