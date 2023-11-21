import { dbESPAPI } from '$server/dbESP'
import { getServerResponse, HTMLMETHOD, type ResponseBody } from '$comps/types'
import { getUserByUserName } from '$server/dbEdge/types.edgeDB.server'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/apiUser.ts'

export async function getUser(userId: string) {
	let user = await getUserESP()
	// <temp> 230819 - add edgedb user info until replaced by edgedb
	const userEdge = await getUserByUserName('user_sys')
	const parms = [
		'id',
		'lastName',
		'firstName',
		'fullName',
		'userName',
		'resource_programs',
		'resource_widgets'
	]
	parms.forEach((p) => {
		user[p] = userEdge[p]
	})
	user['organization'] = 'Atlantic Impact'
	return getServerResponse(user)

	async function getUserESP() {
		const responsePromise = await dbESPAPI(HTMLMETHOD.GET, 'ws_cm_ssr_user', { userId })
		const response: ResponseBody = await responsePromise.json()

		if (!response.success) {
			throw error(500, {
				file: FILENAME,
				function: 'getUserESP',
				message: `Unable to retrieve user: ${userId}`
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
				message: `No apps defined for user: ${user.per_name_full} id: ${user.user_id}`
			})
		}
		const appsList = user.apps.split(',')
		user.apps = appsList.map((app: string) => '/home/' + app)
		user.root = user.user_types.includes('admin') ? '/home' : user.apps[0]

		return user
	}
}

// <temp> 231008 - need to figure out how to set global current user
// set global current user
// await dbExecute(`set global sys_user::currentUserId := <uuid>"${user.id}"`)
// set global currentUserId := <uuid>"9a2966ba-4e96-11ee-abc0-73f75479eb42";

// const q = `select global sys_user::currentUser { fullName }`
// const u = await dbSelectSingle(q)
// console.log('global user:', u)
// await getData('')
