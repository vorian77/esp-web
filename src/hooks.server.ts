import { redirect } from '@sveltejs/kit'
import { getUser } from '$server/apiUser'
import type { FormSourceResponseType } from '$comps/types'

const FILENAME = 'hooks.server.ts'

const routesUnprotected = ['/about', '/auth']
const routesSession = ['/api', '/legalDisclosure', '/profile']

export async function handle({ event, resolve }) {
	console.log()
	console.log('hooks.handle.url:', event.url.pathname)

	if (event.url.pathname == '/') {
		console.log(FILENAME, 'deleting cookie - home path...')
		event.cookies.delete('session_id', { path: '/' })
		return resolve(event)
	}

	if (event.url.pathname.startsWith('/logout')) {
		console.log(FILENAME, 'deleting cookie - logout...')
		event.cookies.delete('session_id', { path: '/' })
		throw redirect(303, '/')
	}

	if (routesUnprotected.includes(event.url.pathname)) {
		console.log(FILENAME, 'unprotected route...')
		return resolve(event)
	}

	// remaining routes require sessionId
	const sessionId = event.cookies.get('session_id')
	if (!sessionId) {
		console.log(FILENAME, 'redirect - no sessionid...')
		throw redirect(303, '/')
	}

	// get user info
	event.locals.user = await fetchUser(sessionId)
	if (!event.locals.user) {
		console.log(FILENAME, `redirect - could not retrieve user: ${sessionId}`)
		throw redirect(303, '/')
	}

	// allow session routes
	if (routesSession.includes(event.url.pathname)) {
		console.log(FILENAME, 'session route...')
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
	const RETRIEVE_FROM_STORAGE = true
	console.log(FILENAME, 'fetchUser...')
	const responsePromise = await getUser(sessionId, RETRIEVE_FROM_STORAGE)
	const response: FormSourceResponseType = await responsePromise.json()
	return response.data
}
