import { dbGetDoc } from '$server/dbFauna'

export async function load() {
	return {
		auth_login: await dbGetDoc('forms', '364001027435790416'),
		auth_signup: await dbGetDoc('forms', '363255616174555209'),
		auth_verify_phone_mobile: await dbGetDoc('forms', '365285297907302480'),
		auth_reset_password: await dbGetDoc('forms', '365284810846896209')
	}
}
