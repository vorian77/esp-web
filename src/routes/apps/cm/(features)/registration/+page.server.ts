import { getForm } from '$server/dbForm'

export async function load() {
	return { reg_personal: await getForm('auth_signup') }
}
