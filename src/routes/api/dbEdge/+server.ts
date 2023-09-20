import { FormSourceResponse } from '$comps/types'
import { getForm, getNodesByParent } from '$server/dbEdge'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	switch (requestData.function) {
		case 'getForm':
			return FormSourceResponse(
				await getForm(requestData.formId, requestData.formActionType, requestData.data)
			)
			break

		case 'getNodesByParent':
			return FormSourceResponse(await getNodesByParent(requestData.parentNodeId))
			break

		default:
			throw error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for function: ${requestData.function}.`
			})
	}
}
