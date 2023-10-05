import { EdgeQL, dbSelectSingle } from '$server/dbEdge/types.edgeDB.server'
import { DataActionItemDataType, DataActionItemOp } from '$comps/types'

const FILENAME = 'server/dbEdgeCoreUser.ts'

export async function getUserEdge(userName: string) {
	// get user
	const query = new EdgeQL(`select sys_user::User {
		id, lastName, firstName, fullName, userName,
		resource_home_screen_widgets := (select .userTypes.resources[is sys_app::HomeScreen].widgets {id, name}),
		resource_programs := (select .userTypes.resources[is sys_app::Node] { id, _codeType := .codeType.name, name, header, _codeIcon := .codeIcon.name, page, objId := .obj.id, order} filter not exists .parent order by .order)
}`)
	query.addFilter('userName', DataActionItemOp.equal, DataActionItemDataType.str, userName)
	const user = await dbSelectSingle(query)
	// console.log('getUserEdge...')
	// console.log('userId1:', user)

	// set global current user
	// await dbExecute(`set global sys_user::currentUserId := <uuid>"${user.id}"`)
	// set global currentUserId := <uuid>"9a2966ba-4e96-11ee-abc0-73f75479eb42";

	// const q = new EdgeQL(`select global sys_user::currentUser { fullName }`)
	// const u = await dbSelectSingle(q)
	// console.log('global user:', u)
	// await getData('')
	return user
}
