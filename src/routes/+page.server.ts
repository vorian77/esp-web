import { getForm } from '$server/dbForm'
import { init } from '$server/dbEdgeInit'

export async function load() {
	// <temp>  230908 - database init
	// await init()

	return {
		auth_login: await getForm('auth_login'),
		auth_signup: await getForm('auth_signup'),
		auth_verify_phone_mobile: await getForm('auth_verify_phone_mobile'),
		auth_reset_password: await getForm('auth_reset_password')
	}
}
