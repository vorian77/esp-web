import { getForm } from '$server/dbForm'

export async function load() {
	return {
		formDefn: await getForm('365620784541990989')
	}
}
