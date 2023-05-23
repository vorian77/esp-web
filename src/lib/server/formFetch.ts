// import { json } from '@sveltejs/kit'
import axios from 'axios'
import qs from 'qs'

export async function fetchESP(url, method, data) {
	const urlPrefix = 'https://esp1.kssc.com:3000/esp/'
	url = urlPrefix + url
	let options = { method, url }
	switch (method.toLowerCase()) {
		case 'get':
			options.params = data
			break
		default:
			options.data = qs.stringify(JSON.parse(data))
	}

	try {
		console.log('Axios options', options)
		const resp = await axios(options)
		return resp.data
	} catch (err) {
		console.error('error:', err.response.status)
		return { success: false, status: err.response.status, message: err.message }
	}

	// url = 'https://esp1.kssc.com:3000/esp/ws_test'
	// method = 'POST'
	// body = { data: '{"status":"200","parm1":"v1-phyl","parm2":"v2-phyl"}' }

	// console.log('fetchAPI', url, method, body)

	// const response = await fetch(url, {
	// 	method,
	// 	body,
	// 	headers: {
	// 		contentType: 'application/x-www-form-urlencoded'
	// 	}
	// })

	// const response = await fetch('https://esp1.kssc.com:3000/test/echo?p1=v1&p2=v2&p3=v3', {
	// 	method: 'GET'
	// })

	// const response = await fetch('https://esp1.kssc.com:3000/esp/ws_test', {
	// 	method: 'POST',
	// 	body: '{"status":"200","parm1":"v1-phyl","parm2":"v2-phyl"}',
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	}
	// })

	const responseData = await response.text()
	//const responseBody = await response

	console.log('response:', responseData)
	return {}
}

// SQL
