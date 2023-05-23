import { json } from '@sveltejs/kit'
import { fetchESP } from '$server/formFetch.js'

export async function POST({ request, cookies }) {
	const data = request.json()
	const { formId, actionType, actionURL, actionMethod, actionData } = await data
	let responseData

	switch (formId) {
		case 'auth_login':
		case 'auth_signup':
			const response = await fetchESP(actionURL, actionMethod, actionData)
			if (!response.hasOwnProperty('success') || !response.success) {
				// success
				const userId = response.applicantId
				cookies.set('user_id', userId, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 60 * 60 * 24 * 7 // one week
				})
			}
			return json(response)

			break
		case 'auth_reset_password':
			break

		case 'auth_verify_phone_mobile':
			break
	}
}

function processApiResult(response) {
	console.log('response...')
	console.log(response)
	const data1 = {
		success: true,
		errors: {}
	}
	return json(data1, { status: 400 })

	if (response.success == false) {
		return new Response()
	}
	console.log('processApiResult:', response)

	return {
		success: true,
		data: response
	}
}
