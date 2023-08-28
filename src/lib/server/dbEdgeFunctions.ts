import {
	EdgeQL,
	EdgeDBDataType,
	EdgeDBFilterDirection,
	dbSelect,
	dbSelectSingle
} from '$server/dbEdgeCore'

const FILENAME = 'server/dbEdgeFunctions.ts'

export async function getNodesOfProgram(programId: string) {
	const query = new EdgeQL(`select sys_app::Node {
    type := .code_type.name, order, id, name, label, icon := .code_icon.name,  obj_id := .obj.id, obj_link := .obj[is sys_app::Page].link
  }`)
	query.addFilter('program.id', EdgeDBDataType.uuid, programId)
	query.addOrder('order', EdgeDBFilterDirection.asc)
	return await dbSelect(query)
}

export async function getUserEdge() {
	const query = new EdgeQL(`select sys_user::User {
		id, last_name, first_name, full_name, username,
		resource_home_screen_widgets := (select .user_types.resources[is sys_app::HomeScreen].widgets {id, name}),
		resource_programs := (select .user_types.resources[is sys_app::Program] {type := 'program', order, id, name, label, icon := .code_icon.name, } order by .order)
	}`)
	query.addFilter('username', EdgeDBDataType.str, 'user_sys')
	return await dbSelectSingle(query)
}
