import { FormSourceResponse } from '$comps/types'
import { getNodeObjForm, getNodeObjsByParent } from '$server/dbEdge/types.edgeDB.server'

import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (requestData.function) {
		case 'getNodeObjForm':
			return FormSourceResponse(
				await getNodeObjForm(
					requestData.nodeObj,
					requestData.dataObjId,
					requestData.processType,
					requestData.data
				)
			)
			break

		case 'getNodesByParent':
			return FormSourceResponse(await getNodeObjsByParent(requestData.parentNodeId))
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for function: ${requestData.function}`
			})
	}
}
