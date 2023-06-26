import { getForm } from '$server/dbForm'

export async function load({ locals }) {
	// todo: migrate disclosure to form per organization
	return { user: locals.user }
}
