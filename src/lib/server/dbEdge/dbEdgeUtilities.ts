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
			fields: e.array(e.json),
			objActions: e.optional(e.array(e.str)),
			dataActions: e.array(e.json),
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
					e.sys_core.getCode('ct_sys_node_obj_cardinality', p.codeCardinality)
				),
				codeComponent: e.select(e.sys_core.getCode('ct_sys_node_obj_component', p.codeComponent)),
				isPopup: p.isPopup,
				submitButtonLabel: p.submitButtonLabel,

				objActions: e.select(e.sys_obj.ObjAction, (OA) => ({
					filter: e.contains(p.objActions, OA.name)
				})),

				dataActions: e.for(e.array_unpack(p.dataActions), (da) => {
					return e.insert(e.sys_obj.DataAction, {
						codeType: e.select(
							e.sys_core.getCode(
								'ct_sys_data_action_type',
								e.cast(e.str, e.json_get(da, 'codeType'))
							)
						),
						query: e.cast(e.str, e.json_get(da, 'query')),
						items: e.for(e.array_unpack(e.cast(e.array(e.json), e.json_get(da, 'items'))), (i) =>
							e.insert(e.sys_obj.DataActionItem, {
								dbName: e.cast(e.str, e.json_get(i, 'dbName')),
								codeDataType: e.cast(
									e.sys_obj.ct_sys_edgedb_data_type,
									e.json_get(i, 'codeDataType')
								),
								codeDirection: e.cast(
									e.sys_obj.ct_sys_data_action_item_direction,
									e.json_get(i, 'codeDirection')
								),
								codeOp: e.cast(e.sys_obj.ct_sys_data_action_item_op, e.json_get(i, 'codeOp')),
								codeSource: e.cast(
									e.sys_obj.ct_sys_data_action_item_source,
									e.json_get(i, 'codeSource')
								),
								fieldName: e.cast(e.str, e.json_get(i, 'fieldName')),
								order: e.cast(e.int16, e.json_get(i, 'order')),
								sourceKey: e.cast(e.str, e.json_get(i, 'sourceKey'))
							})
						)
					})
				}),

				fields: e.for(e.array_unpack(p.fields), (f) => {
					return e.insert(e.sys_obj.FormField, {
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
						codeInputType: e.select(
							e.sys_core.getCode(
								'ct_sys_form_field_input',
								e.cast(e.str, e.json_get(f, 'codeInputType'))
							)
						),
						dynamicLabel: e.cast(e.str, e.json_get(f, 'dynamicLabel')),
						matchColumn: e.cast(e.str, e.json_get(f, 'matchColumn')),
						minLength: e.cast(e.int16, e.json_get(f, 'minLength')),
						maxLength: e.cast(e.int16, e.json_get(f, 'maxLength')),
						minValue: e.cast(e.int16, e.json_get(f, 'minValue')),
						maxValue: e.cast(e.int16, e.json_get(f, 'maxValue')),
						pattern: e.cast(e.str, e.json_get(f, 'pattern')),
						patternMsg: e.cast(e.str, e.json_get(f, 'patternMsg')),
						patternReplacement: e.cast(e.str, e.json_get(f, 'patternReplacement')),
						placeHolder: e.cast(e.str, e.json_get(f, 'placeHolder')),
						staticLabel: e.cast(e.str, e.json_get(f, 'staticLabel'))
					})
				}),

				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function addNode(data: any) {
	const query = e.params(
		{
			owner: e.str,
			parentNode: e.optional(e.json),
			codeType: e.str,
			name: e.str,
			header: e.optional(e.str),
			order: e.int16,
			codeIcon: e.str,
			page: e.str,
			obj: e.optional(e.str),
			creator: e.str
		},
		(p) => {
			return e.insert(e.sys_app.Node, {
				owner: e.select(e.sys_core.getEnt(p.owner)),
				parent: e.select(
					e.sys_app.getNode(
						e.cast(e.str, e.json_get(p.parentNode, 'owner')),
						e.cast(e.str, e.json_get(p.parentNode, 'name'))
					)
				),
				codeType: e.select(e.sys_core.getCode('ct_sys_node_type', p.codeType)),
				name: p.name,
				header: p.header,
				order: p.order,
				codeIcon: e.select(e.sys_core.getCode('ct_sys_icon', p.codeIcon)),
				page: p.page,
				obj: e.select(e.sys_obj.getNodeObjByName(p.obj)),
				createdBy: e.select(e.sys_user.getUser(p.creator)),
				modifiedBy: e.select(e.sys_user.getUser(p.creator))
			})
		}
	)
	return await query.run(client, data)
}

export async function getFormById(formOwner: string, formId: string) {
	const query = e.select(e.sys_obj.Form, (form) => ({
		id: true,
		name: true,
		header: true,
		subHeader: true,
		description: true,
		tableModule: form.table.owner.name,
		tableName: form.table.name,
		_codeCardinality: form.codeCardinality.name,
		_codeComponent: form.codeComponent.name,
		isPopup: true,
		submitButtonLabel: true,
		_objActions: e.select(form.objActions.name),
		_dataActions: e.select(form.dataActions, (da) => ({
			_codeType: da.codeType.name,
			query: true,
			_items: e.select(da.items, (i) => ({
				dbName: true,
				_codeDataType: e.select(i.codeDataType),
				_codeDirection: e.select(i.codeDirection),
				_codeOp: e.select(i.codeOp),
				_codeSource: e.select(i.codeSource),
				fieldName: true,
				order: true,
				sourceKey: true
			}))
		})),
		_fields: e.select(form.fields, (f) => ({
			_codeAccess: e.select(f.codeAccess.name),
			_codeElement: e.select(f.codeElement.name),
			_codeInputType: e.select(f.codeInputType.name),
			_column: e.select(f.column, (c) => ({
				name: true,
				header: true,
				headerSide: true,
				expr: true,
				width: true,
				hRows: true,
				_codeAlignment: e.select(c.codeAlignment.name),
				_codeDataType: e.select(c.codeDataType.name)
			})),
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
		})),

		filter_single: e.op(form.name, '=', 'form_training_provider_student_detail')
	}))
	return await query.run(client)
}

function removeObjProperty(obj: any, property: string) {
	const removedObj = obj[property]
	delete obj[property]
	return removedObj
}
