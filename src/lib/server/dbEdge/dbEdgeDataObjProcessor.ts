import { getFormById, queryMultiple, querySingle } from '$server/dbEdge/types.edgeDB.server'
import {
	EdgeQL,
	DataFieldDataType,
	DataObjProcessType,
	DataObj,
	DataObjCardinality,
	formatDateTime,
	memberOfEnum,
	type ProcessDataObj,
	type RawFormField
} from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeDataObj.ts'

export async function processDataObj(parms: ProcessDataObj) {
	console.log()
	console.log('processDataObj...')
	console.log('processType:', parms.processType)

	// parms
	// nodeKey: string,
	// dataObj: DataObj,
	// dataObjId: string,
	// processType: DataObjProcessType,
	// data: any = {}

	// if (!dataObj.defn) {
	// 	dataObj.defn = await getFormById(dataObjId)
	// } else {
	// 	console.log('processDataObj.has dataobject defn...')
	// }
	// dataObj = new DataObj(dataObj.defn)

	if (!parms.dataObj) {
		const formDefn = await getFormById(parms.dataObjId)
		parms.dataObj = new DataObj(formDefn)
		parms.dataObj.defn = formDefn
	}

	return await processData(parms)
}

async function processData(parms: ProcessDataObj) {
	// nodeKey: string, dataObj: DataObj, data: any
	const dataObj = parms.dataObj!
	const query = new EdgeQL(parms.nodeKey, dataObj.defn)

	switch (parms.processType) {
		case DataObjProcessType.delete:
			return await processDataDelete(query, dataObj, parms.data)
			break

		case DataObjProcessType.preset:
			return await processDataPreset(query, dataObj, parms.data)
			break

		case DataObjProcessType.saveInsert:
			return await processDataSaveInsert(query, dataObj, parms.data)
			break

		case DataObjProcessType.saveUpdate:
			return await processDataSaveUpdate(query, dataObj, parms.data)
			break

		case DataObjProcessType.select:
			return await processDataSelect(query, dataObj, parms.data)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processData',
				message: `No case defined for processType: ${parms.processType}`
			})
	}
}
async function processDataDelete(query: EdgeQL, dataObj: DataObj, data: any) {
	const script = query.getScriptDelete(data)
	dataObj.data = await querySingle(script)
	return dataObj
}

async function processDataPreset(query: EdgeQL, dataObj: DataObj, data: any) {
	const script = query.getScriptPreset(data)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processDataSaveInsert(query: EdgeQL, dataObj: DataObj, data: any) {
	const script = query.getScriptSaveInsert(data)
	dataObj.data = await querySingle(script)

	if (dataObj.data.hasOwnProperty('id')) {
		const key = dataObj.defn._table.mod + '::' + dataObj.defn._table.name
		data.tree[key]['id'] = dataObj.data.id

		// retrieve all values
		return processDataSelect(query, dataObj, data)
	}
}

async function processDataSaveUpdate(query: EdgeQL, dataObj: DataObj, data: any) {
	// update
	let script = query.getScriptSaveUpdate(data)
	dataObj.data = await querySingle(script)

	// retrieve values set by system
	script = query.getScriptSelectSys(data)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processDataSelect(query: EdgeQL, dataObj: DataObj, data: any) {
	let script = query.getScriptSelectUser(data)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processDataPost(query: EdgeQL, dataObj: DataObj) {
	let data = dataObj.data
	if (!data) return data

	for (const field of dataObj.defn._fieldsEl) {
		await getDataItems(query, field)

		const fieldName = field._column.name
		for (let [index, val] of data.entries()) {
			if (val.hasOwnProperty(fieldName)) {
				data[index][fieldName] = formatDataForDisplay(
					field,
					val[fieldName],
					field._column._codeDataType,
					field._column._codeDataTypePreset
				)
			}
		}
	}

	if (dataObj.cardinality === DataObjCardinality.detail) data = data[0]
	console.log('processDataPost.return:', data)
	return data

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
			const script = query.getScriptDataItems(field._itemsList.dbSelect, field.itemsListParms)
			field.items = await queryMultiple(script)
		}
	}
}
