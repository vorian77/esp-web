import { getForm } from '$server/dbForm'

export async function load() {
	return {
		auth_login: await getForm('364001027435790416'),
		auth_signup: await getForm('363255616174555209'),
		auth_verify_phone_mobile: await getForm('365285297907302480'),
		auth_reset_password: await getForm('365284810846896209')
	}
}
