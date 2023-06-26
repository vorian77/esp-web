import { redirect } from '@sveltejs/kit'
import { dbESPAPI } from '$server/dbESP'
import { getEnvVar } from '$server/env'
import { HTMLMETHOD, type FormSourceResponseType } from '$comps/types'

const routesUnprotected = ['/about']
const routesSession = ['/api', '/legalDisclosure', '/profile']

export async function handle({ event, resolve }) {
	console.log()
	console.log('hooks.handle.url:', event.url.pathname)

	if (event.url.pathname == '/') {
		event.cookies.delete('session_id', { path: '/' })
		return resolve(event)
	}

	if (event.url.pathname.startsWith('/logout')) {
		event.cookies.delete('session_id', { path: '/' })
		throw redirect(303, '/')
	}

	if (routesUnprotected.includes(event.url.pathname)) {
		return resolve(event)
	}

	// remaining routes require sessionId
	const sessionId = event.cookies.get('session_id')
	if (!sessionId) {
		throw redirect(303, '/')
	}

	// get user info
	event.locals.user = await fetchUser(sessionId)
	if (!event.locals.user) {
		throw redirect(303, '/')
	}

	// allow session routes
	if (routesSession.includes(event.url.pathname)) {
		return resolve(event)
	}

	// confirm legal disclosure
	if (!event.locals.user.cm_ssr_disclosure) {
		throw redirect(303, '/legalDisclosure')
	}

	// security protected routes
	return resolve(event)
}

export const handleError = ({ error, event }) => {
	const message =
		error instanceof Error
			? error.message
			: 'Something unexpected happend. Please try again, or report the problem.'
	return {
		file: event.route.id || 'unknown',
		function: 'unknown',
		message
	}
}

async function fetchUser(sessionId: string) {
	const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_user', {
		userId: sessionId,
		orgId: getEnvVar('ESP_ORG_ID')
	})
	const response: FormSourceResponseType = await responsePromise.json()

	if (!response.data.user_id) {
		throw redirect(303, '/')
	}

	// set user
	const user = response.data

	// transpose referrals
	user['referrals'] = user['referrals'].split(';')
	user['referrals'] = user['referrals'].map((ref: string) => ref.split(','))
	user['referrals'] = user['referrals'].map(
		(ref: Array<{ id: number; site: string }>) => new Object({ id: ref[0], site: ref[1] })
	)
	user['referral_id'] = user['referrals'][0].id

	console.log('hooks.server.fetchUser:', user)

	return user
}
