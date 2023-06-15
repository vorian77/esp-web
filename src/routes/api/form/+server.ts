import { processForm } from '$server/dbForm'
import { FormSourceDBAction } from '$comps/esp/form/types'

export async function POST({ request }) {
	const { formName, source, data } = await request.json()
	console.log()
	console.log('/api/form:', formName, source, data)
	return await processForm(formName, source, FormSourceDBAction.upsert, data)
}
