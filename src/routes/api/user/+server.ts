import { getUser } from '$server/apiUser'

export async function POST({ request }) {
	const { userId } = await request.json()
	return await getUser(userId)
}
