import { getForm } from '$server/dbForm'

export async function load() {
	async function getForms() {
		try {
			const data = {
				auth_login: await getForm('auth_login'),
				auth_signup: await getForm('auth_signup'),
				auth_verify_phone_mobile: await getForm('auth_verify_phone_mobile'),
				auth_reset_password: await getForm('auth_reset_password')
			}
			return data
		} catch (err) {
			console.log(err)
		}
	}
	return await getForms()
}
