import { getFormById, queryMultiple, querySingle } from '$server/dbEdge/types.edgeDB.server'
import {
	DataActionSaveMode,
	EdgeQL,
	DataActionProcessType,
	DataObj,
	DataObjCardinality
} from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = 'server/dbEdgeFunctions.ts'

export async function getNodeObjForm(
	dataObj: DataObj,
	dataObjId: string,
	processType: DataActionProcessType,
	data: any = {}
) {
	if (!dataObj) {
		const formDefn = await getFormById(dataObjId)
		dataObj = new DataObj(formDefn)
		dataObj.defn = formDefn
	}
	return await processData(processType, dataObj, data)
}

async function processData(processType: DataActionProcessType, nodeObj: DataObj, data: any) {
	const query = new EdgeQL(nodeObj.defn, processType)
	switch (processType) {
		case DataActionProcessType.delete:
			return await processDataDelete(nodeObj, data)
			break

		case DataActionProcessType.preset:
			return await processDataPreset(nodeObj)
			break

		case DataActionProcessType.save:
			return await processDataSave(nodeObj, data)
			break

		case DataActionProcessType.select:
			return await processDataSelect()
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'processData',
				message: `No case defined for processType: ${processType}`
			})
	}

	async function processDataDelete(nodeObj: DataObj, data: any) {
		let script = query.getScriptDelete(data)
		nodeObj.data = await querySingle(script)
		return nodeObj
	}

	async function processDataPreset(nodeObj: DataObj) {
		switch (nodeObj.cardinality) {
			case DataObjCardinality.detail:
				nodeObj.data = query.getPresetData(data)
				setDataValues(nodeObj)
				nodeObj.saveMode = DataActionSaveMode.insert
				break

			default:
				throw error(500, {
					file: FILENAME,
					function: 'processDataPreset',
					message: `No case defined for saveMode: ${nodeObj.saveMode}`
				})
		}
		return nodeObj
	}

	async function processDataSave(nodeObj: DataObj, data: any) {
		let script
		switch (nodeObj.cardinality) {
			case DataObjCardinality.detail:
				switch (nodeObj.saveMode) {
					case DataActionSaveMode.insert:
						script = query.getScriptSaveInsert(data)
						nodeObj.data = await querySingle(script)
						console.log('save.insert:', nodeObj.data)

						// set record id, if configured in fields
						const fields = nodeObj?.defn?._fields
						const idx = fields.findIndex((f: any) => {
							return f.dbName === 'id'
						})
						if (idx >= 0) {
							fields[idx].value = nodeObj.data['id']
						}

						nodeObj.saveMode = DataActionSaveMode.update
						break

					case DataActionSaveMode.update:
						script = query.getScriptSaveUpdate(data)
						nodeObj.data = await querySingle(script)
						console.log('save.update:', nodeObj.data)
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

	async function processDataSelect() {
		const queryScript = query.getScriptSelect(data)
		nodeObj.data = await queryMultiple(queryScript)

		if (nodeObj.cardinality === DataObjCardinality.detail) {
			setDataValues(nodeObj)
			nodeObj.saveMode = DataActionSaveMode.update
		} else {
			nodeObj.saveMode = undefined
		}
		return nodeObj
	}

	function setDataValues(nodeObj: DataObj) {
		let record = nodeObj.data
		if (Array.isArray(record)) {
			record = record[0]
		}
		nodeObj?.defn?._fields.forEach((f: any) => {
			if (record.hasOwnProperty(f?.dbName)) {
				f.value = record[f?.dbName]
			} else {
				f.value = undefined
			}
		})
	}
}
