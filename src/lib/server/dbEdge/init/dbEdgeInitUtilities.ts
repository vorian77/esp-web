import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { execute } from '$server/dbEdge/types.edgeDB.server'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function rootObj() {
	const query = e.insert(e.sys_core.ObjRoot, {
		name: '*ROOTOBJ*'
	})
	return await query.run(client)
}

export async function apps(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.App, {
				owner: e.select(e.sys_core.getRoot()),
				name: e.cast(e.str, i[0]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}
export async function userType(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.UserType, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function userUserType(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.User, (u) => ({
				filter: e.op(u.userName, '=', e.cast(e.str, i[0])),
				set: {
					userTypes: {
						'+=': e.select(e.sys_user.getUserType(e.cast(e.str, i[1])))
					}
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function codeTypes(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.CodeType, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				order: e.cast(e.int16, i[1]),
				name: e.cast(e.str, i[2]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function codes(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.Code, {
				codeType: e.select(e.sys_core.getCodeType(e.cast(e.str, i[0]))),
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[1]))),
				name: e.cast(e.str, i[2]),
				order: e.cast(e.int16, i[3]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodeObjHeaders(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_obj.NodeObj, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_obj.getNodeObjByName(e.cast(e.str, i[1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', e.cast(e.str, i[2]))),
				name: e.cast(e.str, i[3]),
				header: e.cast(e.str, i[4]),
				order: e.cast(e.int64, i[5]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', e.cast(e.str, i[6]))),
				page: e.cast(e.str, i[7]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodeObjPages(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_obj.NodeObj, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_obj.getNodeObjByName(e.cast(e.str, i[1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', e.cast(e.str, i[2]))),
				name: e.cast(e.str, i[3]),
				header: e.cast(e.str, i[4]),
				order: e.cast(e.int64, i[5]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', e.cast(e.str, i[6]))),
				page: e.cast(e.str, i[7]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodeObjPrograms(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_obj.NodeObj, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', e.cast(e.str, i[1]))),
				name: e.cast(e.str, i[2]),
				header: e.cast(e.str, i[3]),
				order: e.cast(e.int64, i[4]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', e.cast(e.str, i[5]))),
				page: e.cast(e.str, i[6]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function widgets(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.Widget, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function userTypeResourcesApps(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: { '+=': e.select(e.sys_core.getEnt(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function userTypeResourcesPrograms(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: {
						'+=': e.select(e.sys_obj.getNodeObjByName(e.cast(e.str, i[1])))
					}
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function userTypeResourcesWidgets(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: { '+=': e.select(e.sys_user.getWidget(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function tables(data: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_db.Table, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				mod: e.cast(e.str, i[1]),
				name: e.cast(e.str, i[2]),
				hasMgmt: e.cast(e.bool, i[3]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data })
}

export async function tableColumns(data: any) {
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_db.Table, (t) => ({
				filter: e.op(
					e.op(t.owner.name, '=', e.cast(e.str, i[0])),
					'and',
					e.op(t.name, '=', e.cast(e.str, i[1]))
				),
				set: {
					columns: { '+=': e.select(e.sys_db.getColumn(e.cast(e.str, i[2]))) }
				}
			}))
		})
	})
	return await query.run(client, { data })
}

export async function addOrgs(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.Org, {
				owner: e.select(e.sys_core.getRoot()),
				name: e.cast(e.str, i[0]),
				appName: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function addRoleOrg(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_core.Org, (o) => ({
				filter: e.op(o.name, '=', e.cast(e.str, i[0])),
				set: {
					roles: { '+=': e.select(e.sys_core.getCode('ct_sys_role_org', e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function addStaff(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.Staff, {
				owner: e.select(e.sys_core.getRoot()),
				person: e.insert(e.default.Person, {
					firstName: e.cast(e.str, i[0]),
					lastName: e.cast(e.str, i[1])
				}),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function addRoleStaff(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.getStaffByName(e.cast(e.str, i[0]), e.cast(e.str, i[1])), (o) => ({
				set: {
					roles: { '+=': e.select(e.sys_core.getCode('ct_sys_role_staff', e.cast(e.str, i[2]))) }
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function setOrgUserType(params: any) {
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_core.getOrg(e.cast(e.str, i[0])), (o) => ({
				set: {
					userTypeDefault: e.select(e.sys_user.getUserType(e.cast(e.str, i[1])))
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function resetDB(owner: string | undefined = undefined) {
	let query = ''
	const tables: Array<string> = []

	query = `
	delete app_cm_training::ClientCohortAttd;
	delete app_cm_training::ClientCohort;
	delete app_cm::ClientNote;
	delete app_cm::ClientServiceFlow;
	delete app_cm::Student;
	
	delete app_cm_training::Cohort;
	delete app_cm_training::Course;
	delete app_cm::ServiceFlow;
	delete sys_user::User filter .userName not in {'user_sys', 'user_ai'};`

	// tables in delete order
	tables.push('sys_obj::NodeObj')
	tables.push('sys_obj::Form')
	tables.push('sys_obj::FormFieldItemsList')
	tables.push('sys_db::Table')
	tables.push('sys_db::Column')
	tables.push('sys_obj::DataObjAction')
	tables.push('sys_user::Widget')
	tables.push('sys_core::Code')
	tables.push('sys_core::CodeType')
	tables.push('sys_user::UserType')
	tables.push('sys_core::Obj')
	tables.push('sys_user::Staff')
	tables.push('sys_user::User')

	tables.forEach((t) => {
		if (query) query += ' '
		query += 'delete ' + t
		if (owner) query += ` filter .owner.name = '${owner}'`
		query += ';'
	})

	if (!owner) query += ' delete default::Person; delete sys_core::ObjRoot;'

	// console.log()
	// console.log(`reset.query: (${owner ? owner : ''})`)
	// console.log(query)
	// console.log()

	await execute(query)
}
