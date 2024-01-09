import { ApiFunction } from '$lib/api'
import { getServerResponse } from '$comps/types'
import {
	getNodesBranch,
	getNodesLevel,
	getTableColumns,
	processQuery
} from '$routes/api/dbEdge/types.dbEdge'
import { getDataObjId } from '$routes/api/dbEdge/dbEdgeUtilities'
import { sendText } from '$routes/api/apiTwilio'
import { getUser } from '$routes/api/apiUser'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/api/dbEdge/server.ts'

export async function POST({ request }) {
	const requestData = await request.json()
	const { apiFunction, token } = requestData

	switch (apiFunction) {
		case ApiFunction.dbEdgeGetDataObjId:
			return getServerResponse(await getDataObjId(token.dataObj.dataObjName))

		case ApiFunction.dbEdgeGetNodesBranch:
			return getServerResponse(await getNodesBranch(token))

		case ApiFunction.dbEdgeGetNodesLevel:
			return getServerResponse(await getNodesLevel(token))

		case ApiFunction.dbEdgeGetTableColumns:
			return getServerResponse(await getTableColumns(token))

		case ApiFunction.dbEdgeProcessQuery:
			return getServerResponse(await processQuery(token))

		case ApiFunction.getUser:
			return getServerResponse(await getUser(token))

		case ApiFunction.sendText:
			return getServerResponse(await sendText(token))

		default:
			error(500, {
				file: FILENAME,
				function: 'POST',
				message: `No case defined for ApiFunction: ${apiFunction}`
			})
	}
}
