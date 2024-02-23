import { ApiResultData, ApiResultDoSuccess } from '$lib/api'
import {
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiDbDataObj,
	TokenApiQueryType
} from '$comps/types.token'
import {
	DataFieldDataType,
	DataObj,
	DataObjCardinality,
	DataObjData,
	DataObjRecordRow,
	DataObjRecordStatus,
	formatDateTime
} from '$comps/types'
import { EdgeQL } from '$routes/api/dbEdge/dbEdgeScriptBuilder'
import type { DataObjRecord, DataObjRecordRowList, DataObjRaw } from '$comps/types'
import {
	getDataObjById,
	getDataObjByName,
	queryMultiple,
	querySingle
} from '$routes/api/dbEdge/types.dbEdge'
import type { RawDataList } from '$routes/api/dbEdge/types.dbEdge'
import type { Field } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeQueryProcessor.ts'

export async function processQuery(token: TokenApiQuery) {
	// log('processQuery.0...')

	const queryData = TokenApiQueryData.load(token.queryData)
	let dataObjRaw: DataObjRaw = await getDataObjRaw(token.dataObj)
	const query = new EdgeQL(dataObjRaw)
	const dataObj = new DataObj(dataObjRaw)

	let dataRowRaw: Record<string, any> = {}
	let dataRowStatus: DataObjRecordStatus = DataObjRecordStatus.retrieved
	let rawDataList: RawDataList = []
	let script = ''

	log('processQuery.queryType:', token.queryType)
	// log('processQuery.dataObjRaw:', dataObjRaw)

	switch (token.queryType) {
		case TokenApiQueryType.dataObj:
			return dataObj

		case TokenApiQueryType.delete:
			dataRowStatus = DataObjRecordStatus.deleted
			script = query.tables.queryScriptDelete(queryData)
			rawDataList = await queryMultiple(script)
			break

		case TokenApiQueryType.expression:
			return new ApiResultData(await querySingle(query.queryScriptObjectExpr(queryData)))
			break

		case TokenApiQueryType.fieldItems:
			return await getDataItems(query, queryData)

		case TokenApiQueryType.new:
			dataRowStatus = DataObjRecordStatus.created
			script = query.tables.queryScriptPreset(queryData)
			rawDataList = await queryMultiple(script)
			break

		case TokenApiQueryType.retrieve:
			rawDataList = await queryMultiple(query.tables.queryScriptSelectUser(queryData))
			break

		case TokenApiQueryType.saveInsert:
			dataRowStatus = DataObjRecordStatus.updated
			script = query.tables.queryScriptSaveInsert(queryData)
			dataRowRaw = await querySingle(script)
			checkResult(script, dataRowRaw)

			queryData.tree.upsertData(dataObj.table?.name, dataRowRaw)
			script = query.tables.queryScriptSelectUser(queryData)
			rawDataList = await queryMultiple(script)
			break

		case TokenApiQueryType.saveUpdate:
			dataRowStatus = DataObjRecordStatus.updated
			script = query.tables.queryScriptSaveUpdate(queryData)
			dataRowRaw = await querySingle(script)
			checkResult(script, dataRowRaw)

			script = query.tables.queryScriptSelectSys(queryData)
			rawDataList = await queryMultiple(script)
			break

		default:
			error(500, {
				file: FILENAME,
				function: 'processQuery',
				message: `No case defined for row TokenApiDbQueryType: ${token.queryType}`
			})
	}

	// log('processQuery.2:', { rawDataList, dataRowStatus })

	const dataResult: DataObjData = await processDataPost(
		query,
		queryData,
		dataObj,
		rawDataList,
		dataRowStatus
	)

	if (dataResult.dataObjRowList.length > 0) {
		// log('processQuery.3:', { dataResult: dataResult.dataObjRowList })
		log('processQuery.3:', { dataResult: dataResult.dataObjRowList[0] })
	}
	return new ApiResultDoSuccess(dataObjRaw, dataResult)
	// return new ApiResultDoFail('failed under testing...')
}

function checkResult(script: string, result: Record<string, any>) {
	if (Object.hasOwn(result, 'id')) return true
	error(500, {
		file: FILENAME,
		function: 'processQuery - update - single row',
		message: `Invalid database operation for script: ${script}`
	})
}

