import type { DataObj, NavTreeNode, ProcessDataObj, ResponseBody } from '$comps/types'
import { FieldValue } from '$comps/form/field'
import { DataObjProcessType } from '$comps/types'
import { valueOrDefault } from '$comps/types'
import { error } from '@sveltejs/kit'

const FILENAME = '/utils/db.utils.js'

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
	return process(parms, 'processByDataObjName')
}

export async function processDataObjByNode(
	node: NavTreeNode,
	processType: DataObjProcessType,
	data: any = {}
) {
	if (!node.nodeObj.dataObjId) {
		throw error(500, {
			file: FILENAME,
			function: 'processDataObjByNode',
			message: `No dataObjId provided for nodeObj: ${node.nodeObj.name}`
		})
	}
	const parms: ProcessDataObj = {
		data,
		dataObj: node.nodeObj.dataObj,
		dataObjID: node.nodeObj.dataObjId,
		processType
	}
	return process(parms, 'processByDataObjId')
}

export async function processByObject(dataObj: DataObj, additionalData: any) {
	// format dataObj data
	let dataParms: Record<string, any> = {}
	for (const [key, value] of Object.entries(dataObj.objData.data[0])) {
		dataParms[key] = value instanceof FieldValue ? value.data : value
	}

	const parms: ProcessDataObj = {
		data: new DbData({ ...additionalData, parms: dataParms }),
		dataObj,
		dataObjID: '',
		processType: DataObjProcessType.object
	}

	return process(parms, 'processByObject')
}

export async function process(parms: ProcessDataObj, processFunction: string) {
	const responsePromise: Response = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ function: processFunction, parms })
	})
	const response: ResponseBody = await responsePromise.json()
	return response.data
}

export class DbData {
	parms: Record<string, any>
	system: Record<string, any>
	tree: Record<string, any>
	user: Record<string, any>
	constructor(data: any) {
		data = valueOrDefault(data, {})
		this.parms = data.hasOwnProperty('parms') ? data.parms : {}
		this.system = data.hasOwnProperty('system') ? data.system : {}
		this.tree = data.hasOwnProperty('tree') ? data.tree : {}
		this.user = data.hasOwnProperty('user') ? data.user : {}
	}
}
