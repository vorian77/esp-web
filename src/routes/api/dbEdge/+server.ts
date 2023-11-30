import { getServerResponse } from '$comps/types'
import {
	processByObject,
	processByDataObjId,
	processByDataObjName,
	getNodeObjsByParent
} from '$server/dbEdge/types.edgeDB.server'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (requestData.function) {
		case 'getNodeObjsByParent':
			return getServerResponse(await getNodeObjsByParent(requestData.parentNodeId))

		case 'processByDataObjId':
			return getServerResponse(await processByDataObjId(requestData.parms))

		case 'processByDataObjName':
			return getServerResponse(await processByDataObjName(requestData.parms))

		case 'processByObject':
			return getServerResponse(await processByObject(requestData.parms))

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for function: ${requestData.function}`
			})
	}
}
