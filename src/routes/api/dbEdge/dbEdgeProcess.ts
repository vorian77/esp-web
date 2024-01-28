import {
	ApiResultData,
	ApiResultDoSuccess,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiDbDataObj,
	TokenApiQueryType
} from '$lib/api'
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
import { FieldItem, type FieldItemsRecord } from '$comps/form/field'
import type { Field } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeQueryProcessor.ts'

export async function processQuery(token: TokenApiQuery) {
	// console.log()
	// console.log('processQuery.0...')

	const queryData = TokenApiQueryData.load(token.queryData)
	let dataObjRaw: DataObjRaw = await getDataObjRaw(token.dataObj)
	const query = new EdgeQL(dataObjRaw)
	const dataObj = new DataObj(dataObjRaw)

	let dataRowRaw: Record<string, any> = {}
	let dataRowStatus: DataObjRecordStatus = DataObjRecordStatus.retrieved
	let rawDataList: RawDataList = []
	let script = ''

	switch (token.queryType) {
		case TokenApiQueryType.delete:
			dataRowStatus = DataObjRecordStatus.deleted
			script = query.tables.queryScriptDelete(queryData)
			// dataRowRaw = await querySingle(script)
			rawDataList = await queryMultiple(script)
			break

		case TokenApiQueryType.expression:
			return new ApiResultData(await querySingle(query.queryScriptObjectExpr(queryData)))
			break

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

			queryData.tree.upsertData(dataObj.table.name, dataRowRaw)
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

	// console.log('processQuery.2:', { rawDataList, dataRowStatus })

	const dataResult: DataObjData = await processDataPost(
		query,
		queryData,
		dataObj,
		rawDataList,
		dataRowStatus
	)

	if (dataResult.dataObjRowList.length > 0) {
		console.log()
		console.log('processQuery.3:', { dataResult: dataResult.dataObjRowList[0] })
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

async function getDataObjRaw(dataObj: TokenApiDbDataObj) {
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
	// console.log('processDataPost.rawDataList:', { rawDataList })
	const dataRows: DataObjRecordRowList = []

	if (rawDataList.length === 0) {
		if (dataObj.cardinality === DataObjCardinality.list) {
			return new DataObjData(dataObj.cardinality)
		} else {
			// only set field data items
			let fieldItemsRecord: FieldItemsRecord = {}
			for (const field of dataObj.fields) {
				const fieldName = field.name
				fieldItemsRecord[fieldName] = await getDataItems(query, queryData, field)
			}
			dataRows.push(new DataObjRecordRow(dataRowStatus, {}, fieldItemsRecord))
		}
	} else {
		// format data and get field data items for each row
		for (const row of rawDataList) {
			const record: DataObjRecord = {}
			let fieldItemsRecord: FieldItemsRecord = {}
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
				fieldItemsRecord[fieldName] = await getDataItems(query, queryData, field)
			}
			dataRows.push(new DataObjRecordRow(dataRowStatus, record, fieldItemsRecord))
		}
	}

	// console.log()
	// console.log('processDataPost.data.return.record[0]:', {
	// 	record: dataRows[0].record
	// })
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

async function getDataItems(query: EdgeQL, queryData: TokenApiQueryData, field: Field) {
	if (field.items.length > 0) {
		return field.items
	} else if (field.itemsDb) {
		queryData = TokenApiQueryData.load(queryData)
		queryData.replaceParms(field.itemsDb.parms)
		return (await queryMultiple(
			query.getScriptDataItems(field.itemsDb.exprSelect, queryData)
		)) as Array<FieldItem>
	} else {
		return []
	}
}
