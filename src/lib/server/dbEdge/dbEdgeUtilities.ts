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

export async function getDataObjIdByName(dataObjName: string) {
	const query = e.select(e.sys_obj.DataObj, (do1) => ({
		id: true,
		filter_single: e.op(do1.name, '=', dataObjName)
	}))
	return await query.run(client)
}

export async function getDataObjById(dataObjId: string) {
	const query = e.select(e.sys_obj.DataObj, (do1) => {
		const actionBack = e.select(e.sys_obj.DataObjAction, (doa) => ({
			allTabs: true,
			color: true,
			header: true,
			name: true,
			order: true,
			filter: e.op(doa.allTabs, '=', true)
		}))
		const actionsDataObj = e.select(do1.actions, (a) => ({
			allTabs: true,
			color: true,
			header: true,
			name: true,
			order: true,
			filter: e.op(do1.id, '=', e.cast(e.uuid, dataObjId))
		}))
		const _actions = e.select(e.op(actionBack, 'union', actionsDataObj), (a) => ({
			allTabs: true,
			color: true,
			header: true,
			name: true,
			order: true,
			order_by: a.order
		}))

		return {
			description: true,
			exprFilter: true,
			exprObject: true,
			header: true,
			id: true,
			isPopup: true,
			link: true,
			name: true,
			subHeader: true,

			_actions,
			_codeCardinality: do1.codeCardinality.name,
			_codeComponent: do1.codeComponent.name,
			_table: e.select(do1.table, (t) => ({
				mod: true,
				name: true,
				hasMgmt: true
			})),

			_fieldsEl: e.select(do1.fieldsEl, (f) => ({
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
				_codeCustomElType: f.codeCustomElType.name,
				_codeElement: f.codeElement.name,
				_itemsList: e.select(f.itemsList, (il) => ({
					dbSelect: true,
					name: true,
					propertyId: true,
					propertyLabel: true
				})),
				customElParms: true,
				headerAlt: true,
				height: true,
				isDisplay: true,
				isDisplayable: true,
				items: true,
				itemsListParms: true,
				width: true,
				order_by: f.dbOrderSelect
			})),

			_fieldsElCrumb: e.select(do1.fieldsEl, (f) => ({
				_name: f.column.name,
				filter: e.op('exists', f.dbOrderCrumb),
				order_by: f.dbOrderCrumb
			})),

			_fieldsDbId: e.select(do1.fieldsDb, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbDataOp: f.codeDbDataOp.name,
				_codeDbDataSource: f.codeDbDataSource.name,
				_exprFilter: f.exprFilter,
				_name: f.column.name,
				dbDataSourceKey: true,
				filter: e.op(f.isDbFilter, '=', e.bool(true))
			})),

			_fieldsDbOrder: e.select(do1.fieldsDb, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbListDir: f.codeDbListDir.name,
				_exprFilter: f.exprFilter,
				_name: f.column.name,
				filter: e.op('exists', f.dbOrderList),
				order_by: f.dbOrderList
			})),

			_fieldsDbPreset: e.select(do1.fieldsDb, (f) => ({
				_expr: e.op(e.op(f.column.exprPreset, '??', f.column.exprSelect), '??', f.exprPreset),
				_name: f.column.name,
				filter: e.op(
					e.op(e.op('exists', f.column.exprPreset), 'or', e.op('exists', f.column.exprSelect)),
					'or',
					e.op('exists', f.exprPreset)
				)
			})),

			_fieldsDbSaveInsert: e.select(do1.fieldsDb, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbDataSource: f.codeDbDataSource.name,
				_edgeTypeDefn: f.column.edgeTypeDefn,
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

			_fieldsDbSaveUpdate: e.select(do1.fieldsDb, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_codeDbDataSource: f.codeDbDataSource.name,
				_edgeTypeDefn: f.column.edgeTypeDefn,
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

			_fieldsDbSelectSys: e.select(do1.fieldsDb, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_edgeTypeDefn: f.column.edgeTypeDefn,
				_expr: f.column.exprSelect,
				_name: f.column.name,
				isLinkMember: true,
				filter: e.op(f.column.isSetBySys, '=', true)
			})),

			_fieldsDbSelectUser: e.select(do1.fieldsDb, (f) => ({
				_codeDataType: f.column.codeDataType.name,
				_edgeTypeDefn: f.column.edgeTypeDefn,
				_expr: f.column.exprSelect,
				_name: f.column.name,
				isLinkMember: true,
				filter: e.op('not', e.op('exists', f.column.isExcludeSelect))
			})),

			filter_single: e.op(do1.id, '=', e.cast(e.uuid, dataObjId))
		}
	})
	return await query.run(client)
}

export async function getNodesBranch(parentNodeId: string) {
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

export async function getNodesLevel(parentNodeId: string) {
	const baseShape = e.shape(e.sys_obj.NodeObj, (n) => ({
		id: true,
		_codeType: n.codeType.name,
		name: true,
		header: true,
		_codeIcon: n.codeIcon.name,
		page: true,
		dataObjId: n.dataObj.id,
		order: true,
		order_by: n.order
	}))
	const root = e.select(e.sys_obj.NodeObj, (n: any) => ({
		...baseShape(n),
		filter: e.op(n.parent.id, '=', e.cast(e.uuid, parentNodeId))
	}))
	const children = e.select(e.sys_obj.NodeObj, (n: any) => ({
		...baseShape(n),
		filter: e.op(n.parent.parent.id, '=', e.cast(e.uuid, parentNodeId))
	}))
	const query = e.select({ root, children })
	return await query.run(client)
}

export async function getUserByUserId(userId: string) {
	const query = e.select(e.sys_user.User, (u) => ({
		id: true,
		lastName: u.person.lastName,
		firstName: u.person.firstName,
		fullName: u.person.fullName,
		userName: true,
		org: e.select(e.sys_core.Org, (org) => ({
			name: true,
			appName: true,
			filter_single: e.op(org.id, '=', u.owner.id)
		})),
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
		filter_single: e.op(u.id, '=', e.cast(e.uuid, userId))
	}))
	return await query.run(client)
}

export async function getUserByUserName(userName: string) {
	const query = e.select(e.sys_user.User, (u) => ({
		id: true,
		filter_single: e.op(u.userName, '=', userName)
	}))
	const user = await query.run(client)
	if (user) {
		return await getUserByUserId(user.id)
	} else {
		return undefined
	}
}
