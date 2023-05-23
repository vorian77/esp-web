import { redirect } from '@sveltejs/kit'
// import {getUserById} from './store/db'
const unProtectedRoutes = ['/', '/welcome']

export const handle = async ({ event, request, resolve }) => {
	// const sessionId = event.cookies.get('sessionId')
	// if (!sessionId && !unProtectedRoutes.includes(event.url.pathname)) {
	// 	throw redirect(303, '/welcome')
	// }

	return resolve(event)
}
