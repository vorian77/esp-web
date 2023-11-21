import { getFormById, queryMultiple, querySingle } from '$server/dbEdge/types.edgeDB.server'
import {
	EdgeQL,
	DataFieldDataType,
	DataObjProcessType,
	DataObj,
	DataObjCardinality,
	formatDate,
	formatDateTime,
	getArray,
	memberOfEnum,
	type RawFormField,
	strRequired,
	valueOrDefault,
	DataObjActionParmsNode
} from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeDataObj.ts'

export async function processDataObj(
	dataObj: DataObj,
	dataObjId: string,
	processType: DataObjProcessType,
	parms: any = {}
) {
	console.log()
	console.log('processDataObj...')
	console.log('processType:', processType)

	// if (!dataObj.defn) {
	// 	dataObj.defn = await getFormById(dataObjId)
	// } else {
	// 	console.log('processDataObj.has dataobject defn...')
	// }
	// dataObj = new DataObj(dataObj.defn)

	if (!dataObj) {
		const formDefn = await getFormById(dataObjId)
		dataObj = new DataObj(formDefn)
		dataObj.defn = formDefn
	}

	return await processData(processType, dataObj, parms)
}

async function processData(processType: DataObjProcessType, dataObj: DataObj, parms: any) {
	const query = new EdgeQL(dataObj.defn, processType)
	switch (processType) {
		case DataObjProcessType.delete:
			return await processDataDelete(query, dataObj, parms)
			break

		case DataObjProcessType.preset:
			return await processDataPreset(query, dataObj, parms)
			break

		case DataObjProcessType.saveInsert:
			return await processDataSaveInsert(query, dataObj, parms)
			break

		case DataObjProcessType.saveUpdate:
			return await processDataSaveUpdate(query, dataObj, parms)
			break

		case DataObjProcessType.select:
			return await processDataSelect(query, dataObj, parms)
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processData',
				message: `No case defined for processType: ${processType}`
			})
	}
}
async function processDataDelete(query: EdgeQL, dataObj: DataObj, parms: any) {
	let script = query.getScriptDelete(parms)
	dataObj.data = await querySingle(script)
	return dataObj
}

async function processDataPreset(query: EdgeQL, dataObj: DataObj, parms: any) {
	let script

	script = query.getScriptPreset(parms)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processDataSaveInsert(query: EdgeQL, dataObj: DataObj, parms: any) {
	const script = query.getScriptSaveInsert(parms)
	dataObj.data = await querySingle(script)
	return await processDataSaveSetBySys(query, dataObj)
}

async function processDataSaveUpdate(query: EdgeQL, dataObj: DataObj, parms: any) {
	const script = query.getScriptSaveUpdate(parms)
	dataObj.data = await querySingle(script)
	return await processDataSaveSetBySys(query, dataObj)
}

async function processDataSaveSetBySys(query: EdgeQL, dataObj: DataObj) {
	const script = query.getScriptSelectSys({ data: dataObj.data })
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processDataSelect(query: EdgeQL, dataObj: DataObj, parms: any) {
	let script = query.getScriptSelectUser(parms)
	dataObj.data = await queryMultiple(script)
	dataObj.data = await processDataPost(query, dataObj)
	return dataObj
}

async function processDataPost(query: EdgeQL, dataObj: DataObj) {
	let data = dataObj.data
	if (!data) return data

	for (const field of dataObj.defn._fieldsEl) {
		await getDataItems(query, field, data)

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
	console.log('processDataSelect.return:', data)
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
				console.log('formData.bool...')
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

			default:
				return value
		}
	}

	async function getDataItems(query: EdgeQL, field: RawFormField, data: any) {
		if (field._itemsList) {
			const script = query.getScriptDataItems(field._itemsList.dbSelect, field.itemsListParms)
			field.items = await queryMultiple(script)
		}
	}
}
