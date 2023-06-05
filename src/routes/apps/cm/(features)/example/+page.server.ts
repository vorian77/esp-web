import { getForm } from '$server/formFetch'

export async function load() {
	return {
		formDefn: await getForm('365620784541990989')
	}
}
