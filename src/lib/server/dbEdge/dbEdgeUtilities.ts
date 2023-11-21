import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function review(file: string, query: string) {
	if (!query) return
	const result = await client.query(query)
	console.log()
	console.log(`${file}.review...`)
	console.log('query:', query)
	console.log('result:', result)
	console.log()
}

export async function execute(query: string) {
	await client.execute(query)
}

export async function addCode(data: any) {
	const query = e.params(
		{
			owner: e.str,
			codeType: e.str,
			parent: e.optional(e.json),
			name: e.str,
			order: e.int16,
			value: e.optional(e.str),
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
				name: p.name,
				order: p.order,
				value: p.value,
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
			name: e.str,
			order: e.int16,
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_core.CodeType, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(e.sys_core.getCodeType(p.parent)),
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
			exprSave: e.optional(e.str),
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
				exprSave: p.exprSave,
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
			owner: e.str,
			name: e.str,
			header: e.str,
			order: e.int64,
			color: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_obj.DataObjAction, {
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

export async function addForm(data: any) {
	const query = e.params(
		{
			owner: e.str,
			name: e.str,
			header: e.optional(e.str),
			subHeader: e.optional(e.str),
			description: e.optional(e.str),
			table: e.optional(e.json),
			link: e.optional(e.json),
			codeCardinality: e.str,
			codeComponent: e.str,
			isPopup: e.optional(e.bool),
			submitButtonLabel: e.optional(e.str),
			fields: e.optional(e.array(e.json)),
			actions: e.optional(e.array(e.str)),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_obj.Form, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				name: p.name,
				header: p.header,
				subHeader: p.subHeader,
				description: p.description,
				table: e.select(
					e.sys_db.getTable(
						e.cast(e.str, e.json_get(p.table, 'owner')),
						e.cast(e.str, e.json_get(p.table, 'name'))
					)
				),
				link: p.link,
				codeCardinality: e.select(
					e.sys_core.getCode('ct_sys_data_obj_cardinality', p.codeCardinality)
				),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_data_obj_component', p.codeComponent)),
				isPopup: p.isPopup,
				submitButtonLabel: p.submitButtonLabel,

				actions: e.select(e.sys_obj.DataObjAction, (OA) => ({
					filter: e.contains(p.actions, OA.name)
				})),

				fieldsDb: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.FormFieldDb, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						codeDbDataOp: e.sys_core.getCode(
							'ct_sys_form_field_op',
							e.cast(e.str, e.json_get(f, 'codeDbDataOp'))
						),

						codeDbDataSource: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_source',
								e.cast(e.str, e.json_get(f, 'codeDbDataSource'))
							)
						),

						codeDbListDir: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_list_dir',
								e.cast(e.str, e.json_get(f, 'codeDbListDir'))
							)
						),

						dbDataSourceKey: e.cast(e.str, e.json_get(f, 'dbDataSourceKey')),

						dbExpr: e.cast(e.str, e.json_get(f, 'dbExpr')),

						dbOrderList: e.cast(e.int16, e.json_get(f, 'dbOrderList')),

						dbOrderSelect: e.cast(e.int16, e.json_get(f, 'dbOrderSelect')),

						fieldName: e.cast(e.str, e.json_get(f, 'fieldName')),

						isDbAllowNull: e.cast(e.bool, e.json_get(f, 'isDbAllowNull')),

						isDbFilter: e.cast(e.bool, e.json_get(f, 'isDbFilter')),

						isDbListOrderField: e.cast(e.bool, e.json_get(f, 'isDbListOrderField')),

						isLinkMember: e.cast(e.bool, e.json_get(f, 'isLinkMember'))
					})
				}),

				fieldsEl: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.FormFieldEl, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						codeAccess: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_access',
								e.cast(e.str, e.json_get(f, 'codeAccess'))
							)
						),

						codeElement: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_element',
								e.cast(e.str, e.json_get(f, 'codeElement'))
							)
						),

						dbOrderSelect: e.cast(e.int16, e.json_get(f, 'dbOrderSelect')),

						labelDynamicKey: e.cast(e.str, e.json_get(f, 'labelDynamicKey')),

						labelDynamicSource: e.cast(e.str, e.json_get(f, 'labelDynamicSource')),

						labelHeader: e.cast(e.str, e.json_get(f, 'labelHeader')),

						labelText: e.cast(e.str, e.json_get(f, 'labelText')),

						height: e.cast(e.int16, e.json_get(f, 'height')),

						isDisplay: e.cast(e.bool, e.json_get(f, 'isDisplay')),

						isDisplayable: e.cast(e.bool, e.json_get(f, 'isDisplayable')),

						items: e.cast(e.array(e.json), e.json_get(f, 'items')),

						itemsList: e.select(
							e.sys_obj.getFormFieldItemsList(e.cast(e.str, e.json_get(f, 'itemsList')))
						),

						itemsListParms: e.cast(e.json, e.json_get(f, 'itemsListParms')),

						width: e.cast(e.int16, e.json_get(f, 'width'))
					})
				}),

				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addFormFieldItemsList(data: any) {
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
			return e.insert(e.sys_obj.FormFieldItemsList, {
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator)),
				owner: e.select(e.sys_core.getEnt(p.owner)),
				dbSelect: p.dbSelect,
				name: p.name,
				propertyId: p.propertyId,
				propertyLabel: p.propertyLabel,

				fieldsDb: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.FormFieldDb, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						codeDbDataOp: e.sys_core.getCode(
							'ct_sys_form_field_op',
							e.cast(e.str, e.json_get(f, 'codeDbDataOp'))
						),

						codeDbDataSource: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_source',
								e.cast(e.str, e.json_get(f, 'codeDbDataSource'))
							)
						),

						codeDbListDir: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_list_dir',
								e.cast(e.str, e.json_get(f, 'codeDbListDir'))
							)
						),

						dbDataSourceKey: e.cast(e.str, e.json_get(f, 'dbDataSourceKey')),

						dbExpr: e.cast(e.str, e.json_get(f, 'dbExpr')),

						dbOrderList: e.cast(e.int16, e.json_get(f, 'dbOrderList')),

						dbOrderSelect: e.cast(e.int16, e.json_get(f, 'dbOrderSelect')),

						fieldName: e.cast(e.str, e.json_get(f, 'fieldName')),

						isDbAllowNull: e.cast(e.bool, e.json_get(f, 'isDbAllowNull')),

						isDbFilter: e.cast(e.bool, e.json_get(f, 'isDbFilter')),

						isDbListOrderField: e.cast(e.bool, e.json_get(f, 'isDbListOrderField'))
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
			page: e.str,
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
				page: p.page,
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
			firstName: e.str,
			lastName: e.str,
			userName: e.str,
			password: e.str
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

