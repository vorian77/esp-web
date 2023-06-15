import { getForm } from '$server/dbForm'

export async function load() {
	return {
		defnForm: await getForm('form_builder'),
		defnFormCol: await getForm('form_builder_column')
	}
}
