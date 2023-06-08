import { getForm } from '$server/dbForm'

export async function load() {
	return {
		formDefn: await getForm('366365410670411853')
	}
}
