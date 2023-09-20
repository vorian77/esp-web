import { getUserEdge } from '$server/dbEdge'
import { dbESPAPI } from '$server/dbESP'
import { FormSourceResponse, HTMLMETHOD, type FormSourceResponseType } from '$comps/types'
import { json, error } from '@sveltejs/kit'

const FILENAME = '/routes/api/user/server.ts'

export async function POST({ request }) {
	const { userId } = await request.json()
	let user = await getUserESP()

	// <temp> 230819 - add edgedb user info until replaced by edgedb
	const userEdge = await getUserEdge('user_sys')
	const parms = [
		'id',
		'lastName',
		'firstName',
		'fullName',
		'username',
		'resource_home_screen_widgets',
		'resource_programs'
	]
	parms.forEach((p) => {
		user[p] = userEdge[p]
	})

	return FormSourceResponse(user)

	async function getUserESP() {
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
		const user = response.data

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

		return user
	}
}
