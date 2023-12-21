import { getDataObjById, queryMultiple, querySingle } from '$server/dbEdge/types.edgeDB.server'
import { EdgeQL, DataFieldDataType, DataObj, type DataObjRaw, formatDateTime } from '$comps/types'
import { AppObjActionType } from '$comps/nav/types.app'
import type { DataObjData, DataRowRecord } from '$comps/dataObj/types.query'
import {
	DataRowStatus,
	QueryParm,
	QueryParmData,
	QueryParmDataRow,
	QueryParmAction,
	QueryResultSuccess
} from '$comps/dataObj/types.query'

import { FieldValue } from '$comps/form/field'
import type { Field } from '$comps/form/field'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeQueryProcessor.ts'

export async function processQuery(parm: QueryParm) {
	console.log()
	// console.log('processQuery.action.parm:', parm)

	let dataObjRaw: DataObjRaw = await getDataObjRaw(parm.dataObjRaw, parm.dataObjId)
	const queryParmData = parm.data
	const dataObj = new DataObj(dataObjRaw)
	const query = new EdgeQL(dataObjRaw)
	let dataRowsRaw: Array<Record<string, any>> = []
	let dataRowStatus: DataRowStatus = DataRowStatus.retrieved

	switch (parm.action) {
		case QueryParmAction.retrieve:
			dataRowsRaw = await queryMultiple(query.getScriptSelectUser(queryParmData))
			// console.log('processQuery.retrieve:', { queryParmData })
			// return new QueryResultFail('failed under testing...')
			break

		case QueryParmAction.processAction:
			const actionType: AppObjActionType = parm.actionType
			let script = ''
			let dataRowRaw: Record<string, any> = {}

			if ([AppObjActionType.detailNew, AppObjActionType.listNew].includes(actionType)) {
				dataRowStatus = DataRowStatus.created
				script = query.getScriptPreset(queryParmData)
				dataRowsRaw = await queryMultiple(script)
				break
			} else {
				const rows: Array<QueryParmDataRow> = parm.data.object
				const row = rows[0]
				queryParmData.retrieve = row.record

				switch (actionType) {
					case AppObjActionType.detailDelete:
						dataRowStatus = DataRowStatus.deleted
						script = query.getScriptDelete(queryParmData)
						dataRowRaw = await querySingle(script)
						break

					case AppObjActionType.detailSaveInsert:
						dataRowStatus = DataRowStatus.updated
						script = query.getScriptSaveInsert(queryParmData)
						dataRowRaw = await querySingle(script)
						checkResult(script, dataRowRaw)

						queryParmData.retrieve = dataRowRaw
						script = query.getScriptSelectUser(queryParmData)
						dataRowsRaw = await queryMultiple(script)
						break

					case AppObjActionType.detailSaveUpdate:
						dataRowStatus = DataRowStatus.updated
						script = query.getScriptSaveUpdate(queryParmData)
						dataRowRaw = await querySingle(script)
						checkResult(script, dataRowRaw)

						script = query.getScriptSelectSys(queryParmData)
						dataRowsRaw = await queryMultiple(script)
						break

					default:
						throw error(500, {
							file: FILENAME,
							function: 'processQuery - update - single row',
							message: `No case defined for row NavStateTokenActionType: ${actionType}`
						})
				}
			}
	}
	const dataObjData: DataObjData = await processDataPost(
		parm.action,
		query,
		dataObj,
		dataRowsRaw,
		dataRowStatus
	)
	return new QueryResultSuccess(dataObjRaw, dataObjData)
}

function checkResult(script: string, result: Record<string, any>) {
	if (result.hasOwnProperty('id')) return true
	throw error(500, {
		file: FILENAME,
		function: 'processQuery - update - single row',
		message: `Invalid database operation for script: ${script}`
	})
}

async function getDataObjRaw(dataObjRaw: DataObjRaw | undefined, dataObjId: string | undefined) {
	if (dataObjRaw) {
		return dataObjRaw
	} else if (dataObjId) {
		let dataObjFromDb = await getDataObjById(dataObjId)
		if (dataObjFromDb) return dataObjFromDb
	}
	throw error(500, {
		file: FILENAME,
		function: 'getDataObjRaw',
		message: `Could not retrieve dataObj by id: ${dataObjId}`
	})
}

async function processDataPost(
	parmAction: QueryParmAction,
	query: EdgeQL,
	dataObj: DataObj,
	dataRowsRaw: Array<Record<string, any>>,
	dataRowStatus: DataRowStatus
) {
	const data: DataObjData = []
	if (!dataRowsRaw || Object.keys(dataRowsRaw).length === 0) return data

	for (const row of dataRowsRaw) {
		const record: DataRowRecord = {}
		for (const field of dataObj.fields) {
			const fieldName = field.name
			if (
				row.hasOwnProperty(fieldName) ||
				[DataRowStatus.retrieved, DataRowStatus.created].includes(dataRowStatus)
			) {
				const { data, display }: FieldValueValues = formatDataForDisplay(
					field,
					row[fieldName],
					field.dataType,
					field.dataTypePreset
				)
				record[fieldName] = new FieldValue(data, display, await getDataItems(query, field))
				// console.log('processDataPost.record:', { fieldName, value: record[fieldName] })
			}
		}
		data.push(new QueryParmDataRow(dataRowStatus, record))
	}
	console.log('processDataPost.data.summary:', { dataRowStatus, rows: data.length })
	// console.log('processDataPost.data:', { data: JSON.stringify(data, null, 2) })

	return data

	function formatDataForDisplay(
		field: Field,
		value: any,
		codeDataTypeField: DataFieldDataType,
		codeDataTypePreset: DataFieldDataType | undefined = undefined
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
				if (codeDataTypePreset && isFieldValue(value)) {
					return {
						data: value.data,
						display: formatDataForDisplayScalar(value.display, codeDataTypePreset)
					}
				} else {
					throw error(500, {
						file: FILENAME,
						function: `formatDataForDisplay - DataFieldType: ${DataFieldDataType.computed}`,
						message: `No preset data type defined for field: ${field.name}`
					})
				}

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
				value = value ? JSON.parse(value) : value
				break

			default:
				throw error(500, {
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

async function getDataItems(query: EdgeQL, field: Field) {
	if (field.items.length > 0) {
		return field.items
	} else if (field.itemsList) {
		const script = query.getScriptDataItems(
			field.itemsList.dbSelect,
			new QueryParmData({ parms: field.itemsList.parms })
		)
		return await queryMultiple(script)
	} else {
		return []
	}
}

function isFieldValue(value: any) {
	return (
		value &&
		Object.keys(value).length === 2 &&
		value.hasOwnProperty('data') &&
		value.hasOwnProperty('display')
	)
}
