import { sendText } from '$server/apiTwilio'
import { processForm } from '$server/dbForm'
import { getEnvVar } from '$server/env'
import { FormSource, FormSourceDBAction, getServerResponse, type ResponseBody } from '$comps/types'
import { error } from '@sveltejs/kit'

import { getUserByUserName } from '$server/dbEdge/types.edgeDB.server'

const FILENAME = '/routes/auth/+server.ts'

let rtnData = {}

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

		case 'sms_send':
			const { phoneMobile, message } = requestData
			return sendText(phoneMobile, message)
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
