import { getURLUpload, getURLDownload } from '$server/apiAWS'
import { FormSourceResponse } from '$comps/types'
import { getNodesByParent } from '$server/dbEdge'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (requestData.action) {
		case 'getNodesByParent':
			return FormSourceResponse(await getNodesByParent(requestData.parentNodeId))
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for action: ${requestData.action}.`
			})
	}
}
