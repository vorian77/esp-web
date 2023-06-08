import { redirect } from '@sveltejs/kit'
import { dbESPAPI } from '$server/dbESP'
import { getEnvVar } from '$server/env'
import type { FormSourceResponseType } from '$comps/esp/form/types'

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

	if (event.url.pathname.startsWith('/apps/cm')) {
		async function fetchUser() {
			const responsePromise = await dbESPAPI('GET', 'ws_cm_ssr_user', {
				userId: sessionId,
				orgId: getEnvVar('ESP_ORG_ID')
			})
			const response: FormSourceResponseType = await responsePromise.json()

			if (!response.data.user_id) {
				throw redirect(303, '/welcome')
			}
			return response.data
		}
		let user = await fetchUser()
		user['referrals'] = user['referrals'].split(';')
		user['referrals'] = user['referrals'].map((ref) => ref.split(','))
		;(user['referrals'] = user['referrals'].map((ref) => new Object({ id: ref[0], site: ref[1] }))),
			(user['referral_id'] = user['referrals'][0].id)

		event.locals.user = user
		// console.log('hooks...')
		// console.log(event.locals.user)
	}
	return resolve(event)
}
