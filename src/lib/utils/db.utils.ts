import type { ResponseBody } from '$comps/types'
import { getUser } from '$comps/types'
import { valueOrDefault } from '$comps/types'
import type { QueryParm } from '$comps/dataObj/types.query'
import { error } from '@sveltejs/kit'

const FILENAME = '/utils/db.utils.js'

export async function getNodes(apiFunction: apiFunctionsDBEdge, parentNodeId: string) {
	const responsePromise: Response = await fetch('/api/dbEdge', {
		method: 'POST',
		body: JSON.stringify({ apiFunction, parentNodeId })
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
	processQuery = 'processQuery'
}
