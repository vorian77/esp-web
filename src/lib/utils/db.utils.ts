import type { NodeApp, ResponseBody } from '$comps/types'
import { DataObj, getUser, DataObjProcessType } from '$comps/types'
import { FieldValue } from '$comps/form/field'
import { QueryParm, valueOrDefault } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/utils/db.utils.js'

export async function getNodes(apiFunction: apiFunctionsDBEdge, parentNodeId: string) {
	return processNodes(apiFunction, parentNodeId)
}

export async function processByDataObj(
	dataObj: DataObj,
	processType: DataObjProcessType,
	data: DbData
) {
	// format dataObj data
	let dataForm: Record<string, any> = {}
	for (const [key, value] of Object.entries(dataObj.objData.data[0])) {
		dataForm[key] = value instanceof FieldValue ? value.data : value
	}
	const parms: ProcessDataObj = {
		data: new DbData({ ...data, form: dataForm }),
		dataObj,
		dataObjID: '',
		processType
	}
	return processParms(apiFunctionsDBEdge.processByDataObj, parms)
}

export async function processByDataObjName(
	dataObjName: string,
	processType: DataObjProcessType,
	data: any = {}
) {
	const parms: ProcessDataObj = {
		data,
		dataObj: undefined,
		dataObjID: dataObjName,
		processType
	}
	return processParms(apiFunctionsDBEdge.processByDataObjName, parms)
}
export async function processByNode(
	node: NodeApp,
	processType: DataObjProcessType,
	data: any = {}
) {
	const parms: ProcessDataObj = {
		data,
		dataObj: node.dataObj,
		dataObjID: node.dataObjId,
		processType
	}
	return processParms(apiFunctionsDBEdge.processByDataObjId, parms)
}

export async function processNodes(apiFunction: apiFunctionsDBEdge, parentNodeId: string) {
	const responsePromise: Response = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ apiFunction, parentNodeId })
	})
	const response: ResponseBody = await responsePromise.json()
	return response.data
}

export async function processParms(apiFunction: apiFunctionsDBEdge, parms: ProcessDataObj) {
	const responsePromise: Response = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ apiFunction, parms })
	})
	const response: ResponseBody = await responsePromise.json()
	return response.data
}
export async function processQuery(parm: QueryParm) {
	const responsePromise: Response = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ apiFunction: apiFunctionsDBEdge.processQuery, parm })
	})
	return await responsePromise.json()
}

export class DbData {
	dataObj: DbDataType
	parms: DbDataType
	system: DbDataType
	user: DbDataType
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.dataObj = this.getData(data, 'dataObj')
		this.parms = this.getData(data, 'parms')
		this.system = this.getData(data, 'system')
		this.user = valueOrDefault(getUser(), {})
	}
	getData(data: any, key: string) {
		return data.hasOwnProperty(key) && data !== undefined ? data[key] : {}
	}
}
export type DbDataType = Record<string, any>

export enum apiFunctionsDBEdge {
	getNodesBranch = 'getNodesBranch',
	getNodesLevel = 'getNodesLevel',
	processByDataObj = 'processByDataObj',
	processByDataObjId = 'processByDataObjId',
	processByDataObjName = 'processByDataObjName',
	processQuery = 'processQuery'
}

export interface ProcessDataObj {
	dataObj: DataObj | undefined
	dataObjID: string // used for processing by ID or Name
	processType: DataObjProcessType
	data: any
}
