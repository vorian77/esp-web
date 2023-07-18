import { redirect } from '@sveltejs/kit'
import { dbESPAPI } from '$server/dbESP'
import { getEnvVar } from '$server/env'
import { HTMLMETHOD, type FormSourceResponseType } from '$comps/types'
import { error } from '@sveltejs/kit'

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
		console.log(FILENAME, 'redirect - no locals.user...')
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
	const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_user', {
		userId: sessionId,
		orgId: getEnvVar('ESP_ORG_ID')
	})
	const response: FormSourceResponseType = await responsePromise.json()

	if (!response.data.user_id) {
		console.log(FILENAME, 'redirect - fetchUser.no user_id...')
		throw redirect(303, '/')
	}

	// set user
	let user = response.data

	// array user types
	user.user_types = user.user_types.split(',')

	// apps
	if (user.apps === '') {
		throw error(500, {
			file: FILENAME,
			function: 'fetchUser',
			message: `No apps defined for user: ${user.per_name_full} id: ${user.user_id}.`
		})
	}
	const appsList = user.apps.split(',')
	user.apps = appsList.map((app: string) => '/apps/' + app)
	user.root = user.user_types.includes('admin') ? '/apps' : user.apps[0]

	console.log('hooks.server.fetchUser:', user)

	return user
}
