import { getForm } from '$server/dbForm'

export async function load({ locals }) {
	return {
		formDefn: await getForm('cm_ssr_profile', { ...locals.user })
	}
}
