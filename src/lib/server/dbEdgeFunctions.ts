import { EdgeQL, EdgeDBDataType, dbSelectSingle } from '$server/dbEdgeCore'

const FILENAME = 'server/dbEdgeFunctions.ts'

export async function getNodesByParent(parentId: string) {
	const query = new EdgeQL(`select Node {
    id, name, order,
    forms := (select .objs [is sys_app::Form] {
      id, name, submit_button_label
    }),
    pages := (select .objs [is sys_app::Page] {
      id, name, link
    })
  }`)
	query.addFilter('parent.id', EdgeDBDataType.uuid, parentId)
	return await dbSelectSingle(query)
}

export async function getUserEdge() {
	const query = new EdgeQL(`select sys_user::User {
		id, last_name, first_name, full_name, username,
		resource_home_screen_widgets := (select .user_types.resources[is sys_user::HomeScreen].widgets {id, name}),
		resource_programs := (select .user_types.resources[is sys_app::Program] {id, name, label, code_icon: {name}} order by .order)
	}`)
	query.addFilter('username', EdgeDBDataType.str, 'user_sys')
	return await dbSelectSingle(query)
}
