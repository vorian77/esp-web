import { getURLUpload, getURLDownload } from '$server/apiAWS'
import {
	FormSource,
	FormSourceAction,
	FormSourceDBAction,
	FormSourceItem,
	FormSourceItemSource,
	FormSourceResponse,
	FormSourceTarget
} from '$comps/types'
import { getNodesOfProgram } from '$server/dbEdge'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (requestData.action) {
		case 'getNodesOfProgram':
			return FormSourceResponse(await getNodesOfProgram(requestData.programId))
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for action: ${requestData.action}.`
			})
	}
}
