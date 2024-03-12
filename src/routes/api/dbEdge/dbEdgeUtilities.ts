import { createClient } from 'edgedb'
import e from '$lib/dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'
import type { TokenAppTreeNodeId } from '$comps/types.token'
import { TokenApiDbTableColumns, TokenApiUserId, TokenApiUserName } from '$comps/types.token'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

export async function execute(query: string) {
	await client.execute(query)
}

export async function getDataObjId(dataObjName: string) {
	const query = e.select(e.sys_core.SysDataObj, (do1) => ({
		id: true,
		filter_single: e.op(do1.name, '=', dataObjName)
	}))
	return await query.run(client)
}

export async function getDataObjById(dataObjId: string) {
	const query = e.select(e.sys_core.SysDataObj, (do1) => {
		return {
			actionsQuery: true,
			description: true,
			exprFilter: true,
			exprObject: true,
			header: true,
			id: true,
			isPopup: true,
			name: true,
			subHeader: true,

			_actionsFieldGroup: e.select(do1.actionsFieldGroup.actions, (a) => ({
				checkObjChanged: true,
				_codeActionType: a.codeActionType.name,
				_codeRenderShowSaveMode: a.codeRenderShowSaveMode.name,
				color: true,
				_confirm: e.select(a.confirm, (c) => ({
					confirmButtonLabel: true,
					confirmMessage: true,
					confirmTitle: true
				})),
				header: true,
				isRenderDisableOnInvalidToSave: true,
				isRenderShowRequiresObjHasChanged: true,
				name: true,
				order_by: a.order
			})),
			_codeCardinality: do1.codeCardinality.name,
			_codeComponent: do1.codeComponent.name,

			_tables: e.select(do1.tables, (t) => ({
				_columnParent: t.columnParent.name,
				index: true,
				indexParent: true,
				_table: e.select(t.table, (tbl) => ({
					hasMgmt: true,
					module: tbl.mod,
					name: true
				})),
				order_by: t.index
			})),

			_fieldsEl: e.select(do1.columns, (f) => ({
				_column: e.select(f.column, (c) => ({
					_codeAlignment: c.codeAlignment.name,
					_codeDataType: c.codeDataType.name,
					classValue: true,
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
					placeHolder: true,
					spinStep: true,
					toggleValueFalse: true,
					toggleValueShow: true,
					toggleValueTrue: true
				})),
				_codeAccess: f.codeAccess.name,
				_codeElement: f.codeElement.name,
				_fieldListConfig: e.select(f.fieldListConfig, (i) => ({
					_actionsFieldGroup: e.select(i.actionsFieldGroup.actions, (a) => ({
						checkObjChanged: true,
						_codeActionType: a.codeActionType.name,
						_codeRenderShowSaveMode: a.codeRenderShowSaveMode.name,
						color: true,
						_confirm: e.select(a.confirm, (c) => ({
							confirmButtonLabel: true,
							confirmMessage: true,
							confirmTitle: true
						})),
						header: true,
						isRenderDisableOnInvalidToSave: true,
						isRenderShowRequiresObjHasChanged: true,
						name: true,
						order_by: a.order
					})),
					_dataObjNameConfig: i.dataObjConfig.name,
					_dataObjNameDisplay: i.dataObjDisplay.name,
					isMultiSelect: true
				})),
				_fieldListItems: e.select(f.fieldListItems, (idb) => ({
					_codeDataTypeDisplay: idb.codeDataTypeDisplay.name,
					_codeMask: idb.codeMask.name,
					exprSelect: true,
					name: true
				})),
				_fieldListSelect: e.select(f.fieldListSelect, (i) => ({
					_actionsFieldGroup: e.select(i.actionsFieldGroup.actions, (a) => ({
						checkObjChanged: true,
						_codeActionType: a.codeActionType.name,
						_codeRenderShowSaveMode: a.codeRenderShowSaveMode.name,
						color: true,
						_confirm: e.select(a.confirm, (c) => ({
							confirmButtonLabel: true,
							confirmMessage: true,
							confirmTitle: true
						})),
						header: true,
						isRenderDisableOnInvalidToSave: true,
						isRenderShowRequiresObjHasChanged: true,
						name: true,
						order_by: a.order
					})),
					btnLabelComplete: true,
					_dataObjNameDisplay: i.dataObjDisplay.name,
					_dataObjNameSelect: i.dataObjSelect.name,
					isMultiSelect: true
				})),
				customElement: true,
				fieldListItemsParms: true,
				headerAlt: true,
				height: true,
				isDisplay: true,
				isDisplayable: true,
				items: true,
				nameCustom: true,
				width: true,
				order_by: f.dbOrderSelect
			})),

			_fieldsElCrumb: e.select(do1.columns, (f) => ({
				_name: f.column.name,
				filter: e.op('exists', f.dbOrderCrumb),
				order_by: f.dbOrderCrumb
			})),

			_fieldsDbFilter: e.select(do1.columns, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbDataOp: f.codeDbDataOp.name,
				_codeDbDataSource: f.codeDbDataSource.name,
				_name: f.column.name,
				dbDataSourceKey: true,
				hasItems: e.select(e.bool(false)),
				indexTable: true,
				filter: e.op(f.isDbFilter, '=', e.bool(true))
			})),

			_fieldsDbOrder: e.select(do1.columns, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbListDir: f.codeDbListDir.name,
				_name: f.column.name,
				dbOrderList: true,
				indexTable: true,
				filter: e.op('exists', f.dbOrderList),
				order_by: f.dbOrderList
			})),

			_fieldsDbPreset: e.select(do1.columns, (f) => ({
				_name: f.column.name,
				exprPresetScalar: true,
				hasItems: e.op(
					'exists',
					e.select(do1.columns, (c) => ({
						filter: e.op(e.op(c.column, '=', f.column), 'and', e.op('exists', c.fieldListItems))
					}))
				),
				indexTable: true,
				link: true,
				filter: e.op(
					e.op(
						e.op('exists', f.exprPresetScalar),
						'or',
						e.op('exists', e.cast(e.str, e.json_get(f.link, 'exprPreset')))
					),
					'or',
					e.op(e.op(f.column.name, '=', 'createdBy'), 'or', e.op(f.column.name, '=', 'modifiedBy'))
				)
			})),

			_fieldsDbSaveInsert: e.select(do1.columns, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbDataSource: f.codeDbDataSource.name,
				_isMultiSelect: f.column.isMultiSelect,
				_isSelfReference: f.column.isSelfReference,
				_name: f.column.name,
				dbDataSourceKey: true,
				hasItems: e.op(
					'exists',
					e.select(do1.columns, (c) => ({
						filter: e.op(e.op(c.column, '=', f.column), 'and', e.op('exists', c.fieldListItems))
					}))
				),
				indexTable: true,
				link: true,
				filter: e.op(f.column.isExcludeInsert, '=', e.bool(false))
			})),

			_fieldsDbSaveUpdate: e.select(do1.columns, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbDataSource: f.codeDbDataSource.name,
				_isMultiSelect: f.column.isMultiSelect,
				_isSelfReference: f.column.isSelfReference,
				_name: f.column.name,
				dbDataSourceKey: true,
				hasItems: e.op(
					'exists',
					e.select(do1.columns, (c) => ({
						filter: e.op(e.op(c.column, '=', f.column), 'and', e.op('exists', c.fieldListItems))
					}))
				),
				indexTable: true,
				link: true,
				filter: e.op(f.column.isExcludeUpdate, '=', e.bool(false))
			})),

			_fieldsDbSelectSys: e.select(do1.columns, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_name: f.column.name,
				hasItems: e.op(
					'exists',
					e.select(do1.columns, (c) => ({
						filter: e.op(e.op(c.column, '=', f.column), 'and', e.op('exists', c.fieldListItems))
					}))
				),
				indexTable: true,
				link: true,
				filter: e.op(f.column.isSetBySys, '=', true)
			})),

			_fieldsDbSelectUser: e.select(do1.columns, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_name: f.column.name,
				exprCustom: true,
				hasItems: e.op(
					'exists',
					e.select(do1.columns, (c) => ({
						filter: e.op(e.op(c.column, '=', f.column), 'and', e.op('exists', c.fieldListItems))
					}))
				),
				indexTable: true,
				link: true,
				nameCustom: true,
				filter: e.op(f.column.isExcludeSelect, '=', e.bool(false))
			})),

			filter_single: e.op(do1.id, '=', e.cast(e.uuid, dataObjId))
		}
	})
	return await query.run(client)
}

