import { getForm } from '$server/dbForm'

export async function load({ locals, params }) {
	return {
		formDefns: [
			await getForm('moed_yo_reg_step_1', { ...locals.user, ...params }),
			await getForm('moed_yo_reg_step_2', { ...locals.user, ...params }),
			await getForm('moed_yo_reg_step_3', { ...locals.user, ...params })
		]
	}
}
