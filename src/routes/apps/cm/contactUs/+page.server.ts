import { getForm } from '$server/dbForm'

export async function load() {
	return {
		formDefn: await getForm('cm_contact_us_list')
	}
}
