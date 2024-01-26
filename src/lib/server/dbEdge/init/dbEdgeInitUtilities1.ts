import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { execute } from '$routes/api/dbEdge/types.dbEdge'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

const rootUserName = '*ROOTUSER*'

export async function rootObj() {
	const query = e.insert(e.sys_core.ObjRoot, {
		name: '*ROOTOBJ*'
	})
	return await query.run(client)
}

export async function rootUser() {
	const query = e.insert(e.sys_user.UserRoot, {
		person: e.insert(e.default.SysPerson, {
			firstName: 'Root',
			lastName: 'User'
		}),
		userName: rootUserName
	})
	return await query.run(client)
}

export async function sysUser(owner: string, userName: string) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.insert(e.sys_user.SysUser, {
		createdBy: CREATOR,
		modifiedBy: CREATOR,
		owner: e.select(e.sys_core.getOrg(owner)),
		password: '!8394812kalsdjfa*!@#$$*&',
		person: e.insert(e.default.SysPerson, {
			firstName: 'System',
			lastName: 'User'
		}),
		userName
	})
	return await query.run(client)
}

export async function apps(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysApp, {
				owner: e.select(e.sys_core.getRootObj()),
				name: e.cast(e.str, i[0]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}
export async function userType(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.SysUserType, {
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.SysUser, (u) => ({
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysCodeType, {
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysCode, {
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysNodeObj, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_core.getNodeObjByName(e.cast(e.str, i[1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'header')),
				name: e.cast(e.str, i[2]),
				header: e.cast(e.str, i[3]),
				order: e.cast(e.int64, i[4]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', e.cast(e.str, i[5]))),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function nodeObjPages(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysNodeObj, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				parent: e.select(e.sys_core.getNodeObjByName(e.cast(e.str, i[1]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'page')),
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

export async function nodeObjPrograms(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysNodeObj, {
				owner: e.select(e.sys_core.getEnt(e.cast(e.str, i[0]))),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'program')),
				name: e.cast(e.str, i[1]),
				header: e.cast(e.str, i[2]),
				order: e.cast(e.int64, i[3]),
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', e.cast(e.str, i[4]))),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function widgets(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.SysWidget, {
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.SysUserType, (ut) => ({
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.SysUserType, (ut) => ({
				filter: e.op(ut.name, '=', e.cast(e.str, i[0])),
				set: {
					resources: {
						'+=': e.select(e.sys_core.getNodeObjByName(e.cast(e.str, i[1])))
					}
				}
			}))
		})
	})
	return await query.run(client, { data: params })
}

export async function userTypeResourcesWidgets(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_user.SysUserType, (ut) => ({
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_db.SysTable, {
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
			return e.update(e.sys_db.SysTable, (t) => ({
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_core.SysOrg, {
				owner: e.select(e.sys_core.getRootObj()),
				name: e.cast(e.str, i[0]),
				header: e.cast(e.str, i[1]),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function addRoleOrg(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_core.SysOrg, (o) => ({
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
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.insert(e.sys_user.SysStaff, {
				owner: e.select(e.sys_core.getOrg(e.cast(e.str, i[0]))),
				person: e.insert(e.default.SysPerson, {
					firstName: e.cast(e.str, i[1]),
					lastName: e.cast(e.str, i[2])
				}),
				createdBy: CREATOR,
				modifiedBy: CREATOR
			})
		})
	})
	return await query.run(client, { data: params })
}

export async function addRoleStaff(params: any) {
	const CREATOR = e.select(e.sys_user.getRootUser())
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

export async function resetDB() {
	let query = ''
	const tables: Array<string> = []

	// addStatement('UPDATE sys_user::SysUser SET { modifiedBy := sys_user::getRootUser()}')

	// tables in delete order
	tables.push('app_cm::CmCsfCertification')
	tables.push('app_cm::CmCsfCohortAttd')
	tables.push('app_cm::CmCsfCohort')
	tables.push('app_cm::CmCsfNote')
	tables.push('app_cm::CmClientServiceFlow')
	tables.push('app_cm::CmClient')

	tables.push('app_cm::CmCohort')
	tables.push('app_cm::CmCourse')
	tables.push('app_cm::CmServiceFlow')

	tables.push('sys_core::SysNodeObj')

	tables.push('sys_core::SysDataObj')
	tables.push('sys_core::SysDataObjFieldItemsDb')
	tables.push('sys_core::SysDataObjTable')

	tables.push('sys_db::SysTable')
	tables.push('sys_db::SysColumn')
	tables.push('sys_core::SysDataObjAction')
	tables.push('sys_user::SysWidget')
	tables.push('sys_user::SysUserType')

	tables.push('sys_user::SysStaff')

	tables.push('sys_user::SysUser')

	tables.push('sys_core::SysCode')
	tables.push('sys_core::SysCodeType')

	tables.push(`default::SysPerson filter .firstName not in  {"Root", "System"}`)

	tables.push('sys_core::SysObj')
	tables.push('sys_user::UserRoot')
	tables.push('sys_core::ObjRoot')

	tables.forEach((t) => {
		addStatement('delete ' + t)
	})

	function addStatement(statement: string) {
		if (query) query += ' '
		query += statement + ';'
	}

	await execute(query)

	console.log('DB reset complete...')
}
