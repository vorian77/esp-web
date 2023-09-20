import { EdgeQL, dbExecute, dbSelect, dbSelectSingle } from '$server/dbEdgeCore'
import { EdgeDBDataType, EdgeDBFilterDirection, type FormAction } from '$comps/types'

const FILENAME = 'server/dbEdgeFunctions.ts'

export async function getForm(formId: string, formActionType: 'select' | 'insert', data: {}) {
	const formDefn = await getFormDefn(formId)
	const formData = await getFormData(formActionType, formDefn.actions, data)
	return { formDefn, formData }

	async function getFormDefn(formId: string) {
		const query = new EdgeQL(`select sys_form::Form {
			id, name, header, subHeader, fields: {*},
			actions: {type := .codeType.name, query, filterItems: { dbName, source := .codeSource.name, sourceKey, data_type := .codeDataType.name, op := .codeOp.name
		}}}`)
		query.addFilter('id', EdgeDBDataType.uuid, formId)
		return await dbSelectSingle(query)
	}

	async function getFormData(formActionType: string, formActions: FormAction[], data = {}) {
		const action = formActions.find((fa: FormAction) => fa.type === formActionType)
		if (action) {
			switch (formActionType) {
				case 'insert':
					break

				case 'select':
					return await getFormDataSelect(action, data)
					break
			}
		}
	}

	async function getFormDataSelect(formAction: FormAction, data: {}) {
		const query = new EdgeQL(formAction.query)
		return await dbSelect(query)
	}
}

export async function getNodesByParent(parentNodeId: string) {
	const query = new EdgeQL(`select sys_app::Node {
    id, type := .codeType.name, name, header, icon := .codeIcon.name,  page, component := .codeComponent.name, obj_id := .obj.id, order
  }`)
	query.addFilter('parent.id', EdgeDBDataType.uuid, parentNodeId)
	query.addOrder('order', EdgeDBFilterDirection.asc)
	return await dbSelect(query)
}

export async function getUserEdge(userName: string) {
	// get user
	const query = new EdgeQL(`select sys_user::User {
		id, lastName, firstName, fullName, username,
		resource_home_screen_widgets := (select .userTypes.resources[is sys_app::HomeScreen].widgets {id, name}),
		resource_programs := (select .userTypes.resources[is sys_app::Node] { id, type := .codeType.name, name, header, icon := .codeIcon.name, page, component := .codeComponent.name, obj_id := .obj.id, order} filter not exists .parent order by .order)
}`)
	query.addFilter('username', EdgeDBDataType.str, userName)
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
