import {
	getFormById,
	getFormIdByName,
	queryExecute,
	queryMultiple,
	querySingle
} from '$server/dbEdge/types.edgeDB.server'
import {
	EdgeQL,
	DataFieldDataType,
	DataObjProcessType,
	DataObj,
	DataObjCardinality,
	DbData,
	formatDateTime,
	memberOfEnum,
	type ProcessDataObj,
	type RawFormField
} from '$comps/types'
import type { Form } from '$comps/form/form'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeDataObj.ts'

export async function processByDataObjId(parms: ProcessDataObj) {
	let objDefn: any
	if (parms.dataObj && parms.dataObj.defn) {
		objDefn = parms.dataObj.defn
	} else {
		const dataObjID = parms.dataObjID
		objDefn = await getFormById(dataObjID)
	}
	return await process(parms.processType, objDefn, parms.data)
}

export async function processByDataObjName(parms: ProcessDataObj) {
	if (parms.dataObj && parms.dataObj.defn) {
		return await process(parms.processType, parms.dataObj.defn, parms.data)
	} else {
		const form: { id: string } | null = await getFormIdByName(parms.dataObjID)
		if (form) {
			parms.dataObjID = form.id
			return processByDataObjId(parms)
		} else {
			throw error(500, {
				file: FILENAME,
				function: 'processByDataObjName',
				message: `Could not retrieve form by name: ${parms.dataObjID}`
			})
		}
	}
}

export async function processByObject(parms: ProcessDataObj) {
	if (parms.dataObj && parms.dataObj.defn) {
		return await process(parms.processType, parms.dataObj.defn, parms.data)
	} else {
		throw error(500, {
			file: FILENAME,
			function: 'processByObject',
			message: `No dataObj provided.`
		})
	}
}

async function process(processType: DataObjProcessType, objDefn: string, data: any) {
	// console.log()
	// console.log('process...')
	// console.log('process.type:', processType)

	const query = new EdgeQL(objDefn)
	const dataObj = new DataObj(objDefn)

	switch (processType) {
		case DataObjProcessType.delete:
			return await processDelete(query, dataObj, data)
			break

		case DataObjProcessType.object:
			return await processObject(query, dataObj, data)
			break

		case DataObjProcessType.preset:
			return await processPreset(query, dataObj, data)
			break

		case DataObjProcessType.saveInsert:
			return await processSaveInsert(query, dataObj, data)
			break

		case DataObjProcessType.saveUpdate:
			return await processSaveUpdate(query, dataObj, data)
			break

		case DataObjProcessType.select:
			return await processSelect(query, dataObj, data)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processData',
				message: `No case defined for processType: ${processType}`
			})
	}
}

async function processDelete(query: EdgeQL, dataObj: DataObj, data: any) {
	const script = query.getScriptDelete(data)
	dataObj.data = await querySingle(script)
	return dataObj
}

async function processObject(query: EdgeQL, dataObj: DataObj, data: any) {
	const script = query.getScriptObjectExpr(data)
	dataObj.data = await queryMultiple(script)
	return dataObj
}

async function processPreset(query: EdgeQL, dataObj: DataObj, data: any) {
	const script = query.getScriptPreset(data)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processSaveInsert(query: EdgeQL, dataObj: DataObj, data: any) {
	const script = query.getScriptSaveInsert(data)
	dataObj.data = await querySingle(script)

	if (dataObj.data.hasOwnProperty('id')) {
		const key = dataObj.defn._table.mod + '::' + dataObj.defn._table.name
		data.tree[key]['id'] = dataObj.data.id

		// retrieve all values
		return processSelect(query, dataObj, data)
	}
}

async function processSaveUpdate(query: EdgeQL, dataObj: DataObj, data: any) {
	// update
	let script = query.getScriptSaveUpdate(data)
	dataObj.data = await querySingle(script)

	// retrieve values set by system
	script = query.getScriptSelectSys(data)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processSelect(query: EdgeQL, dataObj: DataObj, data: any) {
	let script = query.getScriptSelectUser(data)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processDataPost(query: EdgeQL, dataObj: DataObj) {
	if (!dataObj.data || Object.keys(dataObj.data).length === 0) return {}
	let data: Array<Record<string, any>> = dataObj.data

	for (const field of dataObj.defn._fieldsEl) {
		await getDataItems(query, field)

		const fieldName = field._column.name

		data.forEach((row, index) => {
			if (row.hasOwnProperty(fieldName)) {
				data[index][fieldName] = formatDataForDisplay(
					field,
					data[index][fieldName],
					field._column._codeDataType,
					field._column._codeDataTypePreset
				)
			}
		})
	}
	console.log('processDataPost.return:', data)

	return dataObj.cardinality === DataObjCardinality.list ? data : data[0]

	function formatDataForDisplay(
		field: RawFormField,
		value: any,
		rawCodeDataTypeField: string,
		rawCodeDataTypePreset: string = ''
	) {
		const dataTypeField = memberOfEnum(
			rawCodeDataTypeField,
			'dataFormat',
			'dataType',
			'DataFieldDataType',
			DataFieldDataType
		)

		switch (dataTypeField) {
			case DataFieldDataType.bool:
				return [undefined, null].includes(value) ? false : value

			case DataFieldDataType.computed:
				value = 1 === Object.keys(value).length ? value[Object.keys(value)[0]] : value
				const dataTypePreset = memberOfEnum(
					rawCodeDataTypePreset,
					'dataFormat',
					'dataType',
					'DataFieldDataType',
					DataFieldDataType
				)
				return formatDataForDisplay(field, value, dataTypePreset)

			case DataFieldDataType.datetime:
				return formatDateTime(value)

			case DataFieldDataType.edgeType:
				if (field._column.isMultiSelect) {
					let data = ''
					let display = ''
					value.forEach((v: any) => {
						if (data) {
							data += ','
							display += ','
						}
						data += v.data
						display += v.display
					})
					value = { data, display }
				}
				return value

			case DataFieldDataType.json:
				return value ? JSON.parse(value) : value

			case DataFieldDataType.str:
				return !value ? '' : value
			default:
				return value
		}
	}

	async function getDataItems(query: EdgeQL, field: RawFormField) {
		if (field._itemsList) {
			const script = query.getScriptDataItems(
				field._itemsList.dbSelect,
				new DbData({ parms: field.itemsListParms })
			)
			field.items = await queryMultiple(script)
		}
	}
}
