import {
	EdgeQL,
	EdgeDBDataType,
	EdgeDBFilterDirection,
	dbSelect,
	dbSelectSingle
} from '$server/dbEdgeCore'

const FILENAME = 'server/dbEdgeFunctions.ts'

export async function getNodesByParent(parentNodeId: string) {
	const query = new EdgeQL(`select sys_app::Node {
    type := .code_type.name, order, id, name, label, icon := .code_icon.name,  obj_id := .obj.id, obj_link := .obj[is sys_app::Page].link
  }`)
	query.addFilter('parent.id', EdgeDBDataType.uuid, parentNodeId)
	query.addOrder('order', EdgeDBFilterDirection.asc)
	return await dbSelect(query)
}

export async function getUserEdge(userName: string) {
	const query = new EdgeQL(`select sys_user::User {
		id, last_name, first_name, full_name, username,
		resource_home_screen_widgets := (select .user_types.resources[is sys_app::HomeScreen].widgets {id, name}),
		resource_programs := (select .user_types.resources[is sys_app::Node] {type := 'program', order, id, name, label, icon := .code_icon.name, } filter not exists .parent order by .order)
	}`)
	query.addFilter('username', EdgeDBDataType.str, userName)
	return await dbSelectSingle(query)
}