export async function getFormIdByName(formName: string) {
	const query = e.select(e.sys_obj.Form, (form) => ({
		id: true,
		filter_single: e.op(form.name, '=', formName)
	}))
	return await query.run(client)
}

export async function getFormById(formId: string) {
	const query = e.select(e.sys_obj.Form, (form) => ({
		id: true,
		name: true,
		header: true,
		subHeader: true,
		description: true,
		_table: e.select(form.table, (t) => ({
			mod: true,
			name: true,
			hasMgmt: true
		})),
		link: true,
		_codeCardinality: form.codeCardinality.name,
		_codeComponent: form.codeComponent.name,
		isPopup: true,
		submitButtonLabel: true,
		_actions: e.select(form.actions, (oa) => ({
			name: true,
			header: true,
			color: true,
			order_by: oa.order
		})),
		_fieldsEl: e.select(form.fieldsEl, (f) => ({
			_column: e.select(f.column, (c) => ({
				_codeAlignment: c.codeAlignment.name,
				_codeDataType: c.codeDataType.name,
				_codeDataTypePreset: c.codeDataTypePreset.name,
				classValue: true,
				exprSelect: true,
				exprStorageKey: true,
				header: true,
				headerSide: true,
				isMultiSelect: true,
				matchColumn: true,
				maxLength: true,
				maxValue: true,
				minLength: true,
				minValue: true,
				name: true,
				pattern: true,
				patternMsg: true,
				patternReplacement: true,
				placeHolder: true
			})),
			_codeAccess: f.codeAccess.name,
			_codeElement: f.codeElement.name,
			labelDynamicKey: true,
			labelDynamicSource: true,
			labelHeader: true,
			labelText: true,
			height: true,
			isDisplay: true,
			isDisplayable: true,
			items: true,
			_itemsList: e.select(f.itemsList, (il) => ({
				dbSelect: true,
				name: true,
				propertyId: true,
				propertyLabel: true
			})),
			itemsListParms: true,
			width: true,
			order_by: f.dbOrderSelect
		})),

		_fieldsDbId: e.select(form.fieldsDb, (f) => ({
			_codeDataType: f.column.codeDataType.name,
			_codeDbDataOp: f.codeDbDataOp.name,
			_codeDbDataSource: f.codeDbDataSource.name,
			_expr: f.dbExpr,
			_name: f.column.name,
			dbDataSourceKey: true,
			filter: e.op(f.isDbFilter, '=', e.bool(true))
		})),

		_fieldsDbOrder: e.select(form.fieldsDb, (f) => ({
			_codeDataType: f.column.codeDataType.name,
			_codeDbListDir: f.codeDbListDir.name,
			_expr: f.dbExpr,
			_name: f.column.name,
			filter: e.op(f.isDbListOrderField, '=', e.bool(true)),
			order_by: f.dbOrderList
		})),

		_fieldsDbPreset: e.select(form.fieldsDb, (f) => ({
			_expr: e.op(f.column.exprPreset, '??', f.column.exprSelect),
			_name: f.column.name,
			filter: e.op(e.op('exists', f.column.exprSelect), 'or', e.op('exists', f.column.exprPreset))
		})),

		_fieldsDbSaveInsert: e.select(form.fieldsDb, (f) => ({
			_codeDataType: f.column.codeDataType.name,
			_codeDbDataSource: f.codeDbDataSource.name,
			_edgeTypeDefn: f.column.edgeTypeDefn,
			_exprSave: f.column.exprSave,
			_isMultiSelect: f.column.isMultiSelect,
			_name: f.column.name,
			dbDataSourceKey: true,
			isLinkMember: true,

			filter: e.op(
				e.op(f.column.codeDataType.name, '!=', 'computed'),
				'and',
				e.op(
					e.op('not', e.op('exists', f.column.isExcludeInsert)),
					'and',
					e.op('not', e.op('exists', f.column.isSetBySys))
				)
			)
		})),

		_fieldsDbSaveUpdate: e.select(form.fieldsDb, (f) => ({
			_codeDataType: f.column.codeDataType.name,
			_codeDbDataSource: f.codeDbDataSource.name,
			_edgeTypeDefn: f.column.edgeTypeDefn,
			_exprSave: f.column.exprSave,
			_isMultiSelect: f.column.isMultiSelect,
			_name: f.column.name,
			dbDataSourceKey: true,
			isLinkMember: true,
			filter: e.op(
				e.op(f.column.codeDataType.name, '!=', 'computed'),
				'and',
				e.op(
					e.op('not', e.op('exists', f.column.isExcludeUpdate)),
					'and',
					e.op('not', e.op('exists', f.column.isSetBySys))
				)
			)
		})),

		_fieldsDbSelectSys: e.select(form.fieldsDb, (f) => ({
			_codeDataType: f.column.codeDataType.name,
			_edgeTypeDefn: f.column.edgeTypeDefn,
			_expr: f.column.exprSelect,
			_name: f.column.name,
			isLinkMember: true,
			filter: e.op(f.column.isSetBySys, '=', true)
		})),

		_fieldsDbSelectUser: e.select(form.fieldsDb, (f) => ({
			_codeDataType: f.column.codeDataType.name,
			_edgeTypeDefn: f.column.edgeTypeDefn,
			_expr: f.column.exprSelect,
			_name: f.column.name,
			isLinkMember: true,
			filter: e.op('not', e.op('exists', f.column.isExcludeSelect)),
			order_by: f.dbOrderSelect
		})),

		filter_single: e.op(form.id, '=', e.cast(e.uuid, formId))
	}))
	return await query.run(client)
}