async function getDataObjRaw(dataObj: TokenApiDbDataObj): Promise<DataObjRaw> {
	if (dataObj.dataObjRaw) {
		return dataObj.dataObjRaw
	} else if (dataObj.dataObjId) {
		let dataObjRaw = await getDataObjById(dataObj.dataObjId)
		if (dataObjRaw) return dataObjRaw
	} else if (dataObj.dataObjName) {
		let dataObjRaw = await getDataObjByName(dataObj.dataObjName)
		if (dataObjRaw) return dataObjRaw
	}
	error(500, {
		file: FILENAME,
		function: 'getDataObjRaw',
		message: `Could not retrieve dataObj by id: ${dataObj.dataObjId}`
	})
}

async function processDataPost(
	query: EdgeQL,
	queryData: TokenApiQueryData,
	dataObj: DataObj,
	rawDataList: RawDataList,
	dataRowStatus: DataObjRecordStatus
) {
	// log('processDataPost.rawDataList:', { rawDataList })
	const dataRows: DataObjRecordRowList = []

	log('processDataPost.rawDataList:', { rows: rawDataList.length, row0: rawDataList[0] })

	if (rawDataList.length === 0) {
		if (dataObj.cardinality === DataObjCardinality.list) {
			return new DataObjData(dataObj.cardinality)
		} else {
			dataRows.push(new DataObjRecordRow(dataRowStatus, {}))
		}
	} else {
		// format data and get field data items for each row
		for (const row of rawDataList) {
			const record: DataObjRecord = {}
			for (const field of dataObj.fields) {
				const fieldName = field.name
				const recordKey = field.dataType === DataFieldDataType.link ? '_' + field.name : field.name
				if (Object.hasOwn(row, recordKey)) {
					record[fieldName] = formatDataForDisplay(
						field,
						row[recordKey],
						field.dataType,
						field.dataTypePreset
					)
				}
			}
			dataRows.push(new DataObjRecordRow(dataRowStatus, record))
		}
	}
	return new DataObjData(dataObj.cardinality, dataRows)

	function formatDataForDisplay(
		field: Field,
		value: any,
		codeDataTypeField: DataFieldDataType,
		codeDataTypeComputed: DataFieldDataType | undefined = undefined
	) {
		switch (codeDataTypeField) {
			// scalar
			case DataFieldDataType.bool:
			case DataFieldDataType.date:
			case DataFieldDataType.datetime:
			case DataFieldDataType.float64:
			case DataFieldDataType.int16:
			case DataFieldDataType.int32:
			case DataFieldDataType.int64:
			case DataFieldDataType.str:
			case DataFieldDataType.uuid:
				return formatDataForDisplayScalar(value, codeDataTypeField)
				break

			// complex
			case DataFieldDataType.json:
				return value ? JSON.parse(value) : {}
				break

			case DataFieldDataType.link:
				if (value && Object.hasOwn(value, 'value')) value = value.value
				if (field.isMultiSelect) {
					return value ? value.map((v: any) => v) : {}
				} else {
					return value ? value : ''
				}
				break

			default:
				error(500, {
					file: FILENAME,
					function: `formatDataForDisplay`,
					message: `No case defined for field: ${field.name} - DataFieldDataType: ${codeDataTypeField}`
				})
		}
	}
}

function formatDataForDisplayScalar(value: any, codeDataTypeField: DataFieldDataType): any {
	switch (codeDataTypeField) {
		case DataFieldDataType.bool:
			return ['', undefined, null].includes(value) ? false : value

		case DataFieldDataType.datetime:
			return !value ? '' : formatDateTime(value)

		default:
			return !value && !['0', 0].includes(value) ? '' : value
	}
}

async function getDataItems(query: EdgeQL, queryData: TokenApiQueryData) {
	log('getDataItems:', {})

	const field: Field = queryData.parms.field
	if (field.items.length > 0) {
		return field.items
	} else if (field.fieldItems) {
		queryData = TokenApiQueryData.load(queryData)
		queryData.replaceParms(field.fieldItems.parms)
		const resultObj = await queryMultiple(
			query.getScriptDataItems(field.fieldItems.exprSelect, queryData)
		)
		const resultArray = []
		for (const [key, value] of Object.entries(resultObj)) {
			resultArray.push(value)
		}

		return resultArray
	} else {
		return []
	}
}

function log(header: string, data: any) {
	console.log()
	console.log(`--- ${header} ---`)
	console.log(data)
}
