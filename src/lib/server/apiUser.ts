import { dbESPAPI } from '$server/dbESP'
import { getServerResponse, HTMLMETHOD, type ResponseBody } from '$comps/types'
import { getUserByUserId } from '$server/dbEdge/types.edgeDB.server'
import { error } from '@sveltejs/kit'

const FILENAME = '$server/apiUser.ts'

export async function getUser(userId: string) {
	const user = await getUserByUserId(userId)
	// console.log('apiUser:', user)

	// const parms = [
	// 	'id',
	// 	'lastName',
	// 	'firstName',
	// 	'fullName',
	// 	'userName',
	// 	'resource_programs',
	// 	'resource_widgets'
	// ]
	// parms.forEach((p) => {
	// 	user[p] = userEdge[p]
	// })
	// user['organization'] = 'Atlantic Impact'

	return getServerResponse(user)
}

/*  
<temp> 231130 - esp user record
user_id: 170896,
  per_name_first: 'Phyllip',
  per_name_last: 'Hall',
  per_name_full: 'Phyllip Hall',
  initials: 'PH',
  org_id: 6761,
  user_type_list: '',
  user_types: [ 'student' ],
  appName: 'Atlantic Impact Mobile',
  apps: [ '/home/cm' ],
  cm_ssr_disclosure: 1,
  cm_ssr_site: null,
  site: '',
  referral_id: -1,
  cm_ssr_submitted: null,
  status: 'Pending',
  time_stamp: '2023-11-30 07:53:29.205',
  root: '/home/cm',

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

*/

// <temp> 231008 - need to figure out how to set global current user
// set global current user
// await dbExecute(`set global sys_user::currentUserId := <uuid>"${user.id}"`)
// set global currentUserId := <uuid>"9a2966ba-4e96-11ee-abc0-73f75479eb42";

// const q = `select global sys_user::currentUser { fullName }`
// const u = await dbSelectSingle(q)
// console.log('global user:', u)
// await getData('')
