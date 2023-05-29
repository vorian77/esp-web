import { redirect } from '@sveltejs/kit'
const unProtectedRoutes = ['/', '/welcome']

export const handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session_id')
	if (!sessionId && !unProtectedRoutes.includes(event.url.pathname)) {
		throw redirect(303, '/welcome')
	}

	if (event.url.pathname.startsWith('/logout')) {
		event.cookies.delete('session_id', { path: '/' })
		throw redirect(303, '/welcome')
	}
	return resolve(event)
}
