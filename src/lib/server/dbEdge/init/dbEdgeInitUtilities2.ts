import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function execute(query: string) {
	await client.execute(query)
}

export async function review(file: string, query: string) {
	if (!query) return
	const result = await client.query(query)
	console.log()
	console.log(`${file}.review...`)
	console.log('query:', query)
	console.log('result:', result)
	console.log()
}

export async function addCode(data: any) {
	const query = e.params(
		{
			owner: e.str,
			codeType: e.str,
			parent: e.optional(e.json),
			header: e.optional(e.str),
			name: e.str,
			order: e.int16,
			valueDecimal: e.optional(e.decimal),
			valueInteger: e.optional(e.int64),
			valueString: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_core.Code, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				codeType: e.select(e.sys_core.getCodeType(p.codeType)),
				parent: e.select(
					e.sys_core.getCode(
						e.cast(e.str, e.json_get(p.parent, 'codeType')),
						e.cast(e.str, e.json_get(p.parent, 'code'))
					)
				),
				header: p.header,
				name: p.name,
				order: p.order,
				valueDecimal: p.valueDecimal,
				valueInteger: p.valueInteger,
				valueString: p.valueString,
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addCodeType(data: any) {
	const query = e.params(
		{
			owner: e.str,
			parent: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			order: e.int16,
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_core.CodeType, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getCodeType(p.parent)),
				header: p.header,
				name: p.name,
				order: p.order,
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addColumn(data: any) {
	const query = e.params(
		{
			owner: e.str,
			classValue: e.optional(e.str),
			codeAlignment: e.optional(e.str),
			codeDataType: e.str,
			codeDataTypePreset: e.optional(e.str),
			edgeTypeDefn: e.optional(e.json),
			exprPreset: e.optional(e.str),
			exprSelect: e.optional(e.str),
			exprStorageKey: e.optional(e.str),
			header: e.optional(e.str),
			headerSide: e.optional(e.str),
			isExcludeInsert: e.optional(e.bool),
			isExcludeSelect: e.optional(e.bool),
			isExcludeUpdate: e.optional(e.bool),
			isMultiSelect: e.optional(e.bool),
			isSetBySys: e.optional(e.bool),
			matchColumn: e.optional(e.str),
			maxLength: e.optional(e.int16),
			maxValue: e.optional(e.int16),
			minLength: e.optional(e.int16),
			minValue: e.optional(e.int16),
			name: e.str,
			pattern: e.optional(e.str),
			patternMsg: e.optional(e.str),
			patternReplacement: e.optional(e.str),
			placeHolder: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_db.Column, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				classValue: p.classValue,
				codeAlignment: e.sys_core.getCode('ct_db_col_alignment', p.codeAlignment),
				codeDataType: e.sys_core.getCode('ct_db_col_data_type', p.codeDataType),
				codeDataTypePreset: e.sys_core.getCode('ct_db_col_data_type', p.codeDataTypePreset),
				edgeTypeDefn: p.edgeTypeDefn,
				exprPreset: p.exprPreset,
				exprSelect: p.exprSelect,
				exprStorageKey: p.exprStorageKey,
				header: p.header,
				headerSide: p.headerSide,
				isExcludeInsert: p.isExcludeInsert,
				isExcludeSelect: p.isExcludeSelect,
				isExcludeUpdate: p.isExcludeUpdate,
				isMultiSelect: p.isMultiSelect,
				isSetBySys: p.isSetBySys,
				matchColumn: p.matchColumn,
				maxLength: p.maxLength,
				maxValue: p.maxValue,
				minLength: p.minLength,
				minValue: p.minValue,
				name: p.name,
				pattern: p.pattern,
				patternMsg: p.patternMsg,
				patternReplacement: p.patternReplacement,
				placeHolder: p.placeHolder,
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjAction(data: any) {
	const query = e.params(
		{
			allTabs: e.optional(e.bool),
			owner: e.str,
			name: e.str,
			header: e.str,
			order: e.int64,
			color: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_obj.DataObjAction, {
				allTabs: p.allTabs,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				name: p.name,
				header: p.header,
				order: p.order,
				color: p.color,
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObj(data: any) {
	const query = e.params(
		{
			creator: e.str,
			owner: e.str,
			actions: e.optional(e.array(e.str)),
			codeCardinality: e.str,
			codeRenderType: e.str,
			codeCustomElType: e.optional(e.array(e.str)),
			codeComponent: e.str,
			customElParms: e.optional(e.json),
			description: e.optional(e.str),
			exprFilter: e.optional(e.str),
			exprObject: e.optional(e.str),
			fields: e.optional(e.array(e.json)),
			header: e.optional(e.str),
			link: e.optional(e.json),
			isPopup: e.optional(e.bool),
			name: e.str,
			subHeader: e.optional(e.str),
			table: e.optional(e.json)
		},
		(p) => {
			return e.insert(e.sys_obj.DataObj, {
				actions: e.select(e.sys_obj.DataObjAction, (OA) => ({
					filter: e.contains(p.actions, OA.name)
				})),
				codeCardinality: e.select(e.sys_core.getCode('ct_sys_do_cardinality', p.codeCardinality)),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_do_component', p.codeComponent)),
				codeRenderType: e.select(e.sys_core.getCode('ct_sys_do_render_type', p.codeRenderType)),
				description: p.description,
				exprFilter: p.exprFilter,
				exprObject: p.exprObject,

				fieldsDb: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.DataObjFieldDb, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						codeDbDataOp: e.sys_core.getCode(
							'ct_sys_do_field_op',
							e.cast(e.str, e.json_get(f, 'codeDbDataOp'))
						),

						codeDbDataSource: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_source',
								e.cast(e.str, e.json_get(f, 'codeDbDataSource'))
							)
						),

						codeDbListDir: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_list_dir',
								e.cast(e.str, e.json_get(f, 'codeDbListDir'))
							)
						),

						dbDataSourceKey: e.cast(e.str, e.json_get(f, 'dbDataSourceKey')),

						exprFilter: e.cast(e.str, e.json_get(f, 'exprFilter')),

						exprPreset: e.cast(e.str, e.json_get(f, 'exprPreset')),

						dbOrderList: e.cast(e.int16, e.json_get(f, 'dbOrderList')),

						fieldName: e.cast(e.str, e.json_get(f, 'fieldName')),

						isDbAllowNull: e.cast(e.bool, e.json_get(f, 'isDbAllowNull')),

						isDbFilter: e.cast(e.bool, e.json_get(f, 'isDbFilter')),

						isLinkMember: e.cast(e.bool, e.json_get(f, 'isLinkMember'))
					})
				}),

				fieldsEl: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.DataObjFieldEl, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						codeAccess: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_access',
								e.cast(e.str, e.json_get(f, 'codeAccess'))
							)
						),

						codeCustomElType: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_element_custom_type',
								e.cast(e.str, e.json_get(f, 'codeCustomElType'))
							)
						),

						codeElement: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_element',
								e.cast(e.str, e.json_get(f, 'codeElement'))
							)
						),

						customElParms: e.cast(e.json, e.json_get(f, 'customElParms')),

						dbOrderCrumb: e.cast(e.int16, e.json_get(f, 'dbOrderCrumb')),

						dbOrderSelect: e.cast(e.int16, e.json_get(f, 'dbOrderSelect')),

						headerAlt: e.cast(e.str, e.json_get(f, 'headerAlt')),

						height: e.cast(e.int16, e.json_get(f, 'height')),

						isDisplay: e.cast(e.bool, e.json_get(f, 'isDisplay')),

						isDisplayable: e.cast(e.bool, e.json_get(f, 'isDisplayable')),

						items: e.cast(e.array(e.json), e.json_get(f, 'items')),

						itemsList: e.select(
							e.sys_obj.getDataObjFieldItems(e.cast(e.str, e.json_get(f, 'itemsList')))
						),

						itemsListParms: e.cast(e.json, e.json_get(f, 'itemsListParms')),

						width: e.cast(e.int16, e.json_get(f, 'width'))
					})
				}),

				header: p.header,
				isPopup: p.isPopup,
				link: p.link,
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				subHeader: p.subHeader,
				table: e.select(
					e.sys_db.getTable(
						e.cast(e.str, e.json_get(p.table, 'owner')),
						e.cast(e.str, e.json_get(p.table, 'name'))
					)
				),

				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldItems(data: any) {
	const query = e.params(
		{
			creator: e.str,
			dbSelect: e.str,
			fields: e.optional(e.array(e.json)),
			name: e.str,
			owner: e.str,
			propertyId: e.str,
			propertyLabel: e.str
		},
		(p) => {
			return e.insert(e.sys_obj.DataObjFieldItems, {
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator)),
				owner: e.select(e.sys_core.getEnt(p.owner)),
				dbSelect: p.dbSelect,
				name: p.name,
				propertyId: p.propertyId,
				propertyLabel: p.propertyLabel,

				fieldsDb: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.DataObjFieldDb, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						codeDbDataOp: e.sys_core.getCode(
							'ct_sys_do_field_op',
							e.cast(e.str, e.json_get(f, 'codeDbDataOp'))
						),

						codeDbDataSource: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_source',
								e.cast(e.str, e.json_get(f, 'codeDbDataSource'))
							)
						),

						codeDbListDir: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_list_dir',
								e.cast(e.str, e.json_get(f, 'codeDbListDir'))
							)
						),

						dbDataSourceKey: e.cast(e.str, e.json_get(f, 'dbDataSourceKey')),

						exprFilter: e.cast(e.str, e.json_get(f, 'exprFilter')),

						exprPreset: e.cast(e.str, e.json_get(f, 'exprPreset')),

						dbOrderList: e.cast(e.int16, e.json_get(f, 'dbOrderList')),

						fieldName: e.cast(e.str, e.json_get(f, 'fieldName')),

						isDbAllowNull: e.cast(e.bool, e.json_get(f, 'isDbAllowNull')),

						isDbFilter: e.cast(e.bool, e.json_get(f, 'isDbFilter'))
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeObj(data: any) {
	const query = e.params(
		{
			owner: e.str,
			parentNodeName: e.optional(e.str),
			codeType: e.str,
			name: e.str,
			header: e.optional(e.str),
			order: e.int16,
			codeIcon: e.str,
			dataObj: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_obj.NodeObj, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_obj.getNodeObjByName(p.parentNodeName)),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', p.codeType)),
				name: p.name,
				header: p.header,
				order: p.order,
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', p.codeIcon)),
				dataObj: e.select(e.sys_obj.getDataObj(p.dataObj)),
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addOrg(data: any) {
	const query = e.params(
		{
			name: e.str,
			header: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_core.Org, {
				owner: e.select(e.sys_core.getRoot()),
				name: p.name,
				header: p.header,
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addUser(data: any) {
	const query = e.params(
		{
			userName: e.str,
			password: e.str,
			firstName: e.str,
			lastName: e.str
		},
		(p) => {
			return e.insert(e.sys_user.User, {
				owner: e.select(e.sys_core.getRoot()),
				person: e.insert(e.default.Person, {
					firstName: p.firstName,
					lastName: p.lastName
				}),
				userName: p.userName,
				password: p.password
			})
		}
	)
	return await query.run(client, data)
}

export async function addUserOrg(data: any) {
	const org = e.select(e.sys_core.Org, (org) => ({
		filter_single: e.op(org.name, '=', data.orgName)
	}))
	const person = e.select(e.sys_user.User, (user) => ({
		_id: user.person.id,
		filter_single: e.op(user.userName, '=', data.userName)
	}))
	const userType = e.select(e.sys_user.UserType, (ut) => ({
		filter_single: e.op(ut.id, '=', e.cast(e.uuid, org.userTypeDefault.id))
	}))

	const query = e.params(
		{
			orgName: e.str,
			userName: e.str,
			password: e.str,
			firstName: e.str,
			lastName: e.str
		},
		(p) => {
			return e.insert(e.sys_user.User, {
				owner: e.set(org),
				userName: p.userName,
				password: p.password,
				person: e.insert(e.default.Person, {
					firstName: p.firstName,
					lastName: p.lastName
				}),
				userTypes: e.set(userType)
			})
		}
	)
	return await query.run(client, data)
}
