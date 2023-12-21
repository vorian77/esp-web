import { getServerResponse } from '$comps/types'
import { apiFunctionsDBEdge } from '$utils/utils'
import {
	getNodesBranch,
	getNodesLevel,
	processByDataObj,
	processByDataObjId,
	processByDataObjName,
	processQuery
} from '$server/dbEdge/types.edgeDB.server'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (
		Object.keys(apiFunctionsDBEdge)[
			Object.values(apiFunctionsDBEdge).indexOf(requestData.apiFunction)
		]
	) {
		case apiFunctionsDBEdge.getNodesBranch:
			return getServerResponse(await getNodesBranch(requestData.parentNodeId))

		case apiFunctionsDBEdge.getNodesLevel:
			return getServerResponse(await getNodesLevel(requestData.parentNodeId))

		case apiFunctionsDBEdge.processByDataObj:
			return getServerResponse(await processByDataObj(requestData.parms))

		case apiFunctionsDBEdge.processByDataObjId:
			return getServerResponse(await processByDataObjId(requestData.parms))

		case apiFunctionsDBEdge.processByDataObjName:
			return getServerResponse(await processByDataObjName(requestData.parms))

		case apiFunctionsDBEdge.processQuery:
			return getServerResponse(await processQuery(requestData.parm))

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for function: ${requestData.apiFunction}`
			})
	}
}
