import { redirect } from '@sveltejs/kit'
import { getUserByUserId } from '$routes/api/dbEdge/types.dbEdge'

const FILENAME = 'hooks.server'

const routesUnprotected = ['/about', '/auth', '/legalDisclosure']

export async function handle({ event, resolve }) {
	console.log()
	console.log(FILENAME, `url: ${event.url.pathname}`)

	// event.cookies.set('test', 'abc', {
	// 	path: '/',
	// 	httpOnly: true,
	// 	sameSite: 'strict',
	// 	secure: true
	// })

	if (event.url.pathname === '/') {
		console.log(FILENAME, 'root path - deleting cookie...')
		event.cookies.delete('session_id', { path: '/' })
		return resolve(event)
	}

	if (event.url.pathname.startsWith('/logout')) {
		console.log(FILENAME, 'logout...')
		redirect(303, '/')
	}

	if (event.url.pathname.toLowerCase().startsWith('/api')) {
		console.log(FILENAME, 'api endpoint...')
		return resolve(event)
	}

	if (
		routesUnprotected.findIndex((r) => r.toLowerCase() === event.url.pathname.toLowerCase()) >= 0
	) {
		console.log(FILENAME, 'unprotected route...')
		return resolve(event)
	}

	// remaining routes require sessionId
	const sessionId = event.cookies.get('session_id')
	if (!sessionId) {
		console.log(FILENAME, 'redirect - no sessionId...')
		redirect(303, '/')
	}

	// get user info
	// <temp> 240127 - only retrieved for legal disclosure???
	// const user = await getUserByUserId(sessionId)
	// console.log(FILENAME, `retrieved user...`)
	// if (!user) {
	// 	console.log(FILENAME, `redirect - could not retrieve user: ${sessionId}`)
	// 	redirect(303, '/')
	// }

	// confirm legal disclosure
	// if (!user.cm_ssr_disclosure) {
	// 	console.log(FILENAME, 'redirect - not disclosed...')
	// 	throw redirect(303, '/legalDisclosure')
	// }

	// security protected routes
	return await resolve(event)
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
