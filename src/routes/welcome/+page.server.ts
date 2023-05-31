import { dbGetDoc } from '$server/dbFauna'
import { dbSelect } from '$server/dbMySQL'

export async function load() {
	const r = dbSelect('select * from esp.sessions')
	const d = await r
	console.log('welcome.load...')
	console.log(d)

	return {
		auth_login: await dbGetDoc('forms', '364001027435790416'),
		auth_signup: await dbGetDoc('forms', '363255616174555209'),
		auth_verify_phone_mobile: await dbGetDoc('forms', '365285297907302480'),
		auth_reset_password: await dbGetDoc('forms', '365284810846896209')
	}
}
