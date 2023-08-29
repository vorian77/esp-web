import { asUpsert, asGet } from '$lib/utils/utils'

export async function load({ locals }) {
	return {
		user: locals.user,
		formId: asGet('formId')
	}
}
