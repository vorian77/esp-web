import { getForm } from '$server/dbForm'
import { init } from '$server/dbEdge/init/dbEdgeInit'
import { getUser } from '$server/apiUser'
import type { ResponseBody } from '$comps/types'

export async function load({ cookies }) {
	// <temp>  230908 - database init
	await init()

	const sessionId = '170896'
	const user = await fetchUser(sessionId)

	// <temp> 231026 express login
	setCookie()
	function setCookie() {
		cookies.set('session_id', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		})
	}

	return {
		user
		// auth_login: await getForm('auth_login'),
		// auth_signup: await getForm('auth_signup'),
		// auth_verify_phone_mobile: await getForm('auth_verify_phone_mobile'),
		// auth_reset_password: await getForm('auth_reset_password')
	}
}

async function fetchUser(sessionId: string) {
	const responsePromise = await getUser(sessionId)
	const response: ResponseBody = await responsePromise.json()
	return response.data
}