export async function getDataObjByName(dataObjName: string) {
	const result = await getDataObjId(dataObjName)
	return result?.id ? await getDataObjById(result.id) : undefined
}

export async function getNodesBranch(token: TokenAppTreeNodeId) {
	const parentNodeId = token.nodeId
	const query = e.select(e.sys_core.SysNodeObj, (n) => ({
		_codeIcon: n.codeIcon.name,
		_codeType: n.codeType.name,
		dataObjId: n.dataObj.id,
		header: true,
		id: true,
		name: true,
		order: true,
		page: true,
		filter: e.op(n.parent.id, '=', e.cast(e.uuid, parentNodeId)),
		order_by: n.order
	}))
	return await query.run(client)
}

export async function getNodesLevel(token: TokenAppTreeNodeId) {
	const parentNodeId = token.nodeId
	const baseShape = e.shape(e.sys_core.SysNodeObj, (n) => ({
		_codeIcon: n.codeIcon.name,
		_codeType: n.codeType.name,
		dataObjId: n.dataObj.id,
		header: true,
		id: true,
		name: true,
		order: true,
		page: true,
		order_by: n.order
	}))
	const root = e.select(e.sys_core.SysNodeObj, (n: any) => ({
		...baseShape(n),
		filter: e.op(n.parent.id, '=', e.cast(e.uuid, parentNodeId))
	}))
	const children = e.select(e.sys_core.SysNodeObj, (n: any) => ({
		...baseShape(n),
		filter: e.op(n.parent.parent.id, '=', e.cast(e.uuid, parentNodeId))
	}))
	const query = e.select({ root, children })
	return await query.run(client)
}

