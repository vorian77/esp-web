import { processForm } from '$server/dbForm'
import { dbESPAPI } from '$server/dbESP'
import { FormSourceResponse, HTMLMETHOD, type FormSourceResponseType } from '$comps/types'
import { asUpsert, asGet } from '$lib/utils/utils'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/apiUser.ts'

export async function getUser(userId: string, retrieveFromStorage: boolean) {
	let user = {}
	if (retrieveFromStorage) {
		user = asGet('auth', 'user')
		if (Object.keys(user).length) {
			return FormSourceResponse(user)
		}
	}

	const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_user', { userId })
	const response: FormSourceResponseType = await responsePromise.json()

	if (!response.data.user_id) {
		throw error(500, {
			file: FILENAME,
			function: 'fetchUser',
			message: `unable to retrieve user: ${userId}`
		})
	}

	// set user
	user = response.data

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

	asUpsert('auth', 'user', user)

	return FormSourceResponse(user)
}
