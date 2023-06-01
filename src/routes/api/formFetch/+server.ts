import { SubmitAction } from '$comps/esp/form/types'
import { formFetch } from '$server/formFetch'

export async function POST({ request }) {
	const { submitAction, data } = await request.json()

	return formFetch(submitAction, data)
}
