import { processForm } from '$server/dbForm'
import { FormSourceDBAction } from '$comps/esp/form/types'

export async function POST({ request }) {
	const { source, data } = await request.json()
	return await processForm(
		source.actions[FormSourceDBAction.update],
		FormSourceDBAction.update,
		data
	)
}