export async function getNodeObjsByParent(parentNodeId: string) {
	const query = e.select(e.sys_obj.NodeObj, (n) => ({
		id: true,
		_codeType: n.codeType.name,
		name: true,
		header: true,
		_codeIcon: n.codeIcon.name,
		page: true,
		dataObjId: n.dataObj.id,
		order: true,
		filter: e.op(n.parent.id, '=', e.cast(e.uuid, parentNodeId)),
		order_by: n.order
	}))
	return await query.run(client)
}

export async function getUserByUserName(userName: string) {
	const query = e.select(e.sys_user.User, (u) => ({
		id: true,
		lastName: u.person.lastName,
		firstName: u.person.firstName,
		fullName: u.person.fullName,
		userName: true,
		resource_widgets: e.select(u.userTypes.resources.is(e.sys_user.Widget), (ut) => ({
			id: true,
			name: true
		})),
		resource_programs: e.select(u.userTypes.resources.is(e.sys_obj.NodeObj), (ut) => ({
			id: true,
			_codeType: ut.codeType.name,
			name: true,
			header: true,
			_codeIcon: ut.codeIcon.name,
			page: true,
			dataObjId: ut.dataObj.id,
			order: true,
			order_by: ut.order
		})),
		filter_single: e.op(u.userName, '=', userName)
	}))
	return await query.run(client)
}
