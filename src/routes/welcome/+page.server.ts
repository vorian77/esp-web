import { dbGetFormDefn } from '$server/dbFauna'

export async function load() {
	return {
		auth_login: await dbGetFormDefn('364001027435790416'),
		auth_signup: await dbGetFormDefn('363255616174555209'),
		auth_reset_password: await dbGetFormDefn('365284810846896209'),
		auth_verify_phone_mobile: await dbGetFormDefn('365285297907302480')
	}
}
