import { getForm } from '$server/dbForm'

export async function load({ locals, params }) {
	return {
		formDefn: await getForm('cm_elg_doc_rec', { ...locals.user, ...params })
	}
}
