import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function review(file: string, query: string) {
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

// optionalProperty := parameter if parameter != "" else <str>{}

export async function addForm(data: any) {
	const query = e.params(
		{
			owner: e.str,
			name: e.str,
			header: e.optional(e.str),
			subHeader: e.optional(e.str),
			description: e.optional(e.str),
			tableModule: e.str,
			tableName: e.str,
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
				table: e.select(e.sys_db.getTable(p.tableModule, p.tableName)),
				codeCardinality: e.select(
					e.sys_core.getCode('ct_sys_data_obj_cardinality', p.codeCardinality)
				),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_data_obj_component', p.codeComponent)),
				isPopup: p.isPopup,
				submitButtonLabel: p.submitButtonLabel,

				actions: e.select(e.sys_obj.DataObjAction, (OA) => ({
					filter: e.contains(p.actions, OA.name)
				})),
				fields: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.FormField, {
						column: e.select(e.sys_db.getColumn(e.cast(e.str, e.json_get(f, 'columnName')))),

						codeElement: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_element',
								e.cast(e.str, e.json_get(f, 'codeElement'))
							)
						),

						codeInputType: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_input',
								e.cast(e.str, e.json_get(f, 'codeInputType'))
							)
						),

						codeAccess: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_access',
								e.cast(e.str, e.json_get(f, 'codeAccess'))
							)
						),

						dbSelectOrder: e.cast(e.int16, e.json_get(f, 'dbSelectOrder')),

						isDisplayable: e.op(
							e.bool(true),
							'if',
							e.op(e.cast(e.bool, e.json_get(f, 'isDisplayable')), '?=', e.cast(e.bool, e.set())),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDisplayable'))
						),

						isDisplay: e.op(
							e.bool(true),
							'if',
							e.op(e.cast(e.bool, e.json_get(f, 'isDisplay')), '?=', e.cast(e.bool, e.set())),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDisplay'))
						),

						isDbSys: e.op(
							e.bool(false),
							'if',
							e.op(e.cast(e.bool, e.json_get(f, 'isDbSys')), '?=', e.cast(e.bool, e.set())),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDbSys'))
						),

						// dbName: e.cast(e.str, e.json_get(f, 'dbName')),
						dbName: e.op(
							e.cast(e.str, e.json_get(f, 'columnName')),
							'if',
							e.op(e.cast(e.str, e.json_get(f, 'dbName')), '?=', e.cast(e.str, e.set())),
							'else',
							e.cast(e.str, e.json_get(f, 'dbName'))
						),

						codeDbDataSource: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_source',
								e.cast(e.str, e.json_get(f, 'codeDbDataSource'))
							)
						),

						dbDataSourceKey: e.op(
							e.cast(e.str, e.json_get(f, 'dbDataSourceKey')),
							'if',
							e.op(e.cast(e.str, e.json_get(f, 'dbDataSourceKey')), '?!=', e.cast(e.str, e.set())),
							'else',
							e.op(
								e.cast(e.str, e.json_get(f, 'columnName')),
								'if',
								e.op(
									e.cast(e.str, e.json_get(f, 'codeDbDataSource')),
									'?!=',
									e.cast(e.str, e.set())
								),
								'else',
								e.cast(e.str, e.set())
							)
						),

						codeDbDataOp: e.sys_core.getCode(
							'ct_sys_form_field_op',
							e.cast(e.str, e.json_get(f, 'codeDbDataOp'))
						),

						isDbIdentity: e.op(
							e.bool(false),
							'if',
							e.op(e.cast(e.bool, e.json_get(f, 'isDbIdentity')), '?=', e.cast(e.bool, e.set())),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDbIdentity'))
						),

						isDbPreset: e.op(
							e.bool(false),
							'if',
							e.op(e.cast(e.bool, e.json_get(f, 'isDbPreset')), '?=', e.cast(e.bool, e.set())),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDbPreset'))
						),

						isDbAllowNull: e.op(
							e.bool(false),
							'if',
							e.op(e.cast(e.bool, e.json_get(f, 'isDbAllowNull')), '?=', e.cast(e.bool, e.set())),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDbAllowNull'))
						),

						isDbExcludeInsert: e.op(
							e.bool(false),
							'if',
							e.op(
								e.cast(e.bool, e.json_get(f, 'isDbExcludeInsert')),
								'?=',
								e.cast(e.bool, e.set())
							),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDbExcludeInsert'))
						),

						isDbExcludeUpdate: e.op(
							e.bool(false),
							'if',
							e.op(
								e.cast(e.bool, e.json_get(f, 'isDbExcludeUpdate')),
								'?=',
								e.cast(e.bool, e.set())
							),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDbExcludeUpdate'))
						),

						isDbListOrderField: e.op(
							e.bool(false),
							'if',
							e.op(
								e.cast(e.bool, e.json_get(f, 'isDbListOrderField')),
								'?=',
								e.cast(e.bool, e.set())
							),
							'else',
							e.cast(e.bool, e.json_get(f, 'isDbListOrderField'))
						),

						codeDbListDir: e.op(
							e.sys_core.getCode(
								'ct_sys_form_field_list_dir',
								e.cast(e.str, e.json_get(f, 'codeDbListDir'))
							),
							'if',
							e.op(e.cast(e.str, e.json_get(f, 'codeDbListDir')), '?!=', e.cast(e.str, e.set())),
							'else',
							e.op(
								e.sys_core.getCode('ct_sys_form_field_list_dir', e.str('asc')),
								'if',
								e.cast(e.bool, e.json_get(f, 'isDbListOrderField')),
								'else',
								e.cast(e.sys_core.Code, e.set())
							)
						),

						dbListOrder: e.cast(e.int16, e.json_get(f, 'dbListOrder'))
					})
				}),

				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
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
			module: t.owner.name,
			name: true,
			hasMgmt: true
		})),
		_codeCardinality: form.codeCardinality.name,
		_codeComponent: form.codeComponent.name,
		isPopup: true,
		submitButtonLabel: true,
		_actions: e.select(form.actions, (oa) => ({
			name: true,
			header: true,
			order_by: {
				expression: oa.order,
				direction: e.ASC
			}
		})),
		_fields: e.select(form.fields, (f) => ({
			dbName: true,
			dbSelectOrder: true,
			_codeElement: f.codeElement.name,
			_codeInputType: f.codeInputType.name,
			_codeAccess: f.codeAccess.name,
			isDisplayable: true,
			isDisplay: true,
			isDbSys: true,
			_codeDbDataSource: f.codeDbDataSource.name,
			dbDataSourceKey: true,
			_codeDbDataOp: f.codeDbDataOp.name,
			isDbIdentity: true,
			isDbPreset: true,
			isDbAllowNull: true,
			isDbExcludeInsert: true,
			isDbExcludeUpdate: true,
			isDbListOrderField: true,
			_codeDbListDir: f.codeDbListDir.name,
			dbListOrder: true,
			_column: e.select(f.column, (c) => ({
				name: true,
				header: true,
				headerSide: true,
				expr: true,
				width: true,
				hRows: true,
				_codeAlignment: c.codeAlignment.name,
				_codeDataType: c.codeDataType.name,
				dynamicLabel: true,
				matchColumn: true,
				minLength: true,
				maxLength: true,
				minValue: true,
				maxValue: true,
				pattern: true,
				patternMsg: true,
				patternReplacement: true,
				placeHolder: true,
				staticLabel: true
			}))
		})),

		_fieldsId: e.select(form.fields, (f) => ({
			dbName: true,
			_codeDbDataType: f.column.codeDataType.name,
			_codeDbDataSource: f.codeDbDataSource.name,
			dbDataSourceKey: true,
			_codeDbDataOp: f.codeDbDataOp.name,
			fieldName: f.column.name,
			filter: e.op(f.isDbIdentity, '=', e.bool(true))
		})),

		_fieldsOrder: e.select(form.fields, (f) => ({
			dbName: true,
			_codeDbListDir: f.codeDbListDir.name,
			dbListOrder: true,
			filter: e.op(f.isDbListOrderField, '=', e.bool(true)),
			order_by: f.dbListOrder
		})),

		_fieldsPreset: e.select(form.fields, (f) => ({
			dbName: true,
			_codeDbDataType: f.column.codeDataType.name,
			_codeDbDataSource: f.codeDbDataSource.name,
			dbDataSourceKey: true,
			_codeDbDataOp: f.codeDbDataOp.name,
			fieldName: f.column.name,
			filter: e.op(f.isDbPreset, '=', e.bool(true))
		})),

		_fieldsSaveInsert: e.select(form.fields, (f) => ({
			dbName: true,
			_codeDbDataType: f.column.codeDataType.name,
			_codeDbDataSource: f.codeDbDataSource.name,
			dbDataSourceKey: true,
			_codeDbDataOp: f.codeDbDataOp.name,
			fieldName: f.column.name,
			filter: e.op(
				e.op(f.isDbSys, '=', e.bool(false)),
				'and',
				e.op(f.isDbExcludeInsert, '=', e.bool(false))
			)
		})),

		_fieldsSaveUpdate: e.select(form.fields, (f) => ({
			dbName: true,
			_codeDbDataType: f.column.codeDataType.name,
			_codeDbDataSource: f.codeDbDataSource.name,
			dbDataSourceKey: true,
			_codeDbDataOp: f.codeDbDataOp.name,
			fieldName: f.column.name,
			filter: e.op(
				e.op(f.isDbSys, '=', e.bool(false)),
				'and',
				e.op(f.isDbExcludeUpdate, '=', e.bool(false))
			)
		})),

		_fieldsSelect: e.select(form.fields, (f) => ({
			dbName: true,
			_codeDbDataType: f.column.codeDataType.name,
			fieldName: f.column.name,
			dbSelectOrder: true,
			order_by: {
				expression: f.dbSelectOrder,
				direction: e.ASC
			}
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
		order_by: {
			expression: n.order,
			direction: e.ASC
		}
	}))
	return await query.run(client)
}

export async function getUserByUserName(userName: string) {
	const query = e.select(e.sys_user.User, (u) => ({
		id: true,
		lastName: true,
		firstName: true,
		fullName: true,
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
			order_by: {
				expression: ut.order,
				direction: e.ASC
			}
		})),
		// _resources := (select .userTypes filter @isActive = false) {name}
		// filter: e.op(ut['@isActive'], '=', e.bool(true)),

		filter_single: e.op(u.userName, '=', userName)
	}))
	return await query.run(client)
}
