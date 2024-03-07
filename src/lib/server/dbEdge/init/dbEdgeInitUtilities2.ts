import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import { booleanOrFalse, sectionHeader } from '$server/dbEdge/init/dbEdgeInitUtilities1'

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
			valueDecimal: e.optional(e.float64),
			valueInteger: e.optional(e.int64),
			valueString: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysCode, {
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
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
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
			order: e.int16
		},
		(p) => {
			return e.insert(e.sys_core.SysCodeType, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getCodeType(p.parent)),
				header: p.header,
				name: p.name,
				order: p.order,
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addColumn(data: any) {
	sectionHeader(`addColumn - ${data.name}`)
	const query = e.params(
		{
			classValue: e.optional(e.str),
			codeAlignment: e.optional(e.str),
			codeDataType: e.str,
			exprSelect: e.optional(e.str),
			exprStorageKey: e.optional(e.str),
			header: e.optional(e.str),
			headerSide: e.optional(e.str),
			isExcludeInsert: e.optional(e.bool),
			isExcludeSelect: e.optional(e.bool),
			isExcludeUpdate: e.optional(e.bool),
			isMultiSelect: e.optional(e.bool),
			isSelfReference: e.optional(e.bool),
			isSetBySys: e.optional(e.bool),
			link: e.optional(e.json),
			matchColumn: e.optional(e.str),
			maxLength: e.optional(e.int16),
			maxValue: e.optional(e.float64),
			minLength: e.optional(e.int16),
			minValue: e.optional(e.float64),
			name: e.str,
			owner: e.str,
			pattern: e.optional(e.str),
			patternMsg: e.optional(e.str),
			patternReplacement: e.optional(e.str),
			placeHolder: e.optional(e.str),
			spinStep: e.optional(e.str),
			toggleValueFalse: e.optional(e.str),
			toggleValueShow: e.optional(e.bool),
			toggleValueTrue: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_db.SysColumn, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				classValue: p.classValue,
				codeAlignment: e.sys_core.getCode('ct_db_col_alignment', p.codeAlignment),
				codeDataType: e.sys_core.getCode('ct_db_col_data_type', p.codeDataType),
				createdBy: e.select(e.sys_user.getRootUser()),
				exprStorageKey: p.exprStorageKey,
				header: p.header,
				headerSide: p.headerSide,
				isExcludeInsert: booleanOrFalse(p.isExcludeInsert),
				isExcludeSelect: booleanOrFalse(p.isExcludeSelect),
				isExcludeUpdate: booleanOrFalse(p.isExcludeUpdate),
				isMultiSelect: booleanOrFalse(p.isMultiSelect),
				isSelfReference: booleanOrFalse(p.isSelfReference),
				isSetBySys: booleanOrFalse(p.isSetBySys),
				link: p.link,
				matchColumn: p.matchColumn,
				maxLength: p.maxLength,
				maxValue: p.maxValue,
				minLength: p.minLength,
				minValue: p.minValue,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				pattern: p.pattern,
				patternMsg: p.patternMsg,
				patternReplacement: p.patternReplacement,
				placeHolder: p.placeHolder,
				spinStep: p.spinStep,
				toggleValueFalse: p.toggleValueFalse,
				toggleValueShow: p.toggleValueShow,
				toggleValueTrue: p.toggleValueTrue
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObj(data: any) {
	sectionHeader(`addDataObj - ${data.name}`)

	let orderTables = 1
	const actionsQuery = data.actionsQuery && data.actionsQuery.length > 0 ? data.actionsQuery : []

	const query = e.params(
		{
			actionsField: e.optional(e.array(e.str)),
			actionsQuery: e.optional(e.array(e.json)),
			codeCardinality: e.str,
			codeComponent: e.str,
			customElement: e.optional(e.json),
			description: e.optional(e.str),
			exprFilter: e.optional(e.str),
			exprObject: e.optional(e.str),
			fields: e.optional(e.array(e.json)),
			header: e.optional(e.str),
			isPopup: e.optional(e.bool),
			name: e.str,
			owner: e.str,
			subHeader: e.optional(e.str),
			tables: e.optional(e.array(e.json))
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObj, {
				actionsField: e.select(e.sys_core.SysDataObjAction, (af) => ({
					filter: e.contains(p.actionsField, af.name)
				})),
				actionsQuery: actionsQuery,
				codeCardinality: e.select(e.sys_core.getCode('ct_sys_do_cardinality', p.codeCardinality)),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_do_component', p.codeComponent)),
				columns: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_core.SysDataObjColumn, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						// fieldsDB
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

						dbOrderList: e.cast(e.int16, e.json_get(f, 'dbOrderList')),

						exprCustom: e.cast(e.str, e.json_get(f, 'exprCustom')),

						exprPresetScalar: e.cast(e.str, e.json_get(f, 'exprPresetScalar')),

						fieldName: e.cast(e.str, e.json_get(f, 'fieldName')),

						indexTable: e.cast(e.str, e.json_get(f, 'indexTable')),

						isDbAllowNull: e.cast(e.bool, e.json_get(f, 'isDbAllowNull')),

						isDbFilter: e.cast(e.bool, e.json_get(f, 'isDbFilter')),

						link: e.cast(e.json, e.json_get(f, 'link')),

						// fieldsElement
						codeAccess: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_access',
								e.cast(e.str, e.json_get(f, 'codeAccess'))
							)
						),

						codeElement: e.select(
							e.sys_core.getCode(
								'ct_sys_do_field_element',
								e.cast(e.str, e.json_get(f, 'codeElement'))
							)
						),

						customElement: e.cast(e.json, e.json_get(f, 'customElement')),

						dbOrderCrumb: e.cast(e.int16, e.json_get(f, 'dbOrderCrumb')),

						dbOrderSelect: e.cast(e.int16, e.json_get(f, 'dbOrderSelect')),

						fieldListChips: e.select(
							e.sys_core.getDataObjFieldListChips(e.cast(e.str, e.json_get(f, 'fieldListChips')))
						),

						fieldListConfig: e.select(
							e.sys_core.getDataObjFieldListConfig(e.cast(e.str, e.json_get(f, 'fieldListConfig')))
						),

						fieldListItems: e.select(
							e.sys_core.getDataObjFieldListItems(e.cast(e.str, e.json_get(f, 'fieldListItems')))
						),

						fieldListItemsParms: e.cast(e.json, e.json_get(f, 'fieldListItemsParms')),

						fieldListSelect: e.select(
							e.sys_core.getDataObjFieldListSelect(e.cast(e.str, e.json_get(f, 'fieldListSelect')))
						),

						headerAlt: e.cast(e.str, e.json_get(f, 'headerAlt')),

						height: e.cast(e.int16, e.json_get(f, 'height')),

						isDisplay: e.cast(e.bool, e.json_get(f, 'isDisplay')),

						isDisplayable: e.cast(e.bool, e.json_get(f, 'isDisplayable')),

						items: e.cast(e.array(e.json), e.json_get(f, 'items')),

						nameCustom: e.cast(e.str, e.json_get(f, 'nameCustom')),

						width: e.cast(e.int16, e.json_get(f, 'width'))
					})
				}),

				createdBy: e.select(e.sys_user.getRootUser()),
				description: p.description,
				exprFilter: p.exprFilter,
				exprObject: p.exprObject,
				header: p.header,
				isPopup: p.isPopup,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				subHeader: p.subHeader,

				tables: e.for(e.array_unpack(p.tables), (t) => {
					return e.insert(e.sys_core.SysDataObjTable, {
						columnParent: e.select(
							e.sys_db.getColumn(e.cast(e.str, e.json_get(t, 'columnParent')))
						),
						index: e.cast(e.str, e.json_get(t, 'index')),
						indexParent: e.cast(e.str, e.json_get(t, 'indexParent')),
						order: orderTables++,
						table: e.select(e.sys_db.getTable(e.cast(e.str, e.json_get(t, 'table'))))
					})
				})
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjAction(data: any) {
	sectionHeader(`addDataObjAction - ${data.name}`)
	const query = e.params(
		{
			allTabs: e.optional(e.bool),
			checkObjChanged: e.bool,
			codeActionType: e.str,
			color: e.optional(e.str),
			header: e.str,
			name: e.str,
			order: e.int64,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjAction, {
				allTabs: p.allTabs,
				checkObjChanged: p.checkObjChanged,
				codeActionType: e.select(
					e.sys_core.getCode('ct_cm_data_obj_action_type', p.codeActionType)
				),
				color: p.color,
				createdBy: e.select(e.sys_user.getRootUser()),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				order: p.order,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldItems(data: any) {
	sectionHeader(`addDataObjFieldItems - ${data.name}`)
	const query = e.params(
		{
			codeDataTypeDisplay: e.optional(e.str),
			codeMask: e.optional(e.str),
			exprSelect: e.str,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldListItems, {
				codeDataTypeDisplay: e.sys_core.getCode('ct_db_col_data_type', p.codeDataTypeDisplay),
				codeMask: e.sys_core.getCode('ct_db_col_mask', p.codeMask),
				createdBy: e.select(e.sys_user.getRootUser()),
				exprSelect: p.exprSelect,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeFooter(data: any) {
	sectionHeader(`addNodeFooter - ${data.name}`)
	const query = e.params(
		{
			codeIcon: e.str,
			codeType: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			order: e.int16,
			owner: e.str,
			page: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObjFooter, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', p.codeIcon)),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', p.codeType)),
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				order: p.order,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				page: p.page
			})
		}
	)
	return await query.run(client, data)
}

export async function addNodeProgramObj(data: any) {
	sectionHeader(`addNodeProgramObj - ${data.name}`)
	const query = e.params(
		{
			codeIcon: e.str,
			dataObj: e.optional(e.str),
			header: e.optional(e.str),
			name: e.str,
			order: e.int16,
			owner: e.str,
			parentNodeName: e.optional(e.str)
		},
		(p) => {
			return e.insert(e.sys_core.SysNodeObj, {
				codeIcon: e.select(e.sys_core.getCode('ct_sys_node_obj_icon', p.codeIcon)),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_obj_type', 'programObject')),
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				header: p.header,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				order: p.order,
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getNodeObjByName(p.parentNodeName))
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
			return e.insert(e.sys_core.SysOrg, {
				owner: e.select(e.sys_core.getRootObj()),
				name: p.name,
				header: p.header,
				createdBy: e.select(e.sys_user.getRootUser()),
				modifiedBy: e.select(e.sys_user.getRootUser())
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldListChips(data: any) {
	sectionHeader(`addDataObjFieldListChips - ${data.name}`)
	const query = e.params(
		{
			btnLabelComplete: e.str,
			columnLabelDisplay: e.str,
			dataObj: e.str,
			isMultiSelect: e.bool,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldListChips, {
				btnLabelComplete: p.btnLabelComplete,
				columnLabelDisplay: p.columnLabelDisplay,
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				isMultiSelect: p.isMultiSelect,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldListConfig(data: any) {
	sectionHeader(`addDataObjFieldListConfig - ${data.name}`)

	const query = e.params(
		{
			btnLabelComplete: e.str,
			dataObjConfig: e.str,
			dataObjDisplay: e.str,
			isMultiSelect: e.bool,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldListConfig, {
				btnLabelComplete: p.btnLabelComplete,
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObjConfig: e.select(e.sys_core.getDataObj(p.dataObjConfig)),
				dataObjDisplay: e.select(e.sys_core.getDataObj(p.dataObjDisplay)),
				isMultiSelect: p.isMultiSelect,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addDataObjFieldListSelect(data: any) {
	sectionHeader(`addDataObjFieldListSelect - ${data.name}`)

	const query = e.params(
		{
			btnLabelComplete: e.str,
			dataObj: e.str,
			isMultiSelect: e.bool,
			name: e.str,
			owner: e.str
		},
		(p) => {
			return e.insert(e.sys_core.SysDataObjFieldListSelect, {
				btnLabelComplete: p.btnLabelComplete,
				createdBy: e.select(e.sys_user.getRootUser()),
				dataObj: e.select(e.sys_core.getDataObj(p.dataObj)),
				isMultiSelect: p.isMultiSelect,
				modifiedBy: e.select(e.sys_user.getRootUser()),
				name: p.name,
				owner: e.select(e.sys_core.getEnt(p.owner))
			})
		}
	)
	return await query.run(client, data)
}

export async function addUser(data: any) {
	sectionHeader(`addUser - ${data.userName}`)
	const CREATOR = e.select(e.sys_user.getRootUser())
	const query = e.params(
		{
			firstName: e.str,
			lastName: e.str,
			owner: e.str,
			password: e.str,
			userName: e.str
		},
		(p) => {
			return e.insert(e.sys_user.SysUser, {
				createdBy: CREATOR,
				modifiedBy: CREATOR,
				owner: e.select(e.sys_core.getOrg(p.owner)),
				password: p.password,
				person: e.insert(e.default.SysPerson, {
					firstName: p.firstName,
					lastName: p.lastName
				}),
				userName: p.userName
			})
		}
	)
	return await query.run(client, data)
}

export async function addUserOrg(data: any) {
	sectionHeader(`addUser - ${data.userName} - org: ${data.orgName}`)
	const query = e.params(
		{
			orgName: e.str,
			userName: e.str
		},
		(p) => {
			return e.update(e.sys_user.SysUser, (u) => ({
				filter: e.op(u.userName, '=', p.userName),
				set: {
					orgs: {
						'+=': e.select(e.sys_core.getOrg(p.orgName))
					}
				}
			}))
		}
	)
	return await query.run(client, data)
}

// tables: e.select(
// 	e.assert_distinct(
// 		e.for(
// 			e.array_unpack(
// 				e.cast(
// 					e.array(e.str),
// 					e.json_get(e.cast(e.json, e.json_get(f, 'column')), 'tables')
// 				)
// 			),
// 			(t) => {
// 				return e.sys_db.getTable(t)
// 			}
// 		)
// 	)
// )

// fieldsDb: e.for(e.array_unpack(p.fields), (f) => {
// 	return e.insert(e.sys_core.SysDataObjFieldDb, {
// 		column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName'))))
// 	})
// }),

// fieldsEl: e.for(e.array_unpack(p.fields), (f) => {
// 	return e.insert(e.sys_core.SysDataObjFieldEl, {
// 		column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName'))))
// 	})
// }),
