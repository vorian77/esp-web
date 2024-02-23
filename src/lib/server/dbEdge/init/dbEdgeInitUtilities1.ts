import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { execute } from '$routes/api/dbEdge/types.dbEdge'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export function booleanOrFalse(val: any) {
	return e.op(val, 'if', e.op('exists', val), 'else', false)
}

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
	sectionHeader('Code Types')
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
	sectionHeader('Codes')
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
	sectionHeader('Node Headers')
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
	sectionHeader('Node Pages')
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
	sectionHeader('Node Programs')
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
	sectionHeader('Widgets')
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
	sectionHeader('User Type Resource - Apps')
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
	sectionHeader('User Type Resources - Programs')
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
	sectionHeader('User Type Resource - Widgets')
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
	sectionHeader('Tables')
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
	sectionHeader('Table Columns')
	const query = e.params({ data: e.json }, (params) => {
		return e.for(e.json_array_unpack(params.data), (i) => {
			return e.update(e.sys_db.SysTable, (t) => ({
				filter: e.op(t.name, '=', e.cast(e.str, i[0])),
				set: {
					columns: { '+=': e.select(e.sys_db.getColumn(e.cast(e.str, i[1]))) }
				}
			}))
		})
	})
	return await query.run(client, { data })
}

export async function addOrgs(params: any) {
	sectionHeader('Orgs')
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
	sectionHeader('Org - Roles')
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
	sectionHeader('Staff')
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
	sectionHeader('Staff - Roles')
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

export function sectionHeader(section: string) {
	console.log()
	console.log(`--- ${section} ---`)
}

export class ResetDb {
	owner: string
	query: string
	constructor(owner: string = '') {
		this.owner = owner
		this.query = ''
	}
	addStatement(statement: string) {
		this.query += statement + ';\n'
	}
	addDataObj(dataObj: string) {
		const filter = this.owner ? `AND .owner.name = '${this.owner}'` : ''
		this.addStatement(`DELETE sys_core::SysDataObj FILTER .name = '${dataObj}' ${filter}`)
	}
	addNode(node: string) {
		const filter = this.owner ? `AND .owner.name = '${this.owner}'` : ''
		this.addStatement(`DELETE sys_core::SysNodeObj FILTER .name = '${node}' ${filter}`)
	}
	addTable(table: string) {
		const filter = this.owner ? `FILTER .owner.name = '${this.owner}'` : ''
		this.addStatement(`DELETE ${table} ${filter}`)
	}
	delCodeType(codeTypeName: string) {
		this.addStatement(`DELETE sys_core::SysCode FILTER .codeType.name = '${codeTypeName}'`)
		this.addStatement(`DELETE sys_core::SysCodeType FILTER .name = '${codeTypeName}'`)
	}
	delColumn(name: string) {
		this.addStatement(`DELETE sys_db::SysColumn FILTER .name = '${name}'`)
	}
	delDataObj(name: string) {
		this.addStatement(`DELETE sys_core::SysDataObj FILTER .name = '${name}'`)
	}

	delFeature(name: string) {
		this.delNodeObj(`node_obj_${name}_detail`)
		this.delNodeObj(`node_obj_${name}_list`)
		this.delDataObj(`data_obj_${name}_detail`)
		this.delDataObj(`data_obj_${name}_list`)
	}

	delFieldChips(name: string) {
		this.addStatement(`DELETE sys_core::SysDataObjFieldChips FILTER .name = '${name}'`)
	}
	delFieldItems(name: string) {
		this.addStatement(`DELETE sys_core::SysDataObjFieldItems FILTER .name = '${name}'`)
	}
	delNodeObj(name: string) {
		this.addStatement(`DELETE sys_core::SysNodeObj FILTER .name = '${name}'`)
	}
	delTable(name: string) {
		this.addStatement(`DELETE sys_db::SysTable FILTER .name = '${name}'`)
	}
	async execute() {
		sectionHeader('Execute DB Transaction')
		console.log(this.query)
		if (this.query) await execute(this.query)
		this.query = ''
	}
}
