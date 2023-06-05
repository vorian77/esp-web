import { getForm } from '$server/formFetch'

export async function load() {
	return {
		formDefn: await getForm('364158513654530125')
	}
}