export async function getTableColumns(token: TokenApiDbTableColumns) {
	const query = e.select(e.schema.ObjectType, (ot) => ({
		name: true,
		links: e.select(ot.links, (l) => ({
			name: l.name,
			readonly: l.readonly,
			required: l.required,
			datatype: l.target.name,
			filter: e.op(l.name, '!=', '__type__')
		})),
		properties: e.select(ot.properties, (p) => ({
			name: p.name,
			readonly: p.readonly,
			required: p.required,
			datatype: p.target.name
		})),
		filter: e.op(ot.name, '=', token.tableModule + '::' + token.tableName)
	}))
	return await query.run(client)
}

export async function getUserByUserId(token: TokenApiUserId) {
	const query = e.select(e.sys_user.SysUser, (u) => ({
		avatar: u.person.avatar,
		firstName: u.person.firstName,
		fullName: u.person.fullName,
		id: true,
		lastName: u.person.lastName,
		userName: true,
		org: e.select(e.sys_core.SysOrg, (org) => ({
			name: true,
			header: true,
			filter_single: e.op(org.id, '=', u.owner.id)
		})),
		resource_footer: e.select(e.sys_core.SysNodeObjFooter, (f) => ({
			id: true,
			_codeType: f.codeType.name,
			name: true,
			header: true,
			_codeIcon: f.codeIcon.name,
			page: true,
			dataObjId: f.dataObj.id,
			order: true,
			order_by: f.order
		})),
		resource_programs: e.select(u.userTypes.resources.is(e.sys_core.SysNodeObj), (ut) => ({
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
		resource_widgets: e.select(u.userTypes.resources.is(e.sys_user.SysWidget), (ut) => ({
			id: true,
			name: true
		})),
		filter_single: e.op(u.id, '=', e.cast(e.uuid, token.userId))
	}))
	return await query.run(client)
}

export async function getUserIdByUserName(token: TokenApiUserName) {
	const query = e.select(e.sys_user.SysUser, (u) => ({
		id: true,
		filter_single: e.op(u.userName, '=', token.userName)
	}))
	const user = await query.run(client)
	return user ? user.id : undefined
}

export async function isObjectLink(objName: string, linkName: string) {
	const query = e.select(e.sys_core.isObjectLink(objName, linkName))
	return await query.run(client)
}
