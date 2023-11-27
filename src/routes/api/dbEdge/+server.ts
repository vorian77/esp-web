import { getServerResponse } from '$comps/types'
import { processDataObj, getNodeObjsByParent } from '$server/dbEdge/types.edgeDB.server'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (requestData.function) {
		case 'processDataObj':
			return getServerResponse(await processDataObj(requestData.parms))
			break

		case 'getNodeObjsByParent':
			return getServerResponse(await getNodeObjsByParent(requestData.parentNodeId))
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for function: ${requestData.function}`
			})
	}
}
