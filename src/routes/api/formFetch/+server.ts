import { formFetch } from '$server/formFetch'

export async function POST({ request }) {
	const { source, data } = await request.json()
	return formFetch(source, data)
}
