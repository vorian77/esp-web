import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function root(rootName: string) {
	const query = e.insert(e.sys_core.ObjRoot, {
		name: rootName
	})
	return await query.run(client)
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

export async function dataObjActions(params: any) {
	const CREATOR = e.select(e.sys_user.getUser('user_sys'))
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_obj.DataObjAction, {
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
				codeDataType: e.select(e.sys_core.getCode('ct_db_col_data_type', e.cast(e.str, i[4]))),
				expr: e.cast(e.str, i[5]),
				codeAlignment: e.select(e.sys_core.getCode('ct_db_col_alignment', e.cast(e.str, i[6]))),
				width: e.cast(e.int16, i[7]),
				hRows: e.cast(e.int16, i[8]),
				placeHolder: e.cast(e.str, i[9]),
				matchColumn: e.cast(e.str, i[10]),
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
