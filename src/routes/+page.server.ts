import { getForm } from '$server/dbForm'
import { initCore } from '$server/dbEdgeInitCore'
import { initForms } from '$server/dbEdgeInitForms'
import { initData } from '$server/dbEdgeInitData'

export async function load() {
	// <temp>  230908 - database init
	// await initCore()
	// await initForms()
	// await initData()

	return {
		auth_login: await getForm('auth_login'),
		auth_signup: await getForm('auth_signup'),
		auth_verify_phone_mobile: await getForm('auth_verify_phone_mobile'),
		auth_reset_password: await getForm('auth_reset_password')
	}
}
