import { EdgeQL, dbExecute, dbSelect, dbSelectSingle } from '$server/dbEdge/types.edgeDB.server'
import {
	DataAction,
	DataActionItem,
	DataActionItemDataType,
	DataActionItemOp,
	DataActionType,
	EdgeDBOrderDirection,
	NavDataProcessType,
	NavNodeObj,
	NavNodeObjCardinality
} from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeFunctions.ts'

export async function getNodesByParent(parentNodeId: string) {
	const query = new EdgeQL(`select sys_app::Node {
    id, 
		_codeType := .codeType.name, 
		name, 
		header, 
		_codeIcon := .codeIcon.name, 
		page, 
		objId := .obj.id, 
		order
  }`)
	query.addFilter('parent.id', DataActionItemOp.equal, DataActionItemDataType.uuid, parentNodeId)
	query.addOrder('order', EdgeDBOrderDirection.asc)
	return await dbSelect(query)
}

export async function getNodeObjForm(
	objId: string,
	nodeObj: NavNodeObj,
	processType: NavDataProcessType,
	data: any
) {
	if (!nodeObj) {
		nodeObj = new NavNodeObj(await getDefnRaw(objId))
	}

	return await processData(processType, nodeObj, data)

	async function getDefnRaw(objId: string) {
		const query = new EdgeQL(`
		select sys_obj::Form {
			id, 
			_codeCardinality := .codeCardinality.name,
			_codeComponent := .codeComponent.name,
			hasMgmt,
			name, 
			header, 
			subHeader, 
			description,
			submitButtonLabel,
			popup,
			fields: {
				name, 
				label, 
				_codeElement := .codeElement.name,
				_codeAccess := .codeAccess.name,
				_codeType := .codeInputType.name,
				placeHolder,
				matchColumn,
				minLength,
				maxLength,
				minValue,
				maxValue,
				pattern,
				patternMsg,
				patternReplacement
			},
			objActions : {
				name,
				header
			} order by .order asc,
			dataActions: {
				_codeType := .codeType.name,
				query,
				items: {
					dbName,
					_codeSource := .codeSource.name, 
					sourceKey,
					_codeDataType := .codeDataType.name,
					_codeOp := .codeOp.name
				}
			}
		}
		`)
		query.addFilter('id', DataActionItemOp.equal, DataActionItemDataType.uuid, objId)
		return await dbSelectSingle(query)
	}
}

async function processData(processType: NavDataProcessType, nodeObj: NavNodeObj, data: any) {
	const objName = nodeObj.defn.name

	switch (processType) {
		case NavDataProcessType.delete:
			return {}
			break

		case NavDataProcessType.insert:
			return await processDataInsert(nodeObj)
			break

		case NavDataProcessType.save:
			return await processDataSave(nodeObj, data)
			break

		case NavDataProcessType.select:
			return await processDataSelect(nodeObj, data)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processData',
				message: `No case defined for processType: ${processType}`
			})
	}

	function getDataAction(dataActionType: DataActionType, dataActions: Array<DataAction>) {
		const action = nodeObj.defn.dataActions.find((da: any) => da['_codeType'] === dataActionType)
		if (!action) {
			throw error(500, {
				file: FILENAME,
				function: 'getDataAction',
				message: `Data action (${dataActionType}) not defined for object: ${objName}`
			})
		}
		return new DataAction(action)
	}

	async function processDataInsert(nodeObj: NavNodeObj) {
		if (nodeObj.cardinality === NavNodeObjCardinality.detail) {
			nodeObj.saveMode = DataActionType.insert
		} else {
			nodeObj.saveMode = undefined
		}
		return nodeObj
	}

	async function processDataSave(nodeObj: NavNodeObj, data: any) {
		let action: DataAction
		let query: EdgeQL
		const dataFormValues = data.formValues
		const dataUser = data.user
		const mgmtUser = `(select sys_user::getUser('${dataUser.userName}'))`

		switch (nodeObj.cardinality) {
			case NavNodeObjCardinality.detail:
				switch (nodeObj.saveMode) {
					case DataActionType.insert:
						action = getDataAction(DataActionType.insert, nodeObj.defn.dataActions)
						query = new EdgeQL(action.query)
						action.items.forEach((i) => {
							query.addInsert(
								i.dbName,
								DataActionItemOp.assign,
								i.codeDataType,
								getRawVal(i, dataFormValues)
							)
						})
						if (nodeObj.hasMgmt) {
							query.addInsert(
								'createdBy',
								DataActionItemOp.assign,
								DataActionItemDataType.raw,
								mgmtUser
							)
							query.addInsert(
								'modifiedBy',
								DataActionItemOp.assign,
								DataActionItemDataType.raw,
								mgmtUser
							)
						}
						nodeObj.data = await dbSelectSingle(query)
						nodeObj.saveMode = DataActionType.update
						break

					case DataActionType.update:
						action = getDataAction(DataActionType.update, nodeObj.defn.dataActions)
						query = new EdgeQL(action.query)
						query.addFilter(
							'id',
							DataActionItemOp.equal,
							DataActionItemDataType.uuid,
							dataFormValues.id
						)
						action.items.forEach((i) => {
							query.addUpdate(
								i.dbName,
								DataActionItemOp.assign,
								i.codeDataType,
								getRawVal(i, dataFormValues)
							)
						})
						if (nodeObj.hasMgmt) {
							query.addUpdate(
								'modifiedBy',
								DataActionItemOp.assign,
								DataActionItemDataType.raw,
								mgmtUser
							)
						}
						nodeObj.data = await dbSelectSingle(query)
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'processDataSave',
							message: `No case defined for saveMode: ${nodeObj.saveMode}`
						})
				}
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'processDataSave',
					message: `No case defined for cardinality: ${nodeObj.cardinality}`
				})
		}
		return nodeObj
	}

	async function processDataSelect(nodeObj: NavNodeObj, data: any) {
		// retrieve data
		const action = getDataAction(DataActionType.select, nodeObj.defn.dataActions)
		const query = new EdgeQL(action.query)
		action.items.forEach((i) => {
			query.addFilter(i.dbName, i.codeOp!, i.codeDataType, getRawVal(i, data))
		})
		nodeObj.data = await dbSelect(query)

		// process
		if (nodeObj.cardinality === NavNodeObjCardinality.detail) {
			const record = nodeObj.data[0]
			nodeObj.defn.fields.forEach((f) => {
				if (record.hasOwnProperty(f.name)) {
					f.value = record[f.name]
				}
			})
			nodeObj.saveMode = DataActionType.update
		} else {
			nodeObj.saveMode = undefined
		}
		return nodeObj
	}

	function getRawVal(item: DataActionItem, data: any) {
		switch (item.codeSource) {
			case 'data':
				return data[item.sourceKey]

			default:
				throw error(500, {
					file: FILENAME,
					function: 'getRawVal',
					message: `No case defined for source: ${item.codeSource}`
				})
		}
	}
}
