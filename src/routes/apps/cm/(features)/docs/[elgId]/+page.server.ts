import { getForm } from '$server/dbForm'

export async function load({ locals, params }) {
	return {
		formDefn: await getForm('366595468511150153', { ...locals.user, ...params })
	}
}
