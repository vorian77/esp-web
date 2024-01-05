import { getServerResponse } from '$comps/types'
import { getUserByUserName } from '$routes/api/dbEdge/types.dbEdge'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/auth/+server.ts'

export async function POST({ request, cookies }) {
	const requestData = await request.json()
	const { action } = requestData

	switch (action) {
		case 'express_login':
			const user = await getUserByUserName('2487985578')
			// const user = await getUserByUserName('user_sys')
			if (user) setCookie(user.id)
			return getServerResponse(user)

		case 'set_cookie':
			setCookie(requestData.userId)
			return getServerResponse({})
	}

	function setCookie(userId: string) {
		cookies.set('session_id', userId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true
		})
	}
}
