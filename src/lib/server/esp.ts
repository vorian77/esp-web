import axios from 'axios'
import { SubmitAction, SubmitActionTarget } from '$comps/esp/form/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/server/esp.ts'

export async function fetchESP(submitAction: SubmitAction, parms: {}) {
	switch (submitAction.target) {
		case SubmitActionTarget.esp_api:
			return await fetchESPAPI(submitAction.method, submitAction.url, parms)
			break

		case SubmitActionTarget.esp_sql:
			break
	}
}

export async function fetchESPAPI(method, url, parms) {
	let options = { method, url: 'https://esp1.kssc.com:3000/esp/' + url }
	switch (method.toLowerCase()) {
		case 'get':
			options.params = parms
			break
		default:
			options.data = parms
	}

	try {
		console.log('Axios.options:', options)
		const resp = await axios(options)
		console.log('Axios.resp: ', resp.data)
		return new Response(JSON.stringify(resp.data))
	} catch (err: any) {
		throw error(500, {
			file: FILENAME,
			function: 'fetchESP',
			message: `Axios staus: ${err.response.status} stausText: ${err.response.statusText} message: ${err.message}`
		})
	}
}
