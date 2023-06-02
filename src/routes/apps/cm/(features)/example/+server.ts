import { json } from '@sveltejs/kit'
import { fetchESPAPI } from '$server/esp'
import { error } from '@sveltejs/kit'

const FILENAME = '/routes/apps/cm/temp/example/server.ts'

export async function POST({ request }) {
	const { formId, actionType, actionURL, actionMethod, actionData } = await request.json()

	const response = await fetchESPAPI(actionMethod, actionURL, actionData)

	console.log('POST:', formId)
	console.log(response)
	return json(response)
}
