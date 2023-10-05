import { FormSourceResponse } from '$comps/types'
import { getNodeObjForm, getNodesByParent } from '$server/dbEdge/types.edgeDB.server'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (requestData.function) {
		case 'getNodeObjForm':
			return FormSourceResponse(
				await getNodeObjForm(
					requestData.objId,
					requestData.nodeObj,
					requestData.processType,
					requestData.data
				)
			)
			break

		case 'getNodesByParent':
			return FormSourceResponse(await getNodesByParent(requestData.parentNodeId))
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for function: ${requestData.function}`
			})
	}
}
