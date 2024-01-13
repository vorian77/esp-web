import {
	ApiResultData,
	ApiResultDoSuccess,
	TokenApiQuery,
	TokenApiQueryData,
	TokenApiDbDataObj,
	TokenApiQueryType
} from '$lib/api'
import {
	EdgeQL,
	DataFieldDataType,
	DataObj,
	DataObjData,
	DataObjRow,
	DataObjRowStatus,
	formatDateTime
} from '$comps/types'
import type { DataObjRecord, DataObjListRow, DataObjRaw } from '$comps/types'
import {
	getDataObjById,
	getDataObjByName,
	queryMultiple,
	querySingle
} from '$routes/api/dbEdge/types.dbEdge'
import type { RawDataList } from '$routes/api/dbEdge/types.dbEdge'
import { FieldValue } from '$comps/form/field'
import type { Field, FieldItem } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeQueryProcessor.ts'

export async function processQuery(token: TokenApiQuery) {
	// console.log()
	// console.log('processQuery.0...')

	const queryData = TokenApiQueryData.load(token.queryData)

	console.log('processQuery.0:', { tables: queryData.tree.levels.map((node) => node.table) })
	let dataObjRaw: DataObjRaw = await getDataObjRaw(token.dataObj)
	const dataObj = new DataObj(dataObjRaw)
	const query = new EdgeQL(dataObjRaw)

	let dataRowRaw: Record<string, any> = {}
	let dataRowStatus: DataObjRowStatus = DataObjRowStatus.retrieved
	let rawDataList: RawDataList = []
	let script = ''

	switch (token.queryType) {
		case TokenApiQueryType.delete:
			dataRowStatus = DataObjRowStatus.deleted
			script = query.getScriptDelete(queryData)
			dataRowRaw = await querySingle(script)
			break

		case TokenApiQueryType.expression:
			return new ApiResultData(await querySingle(query.getScriptObjectExpr(queryData)))
			break

		case TokenApiQueryType.new:
			dataRowStatus = DataObjRowStatus.created
			script = query.getScriptPreset(queryData)
			rawDataList = await queryMultiple(script)
			break

		case TokenApiQueryType.retrieve:
			rawDataList = await queryMultiple(query.getScriptSelectUser(queryData))
			break

		case TokenApiQueryType.saveInsert:
			dataRowStatus = DataObjRowStatus.updated
			script = query.getScriptSaveInsert(queryData)
			dataRowRaw = await querySingle(script)
			checkResult(script, dataRowRaw)

			queryData.tree.addData(dataObj.table.name, dataRowRaw)
			queryData.tree.levels.forEach((level, i) => {
				console.log('processQuery.treeNode:', { i, level })
			})

			script = query.getScriptSelectUser(queryData)
			rawDataList = await queryMultiple(script)
			break

		case TokenApiQueryType.saveUpdate:
			dataRowStatus = DataObjRowStatus.updated
			script = query.getScriptSaveUpdate(queryData)
			dataRowRaw = await querySingle(script)
			checkResult(script, dataRowRaw)

			script = query.getScriptSelectSys(queryData)
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

	const dataObjList: DataObjListRow = await processDataPost(
		query,
		queryData,
		dataObj,
		rawDataList,
		dataRowStatus
	)
	// console.log('processQuery.3:', { processedDataPost: dataObjList })
	return new ApiResultDoSuccess(dataObjRaw, new DataObjData(dataObj.cardinality, dataObjList))
	// return new QueryResultFail('failed under testing...')
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
	dataRowStatus: DataObjRowStatus
) {
	const data: DataObjListRow = []
	if (rawDataList.length === 0) rawDataList = [{}]

	for (const row of rawDataList) {
		const record: DataObjRecord = {}
		for (const field of dataObj.fields) {
			const fieldName = field.name
			if (
				Object.hasOwn(row, fieldName) ||
				[DataObjRowStatus.retrieved, DataObjRowStatus.created].includes(dataRowStatus)
			) {
				const { data, display }: FieldValueValues = formatDataForDisplay(
					field,
					row[fieldName],
					field.dataType,
					field.dataTypePreset
				)
				record[fieldName] = new FieldValue(
					data,
					display,
					await getDataItems(query, queryData, field)
				)
			}
		}
		data.push(new DataObjRow(dataRowStatus, record))
	}
	console.log()
	console.log('processDataPost.data.summary:', { dataRowStatus, rows: data.length })
	// console.log('processDataPost.data.summary.1:', { data: JSON.stringify(data) })
	return data

	function formatDataForDisplay(
		field: Field,
		value: any,
		codeDataTypeField: DataFieldDataType,
		codeDataTypeComputed: DataFieldDataType | undefined = undefined
	): FieldValueValues {
		switch (codeDataTypeField) {
			// scalar
			case DataFieldDataType.bool:
			case DataFieldDataType.date:
			case DataFieldDataType.datetime:
			case DataFieldDataType.decimal:
			case DataFieldDataType.int16:
			case DataFieldDataType.int32:
			case DataFieldDataType.int64:
			case DataFieldDataType.str:
			case DataFieldDataType.uuid:
				value = formatDataForDisplayScalar(value, codeDataTypeField)
				break

			// complex
			case DataFieldDataType.computed:
				if (codeDataTypeComputed && !value) {
					const val = formatDataForDisplayScalar(value, codeDataTypeComputed)
					return { data: val, display: val }
				}

				if (codeDataTypeComputed && isFieldValue(value)) {
					return {
						data: value.data,
						display: formatDataForDisplayScalar(value.display, codeDataTypeComputed)
					}
				}

				error(500, {
					file: FILENAME,
					function: 'formatDataForDisplay',
					message: `Invalid data format. field name: ${field.name} - field data type: ${codeDataTypeField} - value: ${value}`
				})

			case DataFieldDataType.edgeType:
				let data = ''
				let display = ''
				if (field.isMultiSelect) {
					if (Array.isArray(value)) {
						value.forEach((v: any) => {
							if (data) {
								data += ','
								display += ','
							}
							data += v.data
							display += v.display
						})
					}
				} else {
					if (isFieldValue(value)) {
						data = value.data
						display = value.display
					}
				}
				return { data, display }
				break

			case DataFieldDataType.json:
				return value ? JSON.parse(value) : { data: null, display: null }
				break

			default:
				error(500, {
					file: FILENAME,
					function: `formatDataForDisplay`,
					message: `No case defined for field: ${field.name} - DataFieldDataType: ${codeDataTypeField}`
				})
		}
		return { data: value, display: value }
	}
}

function formatDataForDisplayScalar(value: any, codeDataTypeField: DataFieldDataType): any {
	switch (codeDataTypeField) {
		case DataFieldDataType.bool:
			return ['', undefined, null].includes(value) ? false : value

		case DataFieldDataType.datetime:
			return !value ? '' : formatDateTime(value)

		default:
			return !value ? '' : value
	}
}

type FieldValueValues = { data: any; display: any }

async function getDataItems(
	query: EdgeQL,
	queryData: TokenApiQueryData,
	field: Field
): Promise<Array<FieldItem>> {
	if (field.items.length > 0) {
		return field.items
	} else if (field.itemsList) {
		const queryDataItems = TokenApiQueryData.load(queryData)
		queryDataItems.setDataParms(field.itemsList.parms)
		const result = await queryMultiple(
			query.getScriptDataItems(field.itemsList.dbSelect, queryDataItems)
		)
		// console.log('getDataItems.result:', { field: field.name, resultRows: result.length })
		return result
	} else {
		return []
	}
}

function isFieldValue(value: any) {
	return (
		value &&
		Object.keys(value).length === 2 &&
		Object.hasOwn(value, 'data') &&
		Object.hasOwn(value, 'display')
	)
}
