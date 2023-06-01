import { redirect } from '@sveltejs/kit'
import { fetchESPAPI } from '$server/esp'
import { getResponseObj } from '$utils/utils'

const unProtectedRoutes = ['/', '/welcome']

export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get('session_id')
	if (!sessionId && !unProtectedRoutes.includes(event.url.pathname)) {
		throw redirect(303, '/welcome')
	}

	if (event.url.pathname.startsWith('/logout')) {
		event.cookies.delete('session_id', { path: '/' })
		throw redirect(303, '/welcome')
	}

	if (event.url.pathname.startsWith('/home/cm')) {
		async function fetchUser() {
			const response = await fetchESPAPI('GET', 'ws_cm_ssr_user', { userId: sessionId })
			const resp = getResponseObj(await response.json(), {})
			if (!resp.user_id) {
				throw redirect(303, '/welcome')
			}
			return resp
		}
		event.locals.user = await fetchUser()
	}
	return resolve(event)
}
