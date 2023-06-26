import { dbESPAPI } from '$server/dbESP'

export async function POST({ request }) {
	const { method, procedure, data } = await request.json()
	return await dbESPAPI(method, procedure, data)
}
