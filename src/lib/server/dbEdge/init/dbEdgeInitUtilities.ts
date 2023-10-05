import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function root() {
	await client.execute(`insert sys_core::ObjRoot { name := 'root', header:= 'Root' };`)
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

export async function users(params: any) {
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.User, {
				firstName: e.cast(e.str, i[0]),
				lastName: e.cast(e.str, i[1]),
				userName: e.cast(e.str, i[2]),
				password: e.cast(e.str, i[3])
			})
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
				name: e.cast(e.str, i[1]),
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
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodesPrograms(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', e.cast(e.str, i[1]))),
				name: e.cast(e.str, i[2]),
				header: e.cast(e.str, i[3]),
				order: e.cast(e.int64, i[4]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[5]))),
				page: e.cast(e.str, i[6]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodesHeaders(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_app.getNode(e.cast(e.str, i[1][0]), e.cast(e.str, i[1][1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', e.cast(e.str, i[2]))),
				name: e.cast(e.str, i[3]),
				header: e.cast(e.str, i[4]),
				order: e.cast(e.int64, i[5]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[6]))),
				page: e.cast(e.str, i[7]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodesPages(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_app.getNode(e.cast(e.str, i[1][0]), e.cast(e.str, i[1][1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', e.cast(e.str, i[2]))),
				name: e.cast(e.str, i[3]),
				header: e.cast(e.str, i[4]),
				order: e.cast(e.int64, i[5]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', e.cast(e.str, i[6]))),
				page: e.cast(e.str, i[7]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function homeScreen(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.HomeScreen, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function homeScreenWidget(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_app.HomeScreenWidget, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function homeScreenAddWidgets(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_app.HomeScreen, (hs) => ({
				filter: e.op(hs.name, '=', e.cast(e.str, i[0])),
				set: {
					widgets: {
						'+=': e.assert_distinct(
							e.for(e.json_array_unpack(i[1]), (y) => {
								return e.select(e.sys_app.getHomeScreenWidget(e.cast(e.str, y)))
							})
						)
					}
				}
			}))
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

export async function userTypeUsers(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					users: { '+=': e.select(e.sys_user.getUser(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function userTypeResourcesHomeScreen(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.UserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: { '+=': e.select(e.sys_app.getHomeScreen(e.cast(e.str, i[1]))) }
				}
			}))
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
						'+=': e.select(e.sys_app.getNode(e.cast(e.str, i[1][0]), e.cast(e.str, i[1][1])))
					}
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function objActions(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_obj.ObjAction, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				header: e.cast(e.str, i[2]),
				order: e.cast(e.int64, i[3]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function columns(data: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_db.Column, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				header: e.cast(e.str, i[2]),
				headerSide: e.cast(e.str, i[3]),
				codeDataType: e.select(e.sys_core.getCode('ct_sys_edgedb_data_type', e.cast(e.str, i[4]))),
				expr: e.cast(e.str, i[5]),
				codeAlignment: e.select(e.sys_core.getCode('ct_db_col_alignment', e.cast(e.str, i[6]))),
				width: e.cast(e.int16, i[7]),
				hRows: e.cast(e.int16, i[8]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data })
}

export async function tables(data: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_db.Table, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				name: e.cast(e.str, i[1]),
				hasMgmt: e.cast(e.bool, i[2]),
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
