import { getForm } from '$server/formFetch'

export async function load() {
	return {
		formDefn: await getForm('366365410670411853')
	}
}
